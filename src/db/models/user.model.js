import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import { DataTypes, Model } from 'sequelize';

import RoleModel from './role.model.js';

import SCHEMES from '../../constants/auth.constants.js';
import SequelizeProvider from '../../providers/sequelize.provider.js';

class UserModel extends Model {
	static async hashPassword(password) {
		const { passwordSaltRounds = 10 } = config.env;

		return bcrypt.hash(password, await bcrypt.genSalt(passwordSaltRounds));
	}

	validatePassword(password) {
		return bcrypt.compare(password, this.password);
	}

	generateBearerTokens() {
		const generateToken = (expiresIn = '1h', payload = {}) =>
			jwt.sign(payload, config.env.appKey, {
				algorithm: config.env.jwtAlgorithm,
				expiresIn,
			});

		return {
			token_type: SCHEMES.bearer,
			access_token: generateToken('1h', {
				id: this.id,
				username: this.username,
			}),
			refresh_token: generateToken('7d', { username: this.username }),
		};
	}
}

UserModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: RoleModel,
				key: 'id',
			},
		},
	},
	{
		sequelize: SequelizeProvider.connection,
		modelName: 'user',
		timestamps: false,
	},
);

UserModel.belongsTo(RoleModel, { foreignKey: 'roleId' });

UserModel.addHook('beforeCreate', async user => {
	user.password = await UserModel.hashPassword(user.password);
});

export default UserModel;

import { DataTypes, Model } from 'sequelize';

import SequelizeProvider from '../../providers/sequelize.provider.js';

class RoleModel extends Model {}

RoleModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: SequelizeProvider.connection,
		modelName: 'role',
		timestamps: false,
	},
);
export default RoleModel;

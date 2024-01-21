import config from 'config';
import jwt from 'jsonwebtoken';

import UserModel from '../db/models/user.model.js';
import RoleModel from '../db/models/role.model.js';

import LoginException from '../exceptions/login.exception.js';

import { ROLES } from '../constants/role.constants.js';

class AuthService {
	async login(username, password) {
		const userModel = await UserModel.findOne({ where: { username } });

		if (userModel === null || (await userModel.validatePassword(password)) === false) {
			throw new LoginException();
		}

		return userModel.generateBearerTokens();
	}

	async register(username, password) {
		const roleModel = await RoleModel.findOne({ where: { name: ROLES.USER } });

		return UserModel.create({ username, password, roleId: roleModel.id });
	}

	async refresh(refreshToken) {
		const { username } = jwt.verify(refreshToken, config.env.appKey);

		const userModel = await UserModel.findOne({ where: { username } });

		return userModel.generateBearerTokens();
	}
}

export default new AuthService();

import HttpHandler from './http.handler.js';

import UserService from '../../services/user.service.js';

import UserResource from '../../resources/user.resource.js';

export default class UserHttpHandler extends HttpHandler {
	constructor() {
		super(UserService, UserResource);
	}

	async getCreateAttributes() {
		const { username, password, role_id: roleId } = this._req.body;

		return { username, password, roleId: Number(roleId) };
	}

	async getUpdateAttributes() {
		const { username, password, role_id: roleId } = this._req.body;

		const data = { username, password };

		if (roleId !== undefined) {
			data.roleId = Number(roleId);
		}

		return data;
	}
}

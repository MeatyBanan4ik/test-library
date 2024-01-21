import Service from './service.js';

import UserModel from '../db/models/user.model.js';

class UserService extends Service {
	constructor() {
		super(UserModel);
	}

	async update(id, data) {
		if ('password' in data) {
			data.password = await this.Model.hashPassword(data.password);
		}

		await this.Model.update(data, { where: { id } });

		return this.get(id);
	}
}

export default new UserService();

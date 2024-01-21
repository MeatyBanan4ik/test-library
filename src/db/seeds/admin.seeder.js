import BaseSeeder from './base.seeder.js';

import UserModel from '../models/user.model.js';
import RoleModel from '../models/role.model.js';

import { ROLES } from '../../constants/role.constants.js';

import UserService from '../../services/user.service.js';

class AdminSeeder extends BaseSeeder {
	static async up() {
		const adminRoleModel = await RoleModel.findOne({ where: { name: ROLES.ADMIN } });

		if (!adminRoleModel) {
			this.message("Admin role doesn't exists");
		}

		const adminUserModel = await UserModel.findOne({ where: { roleId: adminRoleModel.id } });

		if (!adminUserModel) {
			await UserService.create({
				name: 'Admin',
				username: 'admin',
				password: 'admin',
				roleId: adminRoleModel.id,
			});

			this.message('Admin user created');
		} else {
			this.message('Admin user exists');
		}

		return void 0;
	}
}

export default AdminSeeder;

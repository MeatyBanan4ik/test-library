import BaseSeeder from './base.seeder.js';

import RoleModel from '../models/role.model.js';

import { ROLES } from '../../constants/role.constants.js';

class AdminSeeder extends BaseSeeder {
	static async up() {
		for (const role of Object.values(ROLES)) {
			const roleModel = await RoleModel.findOne({ where: { name: role } });

			if (!roleModel) {
				await RoleModel.create({ name: role });
				this.message(`${role} role created`);
			} else {
				this.message(`${role} role exists`);
			}
		}

		return void 0;
	}
}

export default AdminSeeder;

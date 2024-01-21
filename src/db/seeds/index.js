import BaseSeeder from './base.seeder.js';
import RoleSeeder from './role.seeder.js';
import AdminSeeder from './admin.seeder.js';

export default async () => {
	try {
		BaseSeeder.message('Start seeder');

		await RoleSeeder.up();
		await AdminSeeder.up();

		BaseSeeder.message('Seeder completed');

		process.exit();
	} catch (e) {
		BaseSeeder.message(e.toString(), 'trace');

		process.exit(0);
	}
};

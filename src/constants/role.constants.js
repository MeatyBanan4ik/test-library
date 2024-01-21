import { ENTITIES } from './entities.constants.js';

export const ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

export const CREATE = 'create';
export const READ = 'read';
export const UPDATE = 'update';
export const DELETE = 'delete';

const CRUD = [CREATE, READ, UPDATE, DELETE];

export const ACCESS = {
	[ROLES.ADMIN]: {
		[ENTITIES.BOOKS]: CRUD,
		[ENTITIES.USERS]: CRUD,
	},
	[ROLES.USER]: {
		[ENTITIES.BOOKS]: [READ],
	},
};

import { Router } from 'express';

import UserHttpHandler from '../handlers/http/user.http.handler.js';

import CallHttpHandler from '../handlers/http/middlewares/call.http.middleware.js';
import roleHttpMiddleware from '../handlers/http/middlewares/role.http.middleware.js';
import existHttpMiddleware from '../handlers/http/middlewares/exist.http.middleware.js';
import uniqueHttpMiddleware from '../handlers/http/middlewares/unique.http.middleware.js';
import requiredHttpMiddleware from '../handlers/http/middlewares/required.http.middleware.js';

import UserModel from '../db/models/user.model.js';
import RoleModel from '../db/models/role.model.js';

import { ENTITIES } from '../constants/entities.constants.js';
import { CREATE, DELETE, READ, UPDATE } from '../constants/role.constants.js';

const router = Router();

router.get('/', roleHttpMiddleware(ENTITIES.USERS, READ), CallHttpHandler(UserHttpHandler, 'all'));
router.get(
	'/:id',
	roleHttpMiddleware(ENTITIES.USERS, READ),
	existHttpMiddleware(UserModel, 'params.id'),
	CallHttpHandler(UserHttpHandler, 'get'),
);
router.post(
	'/',
	roleHttpMiddleware(ENTITIES.USERS, CREATE),
	requiredHttpMiddleware('username'),
	uniqueHttpMiddleware(UserModel, 'username', 'username'),
	requiredHttpMiddleware('password'),
	requiredHttpMiddleware('role_id'),
	existHttpMiddleware(RoleModel, 'body.role_id'),
	CallHttpHandler(UserHttpHandler, 'create'),
);
router.patch(
	'/:id',
	roleHttpMiddleware(ENTITIES.USERS, UPDATE),
	existHttpMiddleware(UserModel, 'params.id'),
	async (req, res, next) => {
		await uniqueHttpMiddleware(UserModel, 'username', 'username', req.params.id, false)(req, res, next);
	},
	CallHttpHandler(UserHttpHandler, 'update'),
);
router.delete(
	'/:id',
	roleHttpMiddleware(ENTITIES.USERS, DELETE),
	existHttpMiddleware(UserModel, 'params.id'),
	CallHttpHandler(UserHttpHandler, 'delete'),
);

export default router;

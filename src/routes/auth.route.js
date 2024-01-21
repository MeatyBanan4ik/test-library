import { Router } from 'express';

import AuthHttpHandler from '../handlers/http/auth.http.handler.js';

import UserModel from '../db/models/user.model.js';

import callHttpMiddleware from '../handlers/http/middlewares/call.http.middleware.js';
import uniqueHttpMiddleware from '../handlers/http/middlewares/unique.http.middleware.js';
import requiredHttpMiddleware from '../handlers/http/middlewares/required.http.middleware.js';

const router = Router();

router.post(
	'/login',
	requiredHttpMiddleware('username'),
	requiredHttpMiddleware('password'),
	callHttpMiddleware(AuthHttpHandler, 'login'),
);
router.post(
	'/register',
	requiredHttpMiddleware('username'),
	uniqueHttpMiddleware(UserModel, 'username', 'username'),
	requiredHttpMiddleware('password'),
	callHttpMiddleware(AuthHttpHandler, 'register'),
);
router.post('/token/refresh', requiredHttpMiddleware('refresh_token'), callHttpMiddleware(AuthHttpHandler, 'refresh'));

export default router;

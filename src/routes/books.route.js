import { Router } from 'express';

import BookHttpHandler from '../handlers/http/book.http.handler.js';

import CallHttpHandler from '../handlers/http/middlewares/call.http.middleware.js';
import roleHttpMiddleware from '../handlers/http/middlewares/role.http.middleware.js';
import existHttpMiddleware from '../handlers/http/middlewares/exist.http.middleware.js';

import BookModel from '../db/models/book.model.js';

import { ENTITIES } from '../constants/entities.constants.js';
import { CREATE, DELETE, READ, UPDATE } from '../constants/role.constants.js';
import requiredHttpMiddleware from '../handlers/http/middlewares/required.http.middleware.js';

const router = Router();

router.get('/', roleHttpMiddleware(ENTITIES.BOOKS, READ), CallHttpHandler(BookHttpHandler, 'all'));
router.get(
	'/:id',
	roleHttpMiddleware(ENTITIES.BOOKS, READ),
	existHttpMiddleware(BookModel, 'params.id'),
	CallHttpHandler(BookHttpHandler, 'get'),
);
router.post(
	'/',
	roleHttpMiddleware(ENTITIES.BOOKS, CREATE),
	requiredHttpMiddleware('year'),
	requiredHttpMiddleware('genre'),
	requiredHttpMiddleware('title'),
	requiredHttpMiddleware('author'),
	CallHttpHandler(BookHttpHandler, 'create'),
);
router.patch(
	'/:id',
	roleHttpMiddleware(ENTITIES.BOOKS, UPDATE),
	existHttpMiddleware(BookModel, 'params.id'),
	CallHttpHandler(BookHttpHandler, 'update'),
);
router.delete(
	'/:id',
	roleHttpMiddleware(ENTITIES.BOOKS, DELETE),
	existHttpMiddleware(BookModel, 'params.id'),
	CallHttpHandler(BookHttpHandler, 'delete'),
);

export default router;

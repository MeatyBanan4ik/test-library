import { Router } from 'express';

import AuthRoute from './auth.route.js';
import UsersRoute from './users.route.js';
import BooksRoute from './books.route.js';

import AuthenticateMiddleware from '../handlers/http/middlewares/authenticate.http.middleware.js';

const router = Router();

router.use('/auth', AuthRoute);

router.use(AuthenticateMiddleware);

router.use('/users', UsersRoute);
router.use('/books', BooksRoute);

export default router;

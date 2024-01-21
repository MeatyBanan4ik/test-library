import log4js from 'log4js';
import express from 'express';
import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';

import ApiRoute from './routes/api.route.js';

import PassportProvider from './providers/passport.provider.js';

import NotFoundException from './exceptions/notFound.exception.js';

const logger = log4js.getLogger('HttpServer');

export default class HttpServer {
	static async up(port, host) {
		this.port = port;
		this.host = host;
		this.app = express();
		this.app.set('trust proxy', true);
		PassportProvider();
		this._useCors();
		this._useRequestParsers();
		this._useRequestTrace();
		this._useResponseTrace();
		this._useRoutes();
		this._useErrorHandling();
		await new Promise(res => {
			this.app.listen(this.port, this.host, () => {
				logger.info(`App listening on ${this.host}:${this.port}!`);
				res(true);
			});
		});
	}

	static _useCors() {
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Max-Age', '600');
			res.header('Access-Control-Allow-Credentials', 'true');
			res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
			res.header('Access-Control-Expose-Headers', 'content-type, authorization, x-request-id');

			if (req.method === 'OPTIONS') {
				return res.send();
			}

			return next();
		});
	}

	static _useRequestParsers() {
		this.app.use(passport.initialize());
		this.app.use(express.json());
	}

	static _useRequestTrace() {
		this.app.use((req, res, next) => {
			req._startTime = Date.now();
			req._id = uuidv4();
			res.setHeader('X-Request-Id', req._id);
			logger.info(req._id, 'REQUEST', 'method:', req.method, 'uri:', req.url, 'body:', req.body, 'query:', req.query);
			next();
		});
	}

	static _useResponseTrace() {
		this.app.use((req, res, next) => {
			const { json } = res;

			res._success = function (successResponse = {}) {
				const { data = {}, code = 200, message } = successResponse;
				res.status(code).send({ status: true, data, message });
			};
			res.json = function (body) {
				logger.info(req._id, 'RESPONSE', 'code:', res.statusCode, 'body:', body);
				json.apply(res, [body]);
			};
			next();
		});
	}

	static _useRoutes() {
		this.app.use('/api', ApiRoute);
		this.app.use(() => {
			throw new NotFoundException();
		});
	}

	static _useErrorHandling() {
		this.app.use((err, req, res, _next) => {
			const status = err.status || 500;
			const { errors } = err;
			const { message } = err;
			res.status(status).send({
				status: false,
				data: {},
				errors,
				message,
			});
		});
	}
}

import config from 'config';
import logger from 'log4js';

import httpServer from './http-server.js';

import SequelizeProvider from './providers/sequelize.provider.js';

async function init() {
	const schema = 1;

	// check config version
	if (config.version !== schema) {
		console.error('Unsupported configuration version:', config.version, 'actual:', schema);
		process.exit(-1);
	}

	// configure logger
	logger.configure(config.logger);

	// init DB
	await SequelizeProvider.connection.sync();

	// init http
	await httpServer.up(config.http.port, config.http.host);
}

init();

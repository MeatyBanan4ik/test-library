import config from 'config';
import logger from 'log4js';

import SequelizeProvider from './providers/sequelize.provider.js';

import seeder from './db/seeds/index.js';

async function init() {
	// configure logger
	logger.configure(config.logger);

	// init DB
	await SequelizeProvider.connection.sync();

	// start seeds
	await seeder();
}

init();

import config from 'config';
import Sequelize from 'sequelize';

class SequelizeProvider {
	constructor() {
		this.connection = new Sequelize(config.db.name, config.db.username, config.db.password, {
			host: config.db.host,
			dialect: 'mysql',
			logging: false,
		});
	}
}

export default new SequelizeProvider();

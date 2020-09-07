const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: '127.0.0.1',
		dialect: 'postgres'
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.TEST_DB_NAME,
		host: '127.0.0.1',
		dialect: 'postgres',
		logging: false
	},
	production: {
		use_env_variable: 'DATABASE_URL'
	}
};

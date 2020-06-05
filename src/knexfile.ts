import path from 'path';

/**
 * @info knex doesn't support ES6 export syntax
 */
module.exports = {
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, 'database',  'db.sqlite')
	},
	migrations: {
		directory: path.resolve(__dirname, 'database', 'migrations')
	},
	seeds: {
		directory: path.resolve(__dirname, 'database', 'seeds')
	},
	useNullAsDefault: true
};
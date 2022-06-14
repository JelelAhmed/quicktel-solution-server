import Sequelize from 'sequelize';

// const sequelize = new Sequelize('quicktel', 'postgres', '1994', {
// 	dialect: 'postgres',
// 	host: 'localhost'
// });

let sequelize = new Sequelize({
	dialect: 'postgres',
	connection: {
    connectionString: process.env.DATABASE_URL,
	},
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
}
);

sequelize
.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});


export default sequelize;
import Sequelize from 'sequelize';

// const sequelize = new Sequelize('quicktel', 'postgres', '1994', {
// 	dialect: 'postgres',
// 	host: process.env.DATABASE_URL,
// });

let sequelize;


if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
	// the application is executed on Heroku ... use the postgres         database
  sequelize = new Sequelize(process.env.DATABASE_URL,
{
 dialect: "postgres",
 protocol: "postgres",
 port: 5432,
 host: "<heroku host>",
 logging: true //false
});
} else {
// the application is executed on the local machine ... use mysql
sequelize =new Sequelize("postgres://<username>:<password>@<host>:  <port>/<database>",
	{
	dialect: "postgres"
	}
	);
}

export default sequelize;
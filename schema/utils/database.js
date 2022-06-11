import Sequelize from 'sequelize';

const sequelize = new Sequelize('quicktel', 'postgres', '1994', {
	dialect: 'postgres',
	host: 'localhost',
	define: {
    timestamps: false
  }
});


export default sequelize;
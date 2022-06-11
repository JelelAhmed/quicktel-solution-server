
import sequelize from '../schema/utils/database.js';
import Sequelize from 'sequelize';

const User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isUnique: (value, next) => {
				User.findAll({
					where: { email: value },
					attributes: ['id'],
				})
				.then((user) => {
					if (user.length != 0)
						next(new Error('Email address already in use!'));
					next();
				})
				.catch((onError) => onError);
			},
		},
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}

});

export default User;

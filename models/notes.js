import Sequelize from 'sequelize';

import sequelize from "../schema/utils/database.js";

const Notes = sequelize.define('notes', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	title: {
		type: Sequelize.STRING,
		allowNull: true
	},
	content: {
		type: Sequelize.STRING,
		allowNull: true
	},

});

export default Notes;


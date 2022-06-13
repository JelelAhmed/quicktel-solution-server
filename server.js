import express from 'express';
import cors from 'cors';
import expressGraphQL from 'express-graphql'
import schema from './schema/schema.js';
import Notes from './models/notes.js';
import User from './models/user.js';

import sequelize from './schema/utils/database.js';



const app = express();

app.use(cors({
	origin: '*'
}));

app.use('/graphql', expressGraphQL.graphqlHTTP({
	schema,
	graphiql: true
}));


Notes.belongsTo(User, {constraints: true, onDelete: 'CASCADE' });
User.hasMany(Notes);


sequelize.sync()
	.then(result => {
		// console.log(result);
	})
	.catch(err => {
		console.log(err)
	})

	app.listen(4000, () => {
		console.log('listening');
	});
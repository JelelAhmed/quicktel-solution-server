import express from 'express';
import expressGraphQL from 'express-graphql'
import schema from './schema/schema.js';

import sequelize from './schema/utils/database.js';

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const app = express();

app.use('/graphql', expressGraphQL.graphqlHTTP({
	schema,
	graphiql: true
}));


app.listen(4000, () => {
	console.log('listening');
})


import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLInt, GraphQLString, buildSchema, isRequiredArgument } from "graphql";
import _ from 'lodash';
import pkg from 'graphql-sequelize';
const { resolver } = pkg;
import Sequelize from 'sequelize';
import sequelize from "./utils/database.js";
import Notes from "../models/notes.js";
import User from '../models/user.js'


// const resolverFn = resolver(User);




let Task = sequelize.define('task', {
  title: Sequelize.STRING
});


const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: {type: GraphQLString},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
		email: { type: GraphQLString },
		password: { type: GraphQLString },
	}
});


const TaskType = new GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the task.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the task.',
    },
		content: {
      type: GraphQLString,
      description: 'The title of the task.',
    }

  }
});



const RootQuery = new GraphQLObjectType({
	name: 'RootQuery', 
	fields: {
		user: {
			type: TaskType,
			args: { id: { type: GraphQLString } },
			resolve: resolver(Notes)
		}
	}
});


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
				lastName: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, { 
				firstName, lastName, email, password }, info) => {
				 return	User.create({
							firstName,
							lastName,
							email,
							password
						})
						.then(user => {
							return user
						})
						.catch(err => {
							console.log(err.message)
							return err;
						});
					}
    },
  }
});


 export default new GraphQLSchema ({
	mutation,
	query: RootQuery
});
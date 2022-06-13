
import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } from "graphql";
import _ from 'lodash';
import pkg from 'graphql-sequelize';
const { resolver } = pkg;
import Sequelize from 'sequelize';
import bcrypt from 'bcrypt'
import sequelize from "./utils/database.js";
import Notes from "../models/notes.js";
import User from '../models/user.js'


const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'A note',
  fields: () => ({
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
    },
		userId: {
			type: GraphQLInt,
			description: 'Author id'
		},
		user: {
      type: new GraphQLList(UserType),
			args: { id: {type: GraphQLInt } },
      resolve: async (parentValue, {id}) => {
				return await User.findAll({
					where: {
						id: parentValue.userId
					}
					})
					.then(user => {
						return user;
					})
					.catch(err => {
						return err;
					})
      },
			description: 'Author of the note',
    }
  })
});


const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: {type: GraphQLInt},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		note: {
      type: new GraphQLList(NoteType),
			args: { id: {type: GraphQLInt } },
      resolve: async (parentValue, {id}) => {
				return await Notes.findAll({
						where: {
							userId: parentValue.id
						}
					})
					.then(notes => {
						return notes;
					})
					.catch(err => {
						return err;
					})
      }
    }
	}
});






const RootQuery = new GraphQLObjectType({
	name: 'RootQuery', 
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLInt } },
			resolve: async (parentValue, { id }) => {
			 return await User.findByPk(id)
					.then(user => {
						return user;
					})
					.catch(err => {
						return err;
					})
			}
		},
		
		note: {
		 type: new GraphQLList(NoteType),
			args: { id: { type: GraphQLInt } },
			resolve: async (parentValue, { id }) => {
			  return await Notes.findAll({
					where: {
						userId: id
					}
				})
					.then(notes => {
						return notes;
					})
					.catch(err => {
						return err;
					})
			}
		},

		getNotes: {
			type: new GraphQLList(NoteType),
			 args: { count: { type: GraphQLInt } },
			 resolve: async (parentValue, { count }) => {
				 return await Notes.findAll({
					limit: count,
					include: [{
						model: User, required: true,
					}]
				 })
					 .then(notes => {
						 return notes;
					 })
					 .catch(err => {
						 return err;
					 })
			 }
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
      resolve: async (parentValue, { 
				firstName, lastName, email, password }, info) => {
				 return await	User.create({
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

		loginUser: {
      type: UserType,
      args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parentValue, { email, password }) => {
				if (!email || !password) {
					const error = new Error('Email or Password cannot be empty');
					return error;
				}
				return await User.findOne({where:{email: email}})
					.then(user => {
						if(user && bcrypt.compareSync(password, user.password)) {
							return user;
						}
						else {
							return new Error('Invalid Email or Password');
						}
					})
					.catch(err => {
						console.log(err.message)
						return err;
					});
				}
    },

		addNote: {
      type: NoteType,
      args: {
				title: { type: GraphQLString },
				content: { type: GraphQLString },
				userId: { type: GraphQLInt }
      },
      resolve: async (parentValue, { userId, title, content }) => {
			  return await Notes.create({
					title,
					content,
					userId
				})
					.then(note => {
						return note;
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
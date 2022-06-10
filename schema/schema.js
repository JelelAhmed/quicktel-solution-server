
import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import _ from 'lodash';


const users = [
	{ id: '23', firstName: 'samanthan', lastName: 'fred', email: 'abduljelelahmed'},
	{ id: '22', firstName: 'salman', lastName: 'abdul', email: 'abduljelelahmed@gmail.com'}
]


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



const RootQuery = new GraphQLObjectType({
	name: 'RootQuery', 
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return _.find(users, { id: args.id});
			}
		}
	}
});


 export default new GraphQLSchema({
	query: RootQuery
});
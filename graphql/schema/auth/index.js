const graphql = require('graphql');const {    GraphQLObjectType,    GraphQLString,    GraphQLID,    GraphQLInt} = graphql;module.exports = new GraphQLObjectType({    name: 'Auth',    fields: () => ({        id: { type: GraphQLString },        token: { type: GraphQLString },        permission: {type: GraphQLString}    }),});
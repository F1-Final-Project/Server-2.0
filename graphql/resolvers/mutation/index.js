const graphql = require('graphql');const { GraphQLObjectType } = graphql;const UserMutation = require('./user');module.exports = new GraphQLObjectType({    name: 'Mutation',    fields: {        ...UserMutation,    }});
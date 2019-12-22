const bcrypt = require('bcrypt');const graphql = require('graphql');const {GraphQLString, GraphQLNonNull} = graphql;const User = require('db-worker/lib/models/user');const AuthType = require('../../../schema/auth');module.exports = {    login: {        type: AuthType,        args: {            email: {type: GraphQLNonNull(GraphQLString)},            password: {type: GraphQLNonNull(GraphQLString)}        },        resolve: async (parent, {email, password}) => {            const user = await User.findOne({email});            if(!user){                throw new Error('Invalid email!');            }            const same = await bcrypt.compare(password, user.password);            if(!same) {                throw new Error('Invalid password!');            }            return user.toAuthJSON();        },    }};
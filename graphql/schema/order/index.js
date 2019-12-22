const graphql = require('graphql');const {    GraphQLID,    GraphQLObjectType,    GraphQLString,    GraphQLList,    GraphQLInt,    GraphQLBoolean,    GraphQLFloat,} = graphql;const Ingredient = require('db-worker/lib/models/ingredient');const IngredientType = require('../ingredient');const User = require('db-worker/lib/models/user');const UserType = require('../user');const OrderItemsType = new GraphQLObjectType({    name: 'OrderItem',    fields: () => ({        title: {type: GraphQLString},        description: {type: GraphQLString},        ingredients: {            type: GraphQLList(IngredientType),            resolve(parent) {                return Ingredient.find({_id: parent.ingredients});            },        },        additionalIngredients: {            type: GraphQLList(IngredientType),            resolve(parent) {                return Ingredient.find({_id: parent.additionalIngredients});            },        },        price: {type: GraphQLFloat},        weight: {type: GraphQLInt},    })});module.exports = new GraphQLObjectType({    name: 'Order',    fields: () => ({        id: {type: GraphQLID},        staff: {            type: UserType,            resolve(parent) {                return User.findById(parent.staff);            }        },        table: {type: GraphQLInt},        orderItems: {type: GraphQLList(OrderItemsType)},        newOrderItems: {type: GraphQLList(OrderItemsType)},        orderPrice: {type: GraphQLFloat},        onKitchen: {type: GraphQLBoolean},        completed: {type: GraphQLBoolean},        created_at: {type: GraphQLString},        updated_at: {type: GraphQLString},    }),});
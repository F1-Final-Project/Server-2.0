const graphql = require('graphql');const {    GraphQLInputObjectType,    GraphQLID,    GraphQLNonNull,    GraphQLList,    GraphQLString,    GraphQLBoolean,    GraphQLFloat,    GraphQLInt,} = graphql;const OrderType = require('../../../schema/order');const Order = require('db-worker/lib/models/order');const OrderItemInputType = new GraphQLInputObjectType({    name: 'OrderItemInput',    fields: () => ({        title: {type: GraphQLString},        description: {type: GraphQLString},        ingredients: {type: GraphQLList(GraphQLString)},        additionalIngredients: {type: GraphQLList(GraphQLString)},        price: {type: GraphQLFloat},        weight: {type: GraphQLInt},    })});module.exports = {    addOrder: {        type: OrderType,        args: {            staff: {type: GraphQLNonNull(GraphQLString)},            table: {type: GraphQLNonNull(GraphQLInt)},            orderItems: {type: GraphQLList(OrderItemInputType)},            newOrderItems: {type: GraphQLList(OrderItemInputType)},            orderPrice: {type: GraphQLFloat},            onKitchen: {type: GraphQLBoolean},            completed: {type: GraphQLBoolean},        },        resolve: async (parent, args, req) => {            if (!req.isAuth) {                throw new Error('Unauthenticated!')            }            try {                const order = new Order({                    staff: args.staff,                    table: args.table,                    orderItems: args.orderItems,                    newOrderItems: args.newOrderItems,                    orderPrice: args.orderPrice,                    onKitchen: args.onKitchen,                    completed: args.completed,                    created_at: new Date(),                    updated_at: new Date()                });                return order.save();            } catch (err) {                throw err;            }        },    },    deleteOrder: {        type: OrderType,        args: {            id: {type: GraphQLNonNull(GraphQLID)}        },        resolve: async (parent, args, req) => {            if (!req.isAuth) {                throw new Error('Unauthenticated!')            }            try {                return Order.findByIdAndRemove(args.id);            } catch (err) {                throw err;            }        }    },    updateOrder: {        type: OrderType,        args: {            id: {type: GraphQLNonNull(GraphQLID)},            staff: {type: GraphQLString},            table: {type: GraphQLInt},            orderItems: {type: GraphQLList(OrderItemInputType)},            newOrderItems: {type: GraphQLList(OrderItemInputType)},            orderPrice: {type: GraphQLFloat},            onKitchen: {type: GraphQLBoolean},            completed: {type: GraphQLBoolean},            created_at: {type: GraphQLString},        },        resolve: async (parent, args, req) => {            if (!req.isAuth) {                throw new Error('Unauthenticated!')            }            try {                const order = {                    staff: args.staff,                    table: args.table,                    orderItems: args.orderItems,                    newOrderItems: args.newOrderItems,                    orderPrice: args.orderPrice,                    onKitchen: args.onKitchen,                    completed: args.completed,                    created_at: new Date(args.created_at),                    updated_at: new Date()                };                return Order.findByIdAndUpdate(                    args.id,                    {$set: order},                    {new: true},                )            } catch (err) {                throw err;            }        }    },};
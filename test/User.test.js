const graphql = require('graphql');const chai = require('chai');const userType = require('../graphql/schema/user');const request = require('request-promise');const integrationServer = require("../utils/server");const server = require("../index");var chaiHttp = require('chai-http');const expect = chai.expect;chai.use(chaiHttp);describe('GraphQL', () => {    let app;    before((done) => {        app = integrationServer.start(done);    });    after((done) => {        integrationServer.stop(app, done);    });    it('Should have an id field of type ID', () => {        expect(userType.getFields()).to.have.property('id');        expect(userType.getFields().id.type).to.deep.equals(graphql.GraphQLID);    });    it('Should have an email field of type String', () => {        expect(userType.getFields()).to.have.property('email');        expect(userType.getFields().email.type).to.deep.equals(graphql.GraphQLString);    });    it('Should have an firstName field of type String', () => {        expect(userType.getFields()).to.have.property('firstName');        expect(userType.getFields().firstName.type).to.deep.equals(graphql.GraphQLString);    });    it('Should have an lastName field of type String', () => {        expect(userType.getFields()).to.have.property('lastName');        expect(userType.getFields().lastName.type).to.deep.equals(graphql.GraphQLString);    });    it('Should have an permission field of type String', () => {        expect(userType.getFields()).to.have.property('permission');        expect(userType.getFields().permission.type).to.deep.equals(graphql.GraphQLString);    });    it('Should resolve users', async () => {        const query = `{              userAll {                id                email              }            }`;        // const firstPokemon = {        //     "id": "1",        //     "name": "bulbasaur",        //     "order": 1,        //     "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"        // };        return integrationServer            .graphqlQuery(app, query)            .then((response) => {                expect(response.statusCode).to.equal(200);                console.log(response.body);                // expect(response.body.pokemons[0]).to.deep.equal(firstPokemon);                // expect(response.body.pokemons.length).to.equal(20);            });    });});
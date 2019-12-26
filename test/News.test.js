const chai = require('chai');const graphql = require('graphql');const url = `https://f1-graphql-server.herokuapp.com`;const request = require('supertest')(url);const newsType = require('../graphql/schema/news');const should = chai.should();const expect = chai.expect;describe('News Schema', () => {    it('it should have an id field of type ID', () => {        expect(newsType.getFields()).to.have.property('id');        expect(newsType.getFields().id.type).to.deep.equals(graphql.GraphQLID);    });    it('it should have a title field of type String', () => {        expect(newsType.getFields()).to.have.property('title');        expect(newsType.getFields().title.type).to.deep.equals(graphql.GraphQLString);    });    it('it should have a text field of type String', () => {        expect(newsType.getFields()).to.have.property('text');        expect(newsType.getFields().text.type).to.deep.equals(graphql.GraphQLString);    });    it('it should have an img field of type String', () => {        expect(newsType.getFields()).to.have.property('img');        expect(newsType.getFields().img.type).to.deep.equals(graphql.GraphQLString);    });    it('it should have a created_at field of type String', () => {        expect(newsType.getFields()).to.have.property('created_at');        expect(newsType.getFields().created_at.type).to.deep.equals(graphql.GraphQLString);    });});describe('News Query', () => {    let token;    before((done) => {        request.post('/graphql')            .send({ query: '{ login(email:"admin@test.com",password:"1111"){ token }}'})            .expect(200)            .end((err,res) => {                if (err) return done(err);                token = res.body.data.login.token;                done();            });    });    it('it should return (newsAll)', (done) => {        request.post('/graphql')            .set('Authorization', `Bearer ${token}`)            .send({ query: '{ newsAll { id, title, text, img, created_at } }'})            .expect(200)            .end((err,res) => {                if (err) return done(err);                res.body.should.be.a('object');                res.body.data.newsAll.should.be.a('array');                res.body.data.newsAll[0].should.have.property('id');                res.body.data.newsAll[0].should.have.property('title');                res.body.data.newsAll[0].should.have.property('text');                res.body.data.newsAll[0].should.have.property('img');                res.body.data.newsAll[0].should.have.property('created_at');                done();            })    });    it('it should not return (news) without auth token', (done) => {        request.post('/graphql')            .send({ query: '{ news(id:"5dd29010c322138cf5c8a49e") { id } }'})            .expect(200)            .end((err,res) => {                if (err) return done(err);                res.body.errors.should.be.a('array');                res.body.errors[0].should.have.property('message').eql('Unauthenticated!');                done();            })    });    it('it should return (user) by id', (done) => {        request.post('/graphql')            .set('Authorization', `Bearer ${token}`)            .send({ query: '{ news(id:"5dd29010c322138cf5c8a49e") { id, title, text, img, created_at } }'})            .expect(200)            .end((err,res) => {                if (err) return done(err);                res.body.should.be.a('object');                res.body.data.news.should.have.property('id');                res.body.data.news.should.have.property('title');                res.body.data.news.should.have.property('text');                res.body.data.news.should.have.property('img');                res.body.data.news.should.have.property('created_at');                done();            })    });});describe('News Mutation', () => {    let idNews;    let token;    before((done) => {        request.post('/graphql')            .send({ query: '{ login(email:"admin@test.com",password:"1111"){ token }}'})            .expect(200)            .end((err,res) => {                if (err) return done(err);                token = res.body.data.login.token;                done();            });    });    it('it should not return (addNews) without auth token', (done) => {        request.post('/graphql')            .send({ query: `mutation{ addNews(                                          title: "Test",                                          text: "Test",                                          img: "Test",                                          created_at: "Thu Dec 26 2019 13:19:08 GMT+0200 (Восточная Европа, стандартное время)"                                      ) {id, title}                                }`})            .expect(200)            .end((err,res) => {                if (err) return done(err);                res.body.errors.should.be.a('array');                res.body.errors[0].should.have.property('message').eql('Unauthenticated!');                done();            })    });    it('it should return (addUser)', (done) => {        request.post('/graphql')            .set('Authorization', `Bearer ${token}`)            .send({ query: `mutation{                                addNews(                                          title: "Test",                                          text: "Test",                                          img: "Test",                                          created_at: "Thu Dec 26 2019 13:19:08 GMT+0200 (Восточная Европа, стандартное время)"                                      ) {id, title, text, img, created_at}                            }`})            .expect(200)            .end((err,res) => {                if (err) return done(err);                res.body.should.be.a('object');                res.body.data.addNews.should.have.property('id');                res.body.data.addNews.should.have.property('title').eql('Test');                res.body.data.addNews.should.have.property('text').eql('Test');                res.body.data.addNews.should.have.property('img').eql('Test');                res.body.data.addNews.should.have.property('created_at');                idNews = res.body.data.addNews.id;                done();            })    });    it('it should return (updateUser)', (done) => {        request.post('/graphql')            .set('Authorization', `Bearer ${token}`)            .send({ query: `mutation{                                updateNews(id: "${idNews}",                                           title: "Test123",                                          text: "Test123",                                          img: "Test123",                                          created_at: "Thu Dec 26 2019 13:19:08 GMT+0200 (Восточная Европа, стандартное время)") {id, title, text, img, created_at}                            }`})            .expect(200)            .end((err,res) => {                if (err) return done(err);                res.body.should.be.a('object');                res.body.data.updateNews.should.have.property('id').eql(idNews);                res.body.data.updateNews.should.have.property('title').eql('Test123');                res.body.data.updateNews.should.have.property('text').eql('Test123');                res.body.data.updateNews.should.have.property('img').eql('Test123');                res.body.data.updateNews.should.have.property('created_at');                done();            })    });    it('it should return (deleteUser)', (done) => {        request.post('/graphql')            .set('Authorization', `Bearer ${token}`)            .send({ query: `mutation{                                deleteNews(id: "${idNews}"){id, title, text, img, created_at}                            }`})            .expect(200)            .end((err,res) => {                if (err) return done(err);                res.body.should.be.a('object');                res.body.data.deleteNews.should.have.property('id').eql(idNews);                res.body.data.deleteNews.should.have.property('title');                res.body.data.deleteNews.should.have.property('text');                res.body.data.deleteNews.should.have.property('img');                res.body.data.deleteNews.should.have.property('created_at');                done();            })    });});
var chai = require("chai");
var expect = chai.expect;
var Path = require('path');
var Api = require(Path.join(__dirname, "../../api/api.js"));
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var ObjectID = Mongo.ObjectID;

describe("API", function() {
    var mongo;
    var defMongoConfig = {
        host: "localhost",
        port: 27017,
        db: "db"
    };

    before("Connection to DB", function (done) {
        return done();
        // var url = "mongodb://" + defMongoConfig.host +
        //     ":" + defMongoConfig.port + "/" + defMongoConfig.db;
        // MongoClient.connect(url, function(err, db) {
        //     if (err) {
        //         console.log("failed to connect to db");
        //         return done(err);
        //     }
        //     // TODO: Fully connect to DB and setup mongo object
        // });
    });

    after("Close DB Connection", function (done) {
        return done();
        // db.close();
    });
    describe("GET /hello", function () {
        
    });
    describe("GET /events", function () {

    });
    describe("POST /events", function () {

    });
    describe("DELETE /events/{event}", function () {

    });
    describe("GET /events/{event}", function () {

    });
    describe("PUT /events/{event}", function () {

    });
    it("Testing works", function (done) {
        expect("hello").to.eql("hello");
        done();
    });
});

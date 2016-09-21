var chai = require("chai");
var Config = require("config");
var expect = chai.expect;
var MongoClient = require('mongodb').MongoClient;

var dbconfig = Config.get("Mongo-Server");
var Api = require(Path.join(__dirname, "../../api/api.js"));

describe("API", function() {
    var db;

    before("Connection to DB",function(done) {
        var url = "mongodb://" + dbconfig.host +
            ":" + dbconfig.port + "/" + dbconfig.testdb;
        MongoClient.connect(url, function(err, localdb) {
            if (err) { return done(err) }
            db = localdb;
        });
    });

    after("Close DB Connection", function() {
        db.close();
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
    it("Testing works", function(done) {
        expect("hello").to.eql("hello");
        done();
    });
});

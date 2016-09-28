var chai = require("chai");
var expect = chai.expect;
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

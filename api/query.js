var Queries = require(Path.join(__dirname, 'queries.js'));
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if (err) { return console.error(err); }

    console.log("Connected successfully to MongoDB");

    var events = db.collection('events');

    var query = {
        getEventList: function (callback) {
            events.find({}).toArray(callback);
        }
    };

    module.exports = query;
});

var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js'));
var MongoClient = require('mongodb').MongoClient;
var setup = require('config').get('Mongo-Server');

var url = "mongodb://" + setup.host + ":" + setup.port + "/" + setup.db;
var query = {};

MongoClient.connect(url, function(err, db) {
    if (err) { return console.error(err); }

    console.log("Connected successfully to MongoDB");

    var events = db.collection('events');

    query = {
        getEventList: function (callback) {
            events.find({}).toArray(callback);
        }
    };

    // module.exports = query;
});

module.exports = query;

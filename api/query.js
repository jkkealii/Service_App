var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js'));
var ObjectID = require('mongodb').ObjectID;

var query = {
    getEventList: function (db, callback) {
        if (!db) { return callback('no database found to query'); }
        var events = db.collection('events');
        events.find({}).toArray(callback);
    },
    createEvent: function (db, payload, callback) {
        if (!db) { return callback('no database found to query'); }
        var events = db.collection('events');
        events.insertOne(payload, callback);
    },
    deleteEvent: function (db, event, callback) {
        if (!db) { return callback('no database found to query'); }
        var events = db.collection('events');
        events.remove({
            _id: new ObjectID(event)
        }, callback);
    }
};

module.exports = query;

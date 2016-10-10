var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js')); // eslint-disable-line
// var ObjectID = require('mongomongo').ObjectID;

var query = {
    getEventList: function (mongo, callback) {
        if (!mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.find({}).toArray(callback);
    },
    createEvent: function (mongo, payload, callback) {
        if (!mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.insertOne(payload, callback);
    },
    deleteEvent: function (mongo, event, callback) {
        if (!mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.remove({
            _id: new mongo.ObjectID(event)
        }, callback);
    },
    getEvent: function (mongo, event, callback) {
        if (!mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.findOne({
            _id: new mongo.ObjectID(event)
        }, callback);
    },
    updateEvent: function (mongo, event, payload, callback) {
        if (!mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.updateOne({
            _id: new mongo.ObjectID(event)
        }, {
            $set: payload
        }, callback);
    }
};

module.exports = query;

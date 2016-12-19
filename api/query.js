var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js')); // eslint-disable-line
// var ObjectID = require('mongomongo').ObjectID;

var query = {
    getEventList: function (mongo, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.find({}).toArray(callback);
    },
    createEvent: function (mongo, payload, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.insertOne(payload, callback);
    },
    deleteEvent: function (mongo, event, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.remove({
            _id: new mongo.ObjectID(event)
        }, callback);
    },
    getEvent: function (mongo, event, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.findOne({
            _id: new mongo.ObjectID(event)
        }, callback);
    },
    updateEvent: function (mongo, event, payload, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.updateOne({
            _id: new mongo.ObjectID(event)
        }, {
            $set: payload
        }, callback);
    },
    getMemberList: function (mongo, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var members = mongo.db.collection('members');
        members.find({}).toArray(callback);
    },
    createMember: function (mongo, payload, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var members = mongo.db.collection('members');
        members.insertOne(payload, callback);
    },
    deleteMember: function (mongo, member, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var members = mongo.db.collection('members');
        members.remove({
            _id: new mongo.ObjectID(member)
        }, callback);
    },
    getMember: function (mongo, member, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var members = mongo.db.collection('members');
        members.findOne({
            _id: new mongo.ObjectID(member)
        }, callback);
    },
    updateMember: function (mongo, member, payload, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var members = mongo.db.collection('members');
        members.updateOne({
            _id: new mongo.ObjectID(member)
        }, {
            $set: payload
        }, callback);
    },
    getMembersEvents: function (mongo, member, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.find({
            $or: [
                {members: member},
                {drivers: member},
                {specials: member}
            ]
        }).toArray(callback);
    },
    getUserList: function (mongo, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var users = mongo.db.collection('users');
        users.find({}).toArray(callback);
    },
    createUser: function (mongo, payload, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var users = mongo.db.collection('users');
        users.insertOne(payload, callback);
    },
    getUser: function (mongo, username, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var users = mongo.db.collection('users');
        users.findOne({
            username: username
        }, callback);
    }
};

module.exports = query;

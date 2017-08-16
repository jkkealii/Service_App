var Moment = require('moment');
// var ObjectID = require('mongomongo').ObjectID;

var query = {
    getEventList: function (mongo, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        events.find({}).toArray(callback);
    },
    getSemesterEventList: function (mongo, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        var midpoint = Moment().month(6).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);

        var start, end;
        if (Moment().isAfter(midpoint)) {
            start = midpoint;
            end = Moment().endOf("year");
        } else {
            start = Moment().startOf("year");
            end = midpoint;
        }

        events.find({
            startDateTime: {
                "$gte": start.toDate(),
                "$lt": end.toDate()
            }
        }).toArray(callback);
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
    getSemesterMemberList: function (mongo, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var members = mongo.db.collection('members');
        var midpoint = Moment().month(6).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);

        var yearReq;
        if (Moment().isAfter(midpoint)) { // we are in the fall semester
            yearReq = Moment().add(1, "years").format("YYYY"); // you must be graduating this value or later
        } else { // we are in the spring semester
            yearReq = Moment().format("YYYY");
        }

        members.find({
            year: {
                "$gte": yearReq
            }
        }).toArray(callback);
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
    getMembersSemesterEvents: function (mongo, member, callback) {
        if (!mongo || !mongo.db) { return callback('no database found to query'); }
        var events = mongo.db.collection('events');
        var midpoint = Moment().month(6).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);

        var start, end;
        if (Moment().isAfter(midpoint)) {
            start = midpoint;
            end = Moment().endOf("year");
        } else {
            start = Moment().startOf("year");
            end = midpoint;
        }

        events.find({
            startDateTime: {
                "$gte": start.toDate(),
                "$lt": end.toDate()
            },
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

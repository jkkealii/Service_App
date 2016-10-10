var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js'));

var service = {
    getEventList: function (mongo, callback) {
        Query.getEventList(mongo, function (err, rawEvents) {
            if (err) {
                callback(err);
            } else {
                var events = [];
                for (var i = 0; i < rawEvents.length; i++) {
                    events.push({
                        id: rawEvents[i]._id,
                        name: rawEvents[i].name,
                        comments: rawEvents[i].comments,
                        hours: rawEvents[i].hours,
                        driverHours: rawEvents[i].driverHours,
                        extraHours: rawEvents[i].extraHours,
                        isOnCampus: rawEvents[i].isOnCampus,
                        meetingPlace: rawEvents[i].meetingPlace,
                        startDateTime: rawEvents[i].startDateTime,
                        endDateTime: rawEvents[i].endDateTime,
                        uniform: rawEvents[i].uniform,
                        members: rawEvents[i].members,
                        drivers: rawEvents[i].drivers,
                        specials: rawEvents[i].specials
                    });
                }
                callback(err, events);
            }
        });
    },
    createEvent: function (mongo, payload, callback) {
        Query.createEvent(mongo, payload, callback);
    },
    deleteEvent: function (mongo, event, callback) {
        Query.deleteEvent(mongo, event, callback);
    },
    getEvent: function (mongo, event, callback) {
        Query.getEvent(mongo, event, function (err, rawEvent) {
            if (err) {
                callback(err);
            } else {
                if (rawEvent) {
                    callback(undefined, {
                        id: rawEvent._id,
                        name: rawEvent.name,
                        comments: rawEvent.comments,
                        hours: rawEvent.hours,
                        driverHours: rawEvent.driverHours,
                        extraHours: rawEvent.extraHours,
                        isOnCampus: rawEvent.isOnCampus,
                        meetingPlace: rawEvent.meetingPlace,
                        startDateTime: rawEvent.startDateTime,
                        endDateTime: rawEvent.endDateTime,
                        uniform: rawEvent.uniform,
                        members: rawEvent.members,
                        drivers: rawEvent.drivers,
                        specials: rawEvent.specials
                    });
                } else {
                    callback();
                }
            }
        });
    },
    updateEvent: function (mongo, event, payload, callback) {
        Query.updateEvent(mongo, event, payload, callback);
    },
    getMemberList: function (mongo, callback) {
        Query.getMemberList(mongo, function (err, rawMembers) {
            if (err) {
                callback(err);
            } else {
                var members = [];
                for (var i = 0; i < rawMembers.length; i++) {
                    members.push({
                        // TODO: whats the full list of things to a member
                        id: rawMembers[i]._id,
                        name: rawMembers[i].name,
                        comments: rawMembers[i].comments,
                        hours: rawMembers[i].hours,
                        driverHours: rawMembers[i].driverHours,
                        extraHours: rawMembers[i].extraHours,
                        isOnCampus: rawMembers[i].isOnCampus,
                        meetingPlace: rawMembers[i].meetingPlace,
                        startDateTime: rawMembers[i].startDateTime,
                        endDateTime: rawMembers[i].endDateTime,
                        uniform: rawMembers[i].uniform,
                        members: rawMembers[i].members,
                        drivers: rawMembers[i].drivers,
                        specials: rawMembers[i].specials
                    });
                }
                callback(err, members);
            }
        });
    },
    createMember: function (mongo, payload, callback) {
        Query.createMember(mongo, payload, callback);
    }
};

module.exports = service;

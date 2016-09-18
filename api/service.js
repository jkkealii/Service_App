var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js'));

var service = {
    getEventList: function (db, callback) {
        Query.getEventList(db, function (err, rawEvents) {
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
    createEvent: function (db, payload, callback) {
        Query.createEvent(db, payload, callback);
    },
    deleteEvent: function (db, event, callback) {
        Query.deleteEvent(db, event, callback);
    },
    getEvent: function (db, event, callback) {
        Query.getEvent(db, event, function (err, rawEvent) {
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
    }
};

module.exports = service;

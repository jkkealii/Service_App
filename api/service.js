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
    }
};

module.exports = service;

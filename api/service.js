var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js'));
var bcrypt = require('bcrypt');

var saltRounds = 10;

var service = {
    getEventList: function (mongo, callback) {
        Query.getEventList(mongo, function (err, rawEvents) {
            if (err) {
                return callback(err);
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
    getSemesterEventList: function (mongo, callback) {
        Query.getSemesterEventList(mongo, function (err, rawEvents) {
            if (err) {
                return callback(err);
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
                        firstName: rawMembers[i].firstName,
                        lastName: rawMembers[i].lastName,
                        hours: rawMembers[i].hours,
                        email: rawMembers[i].email,
                        phone: rawMembers[i].phone,
                        year: rawMembers[i].year
                    });
                }
                callback(err, members);
            }
        });
    },
    createMember: function (mongo, payload, callback) {
        Query.createMember(mongo, payload, callback);
    },
    deleteMember: function (mongo, member, callback) {
        Query.deleteMember(mongo, member, callback);
    },
    getMember: function (mongo, member, callback) {
        Query.getMember(mongo, member, function (err, rawMember) {
            if (err) {
                callback(err);
            } else {
                if (rawMember) {
                    callback(undefined, {
                        id: rawMember._id,
                        firstName: rawMember.firstName,
                        lastName: rawMember.lastName,
                        hours: rawMember.hours,
                        email: rawMember.email,
                        phone: rawMember.phone,
                        year: rawMember.year
                    });
                } else {
                    callback();
                }
            }
        });
    },
    updateMember: function (mongo, member, payload, callback) {
        Query.updateMember(mongo, member, payload, callback);
    },
    getMembersEvents: function (mongo, member, callback) {
        Query.getMembersEvents(mongo, member, function (err, rawEvents) {
            if (err) {
                callback(err);
            } else {
                if (rawEvents) {
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
                    callback(null, events);
                } else {
                    callback(null, null);
                }
            }
        });
    },
    getUserList: function (mongo, callback) {
        Query.getUserList(mongo, function (err, rawUsers) {
            if (err) {
                callback(err);
            } else {
                if (rawUsers) {
                    var users = [];
                    for (var i = 0; i < rawUsers.length; i++) {
                        var local = rawUsers[i];
                        users.push({
                            username: local.username
                        });
                    }
                    callback(null, users);
                } else {
                    callback();
                }
            }
        });
    },
    createUser: function (mongo, payload, callback) {
        bcrypt.hash(payload.password, saltRounds, function (err, hash) {
            if (err) {
                return callback(err);
            }
            Query.createUser(mongo, {
                username: payload.username,
                password: hash
            }, callback);
        });
    },
    getUser: function (mongo, username, callback) {
        Query.getUser(mongo, username, function (err, rawUser) {
            if (err) {
                return callback(err);
            }
            if (!rawUser) {
                return callback();
            }
            callback(null, {
                id: rawUser._id,
                username: rawUser.username,
                hashedPassword: rawUser.password
            });
        });
    },
    matchPasswords: function (password, hashedPassword, callback) {
        bcrypt.compare(password, hashedPassword, function (err, res) {
            if (err) {
                return callback(err);
            }
            return callback(null, res);
        });
    }
};

module.exports = service;

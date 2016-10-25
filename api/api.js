var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js'));
var Respond = require(Path.join(__dirname, 'respond.js'));

var api = {
    getEventList: function (req, res) {
        Service.getEventList(req.mongo, function (err, events) {
            if (err) {
                Respond.failedToFindEvents(res);
            } else {
                Respond.returnEvents(res, events);
            }
        });
    },
    createEvent: function (req, res) {
        Service.createEvent(req.mongo, req.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateEvent(res);
            } else {
                Respond.createdEvent(res, result);
            }
        });
    },
    deleteEvent: function (req, res) {
        Service.deleteEvent(req.mongo, req.params.event, function (err, result) {
            if (err) {
                Respond.failedToDeleteEvent(res);
            } else {
                Respond.deletedEvent(res, result);
            }
        });
    },
    getEvent: function (req, res) {
        Service.getEvent(req.mongo, req.params.event, function (err, event) {
            if (err) {
                Respond.failedToGetEvent(res);
            } else {
                Respond.gotEvent(res, event);
            }
        });
    },
    updateEvent: function (req, res) {
        Service.updateEvent(req.mongo, req.params.event, req.payload, function (err, result) {
            if (err) {
                Respond.failedToUpdateEvent(res);
            } else {
                Respond.updatedEvent(res, result);
            }
        });
    },
    getMemberList: function (req, res) {
        Service.getMemberList(req.mongo, function (err, members) {
            if (err) {
                Respond.failedToGetMembers(res);
            } else {
                Respond.gotMembers(res, members);
            }
        });
    },
    createMember: function (req, res) {
        Service.createMember(req.mongo, req.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateMember(res);
            } else {
                Respond.createdMember(res, result);
            }
        });
    },
    deleteMember: function (req, res) {
        Service.deleteMember(req.mongo, req.params.member, function (err, result) {
            if (err) {
                Respond.failedToDeleteMember(res);
            } else {
                Respond.deletedMember(res, result);
            }
        });
    },
    getMember: function (req, res) {
        Service.getMember(req.mongo, req.params.member, function (err, member) {
            if (err) {
                Respond.failedToGetMember(res);
            } else {
                Respond.gotMember(res, member);
            }
        });
    },
    updateMember: function (req, res) {
        Service.updateMember(req.mongo, req.params.member, req.payload, function (err, result) {
            if (err) {
                Respond.failedToUpdateMember(res);
            } else {
                Respond.updatedMember(res, result);
            }
        });
    },
    calculateHours: function(req, res) {
        Service.getEventList(req.mongo, function (err, events) {
            if (err) {
                Respond.failedToCalculateHours(res, err);
            } else {
                Service.getMemberList(req.mongo, function (err, members) {
                    if (err) {
                        Respond.failedToCalculateHours(res, err);
                    } else {
                        var count = 0;
                        members.forEach(function (member) {
                            count++;
                            var hours = 0;
                            for (var i = 0; i < events.length; i++) {
                                var localEvent = events[i];
                                var isThere = function (arr, element) {
                                    var result = false;
                                    for (var index = 0; index < arr.length; index++) {
                                        if (arr[index] === "" + element) {
                                            result = true;
                                        }
                                    }
                                    return result;
                                };

                                if (isThere(localEvent.members, member.id)) {
                                    hours += localEvent.hours;
                                } else if (isThere(localEvent.drivers, member.id)) {
                                    hours += (localEvent.driverHours ? localEvent.driverHours : 0) + localEvent.hours;
                                } else if (isThere(localEvent.specials, member.id)) {
                                    hours += (localEvent.extraHours ? localEvent.extraHours : 0) + localEvent.hours;
                                }
                            }

                            var returnMember = {
                                firstName: member.firstName,
                                lastName: member.lastName,
                                email: member.email,
                                year: member.year,
                                phone: member.phone,
                                hours: hours
                            };
                            Service.updateMember(req.mongo, member.id, returnMember, function (err, result) {
                                if (err) {
                                    Respond.failedToCalculateHours(res, err);
                                } else {
                                    count--;
                                    if (count <= 0) {
                                        Respond.calculatedHours(res, result);
                                    }
                                }
                            });
                        });
                    }
                });
            }
        });
    },
    getMembersEvents: function (req, res) {
        Service.getMembersEvents(req.mongo, req.params.member, function (err, events) {
            if (err) {
                Respond.failedToGetMembersEvents(res, err);
            } else {
                Respond.gotMembersEvents(res, events, req.params.member);
            }
        });
    },
    getUserList: function (req, res) {
        Service.getUserList(req.mongo, function (err, users) {
            if (err) {
                Respond.failedToGetUsers(res, err);
            } else {
                Respond.gotUserList(res, users);
            }
        });
    },
    createUser: function (req, res) {
        Service.createUser(req.mongo, req.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateUser(res, err);
            } else {
                Respond.createdUser(res, result);
            }
        });
    }
};

module.exports = api;

require('cloud/app.js');


// get all users, make an object with the ids as keys for quick access
// get all events and their drivers and memebers
// add hours to users
Parse.Cloud.job("userHoursUpdate", function(request, status) {
    Parse.Cloud.useMasterKey();
    var counter = 0;
    var users = {};

    var delayUntil;
    var delayPromise;

    var _delay = function () {
        if (Date.now() >= delayUntil) {
            delayPromise.resolve();
            return;
        } else {
            process.nextTick(_delay);
        }
     };

    var delay = function(delayTime) {
        delayUntil = Date.now() + delayTime;
        delayPromise = new Parse.Promise();
        _delay();
        return delayPromise;
    };

    var query = new Parse.Query(Parse.Object.extend('Event'));
    query.each(function(eventObject) {
        status.message('processing event for members: ' + eventObject.get('name'));
        var eventHours = eventObject.get('hours');
        if (!(eventHours)) {
            eventHours = 0;
        }
        var driverHours = eventObject.get('driverHours');
        if (!(driverHours)) {
            driverHours = 0;
        }
        var extraHours = eventObject.get('extraHours');
        if (!(extraHours)) {
            extraHours = 0;
        }

        var isOnCampus = eventObject.get('isOnCampus');

        var relationMembersPromise = new Parse.Promise();
        var queryRelationMembers = eventObject.relation('members').query();
        queryRelationMembers.find().then(function(members) {
            if (members) {
                var addedHours = eventHours;
                members.forEach(function(member) {
                    var username = member.get('username');
                    if (users[username]) {
                        var user = users[username];
                        user.hours += addedHours;
                        if (isOnCampus) {
                            user.onCampusHours += addedHours;
                        } else {
                            user.offCampusHours += addedHours;
                        }
                    } else {
                        if (isOnCampus) {
                            users[username] = {
                                hours: addedHours,
                                onCampusHours: addedHours,
                                offCampusHours: 0
                            }
                        } else {
                            users[username] = {
                                hours: addedHours,
                                onCampusHours: 0,
                                offCampusHours: addedHours
                            }
                        }
                    }
                });
            }
            relationMembersPromise.resolve();
        }, function(error) {
            relationMembersPromise.reject(error);
        });
        return relationMembersPromise;
    }).then(function() {
        var query = new Parse.Query(Parse.Object.extend('Event'));
        
        return query.each(function(eventObject) {
            status.message('processing event for drivers: ' + eventObject.get('name'));
            var eventHours = eventObject.get('hours');
            if (!(eventHours)) {
                eventHours = 0;
            }
            var driverHours = eventObject.get('driverHours');
            if (!(driverHours)) {
                driverHours = 0;
            }
            var extraHours = eventObject.get('extraHours');
            if (!(extraHours)) {
                extraHours = 0;
            }

            var isOnCampus = eventObject.get('isOnCampus');

            var relationDriversPromise = new Parse.Promise();
            var queryRelationDrivers = eventObject.relation('drivers').query();
            queryRelationDrivers.find().then(function(drivers) {
                if (drivers) {
                    var addedHours = (eventHours + driverHours);
                    drivers.forEach(function(driver) {
                        var username = driver.get('username');
                        if (users[username]) {
                            var user = users[username];
                            user.hours += addedHours;
                            if (isOnCampus) {
                                user.onCampusHours += addedHours;
                            } else {
                                user.offCampusHours += addedHours;
                            }
                        } else {
                            if (isOnCampus) {
                                users[username] = {
                                    hours: addedHours,
                                    onCampusHours: addedHours,
                                    offCampusHours: 0
                                }
                            } else {
                                users[username] = {
                                    hours: addedHours,
                                    onCampusHours: 0,
                                    offCampusHours: addedHours
                                }
                            }
                        }
                    });
                }
                relationDriversPromise.resolve();
            }, function(error) {
                relationDriversPromise.reject(error);
            });
            return relationDriversPromise;
        });
    }, function(error) {
        status.error('EventRelationMemberError: ' +
            (error.code ? error.code : 500) + ' ' +
            (error.message ? error.message : 'Error getting relation members')
        );
    }).then(function() {
        var query = new Parse.Query(Parse.Object.extend('Event'));
        
        return query.each(function(eventObject) {
            status.message('processing event for drivers: ' + eventObject.get('name'));
            var eventHours = eventObject.get('hours');
            if (!(eventHours)) {
                eventHours = 0;
            }
            var driverHours = eventObject.get('driverHours');
            if (!(driverHours)) {
                driverHours = 0;
            }
            var extraHours = eventObject.get('extraHours');
            if (!(extraHours)) {
                extraHours = 0;
            }

            var isOnCampus = eventObject.get('isOnCampus');

            var relationSpecialsPromise = new Parse.Promise();
            var queryRelationDrivers = eventObject.relation('specials').query();
            queryRelationDrivers.find().then(function(specials) {
                if (specials) {
                    var addedHours = (eventHours + extraHours);
                    specials.forEach(function(special) {
                        var username = special.get('username');
                        if (users[username]) {
                            var user = users[username];
                            user.hours += addedHours;
                            if (isOnCampus) {
                                user.onCampusHours += addedHours;
                            } else {
                                user.offCampusHours += addedHours;
                            }
                        } else {
                            if (isOnCampus) {
                                users[username] = {
                                    hours: addedHours,
                                    onCampusHours: addedHours,
                                    offCampusHours: 0
                                }
                            } else {
                                users[username] = {
                                    hours: addedHours,
                                    onCampusHours: 0,
                                    offCampusHours: addedHours
                                }
                            }
                        }
                    });
                }
                relationSpecialsPromise.resolve();
            }, function(error) {
                relationSpecialsPromise.reject(error);
            });
            return relationSpecialsPromise;
        });
    }, function(error) {
        status.error('EventRelationDriverError: ' +
            (error.code ? error.code : 500) + ' ' +
            (error.message ? error.message : 'Error getting relation drivers')
        );
    }).then(function() {
        var query = new Parse.Query(Parse.User);
        return query.each(function(user) {
            var username = user.get('username');
            status.message('Adding hours to: ' + username);
            var localUserInfo = users[username];
            if (localUserInfo) {
                user.set('hours', localUserInfo.hours);
                user.set('onCampusHours', localUserInfo.onCampusHours);
                user.set('offCampusHours', localUserInfo.offCampusHours);
            } else {
                user.set('hours', 0);
                user.set('onCampusHours', 0);
                user.set('offCampusHours', 0);
            }
            return user.save();
        });
    }, function(error) {
        status.error('EventRelationSpecialError: ' +
            (error.code ? error.code : 500) + ' ' +
            (error.message ? error.message : 'Error getting relation specials')
        );
    }).then(function() {
        status.success('All users hours updated');
    }, function(error) {
        status.error('UserUpdateError: ' +
            (error.code ? error.code : 500) + ' ' +
            (error.message ? error.message : 'Error updating user hours')
        );
    });
});

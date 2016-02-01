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
                    // status.message('processing attending user: ' + username);
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
                        // status.message('processing attending user: ' + username);
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
                        // status.message('processing attending user: ' + username);
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
            user.set('hours', localUserInfo.hours);
            user.set('onCampusHours', localUserInfo.onCampusHours);
            user.set('offCampusHours', localUserInfo.offCampusHours);
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



    var updateUsers = function() {
        var query = new Parse.Query(Parse.User);
        query.each(function(user) {
            var username = user.get('username');
            status.message('Adding hours to: ' + username);
            var localUserInfo = users[username];
            user.set('hours', localUserInfo.hours);
            user.set('onCampusHours', localUserInfo.onCampusHours);
            user.set('offCampusHours', localUserInfo.offCampusHours);
            return user.save();
            // var processUser = function() {
            //     user
            // };
            // setTimeout(processUser, 3000);
        }).then(function() {
            status.success('All user hours updated');
        }, function(error) {
            status.error('UserQueryError: ' +
                (error.code ? error.code : 500) + ' ' +
                (error.message ? error.message : 'Error updating all users')
            );
        });
    };

    // query.find().then(function(listEvents) {
    //     status.message(listEvents.length + ' events found');
    //     listEvents.forEach(function(eventObject) {
    //         status.message('processing event: ' + eventObject.get('name'));
    //         var eventHours = eventObject.get('hours');
    //         var driverHours = eventObject.get('driverHours');
    //         var extraHours = eventObject.get('extraHours');

    //         var isOnCampus = eventObject.get('isOnCampus');

    //         var relationMembersPromise = new Parse.Promise();
    //         var queryRelationMembers = eventObject.relation('members').query();
    //         queryRelationMembers.find().then(function(members) {
    //             if (members) {
    //                 members.forEach(function(member) {
    //                     var username = member.get('username');
    //                     // status.message('processing attending user: ' + username);
    //                     if (users[username]) {
    //                         var user = users[username];
    //                         user.hours += eventHours;
    //                         if (isOnCampus) {
    //                             user.onCampusHours += eventHours;
    //                         } else {
    //                             user.offCampusHours += eventHours;
    //                         }
    //                     } else {
    //                         if (isOnCampus) {
    //                             users[username] = {
    //                                 hours: eventHours,
    //                                 onCampusHours: eventHours,
    //                                 offCampusHours: 0
    //                             }
    //                         } else {
    //                             users[username] = {
    //                                 hours: eventHours,
    //                                 onCampusHours: 0,
    //                                 offCampusHours: eventHours
    //                             }
    //                         }
    //                     }
    //                 });
    //             }
    //             relationMembersPromise.resolve()
    //         });

    //         var queryRelationDrivers = eventObject.relation('drivers').query();
    //         queryRelationDrivers.find().then(function(drivers) {
    //             if (drivers) {
    //                 drivers.forEach(function(driver) {
    //                     var username = driver.get('username');
    //                     // status.message('processing driving user: ' + username);
    //                     var addedHours = (eventHours + driverHours);

    //                     if (users[username]) {
    //                         var user = users[username];
    //                         user.hours += addedHours;
    //                         if (isOnCampus) {
    //                             user.onCampusHours += addedHours;
    //                         } else {
    //                             user.offCampusHours += addedHours;
    //                         }
    //                     } else {
    //                         if (isOnCampus) {
    //                             users[username] = {
    //                                 hours: addedHours,
    //                                 onCampusHours: addedHours,
    //                                 offCampusHours: 0
    //                             }
    //                         } else {
    //                             users[username] = {
    //                                 hours: addedHours,
    //                                 onCampusHours: 0,
    //                                 offCampusHours: addedHours
    //                             }
    //                         }
    //                     }
    //                 });
    //             }
    //         });

    //         var queryRelationDrivers = eventObject.relation('specials').query();
    //         queryRelationDrivers.find().then(function(specials) {
    //             if (specials) {
    //                 specials.forEach(function(special) {
    //                     var username = special.get('username');
    //                     // status.message('processing specials user: ' + username);
    //                     var addedHours = (eventHours + extraHours);
                        
    //                     if (users[username]) {
    //                         var user = users[username];
    //                         user.hours += addedHours;
    //                         if (isOnCampus) {
    //                             user.onCampusHours += addedHours;
    //                         } else {
    //                             user.offCampusHours += addedHours;
    //                         }
    //                     } else {
    //                         if (isOnCampus) {
    //                             users[username] = {
    //                                 hours: addedHours,
    //                                 onCampusHours: addedHours,
    //                                 offCampusHours: 0
    //                             }
    //                         } else {
    //                             users[username] = {
    //                                 hours: addedHours,
    //                                 onCampusHours: 0,
    //                                 offCampusHours: addedHours
    //                             }
    //                         }
    //                     }
    //                 });
    //             }
    //         });
    //     });

    //     status.message('all events processed');

    //     delay(5000).then(function() {
    //         status.message('sirseim: ' + users.sirseim.hours);
    //         return delay(5000);
    //     }).then(updateUsers);
    // }, function(error) {
    //     status.error('EventsQueryError: ' +
    //         (error.code ? error.code : 500) + ' ' +
    //         (error.message ? error.message : 'Error getting all Events')
    //     );
    // });

    // .then(function() {
    //     status.message('All users processed');
    //     status.success('All user hours updated');
    // }, function(error) {
    //     status.error('UserQueryError: ' +
    //         (error.code ? error.code : 500) + ' ' +
    //         (error.message ? error.message : 'Error getting all Users')
    //     );
    // });

    // query.each(function(user) {
    //     // Update to plan value passed in
    //     user.set("plan", request.params.plan);
    //     if (counter % 100 === 0) {
    //         // Set the  job's progress status
    //         status.message(counter + " users processed.");
    //     }
    //     counter += 1;
    //     return user.save();
    // }).then(function() {
    //     // Set the job's success status
    //     status.success("Migration completed successfully.");
    // }, function(error) {
    //     // Set the job's error status
    //     status.error("Uh oh, something went wrong.");
    // });
});

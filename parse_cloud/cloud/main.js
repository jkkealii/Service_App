require('cloud/app.js');


// get all users, make an object with the ids as keys for quick access
// get all events and their drivers and memebers
// add hours to users
Parse.Cloud.job("userHoursUpdate", function(request, status) {
    Parse.Cloud.useMasterKey();
    var counter = 0;
    var users = {};

    var query = new Parse.Query(Parse.Object.extend('Event'));
    query.find().then(function(listEvents) {
        status.message(listEvents.length + ' events found');
        listEvents.forEach(function(eventObject) {
            var eventHours = eventObject.get('hours');
            var driverHours = eventObject.get('driverHours');
            var extraHours = eventObject.get('extraHours');

            var isOnCampus = eventObject.get('isOnCampus');

            var queryRelationMembers = eventObject.relation('members').query();
            queryRelationMembers.find().then(function(members) {
                if (members) {
                    members.forEach(function(member) {
                        var username = member.get('username');
                        status.message('processing: ' + username);
                        if (users[username]) {
                            var user = users[username];
                            user.hours += eventHours;
                            if (isOnCampus) {
                                user.onCampusHours += eventHours;
                            } else {
                                user.offCampusHours += eventHours;
                            }
                        } else {
                            if (isOnCampus) {
                                users[username] = {
                                    hours: eventHours,
                                    onCampusHours: eventHours,
                                    offCampusHours: 0
                                }
                            } else {
                                users[username] = {
                                    hours: eventHours,
                                    onCampusHours: 0,
                                    offCampusHours: eventHours
                                }
                            }
                        }
                    });
                }
            });

            var queryRelationDrivers = eventObject.relation('drivers').query();
            queryRelationDrivers.find().then(function(drivers) {
                if (drivers) {
                    drivers.forEach(function(driver) {
                        var username = driver.get('username');
                        status.message('processing: ' + username);
                        var addedHours = (eventHours + driverHours);

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
            });

            var queryRelationDrivers = eventObject.relation('specials').query();
            queryRelationDrivers.find().then(function(specials) {
                if (specials) {
                    specials.forEach(function(special) {
                        var username = special.get('username');
                        status.message('processing: ' + username);
                        var addedHours = (eventHours + extraHours);
                        
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
            });
        });

        var query = new Parse.Query(Parse.Users);
        return query.find();
    }, function(error) {
        status.error('EventsQueryError: ' +
            (error.code ? error.code : 500) + ' ' +
            (error.message ? error.message : 'Error getting all Events')
        );
    }).then(function() {

    }, function(error) {
        status.error('UserQueryError: ' +
            (error.code ? error.code : 500) + ' ' +
            (error.message ? error.message : 'Error getting all Users')
        );
    });

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

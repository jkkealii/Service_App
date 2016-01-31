
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var moment = require('cloud/modules/moment.js');
var app = express();
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body
app.use(express.cookieParser('6i=p#d#z()oeko24g2=f%t4-c$q6_q195*eu3ank!v)3qhs9e='));
app.use(parseExpressHttpsRedirect());
app.use(parseExpressCookieSession({ cookie: { maxAge: 3600000 } }));

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
    res.render('hello', { message: 'Congrats, you just set up your app!' });
});
app.post('/hello', function(req, res) {
    res.render('hello', { message: req.body.message });
});

app.get('/aboutus', function(req, res) {
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            res.render('aboutus', {
                loggedIn: true,
                admin: (adminRole ? true : false)
            });
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('aboutus', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        res.render('aboutus', {
            loggedIn: false,
            admin: false
        });
    }
});

app.get('/', function(req, res) {
    var alerts = [];

    if(req.query.login == 'success') {
        alerts.push({
            type: 'success',
            message: 'Login Successful'
        });
    }

    if(req.query.signup == 'success') {
        alerts.push({
            type: 'success',
            message: 'Signup Successful'
        });
    }

    if(req.query.notice) {
        alerts.push({
            type: 'info',
            message: req.query.notice
        });
    }

    // show info alert for login status
    if (Parse.User.current()) {
        alerts.push({
            type: 'info',
            message: 'Signed In'
        });
    } else {
        alerts.push({
            type: 'info',
            message: 'Not Signed In'
        });
    }

    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            res.render('index', {
                alerts: alerts,
                loggedIn: true,
                admin: (adminRole ? true : false),
                leftMessage: 'Congrats bitches, you did it',
                rightMessage: 'But seriously, WTF!?'
            });
        }, function(error) {
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('index', {
                alerts: alerts,
                loggedIn: true,
                admin: false,
                leftMessage: 'Congrats bitches, you did it',
                rightMessage: 'But seriously, WTF!?'
            });
        });
    } else {
        res.render('index', {
            alerts: alerts,
            loggedIn: false,
            admin: false,
            leftMessage: 'Congrats bitches, you did it',
            rightMessage: 'But seriously, WTF!?'
        });
    }
});
app.get('/index', function(req,res) {
    console.log('routing through /index');
    res.redirect('/');
});

app.get('/login', function(req, res) {
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            res.render('login', {
                loggedIn: true,
                admin: (adminRole ? true : false)
            });
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('login', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        res.render('login', {
            loggedIn: false,
            admin: false
        });
    }
});

app.post('/login', function(req, res) {
    console.log(req.body);
    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
        res.redirect('/?login=success');
    }, function(error) {
        var alerts = [];

        alerts.push({
            type: 'danger',
            message: ("LoginError: " + error.code + " " + error.message)
        });

        if (Parse.User.current()) {
            var query = new Parse.Query(Parse.Role);
            query.equalTo("name", "Administrator");
            query.equalTo("users", Parse.User.current());
            query.first().then(function(adminRole) {
                res.render('login', {
                    alerts: alerts,
                    loggedIn: true,
                    admin: (adminRole ? true : false)
                });
            }, function(error) {
                alerts.push({
                    type: 'warning',
                    message: ("AdminQueryError: " + error.code + " " + error.message)
                });
                res.render('login', {
                    alerts: alerts,
                    loggedIn: true,
                    admin: false
                });
            });
        } else {
            res.render('login', {
                alerts: alerts,
                loggedIn: false,
                admin: false
            });
        }
    });
});

app.get('/signup', function(req, res) {
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            res.render('signup', {
                loggedIn: true,
                admin: (adminRole ? true : false)
            });
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('signup', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        res.render('signup', {
            loggedIn: false,
            admin: false
        });
    }
});

app.post('/signup', function(req, res) {
    var alerts = [];

    if (req.body.username && req.body.password && req.body.confirmPassword) {
        if (req.body.password === req.body.confirmPassword) {
            var user = new Parse.User();
            user.set('username', req.body.username);
            user.set('password', req.body.password);
            user.set('firstName', req.body.firstName);
            user.set('lastName', req.body.lastName);
            user.set('email', req.body.email);
            user.set('phone', req.body.phone);

            user.signUp().then(function(userX) {
                var queryMember = new Parse.Query(Parse.Role);
                queryMember.equalTo('name', 'Member');
                return queryMember.first();
            }).then(function(role) {
                Parse.Cloud.useMasterKey();
                role.getUsers().add(user);
                return role.save();
            }).then(function(obj) {
                res.redirect('/?signup=success');
            }, function(error) {
                alerts.push({
                    type: 'danger',
                    message: ("Error: " + error.code + " " + error.message)
                });
                if (Parse.User.current()) {
                    var query = new Parse.Query(Parse.Role);
                    query.equalTo("name", "Administrator");
                    query.equalTo("users", Parse.User.current());
                    query.first().then(function(adminRole) {
                        res.render('signup', {
                            alerts: alerts,
                            loggedIn: true,
                            admin: (adminRole ? true : false)
                        });
                    }, function(error) {
                        alerts.push({
                            type: 'warning',
                            message: ("AdminQueryError: " + error.code + " " + error.message)
                        });
                        res.render('signup', {
                            alerts: alerts,
                            loggedIn: true,
                            admin: false
                        });
                    });
                } else {
                    res.render('signup', {
                        alerts: alerts,
                        loggedIn: false,
                        admin: false
                    });
                }
            });
        } else {
            alerts.push({
                type: 'danger',
                message: 'Password and Confirm Password do not match'
            });
            if (Parse.User.current()) {
                var query = new Parse.Query(Parse.Role);
                query.equalTo("name", "Administrator");
                query.equalTo("users", Parse.User.current());
                query.first().then(function(adminRole) {
                    res.render('signup', {
                        alerts: alerts,
                        loggedIn: true,
                        admin: (adminRole ? true : false)
                    });
                }, function(error) {
                    alerts.push({
                        type: 'warning',
                        message: ("AdminQueryError: " + error.code + " " + error.message)
                    });
                    res.render('signup', {
                        alerts: alerts,
                        loggedIn: true,
                        admin: false
                    });
                });
            } else {
                res.render('signup', {
                    alerts: alerts,
                    loggedIn: false,
                    admin: false
                });
            }
        }
    } else {
        alerts.push({
            type: 'danger',
            message: 'missing Username, Password, Confirm Password, First Name, and/or Last Name'
        });
        if (Parse.User.current()) {
            var query = new Parse.Query(Parse.Role);
            query.equalTo("name", "Administrator");
            query.equalTo("users", Parse.User.current());
            query.first().then(function(adminRole) {
                res.render('signup', {
                    alerts: alerts,
                    loggedIn: true,
                    admin: (adminRole ? true : false)
                });
            }, function(error) {
                alerts.push({
                    type: 'warning',
                    message: ("AdminQueryError: " + error.code + " " + error.message)
                });
                res.render('signup', {
                    alerts: alerts,
                    loggedIn: true,
                    admin: false
                });
            });
        } else {
            res.render('signup', {
                alerts: alerts,
                loggedIn: false,
                admin: false
            });
        }
    }
});

app.get('/logout', function(req, res) {
    if (Parse.User.current()) {
        Parse.User.logOut();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

app.get('/events', function(req, res) {
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            res.render('events', {
                loggedIn: true,
                admin: (adminRole ? true : false)
            });
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('events', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        res.render('events', {
            loggedIn: false,
            admin: false
        });
    }
});

app.get('/events/new-event', function(req, res) {
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            if (adminRole) {
                res.render('new_event', {
                    loggedIn: true,
                    admin: true
                });
            } else {
                var alerts = [];
                alerts.push({
                    type: 'danger',
                    message: 'You must be an Admin to create an event'
                });
                res.redirect('new_event', {
                    loggedIn: true,
                    alerts: alerts,
                    admin: false
                })
            }
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            alerts.push({
                type: 'danger',
                message: 'You must be an Admin to create an event'
            });
            res.render('new_event', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        var alerts = [];
        alerts.push({
            type: 'danger',
            message: 'You must be logged in and an Admin to create an event'
        });
        res.render('new_event', {
            loggedIn: false,
            alerts: alerts,
            admin: false
        });
    }
});

app.post('/events/new-event', function(req, res) {
    // res.status(500).json({ error: 'there was a server error' });

    var eventObject = new (Parse.Object.extend('Event'))();
    eventObject.set('name', req.body.name);
    eventObject.set('startDateTime', moment(req.body.startDateTime).toDate());
    eventObject.set('endDateTime', moment(req.body.endDateTime).toDate());
    eventObject.set('location', req.body.location);
    eventObject.set('meetingPlace', req.body.meetingPlace);
    eventObject.set('hours', parseFloat(req.body.hours));
    eventObject.set('driverHours', parseFloat(req.body.driverHours));
    eventObject.set('isOnCampus', (req.body.isOnCampus === 'true'));
    eventObject.set('uniform', req.body.uniform);


    var query = new Parse.Query(Parse.User);

    query.find().then(function(listUsers) {
        var attendingRelation = eventObject.relation('members');
        var drivingRelation = eventObject.relation('drivers');
        if (req.body.attendingMembers) {
            listUsers.forEach(function(user) {
                if (req.body.attendingMembers.indexOf(user.get('username')) !== -1) {
                    attendingRelation.add(user);
                }
            });
        }
        if (req.body.attendingDrivers) {
            listUsers.forEach(function(user) {
                if (req.body.attendingDrivers.indexOf(user.get('username')) !== -1) {
                    drivingRelation.add(user);
                }
            });
        }

        return eventObject.save();
    }).then(function(obj) {
        res.status(200).json(obj);
    }, function(error) {
        console.log(error);
        var jsonRes = (error.message ? ({ error: error.message }) : ({ error: 'Internal Server Error'}));
        var errorCode = (error.code ? error.code : 500);
        res.status(errorCode).json(jsonRes);
    });
});

app.get('/events/list', function(req, res) {
    var query = new Parse.Query(Parse.Object.extend("Event"));
    query.find().then(function(results) {
        var data = {
            objects: results
        };
        res.status(200).json(data);
    }, function(error) {
        var errorCode = (error.code ? error.code : 500);
        var errorObj = (error.message ? ({ error: error.message }) : ({ error: "Internal Server Error" }));
        res.status(errorCode).json(errorObj);
    });
});

app.get('/events/:event_id', function(req, res) {
    var eventId = req.params.event_id;
    var localEvent;
    var localEventObject;

    var query = new Parse.Query(Parse.Object.extend('Event'));
    query.get(eventId).then(function(eventObject) {
        localEventObject = eventObject;

        localEvent = {
            name: eventObject.get('name'),
            objectId: eventId,
            hours: eventObject.get('hours'),
            driverHours: eventObject.get('driverHours'),
            isOnCampus: eventObject.get('isOnCampus'),
            location: eventObject.get('location'),
            meetingPlace: eventObject.get('meetingPlace'),
            uniform: eventObject.get('uniform'),
            startDateTime: eventObject.get('startDateTime'),
            endDateTime: eventObject.get('endDateTime')
        };

        var query = localEventObject.relation('members').query();
        return query.find();
    }).then(function(members) {
        membersArray = [];
        if (members) {
            members.forEach(function(member) {
                membersArray.push({
                    firstName: member.get('firstName'),
                    lastName: member.get('lastName'),
                    objectId: member.get('objectId'),
                    username: member.get('username'),
                    email: member.get('email'),
                    phone: member.get('phone')
                });
            });
        }
        localEvent.members = membersArray;

        var query = localEventObject.relation('drivers').query();
        return query.find();
    }).then(function(drivers) {
        driversArray = [];
        if (drivers) {
            drivers.forEach(function(driver) {
                driversArray.push({
                    firstName: driver.get('firstName'),
                    lastName: driver.get('lastName'),
                    objectId: driver.get('objectId'),
                    username: driver.get('username'),
                    email: driver.get('email'),
                    phone: driver.get('phone')
                });
            });
        }
        localEvent.drivers = driversArray;

        if (Parse.User.current()) {
            var query = new Parse.Query(Parse.Role);
            query.equalTo("name", "Administrator");
            query.equalTo("users", Parse.User.current());
            query.first().then(function(adminRole) {
                res.render('event_details', {
                    loggedIn: true,
                    eventObj: localEvent,
                    admin: (adminRole ? true : false)
                });
            }, function(error) {
                var alerts = [];
                alerts.push({
                    type: 'warning',
                    message: ("AdminQueryError: " + error.code + " " + error.message)
                });
                res.render('event_details', {
                    alerts: alerts,
                    loggedIn: true,
                    eventObj: localEvent,
                    admin: false
                });
            });
        } else {
            res.render('event_details', {
                loggedIn: false,
                eventObj: localEvent,
                admin: false
            });
        }
    }, function(error) {
        if (Parse.User.current()) {
            var query = new Parse.Query(Parse.Role);
            query.equalTo("name", "Administrator");
            query.equalTo("users", Parse.User.current());
            query.first().then(function(adminRole) {
                var alerts = [];
                alerts.push({
                    type: 'warning',
                    message: ("EventQueryError: " + error.code + " " + error.message)
                });
                res.render('event_details', {
                    alerts: alerts,
                    loggedIn: true,
                    eventObj: localEvent,
                    admin: (adminRole ? true : false)
                });
            }, function(err) {
                var alerts = [];
                alerts.push({
                    type: 'warning',
                    message: ("EventQueryError: " + error.code + " " + error.message)
                });
                alerts.push({
                    type: 'warning',
                    message: ("AdminQueryError: " + err.code + " " + err.message)
                });
                res.render('event_details', {
                    alerts: alerts,
                    loggedIn: true,
                    eventObj: localEvent,
                    admin: false
                });
            });
        } else {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("EventQueryError: " + error.code + " " + error.message)
            });
            res.render('event_details', {
                alerts: alerts,
                loggedIn: false,
                eventObj: localEvent,
                admin: false
            });
        }
    });
    
});

app.get('/events/:event_id/edit', function(req, res) {
    var eventId = req.params.event_id;
    var localEvent;
    var localEventObject;

    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            if (adminRole) {

                var query = new Parse.Query(Parse.Object.extend('Event'));
                query.get(eventId).then(function(eventObject) {
                    localEventObject = eventObject;

                    localEvent = {
                        name: eventObject.get('name'),
                        objectId: eventId,
                        hours: eventObject.get('hours'),
                        driverHours: eventObject.get('driverHours'),
                        isOnCampus: eventObject.get('isOnCampus'),
                        location: eventObject.get('location'),
                        meetingPlace: eventObject.get('meetingPlace'),
                        uniform: eventObject.get('uniform'),
                        startDateTime: eventObject.get('startDateTime'),
                        endDateTime: eventObject.get('endDateTime')
                    };

                    var query = localEventObject.relation('members').query();
                    return query.find();
                }).then(function(members) {
                    membersArray = [];
                    if (members) {
                        members.forEach(function(member) {
                            membersArray.push({
                                firstName: member.get('firstName'),
                                lastName: member.get('lastName'),
                                objectId: member.get('objectId'),
                                username: member.get('username')
                            });
                        });
                    }
                    localEvent.members = membersArray;

                    var query = localEventObject.relation('drivers').query();
                    return query.find();
                }).then(function(drivers) {
                    driversArray = [];
                    if (drivers) {
                        drivers.forEach(function(driver) {
                            driversArray.push({
                                firstName: driver.get('firstName'),
                                lastName: driver.get('lastName'),
                                objectId: driver.get('objectId'),
                                username: driver.get('username')
                            });
                        });
                    }
                    localEvent.drivers = driversArray;

                    res.render('event', {
                        loggedIn: true,
                        eventObj: localEvent,
                        admin: true
                    });
                    
                }, function(error) {
                    var alerts = [];
                    alerts.push({
                        type: 'warning',
                        message: ("EventQueryError: " + error.code + " " + error.message)
                    });
                    res.render('event', {
                        alerts: alerts,
                        loggedIn: true,
                        eventObj: localEvent,
                        admin: true
                    });
                });

            } else {
                res.redirect('/events/' + eventId);
            }
        }, function(error) {
            res.redirect('/events/' + eventId);
        });
    } else {
        res.redirect('/events/' + eventId);
    }

});

app.post('/events/:event_id/edit', function(req, res) {
    var eventId = req.params.event_id;

    var query = new Parse.Query(Parse.Object.extend("Event"));
    var localEvent;
    query.get(eventId).then(function(eventObject) {
        eventObject.set('name', req.body.name);
        eventObject.set('startDateTime', moment(req.body.startDateTime).toDate());
        eventObject.set('endDateTime', moment(req.body.endDateTime).toDate());
        eventObject.set('location', req.body.location);
        eventObject.set('hours', parseFloat(req.body.hours));
        if (req.body.uniform) {
            eventObject.set('uniform', req.body.uniform);
        }
        if (req.body.isOnCampus === 'true') {
            eventObject.set('isOnCampus', true);
        } else {
            eventObject.set('isOnCampus', false);
        }
        eventObject.set('meetingPlace', req.body.meetingPlace);
        eventObject.set('driverHours', parseFloat(req.body.driverHours));

        // var peopleRelation = eventObject.relation("members");
        // req.body.members.forEach(function(member) {
        //     peopleRelation.add(member);
        // });
        // return eventObject.save();
        localEvent = eventObject;

        console.log(req.body);

        var query = new Parse.Query(Parse.User);
        console.log('first then');

        return query.find();
    }).then(function(listUsers) {
        // console.log(listUsers);
        var attendingRelation = localEvent.relation('members');
        var drivingRelation = localEvent.relation('drivers');
        if (req.body.attendingMembers) {
            listUsers.forEach(function(user) {
                if (req.body.attendingMembers.indexOf(user.get('username')) !== -1) {
                    attendingRelation.add(user);
                }
            });
        }
        if (req.body.removeMembers) {
            listUsers.forEach(function(user) {
                if (req.body.removeMembers.indexOf(user.get('username')) !== -1) {
                    attendingRelation.remove(user);
                }
            });
        }
        if (req.body.attendingDrivers) {
            listUsers.forEach(function(user) {
                if (req.body.attendingDrivers.indexOf(user.get('username')) !== -1) {
                    drivingRelation.add(user);
                }
            });
        }
        if (req.body.removeDrivers) {
            listUsers.forEach(function(user) {
                if (req.body.removeDrivers.indexOf(user.get('username')) !== -1) {
                    drivingRelation.remove(user);
                }
            });
        }
        console.log('second then');
        console.log(localEvent);
        return localEvent.save();
    }).then(function(eventObject) {
        console.log('third then');
        res.status(200).json(eventObject);
    }, function(error) {
        var errorCode = (error.code ? error.code : 500);
        var errorObj = (error.message ? ({ error: error.message }) : ({ error: "Internal Server Error" }));
        res.status(errorCode).json(errorObj);
    });
});

app.post('/events/:event_id/delete', function(req, res) {
    var eventId = req.params.event_id;
    var query = new Parse.Query(Parse.Object.extend("Event"));
    query.get(eventId).then(function(eventObject) {
        return eventObject.destroy();
    }, function(error) {
        var errorCode = (error.code ? error.code : 500);
        var errorObj = (error.message ? ({ error: error.message }) : ({ error: "Internal Server Error" }));
        res.status(errorCode).json(errorObj);
    }).then(function(obj) {
        res.status(200).json(obj);
    }, function(error) {
        var errorCode = (error.code ? error.code : 500);
        var errorObj = (error.message ? ({ error: error.message }) : ({ error: "Internal Server Error" }));
        res.status(errorCode).json(errorObj);
    });
});

app.get('/users', function(req, res) {
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            res.render('users', {
                loggedIn: true,
                admin: (adminRole ? true : false)
            });
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('users', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        res.render('users', {
            loggedIn: false,
            admin: false
        });
    }
});

app.get('/users/list', function(req, res) {
    var query = new Parse.Query(Parse.User);
    query.find().then(function(results) {
        var data = {
            objects: results
        };
        res.status(200).json(data);
    }, function(error) {
        var errorCode = (error.code ? error.code : 500);
        var errorObj = (error.message ? ({ error: error.message }) : ({ error: "Internal Server Error" }));
        res.status(errorCode).json(errorObj);
    });
});

app.get('/users/:user_id', function(req, res) {
    var userId = req.params.user_id;
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            if (adminRole) {
                var query = new Parse.Query(Parse.User);
                query.get(userId).then(function(user) {
                    var userObj = {
                        firstName: user.get('firstName'),
                        lastName: user.get('lastName'),
                        objectId: userId,
                        email: user.get('email'),
                        phone: user.get('phone'),
                        hours: user.get('hours'),
                        onCampusHours: user.get('onCampusHours'),
                        offCampusHours: user.get('offCampusHours')
                    };
                    res.render('user', {
                        userObj: userObj,
                        loggedIn: true,
                        admin: true
                    });
                }, function(error) {
                    var alerts = [];
                    alerts.push({
                        type: 'warning',
                        message: ("UserQueryError: " + error.code + " " + error.message)
                    });
                    res.render('404', {
                        alerts: alerts,
                        loggedIn: true,
                        admin: true
                    });
                });
            } else {
                if (userId === Parse.User.current().id) {
                    var query = new Parse.Query(Parse.User);
                    query.get(userId).then(function(user) {
                        var userObj = {
                            firstName: user.get('firstName'),
                            lastName: user.get('lastName'),
                            objectId: userId,
                            email: user.get('email'),
                            phone: user.get('phone'),
                            hours: user.get('hours'),
                            onCampusHours: user.get('onCampusHours'),
                            offCampusHours: user.get('offCampusHours')
                        };
                        res.render('user', {
                            userObj: userObj,
                            loggedIn: true,
                            admin: true
                        });
                    }, function(error) {
                        var alerts = [];
                        alerts.push({
                            type: 'warning',
                            message: ("UserQueryError: " + error.code + " " + error.message)
                        });
                        res.render('404', {
                            alerts: alerts,
                            loggedIn: true,
                            admin: true
                        });
                    });
                } else {
                    res.render('401', {
                        loggedIn: true,
                        admin: false
                    });
                }
            }
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('401', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        res.render('401', {
            loggedIn: false,
            admin: false
        });
    }
});

app.get('/calendar', function(req, res) {
    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            res.render('calendar', {
                loggedIn: true,
                admin: (adminRole ? true : false)
            });
        }, function(error) {
            var alerts = [];
            alerts.push({
                type: 'warning',
                message: ("AdminQueryError: " + error.code + " " + error.message)
            });
            res.render('calendar', {
                alerts: alerts,
                loggedIn: true,
                admin: false
            });
        });
    } else {
        res.render('calendar', {
            loggedIn: false,
            admin: false
        });
    }
});



app.get('/makeCurrentAdmin', function(req, res) {
    var query = new Parse.Query(Parse.Role);
    query.equalTo('name', 'Administrator');
    query.first().then(function(adminRole) {
        Parse.Cloud.useMasterKey();
        adminRole.getUsers().add(Parse.User.current());
        return adminRole.save();
    }).then(function(adminRole) {
        res.redirect('/');
    }, function(error) {
        console.log(error);
        res.redirect('/login');
    });
});

app.listen();

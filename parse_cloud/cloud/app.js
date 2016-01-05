
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
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
    res.render('aboutus', {
        loggedIn: (Parse.User.current() ? true : false)
    });
});

app.get('/', function(req, res) {
    var alerts = [];

    console.log('req.query.login: ' + req.query.login);
    if(req.query.login == 'success') {
        alerts.push({
            type: 'success',
            message: 'Login Successful'
        });
    }

    console.log('req.query.signup: ' + req.query.signup);
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

    var isAdminStatus;

    if (Parse.User.current()) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", Parse.User.current());
        query.first().then(function(adminRole) {
            console.log('admin query successful');
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
            console.log("Error: " + error.code + " " + error.message);
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
    console.log('login page requested');
    res.render('login', {
        loggedIn: (Parse.User.current() ? true : false)
    });
});

app.post('/login', function(req, res) {
    console.log(req.body);
    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
        res.redirect('/?login=success');
    }, function(error) {
        console.log(error);
        var alerts = [];
        alerts.push({
            type: 'danger',
            message: error.code
        });
        res.render('login', {
            alerts: alerts
        });
    });
});

app.get('/signup', function(req, res) {
    console.log('signup page requested');
    res.render('signup', {
        loggedIn: (Parse.User.current() ? true : false)
    });
});

app.post('/signup', function(req, res) {
    console.log(req.body);
    if (req.body.username && req.body.password && req.body.confirmPassword) {
        if (req.body.password === req.body.confirmPassword) {
            var user = new Parse.User();
            user.set('username', req.body.username);
            user.set('password', req.body.password);
            user.set('firstName', req.body.firstName);
            user.set('lastName', req.body.lastName);

            // other fields can be set just like with Parse.Object
            // user.set("phone", "415-392-0202");

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
                console.log(error);
                var alerts = [];
                alerts.push({
                    type: 'danger',
                    message: ("Error: " + error.code + " " + error.message)
                });
                res.render('signup', {
                    alerts: alerts,
                    loggedIn: (Parse.User.current() ? true : false)
                });
            });

            // null, {
            //     success: function(user) {
            //         // Hooray! Let them use the app now.
            //         res.redirect('/?signup=success');
            //     },
            //     error: function(user, error) {
            //         // Show the error message somewhere and let the user try again.
            //         // alert("Error: " + error.code + " " + error.message);
            //         console.log(error);
            //         var alerts = [];
            //         alerts.push({
            //             type: 'danger',
            //             message: ("Error: " + error.code + " " + error.message)
            //         });
            //         res.render('signup', {
            //             alerts: alerts,
            //             loggedIn: (Parse.User.current() ? true : false)
            //         });
            //     }
            // });

        } else {
            var alerts = [];
            alerts.push({
                type: 'danger',
                message: 'Password and Confirm Password do not match'
            });
            res.render('signup', {
                alerts: alerts,
                loggedIn: (Parse.User.current() ? true : false)
            });
        }
    } else {
        var alerts = [];
        alerts.push({
            type: 'danger',
            message: 'missing Username, Password, Confirm Password, First Name, and/or Last Name'
        });
        res.render('signup', {
            alerts: alerts,
            loggedIn: (Parse.User.current() ? true : false)
        });
    }
});

app.get('/logout', function(req, res) {
    if (Parse.User.current()) {
        Parse.User.logOut();
        res.redirect('/');
    } else {
        console.log('No user to Logout');
        res.redirect('/');
    }
});

app.get('/events', function(req, res) {
    res.render('events', {
        loggedIn: (Parse.User.current() ? true : false)
    });
});

app.get('/events/new-event', function(req, res) {
    res.render('new_event', {
        loggedIn: (Parse.User.current() ? true : false)
    });
});

app.get('/users', function(req, res) {
    var queryUser = new Parse.Query(Parse.User);
    var queryAdmin = new Parse.Query(Parse.Role);
    queryUser.equalTo("username", "sirseim");
    queryAdmin.equalTo("name", "Administrator");
    var userLocal;

    queryUser.first().then(function(user) {
        userLocal = user;
        return queryAdmin.first();
    }).then(function(role) {
        Parse.Cloud.useMasterKey();
        role.getUsers().add(userLocal);
        return role.save();
    }).then(function(obj) {
        console.log(obj);
        res.redirect('/?notice=RoleUpdated');
    }, function(error) {
        console.log(error);
        res.redirect('/?notice=Error' + error.code + error.message);
    });
    // queryUser.first({
    //     success: function(member) {
    //         queryAdmin.first({
    //             success: function(adminRole) {
    //                 adminRole.getUsers().add(member);
    //                 adminRole.save({
    //                     success: function(obj) {
    //                         console.log(obj);
    //                         res.redirect('/?notice=RoleUpdated');
    //                     },
    //                     error: function(err) {
    //                         console.log(err);
    //                         res.redirect('/?notice=MemberSaveError' + err.code);
    //                     }
    //                 });
    //             },
    //             error: function(err) {
    //                 console.log(err);
    //                 res.redirect('/?notice=AdminQueryError' + err.code);
    //             }
    //         });
    //     },
    //     error: function(err) {
    //         console.log(err);
    //         res.redirect('/?notice=MemberError' + err.code);
    //     }
    // });
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();

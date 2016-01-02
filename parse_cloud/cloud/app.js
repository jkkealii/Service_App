
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

    res.render('index', {
        alerts: alerts,
        leftMessage: 'Congrats bitches, you did it',
        rightMessage: 'But seriously, WTF!?'
    });
});
app.get('/index', function(req,res) {
    console.log('routing through /index');
    res.redirect('/');
});

app.get('/login', function(req, res) {
    console.log('login page requested');
    res.render('login');
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
    res.render('signup');
});

app.post('/signup', function(req, res) {
    console.log(req.body);
    if (req.body.username && req.body.password && req.body.confirm_password) {
        if (req.body.password === req.body.confirm_password) {
            var user = new Parse.User();
            user.set("username", req.body.username);
            user.set("password", req.body.password);

            // other fields can be set just like with Parse.Object
            // user.set("phone", "415-392-0202");

            user.signUp(null, {
                success: function(user) {
                    // Hooray! Let them use the app now.
                    res.redirect('/?signup=success');
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    // alert("Error: " + error.code + " " + error.message);
                    console.log(error);
                    var alerts = [];
                    alerts.push({
                        type: 'danger',
                        message: error.message
                    });
                    res.render('signup', {
                        alerts: alerts
                    });
                }
            });

        } else {
            var alerts = [];
            alerts.push({
                type: 'danger',
                message: 'password and confirm_password do not match'
            });
            res.render('signup', {
                alerts: alerts
            });
        }
    } else {
        var alerts = [];
        alerts.push({
            type: 'danger',
            message: 'missing username, password, and/or confirm_password'
        });
        res.render('signup', {
            alerts: alerts
        });
    }
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

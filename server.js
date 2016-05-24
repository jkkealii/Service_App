var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');
var Vision = require('vision');

var setup = Config.get('Node-Server');
var routes = require(Path.join(__dirname, 'routes/routes.js'));

var showServerRunInfo = function () {
    console.log("Server started on %s:%s", setup.host, setup.port);
};

var options = {
    ops: {
        interval: 1000
    },
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout']
    },
};

var templates = {
    engines: {
        html: require('nunjucks-hapi')
    },
    path: Path.join(__dirname, 'static/templates')
};

var registerCallback = function (err) {
    if (err) {
        console.error(err);
        throw err; // something bad happened loading the plugin
    }
};

var server = function (setup, routes, options, registerCallback, templates) {
    var hapi = new Hapi.Server();
    
    hapi.connection({
        host: setup.host,
        port: setup.port
    });

    hapi.register(Vision, function (err) {
        hapi.views(templates);
        hapi.route(routes);
    });

    if (setup.logToConsole) {
        hapi.register({
            register: require('good'),
            options: options
        }, registerCallback);
    }

    return hapi;
};

var Service_App = server(setup, routes, options, registerCallback, templates);
Service_App.start(showServerRunInfo); 

module.exports = Service_App;

var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');

var setup = Config.get('Node-Server');
var routes = require(Path.join(__dirname, 'routes/routes.js'));

var showServerRunInfo = function () {
    console.log("Server started on %s:%s", setup.host, setup.port);
};
var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }],
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

    hapi.route(routes);

    hapi.views(templates);

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

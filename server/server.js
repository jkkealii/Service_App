var Hapi = require('hapi'),
    Good = require('good'),
    Inert = require('inert'),
    routes = require('./routes/routes.js'),
    config = require('./config.json'),
    Parse = require('parse/node').Parse;

// Read from our config.json file
var readConfigEntry = function (entry) {
    if (!config.hasOwnProperty(entry)) {
        entry = 'default';
    }
    var entryObj = config[entry];
    
    console.log("Config: %s", entryObj.name);
    return {
        host: entryObj.host,
        port: entryObj.port,
        logToConsole: entryObj.logToConsole,
        parseAppId: entryObj.parseAppId,
        parseJavascriptKey: entryObj.parseJavascriptKey,
        parseMasterKey: entryObj.parseMasterKey
    };
};

// For nice console reporting
var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
};

// DON'T WORRY ABOUT IT
var registerCallback = function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
};

// Lets make a server
var server = function (config, routes, options, registerCallback) {
    var hapi = new Hapi.Server();
    hapi.connection({
        host: config.host,
        port: config.port
    });
    hapi.route(routes);

    if (config.logToConsole) {
        hapi.register({
            register: Good,
            options: options
        }, registerCallback);
    }

    hapi.register({
        register: Inert
    }, registerCallback);

    return hapi;
};

// Lets get that config name
var entry = 'default';
if (process.argv[2]) {
    entry = process.argv[2];
}
ServerConfig = readConfigEntry(entry);

// Make & Start that damn Server
var Service = server(ServerConfig, routes, options, registerCallback);
Service.start(function () {
    console.log("Server started on %s:%s", ServerConfig.host, ServerConfig.port);
});

Parse.initialize(ServerConfig.parseAppId, ServerConfig.parseJavascriptKey, ServerConfig.parseMasterKey);

module.exports = {
    Service: Service,
    ServerConfig: ServerConfig,
    ServerParse: Parse
};

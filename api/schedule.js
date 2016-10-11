var Path = require('path');
var schedule = require('node-schedule');
var Api = require(Path.join(__dirname, 'api.js'));

module.exports.register = function (server, options, next) {
    server.dependency('mongo-connection', function (server, next) {
        var jobs = [
            schedule.scheduleJob('* * * * *', function () {
                server.log(['schedule', 'info'], "Starting hours job");
                var code = function () {};
                var func = function (obj) {
                    if (obj.statusCode === 200) {
                        server.log(['schedule', 'info'], "Hours job successful!");
                    } else if (obj.statusCode === 500) {
                        server.log(['schedule', 'error'], "Hours job failed!");
                        server.log(['schedule', 'error'], obj.error);
                    }
                    return {code};
                };
                console.log(func);
                Api.calculateHours({
                    mongo: options.mongo
                }, func);
            })
        ];
        console.log(server.expose);
        server.decorate('server', 'schedule', jobs);
        next();
    });
    next();
};

module.exports.register.attributes = {
    name: "schedule",
    version: "0.0.0"
};

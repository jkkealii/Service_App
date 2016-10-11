var Path = require('path');
var schedule = require('node-schedule');
var Api = require(Path.join(__dirname, 'api.js'));

module.exports.register = function (server, options, next) {
    var jobs = [
        schedule.scheduleJob('0,10,20,30,40,50 * * * *', function() {
            server.log(['schedule', 'info'], "Starting hours job");
            var func = function (obj) {
                if (obj.statusCode === 200) {
                    server.log(['schedule', 'info'], "Hours job successful!");
                } else if (obj.statusCode === 500) {
                    server.log(['schedule', 'error'], "Hours job failed!");
                    server.log(['schedule', 'error'], obj.error);
                }
            };
            func.code = function () {};
            Api.calculateHours({
                mongo: server.mongo
            }, func);
        })
    ];
    server.decorate('server', 'schedule', jobs);
    next();
};

module.exports.register.attributes = {
    name: "schedule",
    version: "0.0.0"
};

var Path = require('path');
var schedule = require('node-schedule');
var Api = require(Path.join(__dirname, 'api.js'));

var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var ObjectID = Mongo.ObjectID;

module.exports.register = function (server, options, next) {
    MongoClient.connect(process.env.DATABASE_URL, function (err, db) {
        if (err) {
            server.log(['schedule', 'error'], err);
            return next(err);
        }
        server.log(['schedule', 'error'], 'Connected to ' + process.env.DATABASE_URL);
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
                Api.calculateHours({
                    mongo: {
                        ObjectID: ObjectID,
                        db: db
                    }
                }, func);
            })
        ];
        server.decorate('server', 'schedule', jobs);

        next();
    });

    // server.dependency(['mongo-connection'], function (server, next) {
    //     server.log(['schedule', 'info'], "sd");
    //     var jobs = [
    //         schedule.scheduleJob('* * * * *', function () {
    //             server.log(['schedule', 'info'], "Starting hours job");
    //             var code = function () {};
    //             var func = function (obj) {
    //                 if (obj.statusCode === 200) {
    //                     server.log(['schedule', 'info'], "Hours job successful!");
    //                 } else if (obj.statusCode === 500) {
    //                     server.log(['schedule', 'error'], "Hours job failed!");
    //                     server.log(['schedule', 'error'], obj.error);
    //                 }
    //                 return {code};
    //             };
    //             console.log(func);
    //             Api.calculateHours({
    //                 mongo: server.mongo
    //             }, func);
    //         })
    //     ];
    //     server.decorate('server', 'schedule', jobs);
    //     next();
    // });
    // next();
};

module.exports.register.attributes = {
    name: "schedule",
    version: "0.0.0",
    dependencies: ['mongo-connection']
};

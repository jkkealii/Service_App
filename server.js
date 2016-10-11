var Hapi = require('hapi');
var Path = require('path');
var Vision = require('vision');
var Inert = require('inert');
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var ObjectID = Mongo.ObjectID;

var setup = {
    host: process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost",
    port: process.env.PORT || "8080"
};
var visionRoutes = require(Path.join(__dirname, 'routes/vision_routes.js'));
var Api = require(Path.join(__dirname, 'routes/api_routes.js'));

var mongoConnection = {
    register: function (server, options, next) {
        MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
            if (err) {
                server.log(['mongo-connection', 'error'], err);
                return next(err);
            }
            server.log(['mongo-connection', 'info'], 'Connected to ' + process.env.DATABASE_URL);
            server.decorate('server', 'mongo', {
                ObjectID: ObjectID,
                db: db
            });
            server.decorate('request', 'mongo', {
                ObjectID: ObjectID,
                db: db
            });
            server.on('stop', function () {
                db.close(function (err) {
                    server.log(['mongo-connection', 'error'], err);
                });
            });
            next();
        });
    }
};
mongoConnection.register.attributes = {
    name: "mongo-connection",
    version: "0.0.0"
};



var ServiceApp = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'static')
            }
        }
    }
});
ServiceApp.connection({
    host: setup.host,
    port: setup.port
});

ServiceApp.register(mongoConnection, function (err) {
    if (err) {
        console.error('have you started your mongodb instance?\nnpm run db-start\n');
    }
});
ServiceApp.register(Api, {
    routes: {
        prefix: '/api'
    }
});

ServiceApp.register(Inert, function () {});
ServiceApp.register(Vision, function () {
    ServiceApp.views({
        engines: {
            html: require('nunjucks-hapi')
        },
        path: Path.join(__dirname, 'templates')
    });
    ServiceApp.route(visionRoutes);
});

ServiceApp.register({
    register: require('good'),
    options: {
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
        }
    }
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

ServiceApp.start(function () {
    ServiceApp.log(['ServiceApp', 'info'], "Server started on " + setup.host + ":" + setup.port);
}); 

module.exports = ServiceApp;

var jobs = require(Path.join(__dirname, 'api/schedule.js'));

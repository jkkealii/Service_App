var Hapi = require('hapi');
var Config = require('config');
var Path = require('path');
var Vision = require('vision');
var Inert = require('inert');
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var ObjectID = Mongo.ObjectID;

var defNodeConfig = {
    host: "localhost",
    port: 8080,
    logToConsole: true
};
var defMongoConfig = {
    host: "localhost",
    port: 27017,
    db: "db"
};

var setup = Config.get('Node-Server') || defNodeConfig;
var visionRoutes = require(Path.join(__dirname, 'routes/vision_routes.js'));
var Api = require(Path.join(__dirname, 'routes/api_routes.js'));

var mongoConnection = {
    register: function (server, options, next) {
        var dbconfig = Config.get('Mongo-Server') || defMongoConfig;
        var url = "mongodb://" + dbconfig.host +
            ":" + dbconfig.port + "/" + dbconfig.db;
        MongoClient.connect(url, function(err, db) {
            if (err) {
                server.log(['mongo-connection', 'error'], err);
                return next(err);
            }
            server.log(['mongo-connection', 'info'], 'Connected to' + url);
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

if (setup.logToConsole) {
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
}

ServiceApp.start(function () {
    console.log("Server started on %s:%s", setup.host, setup.port);
}); 

module.exports = ServiceApp;

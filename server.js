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
            server.log(['mongo-connection', 'info'], 'Connected to'+url);
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



var Service_App = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'static')
            }
        }
    }
});
Service_App.connection({
    host: setup.host,
    port: setup.port
});

Service_App.register(mongoConnection, function (err) {
    if (err) {
        console.error('have you started your mongodb instance?\nnpm run db-start\n');
    }
});
Service_App.register(Api, {
    routes: {
        prefix: '/api'
    }
});

Service_App.register(Inert, function (err) {});
Service_App.register(Vision, function (err) {
    Service_App.views({
        engines: {
            html: require('nunjucks-hapi')
        },
        path: Path.join(__dirname, 'templates')
    });
    Service_App.route(visionRoutes);
});

if (setup.logToConsole) {
    Service_App.register({
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

Service_App.start(function () {
    console.log("Server started on %s:%s", setup.host, setup.port);
}); 

module.exports = Service_App;

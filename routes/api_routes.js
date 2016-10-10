var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js'));
var Schema = require(Path.join(__dirname, '../api/schema.js'));

var apiRoutes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (req, res) {
            res({
                statusCode: 200,
                message: 'Welcome to the Service App API!'
            }).code(200);
        }
    },
    {
        method: 'GET',
        path: '/events',
        handler: Api.getEventList
    },
    {
        method: 'POST',
        path: '/events',
        config: {
            validate: {
                payload: Schema.event
            }
        },
        handler: Api.createEvent
    },
    {
        method: 'DELETE',
        path: '/events/{event}',
        handler: Api.deleteEvent
    },
    {
        method: 'GET',
        path: '/events/{event}',
        handler: Api.getEvent
    },
    {
        method: 'PUT',
        path: '/events/{event}',
        config: {
            validate: {
                payload: Schema.event
            }
        },
        handler: Api.updateEvent
    },
    {
        method: 'GET',
        path: '/members',
        handler: Api.getMemberList
    },
    {
        method: 'POST',
        path: '/members',
        config: {
            validate: {
                payload: Schema.member
            }
        },
        handler: Api.createMember
    },
    {
        method: 'DELETE',
        path: '/members/{member}',
        handler: Api.deleteMember
    }
];

module.exports.register = function (server, options, next) {
    server.route(apiRoutes);
    next();
};

module.exports.register.attributes = {
    name: "api",
    version: "0.0.0"
};

var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js'));

var apiRoutes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (req, res) {
            res({
                'hello': 'Welcome to the Service App!'
            }).code(200);
        }
    },
    {
        method: 'GET',
        path: '/api/events',
        handler: Api.getEventList
    }
];

module.exports = apiRoutes;

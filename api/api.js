var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js'));
var Respond = require(Path.join(__dirname, 'respond.js'));

var api = {
    getEventList: function (req, res) {
        Service.getEventList(req.mongo, function (err, events) {
            if (err) {
                Respond.failedToFindEvents(res);
            } else {
                Respond.returnEvents(res, events);
            }
        });
    }
};

module.exports = api;

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
    },
    createEvent: function (req, res) {
        Service.createEvent(req.mongo, req.payload, function (err, result) {
            if (err) {
                Respond.failedToCreateEvent(res);
            } else {
                Respond.createdEvent(res, result);
            }
        });
    },
    deleteEvent: function (req, res) {
        Service.deleteEvent(req.mongo, req.params.event, function (err, result) {
            if (err) {
                Respond.failedToDeleteEvent(res);
            } else {
                Respond.deletedEvent(res, result);
            }
        });
    },
    getEvent: function (req, res) {
        Service.getEvent(req.mongo, req.params.event, function (err, event) {
            if (err) {
                Respond.failedToGetEvent(res);
            } else {
                Respond.gotEvent(res, event);
            }
        });
    },
    updateEvent: function (req, res) {
        Service.updateEvent(req.mongo, req.params.event, req.payload, function (err, result) {
            if (err) {
                Respond.failedToUpdateEvent(res);
            } else {
                Respond.updatedEvent(res, result);
            }
        });
    },
    getMemberList: function (req, res) {
        Service.getMemberList(req.mongo, function (err, result) {
            if (err) {
                Respond.failedToGetMembers(res);
            } else {
                Respond.gotMembers(res, result);
            }
        });
    }
};

module.exports = api;

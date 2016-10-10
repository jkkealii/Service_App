var respond = {
    failedToFindEvents: function (res) {
        res({
            statusCode: 500,
            message: "Unable to retrieve the list of events!"
        }).code(500);
    },
    returnEvents: function (res, events) {
        var code = events.length ? 200 : 404;
        res({
            statusCode: code,
            message: events.length ? "Success finding events!" : "There are no events currently!",
            events: events
        }).code(code);
    },
    failedToCreateEvent: function (res) {
        res({
            statusCode: 500,
            message: "Unable to create event!"
        }).code(500);
    },
    createdEvent: function (res, result) {
        res({
            statusCode: 201,
            message: "Success creating event!",
            result: result
        }).code(201);
    },
    failedToDeleteEvent: function (res) {
        res({
            statusCode: 500,
            message: "Unable to delete event!"
        }).code(500);
    },
    deletedEvent: function (res, result) {
        var code = result.result.n ? 200 : 404;
        res({
            statusCode: code,
            message: result.result.n ? "Success deleting event!" : "No event found to delete!",
            result: result.result
        }).code(code);
    },
    failedToGetEvent: function (res) {
        res({
            statusCode: 500,
            message: "Unable to find event!"
        }).code(500);
    },
    gotEvent: function (res, event) {
        var code = event ? 200 : 404;
        res({
            statusCode: code,
            message: event ? "Success finding event!" : "Event not found!",
            event: event
        }).code(code);
    },
    failedToUpdateEvent: function (res) {
        res({
            statusCode: 500,
            message: "Unable to update event!"
        }).code(500);
    },
    updatedEvent: function (res, result) {
        var code = result.result.n ? 200 : 404;
        res({
            statusCode: code,
            message: result.result.n ? "Success updating event!" : "No event found to update!",
            result: result.result
        }).code(code);
    },
    failedToGetMembers: function (res) {
        res({
            statusCode: 500,
            message: "Unable to retrieve the list of members!"
        }).code(500);
    },
    gotMembers: function (res, members) {
        var code = members.length ? 200 : 404;
        res({
            statusCode: code,
            message: members.length ? "Success finding members!" : "There are no members currently!",
            members: members
        }).code(code);
    },
    failedToCreateMember: function (res) {
        res({
            statusCode: 500,
            message: "Unable to create member!"
        }).code(500);
    },
    createdMember: function (res, result) {
        res({
            statusCode: 201,
            message: "Success creating member!",
            result: result
        }).code(201);
    },
    failedToDeleteMember: function (res) {
        res({
            statusCode: 500,
            message: "Unable to delete member!"
        }).code(500);
    },
    deletedMember: function (res, result) {
        var code = result.result.n ? 200 : 404;
        res({
            statusCode: code,
            message: result.result.n ? "Success deleting member!" : "No member found to delete!",
            result: result.result
        }).code(code);
    },
    failedToGetMember: function (res) {
        res({
            statusCode: 500,
            message: "Unable to find member!"
        }).code(500);
    },
    gotMember: function (res, member) {
        var code = member ? 200 : 404;
        res({
            statusCode: code,
            message: member ? "Success finding event!" : "Event not found!",
            member: member
        }).code(code);
    },
    failedToUpdateMember: function (res) {
        res({
            statusCode: 500,
            message: "Unable to update member!"
        }).code(500);
    },
    updatedMember: function (res, result) {
        var code = result.result.n ? 200 : 404;
        res({
            statusCode: code,
            message: result.result.n ? "Success updating member!" : "No member found to update!",
            result: result.result
        }).code(code);
    }
};

module.exports = respond;
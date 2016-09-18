var respond = {
    failedToFindEvents: function (res) {
        res({
            statusCode: 500,
            message: "Unable to retrieve the list of events!"
        }).code(500);
    },
    returnEvents: function (res, events) {
        res({
            statusCode: 200,
            message: (events.length) ? "Success finding events!" : "There are no events currently!",
            events: events
        }).code(200);
    },
    failedToCreateEvent: function (res) {
        res({
            statusCode: 500,
            message: "Unable to create event!"
        }).code(500);
    },
    createdEvent: function (res, result) {
        res({
            statusCode: 200,
            message: "Success creating event!",
            result: result
        }).code(200);
    },
    failedToDeleteEvent: function (res) {
        res({
            statusCode: 500,
            message: "Unable to delete event!"
        }).code(500);
    },
    deletedEvent: function (res, result) {
        res({
            statusCode: 200,
            message: (result.result.n) ? "Success deleting event!" : "No event found to delete!",
            result: result.result
        }).code(200);
    }
};

module.exports = respond;
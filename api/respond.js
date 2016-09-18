var respond = {
    failedToFindEvents: function (res) {
        res({
            message: "Unable to retrieve the list of events!"
        }).code(500);
    },
    returnEvents: function (res, events) {
        res({
            message: (events.length) ? "Success finding events!" : "There are no events currently!",
            events: events
        }).code(200);
    }
};

module.exports = respond;
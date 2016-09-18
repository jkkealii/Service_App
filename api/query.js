var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js'));

var query = {
    getEventList: function (db, callback) {
        var events = db.collection('events');
        events.find({}).toArray(callback);
    }
};

module.exports = query;

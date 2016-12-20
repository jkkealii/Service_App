$(function () {
    var newRow = function (event) {
        return '<tr><td>' + '<a href="/events/' + event.id + '">' + event.name + '</a>' + '</td>' +
                '<td>' + moment(event.startDateTime).format("YYYY-MM-DD, HH:mm") +
                '</td><td>' + event.meetingPlace +
                '</td><td>' + ((event.isOnCampus) ? 'On Campus' : 'Off Campus') + '</td> ' +
                '<td><button class="delete-event" data-id="' + event.id + '">Delete</button></td></tr>';
    };
    var deleteEvent = function () {
        var id = $(this).data("id");
        var status = $('#status');

        $.ajax({
            url: "/api/events/" + id,
            method: "DELETE"
        }).then(function (data) {
            console.log(data);
            status.text("Success deleting");
            loadEvents();
        }, function (obj) {
            var json = obj.responseJSON;
            console.log(json);
            status.text("Failed delete");
        });
    };
    var loadEvents = function() {
        var table = $('#events tbody');
        var status = $('#status');

        status.text('Pending');
        $.ajax({
            method: 'GET',
            url: '/api/events?semester=true'
        }).then(function (data) {
            table.empty();
            status.text("Success");
            $.each(data.events, function(index, value) {
                table.append(newRow(value));
                $('.delete-event').unbind('click').click(deleteEvent);
            });
        }, function (obj) {
            console.log(obj.responseJSON.statusCode);
            table.empty();
            if (obj.responseJSON.statusCode === 404) {
                status.text("No Events");
            } else {
                status.text("Error");
            }
        });
    };

    loadEvents();
});

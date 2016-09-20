$(function () {
    var newRow = function (event) {
        return '<tr><td>' + '<a href="/events/' + event.id + '">' + event.name + '</a>' + '</td>' + 
            '<td>' + moment(event.startDateTime.iso).format("MMM D, YYYY, h:mm a") + 
            '</td>' + '<td>' + event.meetingPlace +
            '</td>' + '<td>' + ((event.isOnCampus) ? 'On Campus' : 'Off Campus') + '</td> ' +
            '<td>' + 'Unsupported' + '</td></tr>';
    };

    var loadEvents = function() {
        $('table tbody').empty();
        $.ajax({
            method: 'GET',
            url: '/api/events'
        }).then(function (data, textStatus, jqXHR) {
            console.log('Got Events');
            $.each(data.events, function(index, value) {
                $('table tbody').append($(newRow(value)))
            }, function(jqXHR, textStatus, error) {
                console.log(error);
                console.log(textStatus);
            });
        })
    };

    loadEvents();
});

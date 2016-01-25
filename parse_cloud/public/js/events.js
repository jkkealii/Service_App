$(function () {
    var newRow = function(parseObject) {
        var campusText = (parseObject.isOnCampus ? 'On Campus' : 'Off Campus');
        return '<tr><td>' + parseObject.name + '</td>' + 
            '<td>' + moment(parseObject.startDateTime.iso).format("MMMM D, YYYY, h:mm a") + 
            '</td>' + '<td><a href="https://maps.google.com/?q=' + parseObject.location +
            '">' + parseObject.location + '</a></td>' + '<td>' + campusText + '</td> ' +
            '<td><a href="/events/' + parseObject.objectId + '" class="btn buton btn-default btn-sm">Details</a></td></tr>';
    };

    $('table tbody').empty();
    $.ajax({
        method: 'GET',
        url: '/events/list',
    }).then(function(data, textStatus, jqXHR) {
        console.log('done');
        console.log(data);
        $.each(data.objects, function(index, value) {
            $('table tbody').append($(newRow(value)).data('start-date-time', moment(value.startDateTime.iso)));
        });
    }, function(jqXHR, textStatus, error) {
        console.log(error);
        console.log(textStatus);
    });

    var refreshShownEvents = function() {
        var showPastEvents = $('#show-past-events').checked;
        $('table tbody tr').each(function(index, element) {
            if (!showPastEvents) {
                if ($(element).data('start-date-time').isSameOrAfter(moment(), 'day')) {
                    $(element).show();
                } else {
                    $(element).hide();
                }
            } else {
                $(element).show();
            }
        });
    };

    $('#show-past-events').parent().parent().click(function() {
        refreshShownEvents();
    });
});

$(function () {
    var actions = function(objectId, auth) {
        if (auth) {
            return '<div class="btn-group">' +
                        '<a href="/events/' + objectId + '" class="btn buton btn-default btn-sm">Details</a>' +
                        '<button type="button" class="btn fk-buton btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>' +
                        '<ul class="dropdown-menu">' +
                            '<li><a href="#">Duplicate</a></li>' +
                            '<li><a href="#">Edit</a></li>' +
                            '<li><a href="#">Delete</a></li>' +
                        '</ul>' +
                    '</div>';
        } else {
            return '<a href="/events/' + objectId + '" class="btn buton btn-default btn-sm">Details</a>';
        }
    };

    var newRow = function(parseObject, auth) {
        var campusText = (parseObject.isOnCampus ? 'On Campus' : 'Off Campus');
        return '<tr><td>' + '<a href="/events/' + parseObject.objectId + '">' + parseObject.name + '</a>' + '</td>' + 
            '<td>' + moment(parseObject.startDateTime.iso).format("MMM D, YYYY, h:mm a") + 
            '</td>' + '<td><a href="https://maps.google.com/?q=' + parseObject.location +
            '">' + parseObject.location + '</a></td>' + '<td>' + campusText + '</td> ' +
            '<td>' + actions(parseObject.objectId, auth) + '</td></tr>';
    };

    $('table tbody').empty();
    $.ajax({
        method: 'GET',
        url: '/events/list',
    }).then(function(data, textStatus, jqXHR) {
        console.log('done');
        console.log(data);
        if (typeof data.auth === 'undefined') {
            data.auth = 'true';
        }
        data.auth = (data.auth === 'true');
        $.each(data.objects, function(index, value) {
            $('table tbody').append($(newRow(value, data.auth)).data('start-date-time', moment(value.startDateTime.iso)));
        });
        refreshShownEvents();
        $('#show-past-events').prop('disabled', false);
    }, function(jqXHR, textStatus, error) {
        console.log(error);
        console.log(textStatus);
    });

    var refreshShownEvents = function() {
        // console.log('refreshShownEvents');
        var showPastEvents = $('#show-past-events').is(':checked');
        $('table tbody tr').each(function(index, element) {
            if (!showPastEvents) {
                // console.log('do not show past events');
                if ($(element).data('start-date-time').isSameOrAfter(moment(), 'day')) {
                    // console.log(element);
                    // console.log('show');
                    $(element).show();
                    $(element).data('searchable', true);
                } else {
                    // console.log(element);
                    // console.log('hide');
                    $(element).data('searchable', false);
                    $(element).hide();
                }
            } else {
                // console.log('show past events');
                $(element).show();
                $(element).data('searchable', true);
            }
        });
    };

    $('#show-past-events').parent().parent().click(function() {
        refreshShownEvents();
    });
});

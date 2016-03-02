$(function () {
    var actions = function(objectId, auth) {
        if (auth) {
            return '<div class="btn-group">' +
                        '<a href="/events/' + objectId + '" class="btn buton btn-default btn-sm">Details</a>' +
                        '<button type="button" class="btn fk-buton btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button>' +
                        '<ul class="dropdown-menu">' +
                            // '<li><a href="#">Duplicate</a></li>' +
                            '<li><a href="/events/' + objectId + '/edit">Edit</a></li>' +
                            '<li><a class="delete" data-object-id="' + objectId + '">Delete</a></li>' +
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

    var loadEvents = function() {
        $('table tbody').empty();
        $.ajax({
            method: 'GET',
            url: '/events/list',
        }).then(function(data, textStatus, jqXHR) {
            console.log('done getting events');
            console.log(data);
            if (typeof data.auth === 'undefined') {
                data.auth = 'false';
            }
            data.auth = (data.auth === 'true');
            $.each(data.objects, function(index, value) {
                $('table tbody').append($(newRow(value, data.auth)).data('start-date-time', moment(value.startDateTime.iso)));
            });
            refreshShownEvents();
            refreshDeletes();
            $('#show-past-events').prop('disabled', false);
        }, function(jqXHR, textStatus, error) {
            console.log(error);
            console.log(textStatus);
        });
    };

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

    var refreshDeletes = function() {
        $('.delete').click(function() {
            var eventId = $(this).data('object-id');
            var eventUrl = '/events/' + eventId + '/delete';

            if (eventId) {
                console.log('sending delete request...');
                $.ajax({
                    method: 'POST',
                    url: eventUrl,
                    data: {objectId: eventId}
                }).then(function(data, textStatus, jqXHR) {
                    console.log('success delete');
                    console.log(data);
                    console.log(textStatus);
                    loadEvents();
                }, function(jqXHR, textStatus, error) {
                    console.log('error delete');
                    console.log(textStatus);
                    console.log(error);
                });
            } else {
                console.log('no eventId to delete');
            }
        });
    };

    $('#show-past-events').parent().parent().click(function() {
        refreshShownEvents();
    });

    loadEvents();
});

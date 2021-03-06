$(function () {
    var createMember = function (member) {
        return '<tr><td><input type="checkbox" class="member-checkbox" data-id="' + member.id +
                '"></td><td><input type="checkbox" class="driver-checkbox" data-id="' + member.id +
                '"></td><td><input type="checkbox" class="extra-checkbox" data-id="' + member.id +
                '"></td><td>' + member.firstName + '</td><td>' + member.lastName + '</td></tr>';
    };
    var populateMembers = function (callback) {
        var table = $('#members tbody');
        var status = $('#member-status');

        status.text('Pending');
        $.ajax({
            url: "/api/members",
            method: "GET"
        }).then(function (data) {
            table.empty();
            status.text("Success");
            data.members.forEach(function (element) {
                table.append(createMember(element));
            });
            callback();
        }, function (obj) {
            console.log(obj.responseJSON.statusCode);
            table.empty();
            if (obj.responseJSON.statusCode === 404) {
                status.text("No Members");
            } else {
                status.text("Error");
            }
            callback();
        });
    };

    var populateEvent = function () {
        var status = $('#status');

        $.ajax({
            url: "/api/events/" + $('#event-id').data('id'),
            method: "GET"
        }).then (function (data) {
            status.text("Success");
            var event = data.event;
            $('input').prop('disabled', true);

            $('#name').val(event.name);
            $('#hours').val(event.hours);
            if (event.isOnCampus) {
                $('#is-on-campus-true').prop('checked', true);
            } else {
                $('#is-on-campus-false').prop('checked', true);
            }
            if (event.uniform.toLowerCase() === "casual") {
                $('#uniform-casual').prop('checked', true);
            } else if (event.uniform.toLowerCase() === "polos") {
                $('#uniform-polo').prop('checked', true);
            } else if (event.uniform.toLowerCase() === "sweaters") {
                $('#uniform-sweater').prop('checked', true);
            } else {
                console.log('No Uniform ' + event.uniform);
            }
            $('#meeting-place').val(event.meetingPlace);
            $('#start-date').val(moment(event.startDateTime).format('M/D/YY HH:mm'));
            $('#end-date').val(moment(event.endDateTime).format('M/D/YY HH:mm'));
            $('#driver-hours').val(event.driverHours);
            $('#extra-hours').val(event.extraHours);
            $('#comments').val(event.comments ? event.comments : '');

            populateMembers(function () {
                $('.member-checkbox').attr("sorttable_customkey", "1").click(checkIt).filter(function (i, e) {
                    return event.members.indexOf($(e).data('id')) !== -1;
                }).prop('checked', true).attr("sorttable_customkey", "0").unbind("click").click(unCheckIt);
                $('.driver-checkbox').attr("sorttable_customkey", "1").click(checkIt).filter(function (i, e) {
                    return event.drivers.indexOf($(e).data('id')) !== -1;
                }).prop('checked', true).attr("sorttable_customkey", "0").unbind("click").click(unCheckIt);
                $('.extra-checkbox').attr("sorttable_customkey", "1").click(checkIt).filter(function (i, e) {
                    return event.specials.indexOf($(e).data('id')) !== -1;
                }).prop('checked', true).attr("sorttable_customkey", "0").unbind("click").click(unCheckIt);

                $('input').prop('disabled', true);
                $('#edit-event').prop('disabled', false).click(function () {
                    console.log
                    $('input').prop('disabled', false);
                    $('#update-event').prop('disabled', false);
                });
            });
        }, function (obj) {
            status.text("Error");
            var json = obj.responseJSON;
            if (json.statusCode == 404) {
                $('form').empty();
                status.text('404 - No Such Event');
            }
            console.log(json);
        });
    };

    var updateEvent = function () {
        var uniform = $('input[name=uniform]:checked').val();
        if (!uniform) {
            uniform = '';
        }

        var status = $('#status');
        var eventDetails = {
            name: $('#name').val(),
            hours: $('#hours').val(),
            isOnCampus: ($('input[name=is-on-campus]:checked').val() === 'true'),
            meetingPlace: $('#meeting-place').val(),
            startDateTime: moment($('#start-date').val()).toISOString(),
            endDateTime: moment($('#end-date').val()).toISOString(),
            uniform: uniform,
            members: [],
            drivers: [],
            specials: []
        };

        var comments = $('#comments').val();
        if (comments) {
            eventDetails.comments = comments;
        }
        var driverHours = $('#driver-hours').val();
        if (driverHours) {
            eventDetails.driverHours = driverHours;
        }
        var extraHours = $('#extra-hours').val();
        if (extraHours) {
            eventDetails.extraHours = extraHours;
        }

        $('.member-checkbox').each(function (index, element) {
            var jel = $(element);
            if (jel.prop('checked')) {
                eventDetails.members.push(jel.data('id'));
            }
        });
        $('.driver-checkbox').each(function (index, element) {
            var jel = $(element);
            if (jel.prop('checked')) {
                eventDetails.drivers.push(jel.data('id'));
            }
        });
        $('.extra-checkbox').each(function (index, element) {
            var jel = $(element);
            if (jel.prop('checked')) {
                eventDetails.specials.push(jel.data('id'));
            }
        });

        console.log(eventDetails);

        eventDetails.members = JSON.stringify(eventDetails.members);
        eventDetails.drivers = JSON.stringify(eventDetails.drivers);
        eventDetails.specials = JSON.stringify(eventDetails.specials);

        status.text('Pending');
        $.ajax({
            url: "/api/events/" + $('#event-id').data('id'),
            method: "PUT",
            data: eventDetails
        }).then(function (data) {
            console.log(data);
            status.text("Success");
            window.location.href = '/events';
        }, function (obj) {
            var json = obj.responseJSON;
            console.log(json);
            if (json.statusCode === 400) {
                var field = json.validation.keys
                status.text("Missing " + field);
            } else {
                status.text("Error");
            }
        });
    };

    var unCheckIt = function () {
        $(this).attr("sorttable_customkey", "1").unbind("click").click(checkIt);
    };
    var checkIt = function () {
        $(this).attr("sorttable_customkey", "0").unbind("click").click(unCheckIt);
    };

    $('#edit-event').prop('disabled', true);
    $('#update-event').prop('disabled', true).click(updateEvent);
    populateEvent();
});

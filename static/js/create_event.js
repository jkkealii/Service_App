$(function () {
    var createMember = function (member) {
        return '<tr><td><input type="checkbox" class="member-checkbox" data-id="' + member.id +
                '"></td><td><input type="checkbox" class="driver-checkbox" data-id="' + member.id +
                '"</td><td><input type="checkbox" class="extra-checkbox" data-id="' + member.id +
                '"></td><td>' + member.firstName + '</td><td>' + member.lastName + '</td></tr>';
    };
    var populateMembers = function () {
        var table = $('#members tbody');
        var status = $('#member-status');

        status.text('Pending');
        $.ajax({
            url: "api/members",
            method: "GET"
        }).then(function (data) {
            console.log(data);
            table.empty();
            status.text("Success");
            data.members.forEach(function (element) {
                table.append(createMember(element));
                // $('.delete-member').unbind('click').click(deleteMember);
            });
        }, function (obj) {
            console.log(obj.responseJSON.statusCode);
            table.empty();
            if (obj.responseJSON.statusCode === 404) {
                status.text("No Members");
            } else {
                status.text("Error");
            }
        });
    };

    populateMembers();

    var createEvent = function () {
        var uniform = $('input[name=uniform]:checked').val();
        if (!uniform) {
            uniform = '';
        }

        var status = $('#status');
        var eventDetails = {
            name: $('#name').val(),
            comments: $('#comments').val(),
            hours: $('#hours').val(),
            driverHours: $('#driver-hours').val(),
            extraHours: $('#extra-hours').val(),
            isOnCampus: ($('input[name=is-on-campus]:checked').val() === 'true'),
            meetingPlace: $('#meeting-place').val(),
            startDateTime: moment($('#start-date').val()).toISOString(),
            endDateTime: moment($('#end-date').val()).toISOString(),
            uniform: uniform,
            members: [],
            drivers: [],
            specials: []
        };

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
            url: "/api/events",
            method: "POST",
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
    
    $('#create-event').click(createEvent);
});

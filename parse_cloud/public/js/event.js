$(function () {

    // Date Time Picker
    $('#datetimestart').datetimepicker({
        // focusOnShow: false, //don't bring up keyboard on iOS
        defaultDate: moment($('#start-date').data('original'))
    });
    $('#datetimeend').datetimepicker({
        useCurrent: false, //Important! See issue #1075
        // focusOnShow: false, //don't bring up keyboard on iOS
        defaultDate: moment($('#end-date').data('original'))
    });
    $('#datetimestart').on('dp.change', function (e) {
        $('#datetimeend').data('DateTimePicker').minDate(e.date);
    });
    $('#datetimeend').on('dp.change', function (e) {
        $('#datetimestart').data('DateTimePicker').maxDate(e.date);
    });

    var printAllMembers = function() {
        console.log(' ');
        console.log('Attending Original');
        console.log($('#attending-members').data('original-members'));
        console.log('Attending Attending');
        console.log($('#attending-members').data('attending-members'));
        console.log('Attending Remove');
        console.log($('#attending-members').data('remove-members'));
        console.log(' ');
        console.log('Driving Original');
        console.log($('#driving-members').data('original-members'));
        console.log('Driving Attending');
        console.log($('#driving-members').data('attending-members'));
        console.log('Driving Remove');
        console.log($('#driving-members').data('remove-members'));
        console.log(' ');
    };


    // Manage current list of attending to be added and removed
    var removeAttendingMember = function(username) {
        var originalMembers = $('#attending-members').data('original-members');
        var currentRemoveMembers = $('#attending-members').data('remove-members');
        var currentAttendingMembers = $('#attending-members').data('attending-members');

        var userInRemove = ($.inArray(username, currentRemoveMembers) !== -1);
        var userInAttending = ($.inArray(username, currentAttendingMembers) !== -1);
        var userOriginal = ($.inArray(username, originalMembers) !== -1);

        if (userOriginal && (!userInRemove)) {
            currentRemoveMembers.push(username);
        }
        if (userInAttending) {
            currentAttendingMembers.splice($.inArray(username, currentAttendingMembers), 1);
        }

        $('#attending-members').data('attending-members', currentAttendingMembers);
        $('#attending-members').data('remove-members', currentRemoveMembers);
    };
    var addAttendingMember = function(username) {
        var currentAttendingMembers = $('#attending-members').data('attending-members');
        var currentRemoveMembers = $('#attending-members').data('remove-members');

        var userInRemove = ($.inArray(username, currentRemoveMembers) !== -1);
        var userInAttending = ($.inArray(username, currentAttendingMembers) !== -1);
        if (userInRemove) {
            currentRemoveMembers.splice($.inArray(username, currentRemoveMembers), 1);
        }
        if (!userInAttending) {
            currentAttendingMembers.push(username);
        }

        $('#attending-members').data('attending-members', currentAttendingMembers);
        $('#attending-members').data('remove-members', currentRemoveMembers);
    };

    // Manage current lsit of driving to be added and removed
    var removeDrivingMember = function(username) {
        var originalMembers = $('#driving-members').data('original-members');
        var currentRemoveMembers = $('#driving-members').data('remove-members');
        var currentAttendingMembers = $('#driving-members').data('attending-members');

        var userInRemove = ($.inArray(username, currentRemoveMembers) !== -1);
        var userInAttending = ($.inArray(username, currentAttendingMembers) !== -1);
        var userOriginal = ($.inArray(username, originalMembers) !== -1);
        if (userOriginal && (!userInRemove)) {
            currentRemoveMembers.push(username);
        }
        if (userInAttending) {
            currentAttendingMembers.splice($.inArray(username, currentAttendingMembers), 1);
        }

        $('#driving-members').data('attending-members', currentAttendingMembers);
        $('#driving-members').data('remove-members', currentRemoveMembers);
    };
    var addDrivingMember = function(username) {
        var currentAttendingMembers = $('#driving-members').data('attending-members');
        var currentRemoveMembers = $('#driving-members').data('remove-members');

        var userInRemove = ($.inArray(username, currentRemoveMembers) !== -1);
        var userInAttending = ($.inArray(username, currentAttendingMembers) !== -1);
        if (userInRemove) {
            currentRemoveMembers.splice($.inArray(username, currentRemoveMembers), 1);
        }
        if (!userInAttending) {
            currentAttendingMembers.push(username);
        }

        $('#driving-members').data('attending-members', currentAttendingMembers);
        $('#driving-members').data('remove-members', currentRemoveMembers);
    };


    // Filling Current Event Details
    $('#name').val($('#name').data('original'));
    $('#location').val($('#location').data('original'));
    $('#meeting-place').val($('#meeting-place').data('original'));
    $('#hours').val($('#hours').data('original'));
    $('#driver-hours').val($('#driver-hours').data('original'));
    $('#meeting-place').val($('#meeting-place').data('original'));
    
    var refreshOptions = function() {
        $('.option').click(function(event) {
            $('#add-person').val($(this).data('name'));
            $('#add-person').data('member', $(this).data('member'));
            console.log('Option clicked');
        });
    };

    // search for person
    $('#add-person').keyup(function() {
        var rxp = new RegExp($('#add-person').val(), 'i');
        $('.option').hide().each(function(index, element) {
            if (rxp.test($(element).data('name'))) {
                $(element).show();
            }
        });
    });

    var refreshRemoveButtons = function() {
        $('.rm-row-attending').click(function(event) {
            var jThis = $(this);
            var attendingMember = jThis.parent().parent();
            console.log('attending to remove ' + attendingMember.data('username'));
            removeAttendingMember(attendingMember.data('username'))
            attendingMember.remove();
        });
        $('.rm-row-driving').click(function(event) {
            var jThis = $(this);
            var drivingMember = jThis.parent().parent();
            console.log('driving to remove ' + drivingMember.data('username'));
            removeDrivingMember(drivingMember.data('username'))
            drivingMember.remove();
        });
    };

    refreshRemoveButtons();

    // Get all Members to show suggestions
    var newRowMember = function(member) {
        return '<li class="option" id="option' + member.objectId +
        '" data-name="' + member.firstName +
        ' ' + member.lastName + '" data-username="' + member.username +
        '"><a href="#">' + member.firstName +
        ' ' + member.lastName + '</a></li>';
    };
    var newAttendingMember = function(member) {
        return '<tr class="attending-member" id="attending-member' + member.objectId +
        '" data-username="' + member.username + '"><td>' +
        member.firstName + ' ' + member.lastName +
        '</td><td><button type="button" class="btn btn-default btn-xs rm-row-attending">' +
        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
        '</button></td></tr>';
    };
    var newDrivingMember = function(member) {
        return '<tr class="driving-member" id="driving-member' + member.objectId +
        '" data-username="' + member.username + '"><td>' +
        member.firstName + ' ' + member.lastName +
        '</td><td><button type="button" class="btn btn-default btn-xs rm-row-driving">' +
        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
        '</button></td></tr>';
    };

    var getAllMembers = function() {
        $.ajax({
            method: 'GET',
            url: '/users/list'
        }).then(function(data, textStatus, jqXHR) {
            console.log('success');
            console.log(data);
            console.log(textStatus);
            $.each(data.objects, function(index, member) {
                $('#list-members').append(newRowMember(member));
                $('#option' + member.objectId).data('member', member);
            });
            refreshOptions();
        }, function(jqXHR, textStatus, error) {
            console.log('error');
            console.log(textStatus);
            console.log(error);
            $('#list-members').append('<li class="option">Error Loading Members</li>');
        });
    };
    $('#list-members').empty();
    getAllMembers();

    // Add person to list of attending
    $('#confirm-add-person').click(function() {
        console.log('Add Attending clicked');
        var addPerson = $('#add-person');
        if (addPerson.data('member')) {
            var member = addPerson.data('member');
            $('#attending-members').append(newAttendingMember(member));
            $('#attending-member' + member.objectId).data('member', member);
            $('#attending-member' + member.objectId).data('username', member.username);
            addAttendingMember(member.username);
            addPerson.removeData('member');
            addPerson.val('');
        } else {
            // what if they type in the whole name manually?
        }
        refreshRemoveButtons();
    });

    // Add person to list of driving
    $('#confirm-add-driver').click(function() {
        console.log('Add Driver clicked');
        var addPerson = $('#add-person');
        if (addPerson.data('member')) {
            var member = addPerson.data('member');
            $('#driving-members').append(newDrivingMember(member));
            $('#driving-member' + member.objectId).data('member', member);
            $('#driving-member' + member.objectId).data('username', member.username);
            addDrivingMember(member.username);
            addPerson.removeData('member');
            addPerson.val('');
        } else {
            // what if they type in the whole name manually?
        }
        refreshRemoveButtons();
    });


    // Add Original Attending Members to list for possible removal
    var potentialAttendingRemoves = [];
    $('.attending-member').each(function(index, element) {
        potentialAttendingRemoves.push($(element).data('username'));
    });
    $('#attending-members').data('original-members', potentialAttendingRemoves.slice());
    $('#attending-members').data('attending-members', potentialAttendingRemoves.slice());
    $('#attending-members').data('remove-members', []);

    // Add Original Driving Members to list to possible removal
    var potentialDrivingRemoves = [];
    $('.driving-member').each(function(index, element) {
        potentialDrivingRemoves.push($(element).data('username'));
    });
    $('#driving-members').data('original-members', potentialDrivingRemoves.slice());
    $('#driving-members').data('attending-members', potentialDrivingRemoves.slice());
    $('#driving-members').data('remove-members', []);

    printAllMembers();


    // Update Event
    $('#update-event').click(function() {
        var $btn = $(this).button('loading');

        var attendingMembers = $('#attending-members').data('attending-members');
        var removeMembers = $('#attending-members').data('remove-members');
        var attendingDrivers = $('#driving-members').data('attending-members');
        var removeDrivers = $('#driving-members').data('remove-members');

        var uniform = $('input[name=uniform]:checked', '#eventForm').val();
        if (!uniform) {
            uniform = '';
        }

        var data = {
            name: $('#name').val(),
            startDateTime: moment($('#start-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            endDateTime: moment($('#end-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            location: $('#location').val(),
            meetingPlace: $('#meeting-place').val(),
            hours: parseFloat($('#hours').val()),
            driverHours: parseFloat($('#driver-hours').val()),
            uniform: uniform,
            isOnCampus: ($('input[name=is-on-campus]:checked', '#eventForm').val() === 'true'),
            attendingMembers: attendingMembers,
            removeMembers: removeMembers,
            attendingDrivers: attendingDrivers,
            removeDrivers: removeDrivers
        };

        console.log('sending request...');

        var eventUrl = '/events/' + $('.eventId').data('eventid') + '/edit';
        $.ajax({
            method: 'POST',
            url: eventUrl,
            data: data
        }).then(function(data, textStatus, jqXHR) {
            console.log('success');
            console.log(data);
            console.log(textStatus);
            $btn.button('reset');
            window.location.replace('/events/' + $('.eventId').data('eventid'));
        }, function(jqXHR, textStatus, error) {
            console.log('error');
            console.log(textStatus);
            console.log(error);
            $btn.button('reset');
        });
    });
});
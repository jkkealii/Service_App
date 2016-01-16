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


    // Manage current list of attending and people to remove from event
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
        console.log('currentAttendingMembers');
        console.log(currentAttendingMembers);
        console.log('currentRemoveMembers');
        console.log(currentRemoveMembers);

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
        console.log('currentAttendingMembers');
        console.log(currentAttendingMembers);
        console.log('currentRemoveMembers');
        console.log(currentRemoveMembers);

        $('#attending-members').data('attending-members', currentAttendingMembers);
        $('#attending-members').data('remove-members', currentRemoveMembers);
    };


    // Filling Current Event Details
    $('#name').val($('#name').data('original'));
    $('#location').val($('#location').data('original'));
    $('#hours').val($('#hours').data('original'));
    
    var refreshOptions = function() {
        $('.option').click(function(event) {
            $('#add-person').val($(this).data('name'));
            $('#add-person').data('member', $(this).data('member'));
            console.log('clicked');
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
        $('.rm-row').click(function(event) {
            var jThis = $(this);
            var attendingMember = jThis.parent().parent();
            console.log('user to remove ' + attendingMember.data('username'));
            removeAttendingMember(attendingMember.data('username'))
            attendingMember.remove();
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
        return '<tr class="attending-member" id="member' + member.objectId +
        '" data-username="' + member.username + '"><td>' +
        member.firstName + ' ' + member.lastName +
        '</td><td><button type="button" class="btn btn-default btn-xs rm-row">' +
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
        var addPerson = $('#add-person');
        if (addPerson.data('member')) {
            var member = addPerson.data('member');
            $('#attending-members').append(newAttendingMember(member));
            $('#member' + member.objectId).data('member', member);
            $('#member' + member.objectId).data('username', member.username);
            addAttendingMember(member.username);
            addPerson.removeData('member');
        } else {
            // what if they type in the whole name manually?
        }
        refreshRemoveButtons();
    });

    // allow event to be edited
    $('#edit-event').click(function() {
        $('#name').prop('disabled', false);
        $('#start-date').prop('disabled', false);
        $('#end-date').prop('disabled', false);
        $('#location').prop('disabled', false);
        $('#hours').prop('disabled', false);
        $('tbody button').prop('disabled', false);
        $('#add-person').prop('disabled', false);
        $('#confirm-add-person').prop('disabled', false);
        $('#update-event').prop('disabled', false);
    });


    // Add Original Attending Members to list for possible removal
    var potentialRemoves = [];
    $('.attending-member').each(function(index, element) {
        potentialRemoves.push($(element).data('username'));
    });
    $('#attending-members').data('original-members', potentialRemoves);
    $('#attending-members').data('attending-members', potentialRemoves);
    $('#attending-members').data('remove-members', []);


    // Update Event
    $('#update-event').click(function() {
        var $btn = $(this).button('loading');

        var attendingMembers = $('#attending-members').data('attending-members');
        var removeMembers = $('#attending-members').data('remove-members');

        var data = {
            name: $('#name').val(),
            startDateTime: moment($('#start-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            endDateTime: moment($('#end-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            location: $('#location').val(),
            hours: parseInt($('#hours').val()),
            attendingMembers: attendingMembers,
            removeMembers: removeMembers
        };

        console.log('sending request...');

        var eventUrl = '/events/' + $('.eventId').data('eventid');
        $.ajax({
            method: 'POST',
            url: eventUrl,
            data: data
        }).then(function(data, textStatus, jqXHR) {
            console.log('success');
            console.log(data);
            console.log(textStatus);
            $btn.button('reset');
            window.location.replace("/events");
        }, function(jqXHR, textStatus, error) {
            console.log('error');
            console.log(textStatus);
            console.log(error);
            $btn.button('reset');
        });
    });
});
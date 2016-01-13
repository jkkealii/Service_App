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

    // Filling Current Event Details
    $('#name').val($('#name').data('original'));
    $('#location').val($('#location').data('original'));
    $('#hours').val($('#hours').data('original'));
    
    $('.option').click(function(event) {
        $('#add-person').val($(this).data('name'));
        $('#add-person').data('member', $(this).data('member'));
    });

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
            // console.log('removing...');
            jThis.parent().parent().remove();
        });
    };

    refreshRemoveButtons();

    // Get all Members to show suggestions
    var newRowMember = function(member) {
        return '<li class="option" id="' + member.objectId + '" data-name="' + member.firstName +
        ' ' + member.lastName + '"><a href="#">' + member.firstName +
        ' ' + member.lastName + '</a></li>';
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
                $('#' + member.objectId).data('member', member);
                console.log($('#' + member.objectId).data('member'));
            });
        }, function(jqXHR, textStatus, error) {
            console.log('error');
            console.log(textStatus);
            console.log(error);
            $('#list-members').append('<li class="option">Error Loading Members</li>');
        });
    };
    $('#list-members').empty();
    getAllMembers();

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


    // Update Event
    $('#update-event').click(function() {
        var $btn = $(this).button('loading');

        var data = {
            name: $('#name').val(),
            startDateTime: moment($('#start-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            endDateTime: moment($('#end-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            location: $('#location').val(),
            hours: parseInt($('#hours').val())
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

    // $('#create-event').click(function() {
    //     var $btn = $(this).button('loading');

    //     var data = {
    //         name: $('#name').val(),
    //         startDateTime: moment($('#start-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
    //         endDateTime: moment($('#end-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
    //         location: $('#location').val(),
    //         hours: parseInt($('#hours').val())
    //     };

    //     console.log('sending request...');

    //     $.ajax({
    //         method: 'POST',
    //         url: '/events/new-event',
    //         data: data
    //     }).then(function(data, textStatus, jqXHR) {
    //         console.log('success');
    //         console.log(data);
    //         console.log(textStatus);
    //         $btn.button('reset');
    //         window.location.replace("/events");
    //     }, function(jqXHR, textStatus, error) {
    //         console.log('error');
    //         console.log(textStatus);
    //         console.log(error);
    //         $btn.button('reset');
    //     });
    // });
});
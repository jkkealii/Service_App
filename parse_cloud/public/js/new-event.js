$(function () {
    Parse.initialize("KDM3EFhGofXHgqVoffNXEDBRwYALGDVzzUpLJZkn", "RvLLrcjo6kbpubpjubyyd2gBDw5F5a4g7FGVUfAd");

    $('#datetimestart').datetimepicker({
        // focusOnShow: false //don't bring up keyboard on iOS
    });
    $('#datetimeend').datetimepicker({
        useCurrent: false //Important! See issue #1075
        // focusOnShow: false //don't bring up keyboard on iOS
    });
    $('#datetimestart').on('dp.change', function (e) {
        $('#datetimeend').data('DateTimePicker').minDate(e.date);
    });
    $('#datetimeend').on('dp.change', function (e) {
        $('#datetimestart').data('DateTimePicker').maxDate(e.date);
    });

    // $('#search-people').focus(function() {
    //     console.log('focus');
    //     $('.dropdown-toggle').dropdown('toggle');
    // });
    
    $('.option').click(function(event) {
        $('#add-person').val($(this).data('name'));
    });

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
    }

    refreshRemoveButtons();

    $('#create-event').click(function() {
        var data = {
            name: $('#name').val(),
            startDateTime: moment($('#start-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            endDateTime: moment($('#end-date').val(), 'MM/DD/YYYY hh:mm AA').toDate(),
            location: $('#location').val(),
            hours: parseInt($('#hours').val())
        };

        console.log('sending request...');

        $.ajax({
            method: 'POST',
            url: '/events/new-event',
            data: data
        }).then(function(data, textStatus, jqXHR) {
            console.log('success');
            console.log(data);
            console.log(textStatus);
        }, function(jqXHR, textStatus, error) {
            console.log('error');
            console.log(textStatus);
            console.log(error);
        });


        // console.log('saving event...');
        // console.log(Parse.User.current());
        // console.log(Parse.Session.current());
        // var EventType = Parse.Object.extend('Event');
        // var eventObject = new EventType();

        // var startDate = moment($('#start-date').val(), 'MM/DD/YYYY hh:mm AA').toDate();
        // var endDate = moment($('#end-date').val(), 'MM/DD/YYYY hh:mm AA').toDate();

        // eventObject.set('name', $('#name').val());
        // eventObject.set('startDateTime', startDate);
        // eventObject.set('endDateTime', endDate);
        // eventObject.set('location', $('#location').val());
        // eventObject.set('hours', parseInt($('#hours').val()));

        // eventObject.save().then(function(obj) {
        //     console.log('success');
        //     console.log(obj);
        // }, function(error) {
        //     console.log('error');
        //     console.log(error);
        // });
    });
});
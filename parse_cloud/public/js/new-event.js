$(function () {
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

    $('#create-event').click(function() {
        console.log($('#name').val());
    });
});
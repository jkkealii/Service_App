$(function () {
    var createMember = function () {
        var status = $('#status');
        var member = {
            firstName: $('#first-name').val(),
            lastName: $('#last-name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            year: $('#year').val()
        };

        status.text('Pending');
        $.ajax({
            url: "/api/members",
            method: "POST",
            data: member
        }).then(function (data) {
            console.log(data);
            status.text("Success");
            window.location.href = '/members';
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
    
    $('#create-member').click(createMember);
});

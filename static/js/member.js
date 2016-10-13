$(function () {
    var populateMember = function () {
        var status = $('#status');

        $('input').prop('disabled', true);
        status.text('Pending');
        $.ajax({
            url: "/api/members/" + $('#member-id').data('id'),
            method: "GET"
        }).then (function (data) {
            status.text("Success");
            var member = data.member;

            $('#first-name').val(member.firstName);
            $('#last-name').val(member.lastName);
            $('#phone').val(member.phone);
            $('#email').val(member.email);
            $('#year').val(member.year);

            $('#hours').text(member.hours ? member.hours : 0);

            $('#edit-member').prop('disabled', false).click(function () {
                $('input').prop('disabled', false);
                $('#update-member').prop('disabled', false);
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

    var updateMember = function () {
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
            url: "/api/members/" + $('#member-id').data('id'),
            method: "PUT",
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

    $('#edit-member').prop('disabled', true);
    $('#update-member').prop('disabled', true).click(updateMember);
    populateMember();
});

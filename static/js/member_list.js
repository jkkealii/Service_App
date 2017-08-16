$(function () {
    var createMember = function (member) {
        return '<tr><td><a href="/members/' + member.id + '">' + member.lastName +
                '</a></td><td>' + member.firstName +
                '</td><td>' + member.year + '</td><td>' + (member.hours || 0) +
                '</td><td><button class="delete-member" data-id="' + member.id +
                '">Delete</button></td></tr>';
    };
    var deleteMember = function () {
        var id = $(this).data("id");
        var status = $('#status');

        $.ajax({
            url: "/api/members/" + id,
            method: "DELETE"
        }).then(function (data) {
            console.log(data);
            status.text("Success deleting");
            populateMembers();
        }, function (obj) {
            var json = obj.responseJSON;
            console.log(json);
            status.text("Failed delete");
        });
    };
    var populateMembers = function () {
        var table = $('#members tbody');
        var status = $('#status');
        var semesterSelect = $('#semester-select').val();

        var urlMembers;
        if (semesterSelect === "current") {
            urlMembers = '/api/members?semester=true';
        } else if (semesterSelect === "all") {
            urlMembers = '/api/members';
        } else {
            urlMembers = '/api/members';
            console.error("Semester select invalid option");
        }

        status.text('Pending');
        $.ajax({
            method: 'GET',
            url: urlMembers
        }).then(function (data) {
            table.empty();
            status.text("Success");
            data.members.forEach(function (element) {
                table.append(createMember(element));
                $('.delete-member').unbind('click').click(deleteMember);
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
    $("#semester-select").change(function (event) {
        populateMembers();
    });

    populateMembers();
});

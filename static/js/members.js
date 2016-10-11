$(function () {
    var createMember = function (member) {
        return "<tr><td>" + member.lastName + "</td><td>" + member.firstName +
                "</td><td>" + member.year + "</td><td>" + (member.hours || 0) +
                "</td><td>BS</td></tr>";
    };
    var populateMembers = function () {
        var table = $('#members tbody');
        var status = $('#status');

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
            })
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
});

$(function () {
    var newRow = function(parseObject) {
        return '<tr><td>' + parseObject.name + '</td>' + 
            '<td>' + moment(parseObject.startDateTime.iso).format("MMMM Do YYYY, h:mm a") + 
            '</td>' + '<td><a href="https://maps.google.com/?q=' + parseObject.location +
            '">' + parseObject.location + '</a></td>' +
            '<td><a href="/events/' + parseObject.objectId + '" class="btn btn-primary btn-sm">Details</a></td></tr>';
    };

    $('table tbody').empty();
    $.ajax({
        method: 'GET',
        url: '/events/list',
    }).then(function(data, textStatus, jqXHR) {
        console.log('done');
        console.log(data);
        $.each(data.objects, function(index, value) {
            $('table tbody').append(newRow(value));
        });
    }, function(jqXHR, textStatus, error) {
        console.log(error);
        console.log(textStatus);
    });
});

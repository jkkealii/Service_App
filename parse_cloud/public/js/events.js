$(function () {
    var newRow = function(parseObject) {
        return '<tr><td>' + parseObject.get('name') + '</td>' + 
            '<td>' + parseObject.get('startDateTime') + '</td>' + 
            '<td><a href="maps.google.com/?q=' + parseObject.get('location') +
            '">' + parseObject.get('location') + '</a></td>' +
            '<td><a href="#" class="btn btn-primary btn-sm">Details</a></td></tr>';
    };

    $('table tbody').empty();
    $.ajax({
        method: 'GET',
        url: '/events/list',
    }).then(function(data, textStatus, jqXHR) {
        console.log('done');
        $.each(data, function(index, value) {
            $('table tbody').append(newRow(value));
        });
    }, function(jqXHR, textStatus, error) {
        console.log(error);
        console.log(textStatus);
    });
});

$(function () {
    var newRow = function(parseObject) {
        return '<tr><td><a href="/user/' + parseObject.objectId + '">' + parseObject.firstName + '</a></td>' + 
            '<td><a href="/users/' + parseObject.objectId + '">' + parseObject.lastName + '</a></td>' +
            '<td>' + parseObject.year + '</td>' + 
            '<td>' + parseObject.hours + '</td> ' +
            '<td><a href="/users/' + parseObject.objectId + '" class="btn buton btn-default btn-sm">Details</a></td></tr>';
    };

    $('table tbody').empty();

    $.ajax({
        method: 'GET',
        url: '/users/list',
    }).then(function(data, textStatus, jqXHR) {
        console.log('done');
        console.log(data);
        $.each(data.objects, function(index, value) {
            console.log(value);
            $('table tbody').append(newRow(value));
        });
    }, function(jqXHR, textStatus, error) {
        console.log(error);
        console.log(textStatus);
    });
});

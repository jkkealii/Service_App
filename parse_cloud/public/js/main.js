$(function() {
//     not jank
    var href = document.location.href;
    var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
    if (lastPathSegment !== '' && lastPathSegment !== '#hale' && lastPathSegment !== 'login' && lastPathSegment !== 'signup' && lastPathSegment !== '?login=success') {
        $('.navbar-default').addClass('on');
        $('.dropdown-menu').addClass('on');
    }
});

setCarouselHeight('#carousel-example');

function setCarouselHeight(id) {
    var slideHeight = [];
    $(id+' .item').each(function() {
        // add all slide heights to an array
        slideHeight.push($(this).height());
    });

    // find the tallest item
    max = Math.max.apply(null, slideHeight);

    // set the slide's height
    $(id+' .carousel-content').each(function() {
        $(this).css('height',max+'px');
    });
}

$(document).ready(function () {

    (function ($) {

        $('#filter-search').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })

    }(jQuery));

});
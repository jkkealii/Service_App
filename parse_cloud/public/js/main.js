$(function() {
//     not jank
/*
    var href = document.location.href;
    var lastPathSegment = href.substr(href.lastIndexOf('/') + 1);
*/
    if (!($('.pagelet').data("transparent-navbar"))) {
        $('.navbar-default').addClass('on');
        $('.dropdown-menu').addClass('on');
    }
    
    function findBootstrapEnvironment() {
        var envs = ['xs', 'sm', 'md', 'lg'];
    
        var $el = $('<div>');
        $el.appendTo($('body'));
    
        for (var i = envs.length - 1; i >= 0; i--) {
            var env = envs[i];
    
            $el.addClass('hidden-'+env);
            if ($el.is(':hidden')) {
                $el.remove();
                return env;
            }
        }
    }
    
    if (findBootstrapEnvironment() === 'sm') {
        $('.sm-hide').hide();
    } else {
        $('.sm-hide').show();
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
                return rex.test($(this).text()) && ($(this).data('searchable'));
            }).show();

        })

    }(jQuery));

});

$('.spin-on-hover').hover(
       function(){ $(this).addClass('fa-spin') },
       function(){ $(this).removeClass('fa-spin') }
)

$('.pulse-on-hover').hover(
       function(){ $(this).addClass('fa-pulse') },
       function(){ $(this).removeClass('fa-pulse') }
)
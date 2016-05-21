// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

(function ($) {
    'use strict';

    /* ==============================================
    Testimonial Slider
    =============================================== */ 

    $('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 40
                }, 900);
                return false;
            }
        }
    });

    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 120;
        var href = document.location.href;
        var lastPathSegment = href.substr(href.lastIndexOf('/') + 1); 
        if (findBootstrapEnvironment() === 'md' || findBootstrapEnvironment() === 'lg') {
            if ($(window).scrollTop() > navHeight) {
                $('.navbar-default').addClass('on');
                $('.dropdown-menu').addClass('on');
            } else {
                $('.navbar-default').removeClass('on');
                $('.dropdown-menu').removeClass('on');
            }
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    });
    
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
    
    $(function() {
       if ($('.pagelet').data("transparent-navbar") && findBootstrapEnvironment() === 'xs' || findBootstrapEnvironment() === 'sm') {
           $('.navbar-default').addClass('on');
           $('.dropdown-menu').addClass('on');
       } 
    });

/*
    $('.navbar-default').removeClass('on');
    $('.dropdown-menu').removeClass('on');
*/


})(jQuery);


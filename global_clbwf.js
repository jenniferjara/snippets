$(function () {

    $('#header .toggle').click(function () {

        var $menu = $(this).parent().find('.menu');
        if ($menu.hasClass('open')) {
            $menu.removeClass('open');
        }
        else {
            $menu.addClass('open');
        }

    });

    $('.share-fb').click(function (e) {
        e.preventDefault();
        window.open($(this).attr('href'), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });


    $('.fancybox').fancybox({
        maxWidth: 500,
        maxHeight: 520,
        padding:40
    });

});

function showOverlay() {
    $('#overlay').show();
}

function hideOverlay() {
    $('#overlay').hide();
}

function openFancybox(selector) {
    $.fancybox({
        'autoScale': true,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 500,
        'speedOut': 300,
        'autoDimensions': true,
        'centerOnScroll': true,
        'href': selector
    });
}
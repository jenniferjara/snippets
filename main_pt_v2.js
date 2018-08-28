(function($) {

    'use strict';

    var scrollMenus = function () {
        var id = $(this).find('a').attr("href"), posi, ele, padding = 61;
        ele = $(id); posi = ($(ele).offset()||0).top - padding;

        $('html, body').animate({scrollTop:posi}, 1200);
    };

   	var scrollNav = function() {
		var start_change = $('.navbar');
			start_change.toggleClass('is-fill', $(this).scrollTop() > start_change.height());
	};

    var move = function(){
        $(this).addClass("animated rubberBand");
    };
    var quiet = function(){
        $(this).removeClass("animated rubberBand")
    };

    var typed = new Typed('#typed', {
        strings: ["Frontend Developer jr.", "Self-taught.", "UX Designer newbie."],
        typeSpeed: 120,
        backSpeed: 100,
        backDelay: 800,
        startDelay: 800,
        loop: true
    });

    var startPage = function () {
        typed.start();
        $('.bxslider').bxSlider({
            controls: false,
            mode: 'vertical',
            slideMargin: 30
        });

        $("li[class^='option-']").mouseenter(move);
        $("li[class^='option-']").mouseleave(quiet);

        $(document).scroll(scrollNav);

        //language=JQuery-CSS
        $('ul.nav.navbar-nav > li').on("click", scrollMenus);
        $('ul.hero_links_main:nth-child(1) > li').on("click", scrollMenus);
        $('a.nav_top').on("click", function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 1200);
        });


    };

	$(document).ready(startPage);


})(window.jQuery);
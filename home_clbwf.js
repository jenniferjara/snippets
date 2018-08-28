$(document).ready(function () {

    var shownFooterForm = true;

    if ($(".single-section").length > 0) {
        if ($(window).width() > 991) {

            $.scrollify({
                section: ".single-section",
                sectionName: "section-name",
                easing: "easeOutExpo",
                scrollSpeed: 1100,
                offset: 0,
                scrollbars: true,
                standardScrollElements: "",
                setHeights: true,
                before: function (e) {

                    $('#header .menu a .single-menu').removeClass('active');
                    $('#header .menu a:nth-child(' + e + ') .single-menu').addClass('active');

                    $('#navigation li .circle').removeClass('active');
                    $('#navigation li:nth-child(' + (e + 1) + ') .circle').addClass('active');
                },
                after: function (e) {
                    var number = e;
                    if (number == 1) {
                        ga('send', 'event', 'seccion', 'view', 'que_es');
                    }
                    if (number == 2) {
                        ga('send', 'event', 'seccion', 'view', 'asistencia');
                    }
                    if (number == 3) {
                        ga('send', 'event', 'seccion', 'view', 'beneficios')
                    }
                    if (number == 4) {
                        ga('send', 'event', 'seccion', 'view', 'cuanto_cuesta');
                    }
                },
                afterResize: function () {
                },
                afterRender: function () {
                }
            });

            $('#header .menu a.prevent, .go-to-menu').click(function (e) {
                e.preventDefault();

                var name = $(this).attr('href');

                $.scrollify.move(name);

                var $menu = $(this).parent();
                if ($menu.hasClass('open')) {
                    $menu.removeClass('open');
                }

            });

            $('#header .logo img').click(function () {

                $.scrollify.move('#home');

            });

            $('.single-section[data-section-name="home"] .button').click(function () {

                $.scrollify.move('#club-wuf');

            });

            $('#navigation li').click(function () {

                var target = $(this).data('target');
                $.scrollify.move(target);

            });

        }
        else {

            $('#header .logo img').click(function () {

                $("html, body").animate({scrollTop: "0"});

            });

            $('.single-section[data-section-name="home"] .button').click(function () {

                $("html, body").animate({scrollTop: $('.single-section[data-section-name="club-wuf"]').offset().top + 'px'});

            });

            $('#header .menu a.prevent, .go-to-menu').click(function (e) {
                e.preventDefault();

                if ($(this).hasClass('prevent')) {
                    $('#header .toggle').click();
                }

                var name = $(this).attr('href').substring(1);

                $("html, body").animate({scrollTop: $('.single-section[data-section-name="' + name + '"]').offset().top + 'px'});

                var $menu = $(this).parent();
                if ($menu.hasClass('open')) {
                    $menu.removeClass('open');
                }

            });

            $(window).on('hashchange', function (e) {
                var name = window.location.hash;
                var name_clean = name.substr(1);
                if (name.length) {
                    $('html, body').animate({
                        scrollTop: $('.single-section[data-section-name="' + name_clean + '"]').offset().top
                    });
                }
            });

            $(window).on('load', function () {
                $(window).trigger('hashchange');
            });

        }


        /**
         *
         * @type {*|jQuery|HTMLElement}
         */

        $('.contact-form select').customSelect();

        $(window).on('resize', function () {
            $('.contact-form select').trigger('render');
        });

        var $contactForm = $('#contact_form');
        $('.select-reason-container select').on('change', function () {
            $('.select-reason-container .customSelect').css('background-color', '#ffffff');
            $contactForm.valid();
            if($('.select-reason-container select').hasClass('error')) {
                $('.select-reason-container .customSelect').css('background-color', '#ffb9b9');
            }
        });

        $('.contact-form a.send').on('click', function (e) {
            e.preventDefault();
            $('.contact-form label.error').remove();
            $contactForm.validate({
                'errorPlacement': function (error, element) {
                    if (element.attr("name") == "reason") {
                        error.insertAfter(".select-reason-container");
                        $('.select-reason-container .customSelect').css('background-color', '#ffb9b9');
                    } else {
                        error.insertAfter(element);
                    }
                }
            });
            if ($contactForm.valid()) {
                showOverlay();
                $.post($contactForm.attr('action'), $contactForm.serialize(), function (response) {

                    if (response.status === 'success') {
                        ga('send', 'event', 'button', 'click', 'btn_send_form');
                        $contactForm.trigger('reset');
                        $contactForm.hide();
                        $('#success_contact').show();
                        $('#success_contact .close-success').off();
                        $('#success_contact .close-success').click(function () {
                            $('#success_contact').hide();
                            $contactForm.show();
                            hideFooterForm(false);
                        });
                    } else {
                        openFancybox('#error_contact');
                    }

                    hideOverlay();
                });
            }
        });

        /**
         *
         * @type {boolean}
         */
        $('.contact-form .toggle').on('click', function (e) {
            e.preventDefault();
            if (shownFooterForm) {
                hideFooterForm(true);
            } else {
                showContactForm();
            }
        });
        $(window).on('resize', function () {
            setTimeout(function () {
                if (shownFooterForm) {
                    hideFooterForm(false);
                }
            }, 800);
        });

        $(window).resize();

        function hideFooterForm(animated) {
            if (animated) {
                var bottom = ($('body').outerHeight() - $('.contact-form-title').offset().top) * -1 + ($('.contact-form-title').height() + 12);
                $('.contact-form').animate({'bottom': bottom});
            } else {
                var bottom = ($('body').outerHeight() - $('.contact-form-title').offset().top) * -1 + ($('.contact-form-title').height() + 15);
                $('.contact-form').css({'bottom': bottom});
            }
            $('.contact-form .toggle').removeClass('active');
            shownFooterForm = false;
        }

        function showContactForm() {
            $('.contact-form').animate({'bottom': '0px'});
            $('.contact-form .toggle').addClass('active');
            shownFooterForm = true;
        }

    }

});
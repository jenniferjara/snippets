$(function () {

    var fullpage_current_index = 1;
    var fullpage_responsive_width = 992;
    var fullpage_responsive_height = 700;
    var videobg_dir = ASSETS_PATH + '/videos/bg';
    var postulant_form_visible = false;

    var Utils = {
        viewport_width: function () {
            return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        },
        viewport_height: function () {
            return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        }
    };

    var Global = {
        init: function () {
            this.fullpage();
            this.video_bg();
            this.menu_mobile();
            this.reviews();
            this.work();
            this.detail();
            this.resize_window();
            this.forms();
            $.material.init();
            $('.custom-select').customSelect();


            //
            if (window.location.hash && window.location.hash === '#postula') {
                $.fn.fullpage.moveTo(5, 0);
                $('#btn_wanna_be_part').click();
            }

        },
        utils: function () {
            return Utils;
        },
        fullpage: function () {
            $('#fullpage').fullpage({
                responsiveWidth: fullpage_responsive_width,
                responsiveHeight: fullpage_responsive_height,
                anchors: ['inicio', 'por-que', 'hablemos', 'que-dicen', 'transformemos'],
                menu: '#menu_bullets',
                fixedElements: '#menu_bullets',
                resize: true,
                onLeave: function (anchorLink, index, slideAnchor, slideIndex) {
                    Global.__toggle_menu_mobile(true);
                    Global.__hide_detail();
                },
                afterLoad: function (anchorLink, index) {
                    fullpage_current_index = index;
                }
            });
        },
        resize_window: function () {
            $(window).on('resize', function () {
                var h = Global.utils().viewport_height();
                setTimeout(function () {
                    var top = 0;
                    if (postulant_form_visible) {
                        top = (h < fullpage_responsive_height) ? 0 : $('header').outerHeight();
                    } else {
                        top = $('.section-contact').outerHeight() - 100;
                    }
                    $('.section-contact .footer-row').css({'top': top + 'px'});
                }, 700);

                $('.custom-select').trigger('render');

            });

            $(window).trigger('resize');
        },
        video_bg: function () {
            $('#video_bg').vide(videobg_dir, {
                loop: true,
                muted: true,
                position: '0% 0%',
                resizing: true
            });
        },
        menu_mobile: function () {
            $('.btn-menu').on('click', function (e) {
                e.preventDefault();
                Global.__toggle_menu_mobile(false);
            });
            $('.btn-menu-close').on('click', function (e) {
                e.preventDefault();
                Global.__toggle_menu_mobile(true);
            });
            $('#menu ul a').on('click', function (e) {
                if ($(this).data("menuindex") === fullpage_current_index) {
                    Global.__toggle_menu_mobile(true);
                }
            });
        },
        reviews: function () {
            var reviews = $('#slider_reviews').bxSlider({
                pagerCustom: '#pager_reviews',
                controls: false,
                auto: true,
                pause: 6000,
                onSlideBefore: function ($slideElement, oldIndex, newIndex) {
                    $('#circles_pager a').removeClass('active');
                    $('#circle_pager_' + newIndex).addClass('active');
                }
            });
            $('#circles_pager a').on('click', function (e) {
                e.preventDefault();
                var index = $(this).data('slide-index');
                reviews.goToSlide(index);
            });
        },
        work: function () {
            $('#btn_wanna_be_part').on('click', function (e) {
                e.preventDefault();
                var w = Global.utils().viewport_width();

                if (w < fullpage_responsive_width) {
                    $('html, body').animate({scrollTop: $(".content-footer .form-container").offset().top - $('header').outerHeight()}, 500);
                } else {
                    var h = Global.utils().viewport_height();
                    var top = (h < fullpage_responsive_height) ? 0 : $('header').outerHeight();
                    $('.section-contact .footer-row').animate({'top': top + 'px'}, 500, function () {
                        postulant_form_visible = true;
                        $('#btn_wanna_be_part').fadeOut(function () {
                            $('#close_form_work').fadeIn();
                        });
                    });
                }

            });
            $('#close_form_work').on('click', function (e) {
                e.preventDefault();
                var top = $('.section-contact').outerHeight() - 100;
                $('.section-contact .footer-row').animate({'top': top + 'px'}, 500, function () {
                    postulant_form_visible = false;
                    $('#close_form_work').fadeOut(function () {
                        $('#btn_wanna_be_part').fadeIn();
                    });
                });
            });
        },
        detail: function () {
            $('.show-detail').on('click', function (e) {
                e.preventDefault();
                var element = $(this);
                var direction = element.hasClass('show-detail-rigth') ? 'right' : 'left';
                if (!element.hasClass('show-detail-home')) {
                    Global.__hide_detail(direction, function () {
                        Global.__show_detail('#' + element.data('detail'), direction);
                    });
                } else {
                    Global.__show_detail('#' + element.data('detail'), 'right');
                }
            });
            $('.close-detail').on('click', function (e) {
                e.preventDefault();
                Global.__hide_detail();
            });
        },
        forms: function () {

            $.validator.addMethod("complete_email", function (value, element) {
                return /^([a-zA-Z0-9_.\-+])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(value);
            }, "Ingrese un correo válido.");

            $.validator.addMethod("not_empty", function (value, element) {
                return (value !== "");
            }, "El campo no puede estar vacío.");

            $.validator.addMethod("extension", function (value, element, param) {
                param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            }, $.validator.format("Please enter a value with a valid extension."));

            var form_contact = $('#form_contact');
            var form_postulant = $('#form_postulant');

            form_contact.validate({
                rules: {
                    full_name: {
                        required: true
                    },
                    contact_email: {
                        required: true,
                        complete_email: true
                    },
                    company: {
                        required: true
                    },
                    message: {
                        required: true
                    },
                    position: {
                        required: true
                    }
                }
            });

            form_postulant.validate({
                rules: {
                    full_name: {
                        required: true
                    },
                    contact_email: {
                        required: true,
                        complete_email: true
                    },
                    telephone: {
                        required: true,
                        digits: true
                    },
                    city: {
                        not_empty: true
                    },
                    study_grade: {
                        not_empty: true
                    },
                    study_center: {
                        not_empty: true
                    },
                    study_career: {
                        not_empty: true
                    },
                    message: {
                        required: true
                    },
                    cv: {
                        required: true,
                        extension: "doc|docx|pdf"
                    }
                },
                messages: {
                    city: {
                        'not_empty': 'Seleccione una ciudad.'
                    },
                    cv: {
                        'extension': 'Seleccione un archivo .doc, .docx o .pdf.'
                    }
                },
                errorPlacement: function (error, element) {
                    if (element.hasClass('custom-select')) {
                        error.insertAfter($(element).siblings('.form-control'));
                    } else if (element.attr("name") == "cv") {
                        error.insertAfter($(element).siblings('.input-group'));
                    } else {
                        error.insertAfter(element);
                    }
                }
            });

            form_contact.on('submit', function (e) {
                e.preventDefault();
                if (form_contact.valid()) {

                    Global.__show_overlay_web();

                    $.post(form_contact.attr('action'), form_contact.serialize(), function (response) {
                        if (response.result == 'success') {
                            form_contact.trigger('reset');
                            openModal('#modal_success_contact');
                        } else {
                            openModal('#modal_error');
                        }

                        Global.__hide_overlay_web();
                    });
                }
            });


            form_postulant.on('submit', function (e) {
                e.preventDefault();
                if (form_postulant.valid()) {

                    Global.__show_overlay_web();

                    var fd = new FormData();
                    fd.append('_token', $('#_token_p').val());
                    fd.append('full_name', $('#full_name_p').val());
                    fd.append('contact_email', $('#contact_email_p').val());
                    fd.append('telephone', $('#telephone_p').val());
                    fd.append('city', $('#city_p').val());
                    fd.append('study_career', $('#study_career').val());
                    fd.append('study_center', $('#study_center').val());
                    fd.append('study_grade', $('#study_grade').val());
                    fd.append('message', $('#message_p').val());
                    fd.append('cv', $('#cv_p')[0].files[0]);

                    $.ajax({
                        url: form_postulant.attr('action'),
                        data: fd,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        success: function (response) {
                            if (response.result == 'success') {
                                form_postulant.trigger('reset');
                                $('span.city-select .customSelectInner').html('Ciudad - País de interés');
                                $('span.study-grade-select .customSelectInner').html('Grado académico');
                                $('span.study-career-select .customSelectInner').html('Carrera');
                                $('span.study-center-select .customSelectInner').html('Centro de estudios');
                                $('span.position-select .customSelectInner').html('Puesto al que desea postular');
                                openModal('#modal_success_postulant');
                            } else {
                                openModal('#modal_error');
                            }

                            Global.__hide_overlay_web();
                        }
                    });

                }
            });


            $('.btn-submit-transformemos').on('click', function (e) {
                e.preventDefault();
                form_contact.submit();
            });

            $('.btn-submit-postula').on('click', function (e) {
                e.preventDefault();
                form_postulant.submit();
            });

        },
        __show_detail: function (selector, direction) {
            $('.detail-trans').animate({scrollTop: 0}, "fast");

            if (typeof direction == "undefined") {
                direction = "left";
            }

            $('.detail-trans').removeClass('active');
            var detail = $(selector);
            if (direction == "left") {
                detail.css({'left': '100vw'}).animate({'left': '0px'}, function () {
                    detail.addClass('active');
                    $('body').addClass('no-overflow');
                });
            } else {
                detail.animate({'left': '0px'}, function () {
                    detail.addClass('active');
                    $('body').addClass('no-overflow');
                });
            }
        },
        __hide_detail: function (direction, callback) {
            if (typeof direction == "undefined") {
                direction = "left";
            }

            var detail = $('.detail-trans.active');
            detail.removeClass('active');
            if (direction == "right") {
                detail.animate({'left': '100vw'}, function () {
                    detail.css({'left': '-100vw'});
                    if (typeof callback != "undefined") {
                        callback();
                    }
                    $('body').removeClass('no-overflow');
                });
            } else {
                detail.animate({'left': '-100vw'}, function () {
                    if (typeof callback != "undefined") {
                        callback();
                    }
                    $('body').removeClass('no-overflow');
                });
            }
        },
        __toggle_menu_mobile: function (menu_opened) {
            if (menu_opened === true) {
                $('#menu').animate({'top': '-100vh'}, function () {
                    menu_opened = false;
                    $('#menu').removeClass('animated bounce');
                });
            } else {
                $('#menu').animate({'top': '0px'}, function () {
                    menu_opened = true;
                });
                $('#menu').addClass('animated bounce');
            }
        },
        __show_overlay_web: function () {
            $('.overlay-web').show();
        },
        __hide_overlay_web: function () {
            $('.overlay-web').hide();
        }
    };
    Global.init();
});

function openModal(selector) {
    $.fancybox({
        'autoScale': true,
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 500,
        'speedOut': 300,
        'autoDimensions': true,
        'centerOnScroll': true,
        'href': selector,
        closeBtn: false,
        padding: 40,
        minWidth: "40%",
        maxWidth: "495"
    });
}
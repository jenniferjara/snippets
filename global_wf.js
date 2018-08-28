$(function () {
    var global = {
        init: function () {
            this.all();
            this.home();
            this.join();
            this.adopt();
            this.application();
            this.poll();
            this.visitor();
            this.subscription();
            this.gaEvents();

            if ($('.customselect').length > 0) {
                $(window).on('resize', function () {
                    $('.customselect').trigger('render');
                });
            }

            $('.ga-link-club-wuf').on('click', function () {
                if (global.isProduction()) {
                    ga('send', 'event', 'link', 'click', 'club_wuf');
                }
            });
        },
        show_overlay: function () {
            $('#overlaywuf').addClass('visible');
        },
        hide_overlay: function () {
            $('#overlaywuf').removeClass('visible');
        },
        all: function () {


            $(window).on('resize', function () {
                var w = $('.modal').outerWidth();
                $('.modal').css('margin-left', '-' + (w / 2) + 'px');
            });

            var menu_shown = false;
            $('.menu-mobile .closer a, .mobile-menu-opener').on('click', function (e) {
                e.preventDefault();
                if (menu_shown === false) {
                    $('.menu-mobile').animate({right: '0px'}, 500);
                    menu_shown = true;
                } else {
                    $('.menu-mobile').animate({right: '-650px'}, 500);
                    menu_shown = false;
                }
            });

            var formfooter = $('#formfooter');
            formfooter.validate({
                rules: {
                    idea_f: {
                        required: true
                    },
                    email_f: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    idea_f: {
                        required: "El campo comentario es obligatorio"
                    },
                    email_f: {
                        required: "El campo e-mail es obligatorio"
                    }
                },
                errorPlacement: function (error, element) {
                    error.insertAfter("#formfooter textarea");
                }
            });

            $('#formfooter a.send').on('click', function (e) {
                e.preventDefault();
                if (formfooter.valid()) {
                    global.show_overlay();

                    $.post(formfooter.attr('action'), formfooter.serialize(), function (response) {
                        if (response.status == "success") {
                            $('#formfooter input[type=text]').val('');
                            $('#formfooter textarea').val('');
                            alert('Gracias por enviarnos tu idea.');
                        } else {
                            alert('Ocurrió un error. Verifique los datos e intente nuevamente.');
                        }

                        global.hide_overlay();
                    });
                }
            });


            $("input[name='telephone']").keydown(function (e) {
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode == 67 && e.ctrlKey === true) || (e.keyCode == 88 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
                    return;
                }
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });

        },
        home: function () {
            if ($('#video-wuf-icon-modal').length > 0) {
                $('#video-wuf-icon-modal').on('click', function (e) {
                    e.preventDefault();

                    global.show_overlay();

                    var href = $(this).attr('href');
                    $('.video-modal iframe').attr('src', href);
                    $('.video-modal iframe').on('load', function () {
                        if ($(this).attr('src') != '') {
                            $(window).scrollTo(0, 500);
                            $('.video-modal').removeClass('hidden');
                            global.hide_overlay();
                        }
                    });
                });

                $('.close-modal-video').on('click', function (e) {
                    e.preventDefault();
                    $('.video-modal').addClass('hidden');
                    $('.video-modal iframe').attr('src', '');
                });
            }
        },
        join: function () {
            if ($('.joinpage').length > 0) {
                var formrefuge = $('#refugeform');
                var validatorrefuge = formrefuge.validate({
                    rules: {
                        name: {
                            required: true
                        },
                        address: {
                            required: true
                        },
                        responsible: {
                            required: true
                        },
                        dni: {
                            required: true,
                            digits: true,
                            maxlength: 8,
                            minlength: 8
                        },
                        telephone: {
                            required: true,
                            digits: true,
                            minlength: 7,
                            maxlength: 9
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        ubigeo_id: {
                            required: true,
                            digits: true
                        },
                        cant_dogs_0: {
                            required: true,
                            digits: true,
                            min: 1
                        }
                    },
                    errorPlacement: function (error, element) {
                        if (element.attr("name") === "ubigeo_id") {
                            error.insertAfter("#refugeform .customSelect");
                        } else if (element.attr("name") === "cant_dogs_0") {
                            error.insertAfter("#refugeform .block_cant_dogs_0");
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });

                $('#refugeform a.send').on('click', function (e) {
                    e.preventDefault();
                    $('.ubigeo_id_r').change();
                    if (formrefuge.valid()) {
                        global.show_overlay();

                        $.post(formrefuge.attr('action'), formrefuge.serialize(), function (response) {
                            $('#refugeform input[type=text]').val('');
                            $('#refugeform textarea').val('');
                            $('#refugeform select').prop('selectedIndex', 0);
                            $('.ubigeo_id_r .customSelectInner').html('Distrito');
                            alert('El albergue ha sido registrado, pronto nos comunicaremos contigo');

                            global.hide_overlay();

                            window._fbq.push(['track', '6031469905291', {'value': '0.00', 'currency': 'USD'}]);
                        });
                    }
                });

                $('.ubigeo_id_r').on('change', function () {
                    if (!validatorrefuge.element("#ubigeo_id_r")) {
                        $('.ubigeo_id_r').css('border-color', '#DF0101');
                    } else {
                        $('.ubigeo_id_r').css('border-color', '#939393');
                    }
                });
            }
        },
        application: function () {
            if ($('#application_form').length > 0) {

                $.validator.addMethod("valueNotEquals", function (value, element, arg) {
                    return arg != value;
                }, "Seleccione una opción.");


                var formapplication = $('#application_form');
                var validatorapplication = formapplication.validate({
                    rules: {
                        name: {
                            required: true
                        },
                        lastname: {
                            required: true
                        },
                        address: {
                            required: true
                        },
                        ubigeo_id: {
                            valueNotEquals: ''
                        },
                        telephone: {
                            required: true,
                            digits: true,
                            minlength: 9,
                            maxlength: 9
                        },
                        other_telephone: {
                            digits: true,
                            minlength: 7,
                            maxlength: 7
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        birth_date: {
                            required: true
                        },
                        dni: {
                            required: true,
                            digits: true,
                            maxlength: 8,
                            minlength: 8
                        },
                        marital_status: {
                            valueNotEquals: ''
                        },
                        occupation: {
                            required: true
                        },
                        study_work_place: {
                            required: true
                        }
                    },
                    errorPlacement: function (error, element) {
                        if (element.attr("name") === "ubigeo_id") {
                            error.insertAfter("#application_form span.ubigeo_select");
                        } else if (element.attr("name") === "marital_status") {
                            error.insertAfter("#application_form span.marital_status_select");
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });

                $('#application_form a.send').on('click', function (e) {
                    var url = $(this).attr('href');

                    e.preventDefault();
                    if (formapplication.valid()) {
                        global.show_overlay();

                        $.post(formapplication.attr('action'), formapplication.serialize(), function (response) {
                            $('#application_form').trigger('reset');
                            $('span.ubigeo_select .customSelectInner').html('Distrito');
                            $('span.marital_status_select .customSelectInner').html('Estado civil');
                            global.hide_overlay();
                            $('#modalcont').modal({zIndex: 10000001});

                            if (global.isProduction()) {
                                ga('send', 'event', 'button', 'click', 'form_step_one_complete');
                            }
                        });
                    }
                });

            }
        },
        poll: function () {
            if ($('#poll_form').length > 0) {

                $.validator.addMethod("valueNotEquals", function (value, element, arg) {
                    return arg != value;
                }, "Seleccione una opción.");

                $("textarea[name='ideal']").keyup(function () {
                    $("#count_chars_left").text(parseInt($(this).attr('maxlength')) - $(this).val().length);
                });

                var formpoll = $('#poll_form');
                var validatorpoll = formpoll.validate({
                    rules: {
                        size_house: {
                            valueNotEquals: ''
                        },
                        economy_family: {
                            valueNotEquals: ''
                        },
                        family_agree_level: {
                            valueNotEquals: ''
                        },
                        pet_responsible: {
                            valueNotEquals: ''
                        },
                        adults: {
                            required: true,
                            digits: true,
                            min: 1,
                            max: 10
                        },
                        children: {
                            valueNotEquals: ''
                        },
                        ideal: {
                            required: true,
                            maxlength: 300
                        }
                    },
                    errorPlacement: function (error, element) {
                        if (element.attr("name") === "size_house") {
                            error.insertAfter("#poll_form span.size_house");
                        } else if (element.attr("name") === "economy_family") {
                            error.insertAfter("#poll_form span.economy_family");
                        } else if (element.attr("name") === "family_agree_level") {
                            error.insertAfter("#poll_form span.family_agree_level");
                        } else if (element.attr("name") === "pet_responsible") {
                            error.insertAfter("#poll_form span.pet_responsible");
                        } else if (element.attr("name") === "children") {
                            error.insertAfter("#poll_form span.children");
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });


                $('#poll_form a.send').on('click', function (e) {
                    e.preventDefault();
                    if (formpoll.valid()) {
                        global.show_overlay();

                        $.post(formpoll.attr('action'), formpoll.serialize(), function (response) {
                            if (response.status == 'success') {
                                $('#modalfinal').modal();
                            } else if (response.status == 'adopted') {
                                alert('¡Oops! Alguien completó la solicitud de adopción para este Wuf antes que tú. Otros Wufs esperan por ti.');
                                window.location.href = '/adopta';
                            } else {
                                alert('Ocurrió un error al procesar su solicitud.');
                            }

                            global.hide_overlay();

                            global.pixelFacebook();
                            global.pixelAdwords();
                        });
                    }
                });

            }
        },
        adopt: function () {
            if ($('.filterswuf').length > 0) {
                $('.filterswuf select').on('change', function () {
                    var form = $('#filter_form');
                    $.post(form.attr('action'), form.serialize(), function (response) {
                        $('.dogs-list').html(response);
                    });
                });
            }

            if ($('.blockselectcanbealone').length > 0) {
                $(window).on('resize', function () {
                    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    var width_form = $('.filterswuf').width();

                    var width_select = '0';
                    if (w <= 1023) {
                        width_select = (width_form - 44) + 'px';
                    } else {
                        width_select = '14%';
                    }

                    $('.blockselectcanbealone').width(width_select);
                });
                $(window).resize();
            }

            if ($('.notfoundform').length > 0) {

                $.validator.addMethod("valueNotEquals", function (value, element, arg) {
                    return arg != value;
                }, "Seleccione una opción.");

                var formnotfound = $('.notfoundform form');
                formnotfound.validate({
                    rules: {
                        name: {
                            required: true
                        },
                        lastname: {
                            required: true
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        sex: {
                            valueNotEquals: ''
                        },
                        size: {
                            valueNotEquals: ''
                        }
                    },
                    errorPlacement: function (error, element) {
                        if (element.attr("name") === "sex") {
                            error.insertAfter("span.selectsexnf");
                        } else if (element.attr("name") === "size") {
                            error.insertAfter("span.selectsizenf");
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });

                $('.notfoundform form a').on('click', function (e) {
                    e.preventDefault();
                    if (formnotfound.valid()) {
                        global.show_overlay();

                        $.post(formnotfound.attr('action'), formnotfound.serialize(), function (response) {
                            if (response.status == "success") {
                                $('.notfoundform form input[type=text]').val('');
                                $('.notfoundform form textarea').val('');
                                $('.notfoundform form select').prop('selectedIndex', 0);
                                $('.notfoundform form .selectsexnf .customSelectInner').html('Selecciona el sexo');
                                $('.notfoundform form .selectsizenf .customSelectInner').html('Selecciona el tamaño');

                                if (global.isProduction()) {
                                    ga('send', 'event', 'button', 'click', 'wuf_ideal_form');
                                }
                                alert('Fuiste agregado a nuestra lista de espera.\n¡Gracias por ser parte de WUF!');

                            } else if (response.status == "email_duplicate") {
                                alert('Su correo ya fue registrado previamente.')
                            } else {
                                alert('Ocurrió un error durante la suscripción. Intente nuevamente por favor.')
                            }

                            global.hide_overlay();
                        });
                    }
                });

            }

            if ($(".tabs-menu a").length > 0) {
                $(".tabs-menu a").click(function (event) {
                    event.preventDefault();
                    $(this).parent().addClass("current");
                    $(this).parent().siblings().removeClass("current");
                    var tab = $(this).attr("href");
                    $(".tab-content").not(tab).css("display", "none");
                    $(tab).fadeIn();
                });
            }

        },
        visitor: function () {

            var form = $('#formmodalvisitor');
            form.validate({
                rules: {
                    name: {
                        required: true
                    },
                    lastname: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    dni: {
                        required: true,
                        digits: true,
                        minlength: 8,
                        maxlength: 15
                    },
                    telephone: {
                        required: true,
                        digits: true,
                        minlength: 7,
                        maxlength: 9
                    }
                },
                errorPlacement: function (error, element) {
                    error.insertAfter(element);
                }
            });

            $('.actions a', form).on('click', function (e) {
                e.preventDefault();
                if (form.valid()) {
                    form.submit();
                }
            });

            form.on('submit', function (e) {
                e.preventDefault();
                global.show_overlay();
                var action = $(this).attr('action');
                $.post(action, $(this).serialize(), function (response) {
                    global.hide_overlay();
                    $.modal.close();
                    $('#modalsuccessvisitor').modal({zIndex: 10000001});
                    if (global.isProduction()) {
                        ga('send', 'event', 'button', 'click', 'meet_wuf_registered');
                    }
                });
            });

            $('#btn_wantoknow_yes').on('click', function (e) {
                e.preventDefault();
                $.modal.close();
                $('#modalvisitor').modal({zIndex: 10000001});
            });

        },
        subscription: function () {
            if ($('#modalavailable').length > 0) {
                $('#modalavailable form a').on('click', function (e) {
                    e.preventDefault();

                    var form = $('#modalavailable form');
                    form.validate({
                        rules: {
                            name: {
                                required: true
                            },
                            email: {
                                required: true,
                                email: true
                            }
                        }
                    });

                    if (form.valid()) {
                        global.show_overlay();
                        $.post(form.attr('action'), form.serialize(), function (response) {
                            if (response.status == "success") {
                                $.modal.close();
                            } else if (response.status == "email_duplicate") {
                                alert('Su correo ya fue registrado previamente.')
                            } else {
                                alert('Ocurrió un error durante la suscripción. Intente nuevamente por favor.')
                            }
                            global.hide_overlay();
                        });
                    }

                });
            }
        },
        gaEvents: function () {
            if (global.isProduction()) {

                $('#btn_facebook_home').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'btn_facebook');
                });

                $('#btn_adopt_here_home').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'home_adopta_aqui');
                });

                $('#btn_send_idea_footer').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'idea_form');
                });

                $('#btn_person_join').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'unete_manada')
                });

                $('#btn_refuge_join').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'albergue_form');
                });

                $('#btn_wantoadopt_detail_modal').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'btn_quiero_adoptar');
                });

                $('#btn_send_poll_adopt').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'proceso_adopcion');
                });

                $('#video-wuf-icon-modal').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'view_video');
                });

                $('.notfoundform form a').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'view_video');
                });

                $('#btn_dont_adopt').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'adoption_deny');
                });

                $('a.share-campaign').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'compartir_orejeras');
                });

                $('#btn_wantoadopt_detail').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'btn_quiero_adoptar_adopta');
                });

                $('#wanttoknow_btn').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'btn_meet_wuf');
                });

                $('#btn_wantoknow_yes').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'meet_wuf_ok');
                });

                $('#btn_wantoknow_no').on('click', function () {
                    ga('send', 'event', 'button', 'click', 'meet_wuf_deny');
                });

            }
        },
        pixelAdwords: function () {
            if (global.isProduction()) {
                window.google_trackConversion({
                    google_conversion_id: 957965247,
                    google_conversion_language: "en",
                    google_conversion_format: "3",
                    google_conversion_color: "ffffff",
                    google_conversion_label: "IteECNvX-2MQv8flyAM",
                    google_remarketing_only: false
                });
            }
        },
        pixelFacebook: function () {
            if (global.isProduction()) {
                window._fbq.push(['track', '6031468487091', {'value': '0.00', 'currency': 'USD'}]);
            }
        },
        isProduction: function () {
            var PROD_ENV = "production";
            return (APP_ENV == PROD_ENV) ? true : false;
        }
    };
    global.init();
});
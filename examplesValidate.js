$("#dni, #mobile_phone").keydown(function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$.validator.addMethod("customEmail", function (value, element) {
    return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
}, "Ingresa un correo válido.");

$('#join_form').validate({
    errorElement: 'p',
    errorClass: 'not-valid',
    rules: {
        'name': {
            required: true
        },
        'last_name': {
            required: true
        },
        'dni': {
            required: true,
            digits: true,
            minlength: 8,
            maxlength: 9
        },
        'mobile_phone': {
            required: true,
            digits: true,
            minlength: 9,
            maxlength: 9
        },
        'email': {
            required: true,
            customEmail: true
        },
        'terms': {
            required: true
        },
        'department': {
            required: true
        },
        'province': {
            required: true
        },
        'district': {
            required: true
        }
    },
    messages: {
        terms: {
            required: 'Debes aceptar los términos y condiciones.'
        }
    },
    errorPlacement: function (error, element) {
        if (element[0].hasAttribute("type") && element.attr("type") === 'text') {
            error.insertAfter(element.siblings('label'));
        } else if (element.parent('.container-pet-age').length > 0) {
            error.insertAfter(element.parent('.container-pet-age'));
        } else if (element.parent('.terms-container-internal').length > 0) {
            error.insertAfter(element.parent('.terms-container-internal'));
        } else if (element.parent('.container-location-select').length > 0) {
            error.insertAfter(element.parent('.container-location-select'));
        } else {
            error.insertAfter(element);
        }
    },
    submitHandler: function (form) {
        var $form = $(form);
        showOverlay();
        $.post($form.attr('action'), $form.serialize(), function (response) {
            if (response === 'success') {
                ga('send', 'event', 'button', 'click', 'btn_afiliarme');
                fbq('track', 'Lead');
                $('.message-result-ok').css('display', 'block');
                $('.message-result-ok').animate({'top': '0px'});
            } else {
                $('.message-result-error').css('display', 'block');
                $('.message-result-error').animate({'top': '0px'});
            }
            hideOverlay();
        });
    }
});

$('.affiliate-btn').on('click', function (e) {
    e.preventDefault();

    $('.pet-block').each(function (index, block) {
        var id = $(block).attr('id').replace('pet_', '').toString();

        $(block).find('#pet_name_' + id).rules('add', {
            required: true
        });
        $(block).find('#pet_years_' + id).rules('add', {
            required: true,
            messages: {
                required: "Selecciona los años."
            }
        });
        $(block).find('#pet_months_' + id).rules('add', {
            required: true,
            messages: {
                required: "Selecciona los meses."
            }
        });

    });

    $('#join_form').submit();
});

$('#department').on('change', function () {
    var $select = $(this);
    var $selectChild = $('#province');
    $selectChild.find('option').remove();

    $selectChild.append($("<option></option>").attr("value", "").text("Provincia"));
    $selectChild.change();
    $('#district').find('option').remove().end().append($("<option></option>").attr("value", "").text("Distrito"))
    $('#district').change();

    if($select.val() != "") {
        showOverlay();
        $.get(BASE_URL + '/afiliate/ubicaciones/p/' + $select.val(), function (response) {
            if(response != "error") {
                $(response).each(function (index, element) {
                    $selectChild.append($("<option></option>").attr("value", element.cod_prov).text(element.name_prov));
                });
            }
            $selectChild.change();
            hideOverlay();
        });
    }
});


$('#province').on('change', function () {
    var $select = $(this);
    var $selectChild = $('#district');
    $selectChild.find('option').remove();

    $selectChild.append($("<option></option>").attr("value", "").text("Distrito"));
    $selectChild.change();

    if($select.val() != "") {
        showOverlay();
        $.get(BASE_URL + '/afiliate/ubicaciones/d/' + $select.val(), function (response) {
            if (response != "error") {
                $(response).each(function (index, element) {
                    $selectChild.append($("<option></option>").attr("value", element.cod_dis).text(element.name_dis));
                });
            }
            $selectChild.change();
            hideOverlay();
        });
    }
});
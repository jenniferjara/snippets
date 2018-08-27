$(document).ready( function () {

	$.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});

	var url = localStorage.getItem('url');
	$('.comeback').attr('href', url);

	$('input#input_text, textarea#message').characterCounter();
	$('#sector').material_select();

	$('.nav-barra').sideNav({
		menuWidth: 300, 
		edge: 'right',
		closeOnClick: true,
		draggable: true 
	});
	
	$('.login').dropdown({
		constrainWidth: true,
		belowOrigin: true,
		hover: true,
		alignment: 'left'
	});

	$('.nav-perfil').dropdown({
		constrainWidth: false,
		belowOrigin: true,
		alignment: 'right'
	});
	$('.menu-productos').dropdown({
		constrainWidth: true,
		belowOrigin: true,
		hover: true
	});

	function openErrorModalMessage(text) {
	    $('#modal_error_message').find('#error_messagge_modal').html(text);
	    $('#modal_error_message').addClass('open');
	}

	$('a.close-modal').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().parent().parent().parent().parent().removeClass('open');
	});

	// add custom methods
	$.validator.addMethod('rucValidate', function (valor){
		if (!(valor >= 1e10 && valor < 11e9 || valor >= 15e9 && valor < 18e9 || valor >= 2e10 && valor < 21e9))
        return false;
		if ( valor.length == 11 ){
			suma = 0; x = 6;
			for (i=0; i<valor.length-1;i++){
				if ( i == 4 ) x = 8
				digito = valor.charAt(i) - '0';
				x--
				if ( i==0 ) suma += (digito * x)
				else suma += (digito * x)
			}
			resto = suma % 11;
			resto = 11 - resto
			if ( resto >= 10) resto = resto - 10;
			if ( resto == valor.charAt( valor.length-1 ) - '0' ) {
				return true
			}
		}
		return false
	}, 'Ingresa un ruc válido');

	$.validator.addMethod('customRegex', function(value, element){
		return /^[a-zA-Z0-9\. ]*$/.test(value);
	}, 'Por favor, ingrese datos correctos');
	$.validator.addMethod("customEmail", function (value, element) {
        return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
    }, "Ingresa un correo válido.");


	$(window).on('hashchange', function (e) {
        var name = window.location.hash;
        var name_clean = name.substr(1);
        if (name.length) {
            $('html, body').animate({
                scrollTop: $('.go-to-section[data-section-name="' + name_clean + '"]').offset().top - 50
            });
        }
    });

    $(window).on('load', function () {$(window).trigger('hashchange');});

	$('.go-slider').on('click', function(e){
		var position = ($('.go-to-section[data-section-name="presentacion"]').offset() ).top - 50;
		$("html, body").animate({ scrollTop: position }, 800);
	});
	$('.go-free').on('click', function(e){
		var position = ( $('.go-to-section[data-section-name="prueba"]').offset() ).top - 50;
		$("html, body").animate({ scrollTop: position }, 800);
	});
	$('.go-working').on('click', function(e) {
		var position = ( $('.go-to-section[data-section-name="unete"]').offset() ).top - 50;
		$("html, body").animate({ scrollTop: position }, 800);
	});
	$('.go-products').on('click', function(e){
		var position = ($('.go-to-section[data-section-name="productos"]').offset() ).top - 50;
		$("html, body").animate({ scrollTop: position }, 800);
	});

	function scrollMenu () {
		var start_change = $('#nav-bar');
		start_change.toggleClass('scrolled', $(this).scrollTop() > start_change.height());
	}
	$(document).scroll(scrollMenu);

	function justNumbers (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };

	$('#employeehome').keydown(justNumbers);
	$('#phone').keydown(justNumbers);
	$('#contact_person_phone').keydown(justNumbers);
	$('#phone_contact').keydown(justNumbers);
	$('#employee_number').keydown(justNumbers);
	$('#employee_contact').keydown(justNumbers);
	$('#number_ruc').keydown(justNumbers);

	if($('#test-slider').length > 0) {
		var slider = document.getElementById('test-slider');
			noUiSlider.create(slider, {
			start: 10,
			connect: [true, false],
			orientation: 'horizontal',
			tooltips: false,
			range: {
				'min': [0, 10],
				'10%': [10, 20],
				'19%': [20, 30],
				'29%': [30, 50],
				'39%': [50, 100],
				'49%': [100, 150],
				'59%': [150, 200],
				'69%': [200, 250],
				'79%': [250, 300],
				'89%': [300, 350],
				'99%': [350, 351],
				'max': [351]
			},
			format: wNumb({
				decimals: 0
			}),
			pips: {
				mode: 'steps',
				stepped: true,
				density: 300
			}
		});

		slider.noUiSlider.on('update', function() {
			var value = parseInt( slider.noUiSlider.get() );
			console.log(value);
			var $cotizaOptionFree = $('#cotizaoptfree');
			var $cotizaFreePrice = $('.wrap-bg-free');

			var $cotizaOptionPlan = $('#cotiza-plan');
			var $cotizaPlanPrice = $('.wrap-bg-plan');

			var $cotizaOptionPersonal = $('#cotiza-personal');
			var $cotizador = $('.cotiza-wrapper');
			var $pricing = $('#pricing');

			if ( value <= 0 ) {
				$cotizaOptionFree.css('display', 'none');
				$cotizaOptionPlan.css('display', 'none');
				$cotizaOptionPersonal.css('display', 'none');
			}

			if ( value >= 1 && value <= 10 ) {
				$('#change-slider').css('display', 'block');
				$cotizaOptionFree.css('display', 'flex');
				$cotizaFreePrice.css('display', 'flex');
				$cotizador.css('height', 'auto');
				$cotizaOptionPlan.css('display', 'none');
				$cotizaPlanPrice.css('display', 'none');
				$cotizaOptionPersonal.css('display', 'none');

			} else if ( value >= 11 && value <= 300 ) {
				$('#change-slider').css('display', 'block');
				$cotizaOptionPlan.css('display', 'flex');
				$cotizaPlanPrice.css('display', 'flex');
				$cotizador.css('height', 'auto');
				$cotizaOptionFree.css('display', 'none');
				$cotizaFreePrice.css('display', 'none');
				$cotizaOptionPersonal.css('display', 'none');

				if ( value <= 20 ) {
					$pricing.text('450');
				} else if ( value <= 30 ) {
					$pricing.text('750');
				} else if ( value <= 50 ) {
					$pricing.text('1,000');
				} else if ( value <= 100 ) {
					$pricing.text('1,500');
				} else if ( value <= 150 ) {
					$pricing.text('2,000');
				} else if ( value <= 200 ) {
					$pricing.text('2,600');
				} else if ( value <= 250 ) {
					$pricing.text('3,125');
				} else if ( value <= 300 ) {
					$pricing.text('3,600');
				}

			} else if ( value >= 301 ) {
				$cotizaOptionPersonal.css('display', 'flex').addClass('slideInUp');
				$cotizador.css('height', 'auto');
				$('#change-slider').css('display', 'none').addClass('slideInDown');
				$cotizaOptionPlan.css('display', 'none');
				$cotizaPlanPrice.css('display', 'none');
				$cotizaOptionFree.css('display', 'none');
				$cotizaFreePrice.css('display', 'none');
			}
		});
	}

	/* cotizacion personal */
	var $cotizaPersonalForm = $('#cotizapersonalform');
	$cotizaPersonalForm.validate({
		errorElement: 'span',
		errorClass: 'error',
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				customEmail: true
			}
		},
		messages: {
			email: {
				required: 'Ingrese su correo.'
			}
		},
		errorPlacement: function(error, placement){
			if (placement.attr('name') == 'name' || 'email') {
				error.insertAfter(placement);
			}
		}
	});

	$cotizaPersonalForm.on('submit', function(e){
		e.preventDefault();
		localStorage.setItem('url', window.location.href);

		if ($cotizaPersonalForm.valid()) {
			$('#form-loader').css('display', 'flex').addClass('fadein');
			$('#cotiza-personal').css('display', 'none');
			$('html, body').animate({ scrollTop: $('#form-loader').offset().top }, 500);
			
			$.post($cotizaPersonalForm.attr('action'), $cotizaPersonalForm.serialize(), function(response){
				if (response == 'success') {
					$cotizaPersonalForm.trigger('reset');
					location.href = '/success-checkout';
				} else {
					location.href = '/error-checkout';
				}
			});
		}
	});

	$('#cotiza-personal-btn').on('click', function(e){
		e.preventDefault();
		$cotizaPersonalForm.submit();
	});

	/* afiliciacion gratis */
	var $freestep1 = $('#free-form-1');
	var $freestep2 = $('#free-form-2');
	$freestep1.validate({
		errorElement: 'span',
		rules: {
			free_company: {
				required: true,
				customRegex: true
			},
			free_email: {
				required: true,
				customEmail: true
			}
		},
		messages: {
			free_email: {
				required: 'El correo electrónico es inválido.'
			}
		},
		errorPlacement: function(error, placement){
			if (placement.attr('name') === 'free_company' || 'free_email') {
				error.insertAfter(placement);
			}
		}
	});

	$freestep2.validate({
		errorElement: 'span',
		rules: {
			free_company: {
				required: true
			},
			free_name: {
				required: true
			},
			free_lastname: {
				required: true
			},
			free_phone: {
				required: true,
				digits: true,
				maxlength: 15
			},
			free_email: {
				required: true, 
				customEmail: true
			},
			free_ruc: {
				required: true,
				digits: true,
				minlength: 11,
				maxlength: 11,
				rucValidate: true
			},
			free_password: {
				required: true,
				minlength: 5,
			},
			free_cpassword: {
				required: true,
				minlength: 5,
				equalTo: '#free-pass'
			}
		},
		messages: {
			free_phone: {
				digits: 'Ingrese solo números, por favor.'
			},
			free_ruc: {
				digits: 'Ingrese solo números, por favor.'
			}
		},
		errorPlacement: function(error, placement) {
			if (placement.attr('name') === 'free_company' || 'free_name'||'free_lastname'||'free_phone'||'free_email'||'free_ruc'||'free_password') {
				error.insertAfter(placement);
			}
		}
	})

	$freestep1.on('submit', function(e){
		e.preventDefault();
		var thiscompany = $('#free_company').val();
		var thisemail = $('#free_email').val();

		if ( $freestep1.valid() ) {
			$('#free_email_full').val(thisemail);
			$('#free_company_full').val(thiscompany);
			$('#form-loader').css('display', 'flex');
			$('#free-forms-wrap, #step1').css('display', 'none');
			$('html, body').animate({scrollTop: $('#prueba').offset().top - 50 }, 500);

			$.post( $freestep1.attr('action'), $freestep1.serialize(), function(response) {
				console.log(response);
				if (response.status == 'success') {
					// $('input[name=partial_registration]').val(response.data.partial_registration);
					// $freestep1.trigger('reset');
					// $('#prueba, .height-free').css('height', '770px');
					// $('#free-forms-wrap').css('display', 'flex');
					// $('#free-forms-wrap')
					// $('#step2').css({'display': 'block', 'padding-top': '0'}).addClass('fadein');
					location.href = '/registro/paso2?pt=' + response.data.partial_registration;
				} else {
					$('#free-forms-wrap').css('display', 'flex');
					var messages = '¡Upsss! El correo electrónico ingresado ya está registrado';
					openErrorModalMessage(messages);
				}
				// $('#form-loader').css('display', 'none');
			});
		}
	});

	$('#comeback-step1').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent().parent().parent().css('display', 'none');
		$('#step1').css('display', 'block').addClass('fadein');
		$freestep1.trigger('reset');
		$('html, body').animate({scrollTop: $('#prueba').offset().top - 50 }, 500);
	})

	$freestep2.on('submit', function(e) {
		e.preventDefault();
		localStorage.setItem('url', window.location.href);

		if ( $freestep2.valid()) {
			$('#form-loader').css('display', 'flex');
			$('#free-forms-wrap').css('display', 'none');
			$('html, body').animate({scrollTop: $('#prueba').offset().top - 50 }, 500);

			$.post( $freestep2.attr('action'), $freestep2.serialize(), function(response){
				console.log(response.status);
				if (response.status == 'success') {
					$freestep2.trigger('reset');
					location.href = '/success-free';
				} else {
					location.href = '/error-free';
				}
			});
		}
	});

	$('#btn-free-step1').on('click', function(e){
		e.preventDefault();
		$freestep1.submit();
	});
	$('#btn-free-step2').on('click', function(e){
		e.preventDefault();
		$freestep2.submit();
	})

	/* formulario de contacto */
	var $formContact = $('#form-contact');
	$formContact.validate({
		errorElement: 'span',
		errorClass: 'error',
		rules: {
			name_contact: {
				required: true
			},
			company_contact: {
				required: true
			},
			email_contact: {
				required: true,
				customEmail: true
			}
		},
		messages: {
			email_contact: {
				required: 'El correo electrónico es inválido.'
			}
		},
		errorPlacement: function(error, placement) {
			if (placement.attr('name') == 'name_contact' || 'company_contact' || 'email_contact') {
				error.insertAfter(placement);
			}
		}
	});

	$formContact.on('submit', function(e){
		e.preventDefault();
		localStorage.setItem('url', window.location.href);

		if ($formContact.valid()) {
			$('#form-loader').css('display', 'flex').addClass('fadein');
			$('#contacto').css('display', 'none');
			$("html, body").animate({scrollTop: 0}, 500);

			$.post($formContact.attr('action'), $formContact.serialize(), function(response){
				console.log(response);
				if (response == 'success') {
					$formContact.trigger('reset');
					location.href = '/success-contact';
				} else {
					location.href = '/error-contact';
				}
			});
		}
	});

	$('#btn-send-contact').on('click', function(e){
		e.preventDefault();
		$formContact.submit();
	});

	/** modal **/
	function showModalSuccess() {
	    $('#modal_message').modal('open');
	};

	$('#modal_message').modal({
		ready: function(){
			showModalSuccess();
		},
		complete: function() {
			console.log('close');
		}
	});	
});
$(function(){
	$(document).ready(function(){

		$.ajaxSetup({
		    headers: {
		        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		    }
		});
		
		// $(this).scrollTop(0);

		var $formulario = $('#formulario');		
		$.material.init();
		var bxslider2 = $('.bxslider2').bxSlider({
			touchEnabled: false
		});
		new WOW().init();

		$('#dot-nav li:nth-child(1)').addClass('active');

		/* MENÚ */
		var scroll_start = 0;
		var $startchange = $('#mambo-way');
		var offset = $startchange.offset();
		var $logo1 = $("#nav-logo");
		var $logo2 = $('#nav-logo2');
		var $icon1 = $("#icon1");
		var $icon2 = $("#icon2");
		var $headernav = $("#header");

		if ($startchange.length){		
			$(document).scroll( function() {
				scroll_start = $(this).scrollTop();
				var resta = scroll_start + 55;

				if(resta > offset.top) {
					$headernav.css("background-color", "#ffffff");
					$headernav.css("box-shadow", "0 4px 15px rgba(0, 0, 0, 0.2)");
					// $headernav.addClass("fadeIn");
					$headernav.addClass("fixed");

					$logo1.css("display", "none");
					$logo1.removeClass("animated fadeIn");

					$logo2.css("display", "block");
					$logo2.addClass("fadeIn");

					$icon1.css("display", "none");
					$icon1.removeClass("fadeIn");

					$icon2.css("display", "block");
					$icon2.addClass("fadeIn");

				} else {
					$headernav.css("background-color", "transparent");
					$headernav.css("box-shadow", "none");
					// $headernav.removeClass("fadeIn");
					$headernav.removeClass("fixed");

					$logo2.css("display", "none");
					$logo2.removeClass("fadeIn");

					$logo1.css("display", "block");
					$logo1.addClass("animated fadeIn");

					$icon2.css("display", "none");
					$icon2.removeClass("fadeIn");

					$icon1.css("display", "block");
					$icon1.addClass("fadeIn");
				}
			});
		};

		/* ANIMACIÓN DEL MENÚ */
		function menu(){
			var navbar = document.getElementById("myTopnav");
			var navoptions = document.getElementById("nav-options");
			if (navbar.className === "topnav") {

				navbar.classList.add("responsive");
				navbar.classList.add("animated")
				navbar.classList.add("bounceInDown");
				navbar.classList.remove("slideOutUp");
				navoptions.style.display = "block";
				$(this).addClass('is-active');

			} else {

				navbar.classList.add("slideOutUp");
				navbar.classList.remove("bounceInDown");
				setTimeout(function(){
					navbar.classList.remove("responsive");
					navbar.classList.remove("animated");
					navbar.classList.remove("slideOutUp");
					navoptions.style.display ="none";
				}, 500);
				$(this).removeClass('is-active');
			}
		}

		$('#icon1').on('click', menu);
		$('#icon2').on('click', menu);

		/* OPCIONES DEL MENÚ */
		$('.nav-enlaces').on('click', function(){
			var $navbar2 = $('#myTopnav');
			var navoptions2 = document.getElementById("nav-options");
			$navbar2.removeClass("bounceInDown");
			$navbar2.addClass('animated slideOutUp');
			setTimeout(function(){
				$navbar2.removeClass('responsive');
				$navbar2.removeClass('animated slideOutUp');
				navoptions2.style.display = "none";
			}, 700);
			$('#icon1, #icon2').removeClass('is-active');
		});

		/* VIDEO  */
		$('.home-video').on('click', function(e){
			e.preventDefault();
			var direc = $(this).attr('href');
			$('.video-modal iframe').attr('src', direc);
	        $('.video-modal iframe').on('load', function () {
	            if ($(this).attr('src') != '') {
	                $('.video-modal').removeClass('hidden');
	            }
	        });
		});

		$('#video-modal-close').on('click', function(e){
			e.preventDefault();
			$('.video-modal').addClass('hidden');
			$('.video-modal iframe').attr('src', '');
		});


		/* DOT NAVIGATION */   
	    function dotnavigation() {    
	        var start_home = $("#home").offset().top;
	        var start_info = $("#info").offset().top;
	        var start_clientes = $("#clientes").offset().top;
	        var start_mw = $("#mambo-way").offset().top;
	        var start_contacto = $("#contact").offset().top;
	        var start_scroll = $("#dot-nav li").offset().top;

	        if (start_scroll > start_home) {
	        	$('#dot-nav li:nth-child(1)').addClass('active');
	        	$('#dot-nav li:nth-child(2)').removeClass('active');
	        	$('#dot-nav li:nth-child(3)').removeClass('active');
	        	$('#dot-nav li:nth-child(4)').removeClass('active');
	        	$('#dot-nav li:nth-child(5)').removeClass('active');
	        }
	        if(start_scroll > start_mw){
	        	$('#dot-nav li:nth-child(2)').addClass('active');
	        	$('#dot-nav li:nth-child(1)').removeClass('active');
	        	$('#dot-nav li:nth-child(3)').removeClass('active');
	        	$('#dot-nav li:nth-child(4)').removeClass('active');
	        	$('#dot-nav li:nth-child(5)').removeClass('active');
	        }
	        if(start_scroll > start_info){
	        	$('#dot-nav li:nth-child(3)').addClass('active');
	        	$('#dot-nav li:nth-child(1)').removeClass('active');
	        	$('#dot-nav li:nth-child(2)').removeClass('active');
	        	$('#dot-nav li:nth-child(4)').removeClass('active');
	        	$('#dot-nav li:nth-child(5)').removeClass('active');
	        } 
	        if(start_scroll > start_clientes){
	        	$('#dot-nav li:nth-child(4)').addClass('active');
	        	$('#dot-nav li:nth-child(1)').removeClass('active');
	        	$('#dot-nav li:nth-child(2)').removeClass('active');
	        	$('#dot-nav li:nth-child(3)').removeClass('active');
	        	$('#dot-nav li:nth-child(5)').removeClass('active');
	        } 
	        if(start_scroll > start_contacto){
	        	$('#dot-nav li:nth-child(5)').addClass('active');
	        	$('#dot-nav li:nth-child(1)').removeClass('active');
	        	$('#dot-nav li:nth-child(2)').removeClass('active');
	        	$('#dot-nav li:nth-child(3)').removeClass('active');
	        	$('#dot-nav li:nth-child(4)').removeClass('active');
	        }  
	    }

	    $(window).bind('scroll', dotnavigation);

	    function dotClick() {
	        var id = $(this).find('a').attr("href"),
	        position, elemento, padding = 0;
	        elemento = $(id);
	        position = ($(elemento).offset()||0).top - padding;
	        $('html, body').animate({scrollTop:position}, 1500);
	        return false;
	    }

	    $('#dot-nav li').on('click', dotClick);

	    function Cases() {
	    	var id = $(this).find('a').attr('href'),
	    	position, elemento, padding = 50;
	    	elemento = $(id);
	    	position = ($(elemento).offset() || 0).top - padding;
	    	$('html, body').animate({scrollTop: position}, 500);
	    	return false;
	    }

	    $('.mw-square-pink').on('click', Cases);

		/* FORMULARIO */
		var $formContact = $('#formulario');
		$formContact.validate({
			errorElement: 'span',
			rules: {
				nombres: {
					required: true
				},
				empresa: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				cargo: {
					required: true
				},
				mensaje: {
					required: true
				}
			},
			errorPlacement: function(error, place){
				if (place.attr("name") == "nombres" || "empresa" || "email" || "cargo" || "mensaje"){
					error.insertAfter(place);
				}
			}
		});

		$formContact.on('submit', function(e){
			e.preventDefault();
			if ($formContact.valid()) {

				$("#contact-loader").css("display", "block");
				$('#enviar-form').text("");
				
				var fd = new FormData();
				fd.append('nombres', $('#nombres').val());
				fd.append('empresa', $('#empresa').val());
				fd.append('email', $('#email').val());
				fd.append('cargo', $('#cargo').val());
				fd.append('mensaje', $('#mensaje').val());

				$.ajax({
					url: $formContact.attr('action'),
					data: fd,
					processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(response){
                    	console.log(response);
                    	if (response.result == 'success') {
                    		$formContact.trigger('reset');
              				$("#result-ok").css("display", "block");
              				$("#form-result").css("display", "none");
                    	} else {
                    		$("#result-error").css("display", "block");
                    		$("#form-result").css("display", "none");
                    	} 

                    	$("#contact-loader").css("display", "none");
                    	$("#enviar-form").text('Enviar');
                    }
				});
			}			
		});

		 $('#enviar-form').on('click', function(e){
			e.preventDefault();
			$formContact.submit();
		});

		function review(e) {
			e.preventDefault();
			var $thisContent = $(this).parent().parent().parent().parent();
			$("#form-result").css("display", "block");
			$thisContent.css("display", "none");
		}

		$("#review-form").on("click", review);
		$("#review-form2").on("click", review);

	});

});
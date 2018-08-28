$(function(){


	$(document).ready(function(){

		// window.onbeforeunload = function() {window.scrollTo(0,0);}
		var $formulario = $('#formulario');
		var index;
		
		$.material.init();
		var bxslider2 = $('.bxslider2').bxSlider({
			touchEnabled: false
		});
		new WOW().init();


		var scroll_start = 0;
		var startchange = $('#info');
		var offset = startchange.offset();
		var logo1 = $("#nav-logo");
		var logo2 = $('#nav-logo2');

		if (startchange.length){		
			$(document).scroll( function() {
				scroll_start = $(this).scrollTop();
				if(scroll_start > offset.top) {
					$(".header").css("background-color", "#ffffff");
					logo1.css("display", "none");
					logo2.css("display", "block");
					$('#icon1').css("display", "none");
					$("#icon2").css("display", "block");
				} else {
					$(".header").css("background-color", "transparent");
					logo2.css("display", "none");
					logo1.css("display", "block");
					$("#icon2").css("display", "none");
					$("#icon1").css("display", "block");
				}
			});
		};


	    $(window).bind('scroll',function(e){
	      dotnavigation();
	    });
	    
	    function dotnavigation(){    
	        var numSections = $('.visual').length;
	        console.log(numSections);
	        
	        $('#dot-nav li a').removeClass('active').parent('li').removeClass('active');     
	        $('.visual').each(function(i, elem){
				var ele = $(elem);
				var nextTop;
				var eleid = ele.attr('id');
				console.log(eleid);
				console.log(ele.next());
				
				if (typeof ele.next().offset() != "undefined") {
					nextTop = ele.next().offset().top;
				}
				else {
					nextTop = $(document).height();
				}

				// if (ele.offset() !== null) {
				// 	var thisTop = ele.offset().top - ((nextTop - ele.offset().top) / numSections);
				// }
				// else {
				// 	thisTop = 0;
				// }

				// var docTop = $(document).scrollTop();
				// if(){
				// 	$('#dot-nav li').eq(i).addClass('active');
				// }
	        });   
	    }

	    /*  */
	    $('#dot-nav li').click(function(){
	        var id = $(this).find('a').attr("href"),
	        posi,ele,padding = 0;
	        ele = $(id);
	        posi = ($(ele).offset()||0).top - padding;
	        $('html, body').animate({scrollTop:posi}, 1000);
	        return false;
	    });

		//------
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
				// navbar.classList.remove("bounce");
				setTimeout(function(){
					navbar.classList.remove("responsive");
					navbar.classList.remove("animated");
					navbar.classList.remove("slideOutUp");
					navoptions.style.display ="none";
				}, 500);
				$(this).removeClass('is-active');
			}
			
		}

		$('.icon').on('click', menu);
		$('.icon2').on('click', menu);

		$('.nav-enlaces').on('click', function(){
			var $navbar2 = $('#myTopnav');
			var navoptions2 = document.getElementById("nav-options");
			$navbar2.removeClass("bounceInDown");
			$navbar2.addClass('animated slideOutUp');
			setTimeout(function(){
				$navbar2.removeClass('responsive');
				$navbar2.removeClass('animated slideOutUp');
				navoptions2.style.display = "none";
			}, 500);
			$('.icon').removeClass('is-active');
		});


		$('.home-video').on('click', function(e){
			e.preventDefault();
			var direc = $(this).attr('href');
			console.log(direc);
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

		$('.bx-pager-link').on('click', function(e){
			e.preventDefault();
			index = parseInt($(this).attr('data-slide-index'));
			console.log(index);
		});

		$('.btn-info').click(function(e){
			e.preventDefault();
			$('#test').css({'visibility': 'visible', 'display': 'block'});
			$('#test').addClass('slideInRight');
			$('#test').removeClass('slideOutRight');
			console.log('---');
			console.log(index);
			bxslider2.reloadSlider({startSlide: index, touchEnabled: false});
		});

		$('#test-close').click(function(e){
			e.preventDefault();
			// $('#test').css({'visibility': 'hidden', 'display': 'none'});
			$('#test').removeClass('slideInRight');
			$('#test').addClass('slideOutRight');
			setTimeout(function(){
				$('#test').css({'visibility': 'hidden', 'display': 'none'});
			}, 300);
		});


		var $sendContact = $('#enviar');
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
			if ($('#formulario').valid()) {
				console.log(this);			
			}
			
		});

		$sendContact.on('click', function(e){
			e.preventDefault();
			$formContact.valid();
		});

	});

});
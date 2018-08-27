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
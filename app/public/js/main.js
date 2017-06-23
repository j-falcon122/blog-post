$(document).ready(function(){
	var admin = false;
    $('#loginModal').modal('show');

    $('#adminImg').on('click', function(){
		console.log("admin");
    	$('#adminModal').modal('show');
    	admin = true;
	});
	
	$('#guestImg').on('click', function(){
		console.log("guest");
		document.getElementById("addPostButton").style.display="none";
		
	});
	$('#adminGuestButton').on('click', function(){
		console.log("guest");
		document.getElementById("addPostButton").style.display="none";
		admin = false;
	});

	 $('.showMore').on('click', function(){
	 	console.log("seethis?");
		if (admin == false){
			if ($('.controls')){
				console.log("guest?");
				$('.controls').css('display', 'none');	
			}
		}
	});



});

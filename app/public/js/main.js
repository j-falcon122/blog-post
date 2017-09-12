$("#adminLogin").on('click', function(e){
	e.preventDefault();
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
$('#form-login').on('submit', function(e){
	e.preventDefault();
	alert("login!")
	var url = '/login/';
	$.ajax({
			url: url,
			type: 'POST', 
			success: function(result){
				// console.log('Deleting Post...');
				window.location.href='/blog';
			},
			error: function(err){
				console.log(err);
			}
	})
});



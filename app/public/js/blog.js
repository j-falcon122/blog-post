$(document).ready(function(){
	$('.delete-blogpost').on('click', function(){
		var id = $(this).data('id');
		var url = '/delete/'+id;
		if(confirm('Delete Post?')){
			$.ajax({
				url: url,
				type: 'DELETE', 
				success: function(result){
					console.log('Deleting Post...');
					window.location.href='/blog';
				},
				error: function(err){
					console.log(err);
				}
			})
		}
	});

	$('.edit-blogpost').on('click', function(){
		$('#edit-form-name').val($(this).data('name'));
		$('#edit-form-posts').val($(this).data('posts'));
		$('#edit-form-id').val($(this).data('id'));
	});
	
	// $(function(){

	//   $(".comments-link").on("click", function( event ){
	//     event.preventDefault();                // Prevents browser following #hash 
	//     $(this).hide();                        // hide the button
	//     $(".comment-form-container").show();   // Show the form parent
	//   });

	//   $(".comment-form-container form").on("submit", function( event ){
	//       event.preventDefault();              // Don't send headers
	//       alert( $(this).serialize() +"\nWILL BE SENT TO PHP" );
	//      // $.ajax stuff
	//   });

	// });
});


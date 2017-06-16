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
});



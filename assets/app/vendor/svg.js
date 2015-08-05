$('document').ready(function(){
	$('.icon').each(function(){
		var data = $(this).load($(this).data('icon'));
	});
});
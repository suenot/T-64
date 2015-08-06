$('document').ready(function(){
	$('.icon').each(function(){
		$(this).load($(this).data('icon'));
	});
});
$('document').ready(function(){
	$('.isvg').each(function(){
		$(this).load('/img/svg/' + $(this).data('icon') + '.svg').addClass($(this).data('icon'));
	});
});
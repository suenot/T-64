$('document').ready(function(){
	var block;
	$('.list-blocks > li').on('click', function(e) {
		e.preventDefault();
		block = $(this).text();
		$('#code-view').load('/blocks/' + block + '/' + block + '.html');
		$.get('/blocks/' + block + '/' + block + '.html', function(data) {
			data = data.replace(/<!--(.*?)-->/ig, '').substr(2);
			console.log(data);
			$('#code-html').text(data);
			hljs.highlightBlock(document.getElementById('code-html'));
		});
		$.get('/blocks/' + block + '/' + block + '.jade', function(data) {
			$('#code-jade').text(data);
			hljs.highlightBlock(document.getElementById('code-jade'));
		});
		$.get('/blocks/' + block + '/' + block + '.styl', function(data) {
			$('#code-styl').text(data);
			hljs.highlightBlock(document.getElementById('code-styl'));
		});
		$('#name-block').text(': ' + block);
		return block;
	});
	$('.list-blocks > li:nth-child(1)').click();
	$('.view-block-btn').on('click', function() {
		$('#code-view').slideDown();
		$('.close').css('display', 'block');
	});
	$('.close').on('click', function() {
		$('#code-view').slideUp();
		$(this).css('display', 'none');
	})
});
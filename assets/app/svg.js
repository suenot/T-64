// $('document').ready(function(){
// 	$('.isvg').each(function(){
// 		$(this).load('/img/svg/' + $(this).data('icon') + '.svg').addClass($(this).data('icon'));
// 	});
// });

document.addEventListener("DOMContentLoaded", function(event) {
	var icons = document.getElementsByClassName('isvg');
	// console.log(icons);
	Array.prototype.forEach.call(icons, function(icon, i){
		// var icon = icons[i];
		console.log(icon);
		var http = new XMLHttpRequest();
		http.open('GET', '/img/svg/' + icon.getAttribute('data-icon') + '.svg', true);
		icon.className = icon.className + ' ' + icon.getAttribute('data-icon');
		http.onload = function () {
			icon.innerHTML = http.responseText;
		}
		http.send();
	});
});
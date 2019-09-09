
$(document).ready(function () {
	window.onresize = function(){
		location.reload();
	}
	function getTime() {
		var h = new Date().getHours();
		h = h < 10 ? ("0" + h) : h;
		var m = new Date().getMinutes();
		m = m < 10 ? ("0" + m) : m;
		var s = new Date().getSeconds();
		s = s < 10 ? ("0" + s) : s;
		$('.hm').html(h + ':' + m);
		$('.s').html(s);
	}
	setInterval(getTime, 500);
})
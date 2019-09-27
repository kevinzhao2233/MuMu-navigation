//阻止默认行为函数
function preventDefault(e) {
	e.preventDefault();
}

// 阻止touchmove 之后调用 touchend    牺牲兼容性，优化性能
function stopTouchendPropagationAfterScroll() {
	var locked = false;
	window.addEventListener('scroll', function () {
		locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
	}, true);
	function stopTouchendPropagation(ev) {
		ev.stopPropagation();
		window.removeEventListener('touchend', stopTouchendPropagation, true);
		locked = false;
	}
}
stopTouchendPropagationAfterScroll();

$(document).ready(function () {
	// ======== 设置 html 的 fontsize，确定 rem 单位的大小
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	if (screenWidth < 720) {
		$('html').css('font-size', screenWidth * 0.138889);
	} else {
		$('html').css('font-size', 100);
	}

	// 给页面一个固定的vh
	document.documentElement.style.setProperty("--origin_vh", screenHeight + "px");
})
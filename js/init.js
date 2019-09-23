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

	// ======== 从 localstorage 中获取快捷按钮
	if (localStorage.getItem("FAST_CONTENT")) {
		$('#fastContent').html(localStorage.getItem("FAST_CONTENT"));
	}

	// ======== 初始化设置页面主题被选中状态
	$('#theme').children().removeClass('chose')
	$('#theme').children().eq(theme[0]).addClass('chose')

	// ======== 初始化搜索框图标 & 设置界面默认搜索引图标
	if (localStorage.getItem("SEARCH_E_ICO")) {
		searchENumber = localStorage.getItem("SEARCH_E_ICO");
		$('#searchE_f_ico').css("transform", "translateY(" + searchENumber * -0.5 + "rem)");
		$('#searchE_b_ico').css("transform", "translateY(" + searchENumber * -0.5 + "rem)");
		$('#searchE_item span').removeClass('chose');
		$('#searchE_item span').eq(searchENumber).addClass('chose');
	}
})
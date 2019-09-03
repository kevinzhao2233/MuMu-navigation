var searchENumber = 0;			// 默认为第一个搜索引擎

var searchE = {
	baidu: "https://m.baidu.com/s?word=",
	google: "https://www.google.com/search?q=",
	bing: "https://cn.bing.com/search?q=",
	shenma: "https://m.sm.cn/s?q=",
	sougou: "https://www.sogou.com/web?query="
}
// 搜索
function search(whSearch) {				// 接收 string
	if ($('#searchInput').val() != "") {
		window.location.href = searchE[whSearch + ""] + $('#searchInput').val();
		$("#searchInput").val("");
	}
	return false;
}

// 改变搜索引擎
function changeSearchE(whSearchE, offset) {
	localStorage.setItem("SEARCH_E", whSearchE);
	localStorage.setItem("SEARCH_E_ICO", offset);
	$('#searchE_f_ico').css('transform', 'translateY(' + offset * -0.5 + 'rem)');
	$('#searchE_b_ico').css('transform', 'translateY(' + offset * -0.5 + 'rem)');
	$('#searchE_item span').removeClass('chose');
	$('#searchE_item span').eq(searchENumber).addClass('chose');
}

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
	if (screenWidth < 720) {
		$('html').css('font-size', screenWidth * 0.138889);
	} else {
		$('html').css('font-size', 100);
	}

	// ======== 初始化搜索框图标 & 设置界面默认搜索引图标
	searchENumber = localStorage.getItem("SEARCH_E_ICO");
	$('#searchE_f_ico').css("transform", "translateY(" + searchENumber * -0.5 + "rem)");
	$('#searchE_b_ico').css("transform", "translateY(" + searchENumber * -0.5 + "rem)");
	$('#searchE_item span').removeClass('chose');
	$('#searchE_item span').eq(searchENumber).addClass('chose');

	// ======== 设置板块
	$(document).on('touchend', '#setBtn', function () {
		$('#set').css({ 'transform': 'translateX(0)', 'transition-duration': '400ms' });
		$('#setBackground').css({ 'opacity': 1, 'z-index': '299' });
		document.addEventListener('touchmove', preventDefault, { passive: false });
	})

	$(document).on('touchend', '#setBackground, #setBack', function () {
		$('#set').css({ 'transform': 'translateX(-60vw)', 'transition-duration': '400ms' });
		$('#setBackground').css({ 'opacity': 0, 'z-index': '-1' });
		document.removeEventListener('touchmove', preventDefault, { passive: false });
	})

	// 弹出搜索框 & 收回搜索框
	$(document).on('touchend', '#searchFake', function () {
		$('#arc').addClass('arc-active');
		$('.up-search').addClass('up-search-active');
		setTimeout(function () {
			$('#search').addClass('search-active');
			$('#searchInput').trigger('focus');
		}, 150);
	})
	// 收回搜索框
	$(document).on('touchend', '#searchCancel', function () {
		$('#searchInput').trigger('blur');
		$('#search').removeClass('search-active');
		setTimeout(function () {
			$('#arc').removeClass('arc-active');
			$('.up-search').removeClass('up-search-active');
		}, 150);
	})


	// 提交搜索内容
	$(document).submit(function () {
		var nowTranslateE = localStorage.getItem("SEARCH_E");
		return search(nowTranslateE);
	})

	// 更换搜索引擎
	$('#searchE_item span').on('touchend', function () {
		searchENumber =  $(this).index();
		changeSearchE(this.id, searchENumber);
	})
})


var translateE = {
	baidu: "https://m.baidu.com/s?word=",
	google: "https://www.google.com/search?q=",
	bing: "https://cn.bing.com/search?q=",
	shenma: "https://m.sm.cn/s?q=",
	sougou: "https://www.sogou.com/web?query="
}
// 搜索
function search(translateE) {
	if ($('#searchInput').val() != "") {
		window.location.href = translateE + $('#searchInput').val();
		$("#searchInput").val("");
	}
	return false;
}
// 改变搜索引擎
function changeSearchE(whSearchE, offset) {
	localStorage.setItem("SEARCH_E", whSearchE);
	localStorage.setItem("SEARCH_E_ICO", "translateY(" + offset + ")")
	$('#searchE_ico').css('transform', 'translateY(' + offset + ')');
}

//阻止默认行为函数
function preventDefault(e) {
	e.preventDefault();
}

// // 禁用触摸滚动页面
// document.addEventListener('touchmove', preventDefault, { passive: false });

// // 恢复触摸滚动页面
// document.removeEventListener('touchmove', preventDefault, { passive: false });

$(document).ready(function () {
	// ======== 设置 html 的 fontsize，确定 rem 单位的大小
	var screenWidth = $(window).width();
	if (screenWidth < 720) {
		$('html').css('font-size', screenWidth * 0.138889);
	} else {
		$('html').css('font-size', 100);
	}

	// ======== 初始化搜索框图标
	$('#searchE_ico').css("transform", localStorage.getItem("SEARCH_E_ICO"));
	console.log(localStorage.getItem("SEARCH_E_ICO"));

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

	// 点击弹出搜索框
	$(document).on('touchend', '#searchFake', function () {
		$('#arc').addClass('arc-active');
		$('.up-search').addClass('up-search-active');
		setTimeout(function () {
			$('#search').addClass('search-active');
		}, 150);
		setTimeout(function () {
			$('#searchInput').trigger('focus');
		}, 150)
	})

	// 提交搜索内容
	$(document).submit(function () {
		var nowTranslateE = localStorage.getItem("SEARCH_E");
		return search(nowTranslateE);
	})

	// 更换搜索引擎
	// ###################### 还需改进
	$('#searchE_item span').on('touchend', function () {
		switch (this.id) {
			case "search_baidu":
				changeSearchE(translateE.baidu, 0);
				break;
			case "search_google":
				changeSearchE(translateE.google, "-0.5rem");
				break;
			case "search_bing":
				changeSearchE(translateE.bing, "-1rem");
				break;
			case "search_shenma":
				changeSearchE(translateE.shenma, "-1.5rem");
				break;
			case "search_sougou":
				changeSearchE(translateE.sougou, "-2rem");
				break;
		}

	})
})


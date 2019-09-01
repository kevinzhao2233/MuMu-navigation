var translateE = {
	baidu: "https://m.baidu.com/s?word=",
	google: "https://www.google.com/search?q=",
	bing: "https://cn.bing.com/search?q=",
	shenma: "https://m.sm.cn/s?q=",
	sougou: "https://www.sogou.com/web?query="
}

function search(translateE) {
	if ($('#searchInput').val() != "") {
		window.location.href = translateE + $('#searchInput').val();
		$("#searchInput").val("");
	}
	return false;
}

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
		$('#set').css('transform', 'translateX(0)');
		$('#setBackground').css('display', 'block');
	})

	$(document).on('touchend', '#setBackground, #setBack', function () {
		$('#set').css('transform', 'translateX(-60vw)');
		$('#setBackground').css('display', 'none');
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
				localStorage.setItem("SEARCH_E", translateE.baidu);
				localStorage.setItem("SEARCH_E_ICO", "translateY(0)")
				$('#searchE_ico').css('transform', 'translateY(0)');
				break;
			case "search_google":
				localStorage.setItem("SEARCH_E", translateE.google);
				localStorage.setItem("SEARCH_E_ICO", "translateY(-0.5rem)")
				$('#searchE_ico').css('transform', 'translateY(-0.5rem)');
				break;
			case "search_bing":
				localStorage.setItem("SEARCH_E", translateE.bing);
				localStorage.setItem("SEARCH_E_ICO", "translateY(-1rem)")
				$('#searchE_ico').css('transform', 'translateY(-1rem)');
				break;
			case "search_shenma":
				localStorage.setItem("SEARCH_E", translateE.shenma);
				localStorage.setItem("SEARCH_E_ICO", "translateY(-1.5rem)")
				$('#searchE_ico').css('transform', 'translateY(-1.5rem)');
				break;
			case "search_sougou":
				localStorage.setItem("SEARCH_E", translateE.sougou);
				localStorage.setItem("SEARCH_E_ICO", "translateY(-2rem)")
				$('#searchE_ico').css('transform', 'translateY(-2rem)');
				break;
		}

	})
})


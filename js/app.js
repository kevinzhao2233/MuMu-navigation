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
		var nowTranslateE = localStorage.getItem("TRANSLATE");
		return search(nowTranslateE);
	})

	// 更换搜索引擎
	// ###################### 还需改进
	$(document).on('touchend', '#search_baidu', function(){
		localStorage.setItem("TRANSLATE", translateE.baidu)
	})
	$(document).on('touchend', '#search_google', function(){
		localStorage.setItem("TRANSLATE", translateE.google)
	})
	$(document).on('touchend', '#search_bing', function(){
		localStorage.setItem("TRANSLATE", translateE.bing)
	})
	$(document).on('touchend', '#search_shenma', function(){
		localStorage.setItem("TRANSLATE", translateE.shenma)
	})
	$(document).on('touchend', '#search_sougou', function(){
		localStorage.setItem("TRANSLATE", translateE.sougou)
	})

})


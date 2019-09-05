var searchENumber = 0;			// 默认为第一个搜索引擎
var whFast;									// 点击了哪个fast，决定是要修改还是添加
var searchE = {
	baidu: "https://m.baidu.com/s?word=",
	google: "https://www.google.com/search?q=",
	bing: "https://cn.bing.com/search?q=",
	shenma: "https://m.sm.cn/s?q=",
	sougou: "https://www.sogou.com/web?query="
}



$(document).ready(function () {

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

	// ======== 弹出搜索框 & 收回搜索框
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
		searchENumber = $(this).index();
		changeSearchE(this.id, searchENumber);
	})

	// ======== 快捷按钮板块
	// 添加按钮
	$(document).on('touchend', '#addFast', function () {
		$('#fastEdit').addClass('show-edit');
		$('#setBtn').addClass('set-btn-hidden');
	})

	// 退出编辑状态
	$(document).on('touchend', '#editCancel', function () {
		clearFastInput();
	})

	// 保存
	$(document).on('touchend', '#editSave', function () {
		addFastBtn(whFast);
		if ($('#fastContent').children().length > 10) {
			$('#addFast').css('display', 'none');
		}
		$('#setBtn').removeClass('set-btn-hidden');
	})

	// 长按后进入编辑状态
	$('.fast-icon').longTap(function () {
		$('.fast-icon-fg').addClass('fast-icon-edit');
	})

	$('.fast-icon-fg').on('touchend', function () {
		$('#fastEdit').addClass('show-edit');
		var fastUrlOld = $(this).prev()[0].href;
		var fastTitOld = $(this).next()[0].textContent;
		$('#editUrl').val(fastUrlOld);
		$('#editTit').val(fastTitOld);
		whFast = $(this).parent().index();
	})
})
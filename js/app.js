var searchENumber = 0;			// 默认为第一个搜索引擎
var whFast;						// 点击了哪个fast，决定是要修改还是添加以及删除
var searchE = {
	baidu: "https://m.baidu.com/s?word=",
	google: "https://www.google.com/search?q=",
	bing: "https://cn.bing.com/search?q=",
	shenma: "https://m.sm.cn/s?q=",
	sougou: "https://www.sogou.com/web?query="
}

$(document).ready(function () {
	// ======== 设置 html 的 fontsize，确定 rem 单位的大小
	var screenW = $(window).width();
	var screenH = $(window).height();

	// 刚开始屏幕横屏，则提示
	if (screenH < screenW) {
		$('.alert').addClass('show-alert');
	} else {
		$('.alert').removeClass('show-alert');
	}
	// 手机横屏后给出提示
	window.addEventListener("orientationchange", function () {
		if (window.orientation != 0) {
			document.addEventListener('touchmove', preventDefault, { passive: false });
			$('.alert').addClass('show-alert');
		} else {
			document.removeEventListener('touchmove', preventDefault, { passive: false });
			$('.alert').removeClass('show-alert');
		}
	})
})

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

// ======== 更换主题板块
// 点击选择主题
$('#theme').on('touchend', function (ev) {
	var whTheme = [];
	whTheme[0] = $(ev.target).index();
	whTheme[1] = $(ev.target).css("background-color");
	localStorage.setItem("THEME", JSON.stringify(whTheme));
	document.documentElement.style.setProperty("--theme_color", whTheme[1]);
	$('#theme').children().removeClass('chose')
	$('#theme').children().eq(whTheme[0]).addClass('chose')
})

// ======== 快捷按钮板块
// 添加按钮
$(document).on('touchend', '#addFast', function () {
	$('#fastEdit').addClass('show-edit');
	$('#setBtn').addClass('set-btn-hidden');
	$('#toEdit').addClass('to-edit-hidden');
	whFast = $('#addFast').index();
})

// 退出编辑状态
$(document).on('touchend', '#editCancel', function () {
	clearFastInput();
	$('.fast-icon-fg').removeClass('fast-icon-edit');
	$('#setBtn').removeClass('set-btn-hidden');
	$('#toEdit').removeClass('to-edit-hidden');
	$('.remove-fast-icon').removeClass('show-remove-fast-icon');
	saveFastToLocals();
})

// 编辑状态中的保存
$(document).on('touchend', '#editSave', function () {
	addFastBtn(whFast);
})

// 点击右上角编辑进入编辑状态
$(document).on('touchend', '#toEdit', function () {
	$('.fast-icon-fg').toggleClass('fast-icon-edit');
	$('.remove-fast-icon').toggleClass('show-remove-fast-icon');
})

// 编辑功能
$('#fastContent').on('touchend', '.fast-icon-fg', function (e) {
	e.stopPropagation();			// 停止事件冒泡
	$('#fastEdit').addClass('show-edit');
	var fastUrlOld = $(this).prev()[0].href;
	var fastTitOld = $(this).next()[0].textContent;
	$('#editUrl').val(fastUrlOld);
	$('#editTit').val(fastTitOld);
	whFast = $(this).parent().index();
	$('#setBtn').addClass('set-btn-hidden');
	$('#toEdit').addClass('to-edit-hidden');
})
// 删除功能
$('#fastContent').on('touchend', '.remove-fast-icon', function (e) {
	e.stopPropagation();
	whFast = $(this).parent().index();
	removeFast(whFast);
})

// 点击 arc 或者 fast
$(document).on('touchend', function (e) {
	switch (e.target.id) {
		case 'arc':
		case 'fast':
		case 'fastBox':
		case 'fastContent':
			if ($('.fast-icon-fg').hasClass('fast-icon-edit')) {
				$('.fast-icon-fg').removeClass('fast-icon-edit');
			}
			if ($('.remove-fast-icon').hasClass('show-remove-fast-icon')) {
				$('.remove-fast-icon').removeClass('show-remove-fast-icon');
				saveFastToLocals();
			}
			break;
	}
})


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

	$(document).on('touchend', '#setBackground, #set', function(){
		$('#set').css('transform', 'translateX(-60vw)');
		$('#setBackground').css('display', 'none');
	})

})
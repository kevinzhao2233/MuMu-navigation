var choice;		// 被选中的项

// ======== 禁止页面滚动
document.addEventListener('touchmove', preventDefault, { passive: false });


$(document).ready(function () {
	// $('#rotate').children().eq(-1 * choice)
})


$(document).on('touchend', '#btn', function () {
	choice = Math.floor(Math.random() * 18 + 1);							// 产生随机数，后面 *20 即为结束动画的角度
	var rotate = choice * 20																	// 结束动画转动的角度
	var rotate_end_time = rotate / 360 + 1;										// 结束动画用时
	document.documentElement.style.setProperty('--rotate', rotate + 'deg');
	document.documentElement.style.setProperty('--rotate_end_time', rotate_end_time + 's');
	var main_color = $('#rotate').children().eq(-1 * choice).css('background-color');
	console.log(main_color);
	$('#rotate').addClass('rotate-start');
	setTimeout(function () {
		$('#rotate').addClass('rotate-run');
		$('#rotate').removeClass('rotate-start');
	}, 1000);
	setTimeout(function () {
		$('#rotate').addClass('rotate-end');
		$('#rotate').removeClass('rotate-run');
	}, 4000);
	setTimeout(function(){
		$('#rotate').children().eq(-1 * choice).addClass('choice-item');
		$(document).on('animationend', '#rotate', function(){
			$('.main').css('background-color', main_color);
		})
	}, 5000);
})


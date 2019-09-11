var choice;		// 随机产生的项
var choice_item;

// ======== 禁止页面滚动
document.addEventListener('touchmove', preventDefault, { passive: false });

$(document).ready(function () {
	$(document).on('touchend', function (ev) {
		console.log(ev.target.id);
		switch (ev.target.id) {
			case "start":
				$('#ban').removeClass('no-display');
				choice = Math.floor(Math.random() * 18 + 1);				// 产生随机数，后面 *20 即为结束动画的角度
				var rotate = choice * 20;														// 结束动画转动的角度
				var rotate_end_time = rotate / 360 + 1;							// 结束动画用时
				document.documentElement.style.setProperty('--rotate', rotate + 'deg');
				document.documentElement.style.setProperty('--rotate_end_time', rotate_end_time + 's');
				var main_color = $('#rotate').children().eq(-1 * choice).css('background');
				choice_item = $('#rotate').children().eq(-1 * choice).html();
				$('#rotate').addClass('rotate-start');
				setTimeout(function () {
					$('#rotate').addClass('rotate-run');
					$('#rotate').removeClass('rotate-start');
				}, 1000);
				setTimeout(function () {
					$('#rotate').addClass('rotate-end');
					$('#rotate').removeClass('rotate-run');
				}, 4000);
				setTimeout(function () {
					$('#rotate').children().eq(-1 * choice).addClass('choice-item');
					$(document).on('animationend', '#rotate', function () {
						$('.main').css('background', main_color);
						$('.tit').html(choice_item);
						$('#restart').removeClass('no-display');
						$('#ban').addClass('no-display');
					})
				}, 5000);
				break;
			case "ban":
				console.log('别点了');
				break;
			case "restart":
				$('#rotate').removeClass('rotate-end');
				$('.tit').html('这不好吃，\n再来');
				$('#rotate').children().eq(-1 * choice).removeClass('choice-item');
				$('#ban').addClass('no-display');
				$('#start').trigger('touchend');
				break;
		}
	})
})

$(document).on('touchend', '.other-content', function () {
	$('.box-edit').css('flex', '0');
	$('.edit-content-tit').addClass('no-display');
	$('.other-content').addClass('other-content-act');
	$('.other-content-tit').addClass('other-content-tit-act');
	$('.other-content-body').removeClass('no-display');
	setTimeout(function () {
		$('.other-content-body').removeClass('hidden');
	}, 300)
})






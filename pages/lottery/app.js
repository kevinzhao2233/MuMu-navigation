var choice;					// 随机产生的项
var choiceItem; 		// 被抽中的块
var editItemIndex; 	// 选中的转盘，用来确定是要删除或编辑哪个转盘
var oTempTurn = {				// 一个转盘
	title: '爱你',
	item: ['1', '2']
}
var oTurn = [];

// ======== 禁止页面滚动
document.addEventListener('touchmove', preventDefault, { passive: false });

$(document).ready(function () {

	// 转盘模块
	$(document).on('touchend', function (ev) {
		switch (ev.target.id) {
			case "start":
				$('#ban').removeClass('no-display');
				choice = Math.floor(Math.random() * 18 + 1);				// 产生随机数，后面 *20 即为结束动画的角度
				var rotate = choice * 20;														// 结束动画转动的角度
				var rotateEndTime = rotate / 360 + 1;							// 结束动画用时
				document.documentElement.style.setProperty('--rotate', rotate + 'deg');
				document.documentElement.style.setProperty('--rotate_end_time', rotateEndTime + 's');
				var main_color = $('#rotate').children().eq(-1 * choice).css('background');
				choiceItem = $('#rotate').children().eq(-1 * choice).html();
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
						$('.tit').html(choiceItem);
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

// 点击 其他转盘 板块，进入其中进行设置
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

// 选中某一个转盘
$('#otherItemBox').on('touchend', '.other-item', function () {
	editItemIndex = $(this).index();
	$('.other-item').removeClass('other-item-act');
	// 如果不是添加按钮
	if ($(this).index() < $(this).parent().children().length - 1) {
		$(this).addClass('other-item-act')
		$('#controlBox').removeClass('no-display');
		$('#controlComplate, #controlCancel').addClass('no-display');
	}
	// 如果是添加按钮
	if ($(this).index() == $(this).parent().children().length - 1) {
		$('#otherTit').html("添加新的转盘");
		$('#otherItemBox, #controlUse, #controlEdit').addClass('no-display');
		$('#itemDetail, #controlBox, #controlComplate, #controlCancel').removeClass('no-display');
	}
})
// 添加项
$(document).on('touchend', '#addItem', function () {
	$('#addItem').before('<div class="other-item"><input placeholder="添加项" type="text"><span class="iconfont icon-quxiao"></span></div>')
})
// 删除项, 弹窗保护
$(document).on('touchend', '.remove-item', function () {
	// $('#warning').removeClass('no-display');
	
})
$('#controlBox').on('touchend', function (ev) {
	switch (ev.target.id) {
		case 'controlComplate':			// 点击完成
			oTempTurn.title = $('#itemDetailTit').val();
			$('#itemDetailForm input').each(function (index) {		// 遍历，保存信息
				oTempTurn.item[index - 1] = $(this).val();
			})
			oTurn.push(oTempTurn);
			localStorage.setItem('TURN', JSON.stringify(oTurn));
			$('#otherItemBox, #controlUse, #controlEdit').removeClass('no-display');
			$('#itemDetail, #controlBox').addClass('no-display');
			$('#addTurn').before('<div class="other-item">' +
				oTempTurn.title +
				'<span class="iconfont icon-quxiao"></span></div>');
			break;
		case 'controlCancel':
			// 直接退出，回到进入的地方
			$('#otherItemBox, #controlUse, #controlEdit').removeClass('no-display');
			$('#itemDetail, #controlBox').addClass('no-display');
			break;
	}
})

// 选中转盘后，开始，给下方的转盘填充数据
$(document).on('touchend', '#controlUse', function () {
	$('.other-item').removeClass('other-item-act')
	$('#controlBox').addClass('no-display');
	// TODO: 这里需要将转盘填满数据，并回到初始界面的样式
})

// 选中转盘后，编辑转盘
$(document).on('touchend', '#controlEdit', function () {
	$('#otherTit').html($('#otherItemBox').children().eq(editItemIndex)[0].textContent)

})








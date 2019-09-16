var choice;					// 随机产生的项
var choiceItem; 		// 被抽中的块
var editItemIndex; 	// 选中的转盘，用来确定是要删除或编辑哪个转盘
var isNewTurn = 0;
var oTempTurn = {				// 一个转盘
	title: 'tit',
	item: ['item', 'item', 'item']
}
var oTurn = [];

// ======== 禁止页面滚动
document.addEventListener('touchmove', preventDefault, { passive: false });

$(document).ready(function () {

	// ======== 初始化所有转盘
	var initData = [{
		title: '今天吃什么呢？',
		item: ['脆皮鸡盖饭', '大肉面片', '臊子干拌', '酸菜肉丝面', '豆干肉', '牛肉面']
	}, {
		title: '今天谁带饭？',
		item: ['张飞', '吕布', '曹操', 'kevin']
	}, {
		title: '这回谁喝酒？',
		item: ['杨贵妃', '蜘蛛侠', '唐僧', '猪猪侠', '哪吒', '吴京', '蔡徐坤', 'JackSparrow', '汤姆']
	}]

	oTurn = JSON.parse(localStorage.getItem('TURN'));
	if (oTurn) {
		console.log('localstorage中有');
	} else {
		oTurn = initData.concat();
		localStorage.setItem('TURN', JSON.stringify(oTurn));
	}

	// 初始化其他转盘页面的转盘标题
	for (var initIndex = 0, initLen = oTurn.length; initIndex < initLen; initIndex++) {
		$('#otherItemBox i').eq(initIndex).html(oTurn[initIndex].title);
	}

	// 初始化页面标题和下方转盘
	editItemIndex = 0;
	$('.tit').html(oTurn[editItemIndex].title);
	$('.card').html('谢谢参与');
	cycle = Math.trunc(18 / oTurn[editItemIndex].item.length);
	for (var i = 0; i < cycle; i++) {
		r = 0;
		for (var j = i * oTurn[editItemIndex].item.length; j < (i + 1) * oTurn[editItemIndex].item.length; j++) {
			$('.card').eq(j).html(oTurn[editItemIndex].item[r]);
			r++;
		}
	}

	// 页面下方转盘模块
	$(document).on('touchend', function (ev) {
		console.log(ev.target);
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
				$('.tit').html('不行，再来');
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
$('#otherItemBox').bind('touchend', '.other-item', function () {
	editItemIndex = $(this).index();
	$('.other-item').removeClass('other-item-act');
	// 如果不是添加按钮
	if ($(this).index() < $(this).parent().children().length - 1) {
		isNewTurn = 2;
		$(this).addClass('other-item-act')
		$('#controlBox').removeClass('no-display');
		$('#controlComplate, #controlCancel').addClass('no-display');
	}
	// 如果是添加按钮
	if ($(this).index() == $(this).parent().children().length - 1) {
		isNewTurn = 1;
		$('#otherTit').html("添加新的转盘");
		$('#otherItemBox, #controlUse, #controlEdit').addClass('no-display');
		$('#itemDetail, #controlBox, #controlComplate, #controlCancel').removeClass('no-display');
	}
})

// 添加某个转盘中的项
$(document).on('touchend', '#addItem', function () {
	if ($('#itemDetailForm .other-item').length - 1 < 18) {
		$('#addItem').before('<div class="other-item"><input placeholder="添加项" type="text"><span class="iconfont icon-quxiao remove-item"></span></div>')
	} else {
		alert('最多只能添加18个项哦');
	}
})

// 删除转盘或项, 删除转盘会有弹窗保护
$(document).on('touchend', '.remove-item', function (ev) {
	ev.stopPropagation()
	if ($(this).parent().parent()[0].id == 'otherItemBox') {
		if (confirm('你将要删除这个转盘')) {
			$(this).parent().remove()
		} else {
			console.log('手滑了');
		}
		$(this).parent().removeClass('other-item-act')
		$('#controlBox').addClass('no-display');
		$('#controlComplate, #controlCancel').removeClass('no-display');
	} else if ($(this).parent().parent()[0].id == 'itemDetailForm') {
		$(this).parent().remove();
	} else {
		console.log('出错了吗')
	}
	// 删除后在‘保存’的时候才会更改 localstorage 中的内容
})

// 添加或修改完后保存或取消
$('#controlBox').on('touchend', function (ev) {
	switch (ev.target.id) {
		case 'controlComplate':			// 点击完成
			oTempTurn.title = $('#itemDetailTit').val();
			$('#itemDetailForm input').each(function (index) {		// 遍历，保存信息
				oTempTurn.item[index - 1] = $(this).val();
			})
			// 判断是编辑以前的，还是添加新的；
			if (isNewTurn == 1) {
				oTurn.push(oTempTurn);
				$('#addTurn').before('<div class="other-item"><i>' + oTempTurn.title + '</i><span class="iconfont icon-quxiao remove-item"></span></div>');
			}
			if (isNewTurn == 2) {
				oTurn.splice(editItemIndex, 1, oTempTurn);
			}
			localStorage.setItem('TURN', JSON.stringify(oTurn));
			$('#otherItemBox').children().eq(editItemIndex).html('<i>' + oTempTurn.title + '</i><span class="iconfont icon-quxiao remove-item"></span>');
			$('#otherItemBox, #controlUse, #controlEdit').removeClass('no-display');
			$('#itemDetail, #controlBox').addClass('no-display');
			break;
		case 'controlCancel':					// 点击取消
			// 直接退出，回到进入的地方
			$('#otherItemBox, #controlUse, #controlEdit').removeClass('no-display');
			$('#itemDetail, #controlBox').addClass('no-display');
			$('.other-item').removeClass('other-item-act');
			$('#otherTit').html('其他转盘');
			break;
	}
	// XXX: 这里可能需要改进，但这个方法应该还是性能上比较优的方案
	if ($('#itemDetailForm .other-item').length - 1 > 3) {
		$('#itemDetailForm').html('<form action="" class="item-detail-form" id="itemDetailForm"><input placeholder="在这里输入标题" type="text" name="" class="item-detail-tit" id="itemDetailTit"><span class="line-br"></span><div class="other-item"><input placeholder="添加项" type="text"><span class="iconfont icon-quxiao remove-item"></span></div><div class="other-item"><input placeholder="添加项" type="text"><span class="iconfont icon-quxiao remove-item"></span></div><div class="other-item"><input placeholder="添加项" type="text"><span class="iconfont icon-quxiao remove-item"></span></div><div class="other-item add-item" id="addItem"><span class="iconfont icon-quxiao"></span></div></form>')
	}
})

// 选中转盘后，开始，给下方的转盘填充数据
$(document).on('touchend', '#controlUse', function () {
	var cycle;
	var r;
	$('.other-item').removeClass('other-item-act')
	$('#controlBox').addClass('no-display');
	$('.tit').html(oTurn[editItemIndex].title);
	$('.card').html('谢谢参与');
	cycle = Math.trunc(18 / oTurn[editItemIndex].item.length);
	for (var i = 0; i < cycle; i++) {
		r = 0;
		for (var j = i * oTurn[editItemIndex].item.length; j < (i + 1) * oTurn[editItemIndex].item.length; j++) {
			$('.card').eq(j).html(oTurn[editItemIndex].item[r]);
			r++;
		}
	}
	// 数据操作已经完成，回到初始界面的样式
	$('.other-content-body').addClass('hidden');
	setTimeout(function () {
		$('.other-content-body').addClass('no-display');	
		$('.edit-content-tit').removeClass('no-display');
		$('.other-content').removeClass('other-content-act');
		$('.other-content-tit').removeClass('other-content-tit-act');
		$('.box-edit').css('flex', '1');
	}, 300)
})


// 选中转盘后，编辑转盘
$(document).on('touchend', '#controlEdit', function () {
	var tempStr;				// 从 localstorage 中获取的 string 类型的所有转盘
	var turnLen;				// 每一个转盘的 item 的长度
	$('#otherTit').html('编辑转盘');
	$('#otherItemBox, #controlUse, #controlEdit').addClass('no-display');
	$('#itemDetail, #controlComplate, #controlCancel').removeClass('no-display');

	// 获取localStorage 中的信息，填写到表单中，改写后的由 点击“完成” 来控制
	var tempStr = localStorage.getItem('TURN');
	oTempTurn = JSON.parse(tempStr)[editItemIndex];
	var turnLen = oTempTurn.item.length;
	// 遍历增加空的input
	while ($('#itemDetailForm .other-item').length - 1 < turnLen) {
		$('#addItem').trigger('touchend');
	}
	// 遍历将数据填入input
	$('#itemDetailForm input').each(function (index) {
		$(this).val(oTempTurn.item[index - 1])
	})
	$('#itemDetailTit').val($('#otherItemBox').children().eq(editItemIndex)[0].textContent);
})










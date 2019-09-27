var hex, rgb;

$(document).ready(function () {

	$(document).on('touchend', function (ev) {
		var res;
		console.log(ev.target);
		switch (ev.target.id) {
			case 'hexBtn':
				hex = $('#hexInput').val().toString().toUpperCase().replace('#', '');
				// 合法检测
				res = checkHex(hex);
				if (res == 'err') {
					$('#textColor').html('请输入正确的16进制颜色值！');
					$('#textColor').addClass('err');
					$('#show').addClass('show-color-err');
				} else {
					$('#textColor').html(res);
					$('#show').css('background-color', res);
					$('#show').addClass('show-color-act');
				}
				break;
			case 'rgbBtn':
				rgb = $('#rgbInput').val().toString().toUpperCase().match(/\d+/g);
				console.log('rgb', rgb)
				res = checkRgb(rgb);
				console.log('res', res);
				if (res == 'err') {
					$('#textColor').html('请输入正确的rgb()颜色值！');
					$('#textColor').addClass('err');
					$('#show').addClass('show-color-err');
				} else {
					$('#textColor').html(res);
					$('#show').css('background-color', res);
					$('#show').addClass('show-color-act');
				}
				break;
		}
	})

	$(document).on('focus', '.color-input', function () {
		$('#textColor').html('----');
		$('#textColor').removeClass('err');
		$('#show').removeClass('show-color-err');
		$('#show').removeClass('show-color-act');
	})

	function checkHex(hex) {
		var temp = [];
		var result = [];
		if (hex.length === 3) {
			for (var i = 0; i < 3; i++) {
				temp.push(hex[i] + hex[i]);
			}
		} else if (hex.length === 6) {
			for (var j = 0; j < 3; j++) {
				temp.push(hex[j * 2] + hex[j * 2 + 1])
			}
		} else if (hex.length === 8) {
			// TODO: 对于 hex8 的支持
		} else {
			return ('err');
		}
		for (var o = 0; o < 3; o++) {
			result[o] = parseInt(temp[o], 16);
		}
		return ('rgb(' + result.toString() + ')');
	}

	function checkRgb(rgb) {
		var temp;
		var result = [];
		if (rgb && rgb.length == 3) {
			temp = rgb.concat();
			for (var i = 0; i < 3; i++) {
				if (temp[i] > 255) {
					return ('err')
				} else {
					result[i] = parseInt(temp[i]).toString(16);		// 进制转换是数字之间的转换
				}
			}
			for (var j = 0; j < 3; j++) {
				if (result[j].toString().length == 1) {
					result[j] = '0' + result[j];
				}
			}
			return ('#' + result[0] + result[1] + result[2]);
		} else {
			return ('err');
		}
	}
})
var hex, rgb;

$(document).ready(function () {

})

$(document).on('touchend', function (ev) {
	var res;
	console.log(ev.target);
	switch (ev.target.id) {
		case 'hexBtn':
			hex = $('#hexInput').val().toString().toUpperCase().replace('#', '');
			// 合法检测
			res = checkHex(hex);
			if(res != 'err'){
				$('#textColor').html(res);
				$('#show').css('background-color', res);
				$('#show').addClass('show-color-act');
			}else if(res === 'err'){
				$('#textColor').html('请输入正确的16进制颜色值！');
				$('#textColor').addClass('err');
			}
			break;
		case 'rgbBtn':
			rgb = $('#rgbInput').val().toUpperCase();
			console.log("rgb", rgb);
			break;
	}
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
		// TODO: 对于 hex8 进行
	} else {
		return('err');
	}
	for(var o = 0; o < 3; o++){
		result[o] = parseInt(temp[o], 16);
	}
	console.log(result.toString());
	return('rgb(' + result.toString() + ')');
}

function checkRgb(rgb) {
	var temp = [];
	var result = [];
}
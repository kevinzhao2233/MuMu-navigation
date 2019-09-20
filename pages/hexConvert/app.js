
var inputNum, binNum, octNum, decNum, hexNum, isErr, errMessage;
var convert;

$(document).on('touchend', function (ev) {
	inputNum = $(ev.target).prev().val()
	errMessage = '';
	switch (ev.target.id) {
		// =============== 转换按钮
		case 'conBin':
			decNum = convert.toDec(inputNum, 2);
			isErr = checkErr(errMessage);
			if (isErr != 'err') {
				convert.toOther(decNum);
			}
			break;
		case 'conOct':
			decNum = convert.toDec(inputNum, 8);
			isErr = checkErr(errMessage);
			if (isErr != 'err') {
				convert.toOther(decNum);
			}
			break;
		case 'conDec':
			decNum = convert.toDec(inputNum, 10);
			isErr = checkErr(errMessage);
			if (isErr != 'err') {
				convert.toOther(decNum);
			}
			break;
		case 'conHex':
			decNum = convert.toDec(inputNum, 16);
			isErr = checkErr(errMessage);
			if (isErr != 'err') {
				convert.toOther(decNum);
			}
			break;
	}
})

$(document).on('focus', '.input', function(){
	$('#err').removeClass('alert');
	$('#err').html('输入数据可以不用带前缀哦');
})

convert = {
	toDec: function (inputN, radix) {
		var test, temp, result;
		// 检测数据是否合法
		switch (radix) {
			case 2:
				test = /^([01]+[.])?[01]+$/g.test(inputN);
				if (test == false) {
					errMessage = 'err1'		// 非二进制
				}
				break;
			case 8:
				test = /^([0-7]+[.])?[0-7]+$/g.test(inputN);
				if (test == false) {
					errMessage = 'err1'		// 非八进制
				}
				break;
			case 10:
				test = /^[0-9]+[.][0-9]+$/g.test(inputN) || /[0-9]+/g.test(inputN);
				if (test == false) {
					errMessage = 'err1'		// 非十进制
				}
				break;
			case 16:
				test = /^(0x)?(0X)?[0-9a-fA-F]+[.][0-9a-f]+$/g.test(inputN) || /^(0x)?(0X)?[0-9a-fA-F]$/g.test(inputN);
				if (test == false) {
					errMessage = 'err1'		// 非十六进制
				}
				break;
		}
		console.log('正则是否验证通过：', test)
		// 返回结果
		if (errMessage != 'err1') {
			temp = inputN.split('.');
			if (temp.length == 2) {
				result = parseInt(temp[0], radix) + parseInt(temp[1], radix) / Math.pow(radix, temp[1].length);
			} else if (temp.length == 1) {
				result = parseInt(temp[0], radix);
			} else {
				errMessage = 'err2'			// 多个小数点
			}
			console.log('十进制：', result);
			return (result);
		} else {
			console.log('进制输入错误')
		}
	},

	toOther: function (decN) {
		binNum = Number(decN).toString(2);
		octNum = Number(decN).toString(8);
		hexNum = Number(decN).toString(16);
		showNum(binNum, octNum, decNum, hexNum);
	}
}

function showNum(binN, octN, decN, hexN) {
	$('[data-id="2"]').val(binN);
	$('[data-id="8"]').val(octN);
	$('[data-id="10"]').val(decN);
	$('[data-id="16"]').val(hexN);
}

function checkErr(err) {
	console.log('err类型', err)
	if (err == 'err1') {
		$('#err').html('请检查进制是否正确');
		$('#err').addClass('alert');
		return ('err')
	} else if (err == 'err2') {
		$('#err').html('请检查小数点哦');
		$('#err').addClass('alert');
		return ('err')
	} else {
		$('#err').removeClass('alert');
		$('#err').html('可以长按复制哦');
		return ('noErr');
	}
}


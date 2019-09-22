

function getInput(input) {
	if (input.length == 0) {
		return null;
	}
	var result;
	var len = input.length;
	if (len <= 20) {
		result = input;
	} else {
		var startStr = input.substring(0, 10);
		var endStr = input.substring(len - 10, len);
		result = startStr + len + endStr;
	}
	return result;
}

// -------加密签名
function encrypt(appKey, query, key, salt, curtime) {
	var str1 = appKey + getInput(query) + salt + curtime + key;
	var sign = sha256(str1);
	console.log("加密后的签名--> " + str1);
	return sign;
}

// -------全局变量
var appKey = '237a94a891d74984';
var key = 'OyQORa5H00LX11SDxgoLDdnFA3A3fFsI';//注意：暴露appSecret，有被盗用造成损失的风险
var from = 'auto';
var to = 'en';
var res;

// -------翻译主函数
$(document).on('keypress', '#input', function (ev) {
	if (ev.keyCode == '13') {
		$('#translate').trigger('touchend');
	}
})

$(document).on('touchend', '#translate', function () {
	initOutput();
	var salt = new Date().getTime();
	var curtime = Math.round(new Date().getTime() / 1000);  //时间戳
	var query = $('#input').val();
	console.log("要翻译的对象---> " + query);

	var sign = encrypt(appKey, query, key, salt, curtime);

	$.ajax({
		url: 'http://openapi.youdao.com/api',
		type: 'post',
		dataType: 'jsonp',
		data: {
			q: query,
			appKey: appKey,
			salt: salt,
			from: from,
			to: to,
			curtime: curtime,
			sign: sign,
			signType: "v3"
		},
		success: function (data) {
			res = data;
			if (data.basic) {
				successWord(res);
			} else {
				successSentence(res);
			}

		}
	})
})

function successWord(data) {
	$('.webTranslate').removeClass('no-display');
	console.log(data);

	// 主翻译结果
	$('#mainResult h3').html(data.translation[0]);

	// 音标
	$('#usPhonetic').html('美：[' + data.basic["us-phonetic"] + '] <span class="iconfont icon-laba laba"></span>')
	$('#ukPhonetic').html('英：[' + data.basic.phonetic + '] <span class="iconfont icon-laba laba"></span>')

	// 词性
	if (data.basic.explains) {
		$('#partOfSpeech').html('');
		for (let i = 0, len = data.basic.explains.length; i < len; i++) {
			$('#partOfSpeech').append('<p></p>')
			$('#partOfSpeech').children().eq(-1).html(data.basic.explains[i])
		}
	}

	// 派生词
	$('.other').removeClass('no-display');
	if (data.basic.wfs) {
		$('.main-other').removeClass('no-display');
		$('#derive').html('');
		$('.derive-box h3').removeClass('no-display');
		for (let i = 0, len = data.basic.wfs.length; i < len; i++) {
			$('#derive').append('<p></p>');
			$('#derive').children().eq(-1).html(data.basic.wfs[i].wf.value + '：' + data.basic.wfs[i].wf.name)
		}
	} else {
		$('.derive-box h3').addClass('no-display');
	}

	// 考试
	if (data.basic.exam_type) {
		$('.main-other').removeClass('no-display');
		$('#exam').html('');
		$('.exam-box h3').removeClass('no-display')
		for (let i = 0, len = data.basic.exam_type.length; i < len; i++) {
			if (i < len - 1) {
				$('#exam').append(data.basic.exam_type[i] + ' / ');
			} else {
				$('#exam').append(data.basic.exam_type[i]);
			}
		}
	} else {
		$('.exam-box h3').addClass('no-display')
	}

	// 网络
	if (data.web) {
		$('.other-web, .webTranslate').removeClass('no-display');
		for (let q = 0, webLen = data.web.length; q < webLen; q++) {
			$('.web-item-tit').eq(q).html(data.web[q].key);
			for (let j = 0, webItemLen = data.web[q].value.length; j < webItemLen; j++) {
				$('.web-item-con').eq(q).html('');
				if (j < webItemLen - 1) {
					$('.web-item-con').eq(q).append(data.web[q].value[j] + ' / ')
				} else {
					$('.web-item-con').eq(q).append(data.web[q].value[j])
				}
			}
		}
	} else {
		$('.webTranslate').addClass('no-display');
	}
}

function successSentence(data) {
	console.log('句子', data);
	$('#mainResult h3').html(data.translation[0]);
}

function initOutput() {
	$('.gap, .phonetic, .other, .exam-box h3, .webTranslate').addClass('no-display');
	$('.phonetic').css('display', 'none');
	$('#mainResult h3').html('');
	$('#partOfSpeech').html('');
	$('#derive').html('');
	$('#exam').html('');
}

$(document).on('touchend', '#clear', function () {
	$('#input').val('');
	initOutput();
})

$(document).on('touchend', '#usPhonetic', function () {
	var usAudio = $('#usPhoneticAudio');
	usAudio.prop('src', res.basic['us-speech']);
	usAudio.on('canplay', function () {
		usAudio[0].play();
	});
	usAudio.on('play', function () {
		$('#usPhonetic').css('color', '#f95a6c');
	})
	usAudio.on('ended', function () {
		$('#usPhonetic').css('color', '#778899');
	})
})

$(document).on('touchend', '#ukPhonetic', function () {
	var ukAudio = $('#ukPhoneticAudio');
	ukAudio.prop('src', res.basic['us-speech']);
	ukAudio.on('canplay', function () {
		ukAudio[0].play();
	})
	ukAudio.on('play', function () {
		$('#ukPhonetic').css('color', '#f95a6c');
	})
	ukAudio.on('ended', function () {
		$('#ukPhonetic').css('color', '#778899');
	})
})

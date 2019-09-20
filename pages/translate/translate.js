

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

// -------翻译主函数
$(document).on('touchend', '#translate', function () {
	var salt = new Date().getTime();
	var curtime = Math.round(new Date().getTime() / 1000);  //时间戳
	var query = $('#input').val();
	console.log("要翻译的字---> " + query);

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
			console.log(data);
			$("#output").html(data.translation[0])
		}
	})
})

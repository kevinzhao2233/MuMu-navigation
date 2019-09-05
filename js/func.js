// 搜索
function search(whSearch) {				// 接收 string
	if ($('#searchInput').val() != "") {
		window.location.href = searchE[whSearch + ""] + $('#searchInput').val();
		$("#searchInput").val("");
	}
	return false;
}

// 改变搜索引擎
function changeSearchE(whSearchE, offset) {
	localStorage.setItem("SEARCH_E", whSearchE);
	localStorage.setItem("SEARCH_E_ICO", offset);
	$('#searchE_f_ico').css('transform', 'translateY(' + offset * -0.5 + 'rem)');
	$('#searchE_b_ico').css('transform', 'translateY(' + offset * -0.5 + 'rem)');
	$('#searchE_item span').removeClass('chose');
	$('#searchE_item span').eq(searchENumber).addClass('chose');
}

function addFastBtn() {
	var fastUrl = $('#editUrl').val();
	var fastTit = $('#editTit').val();
	if (fastUrl != '' && fastTit != '') {
		console.log(checkUrl(fastUrl));
		var newElement = '<div class="fast-item bg2">' +
			"<a href = " + fastUrl +
			" class= 'fast-icon  fast-icon-link'>" +
			'</a>' +
			'<span class="iconfont icon-ziyuan fast-icon-fg">' +
			'</span>' +
			'<span class="fast-title">' + fastTit +
			'</span>' +
			'</div >';
		if (isOldFast) {
			console.log(this)
		} else {
			$('#addFast').before(newElement);
		}
		clearFastInput();
	}
	else {
		$('#fastForm p').addClass('input-err');
		$(document).on('focus', '#editUrl, #editTit', function () {
			$('#fastForm p').removeClass('input-err');
		})
	}
}
// 检查 URL 是否正确，这里需要有一级，二级域名和前缀，如www、http
function checkUrl(testReg) {
	var strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.|[wW][sS]:\/\/)(([A-Za-z0-9-~_:]+)\.)+([A-Za-z0-9-~_:\/])+$/;
	return strRegex.test(testReg);
}
// 清除输入框输入信息
function clearFastInput() {
	$('#editUrl, #editTit').val("");
	$('#fastEdit').removeClass('show-edit');
}
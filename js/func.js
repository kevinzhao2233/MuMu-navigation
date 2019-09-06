// ======== 搜索
function search(whSearch) {				// 接收 string
	if ($('#searchInput').val() != "") {
		window.location.href = searchE[whSearch + ""] + $('#searchInput').val();
		$("#searchInput").val("");
	}
	return false;
}

// ======== 改变搜索引擎
function changeSearchE(whSearchE, offset) {
	localStorage.setItem("SEARCH_E", whSearchE);
	localStorage.setItem("SEARCH_E_ICO", offset);
	$('#searchE_f_ico').css('transform', 'translateY(' + offset * -0.5 + 'rem)');
	$('#searchE_b_ico').css('transform', 'translateY(' + offset * -0.5 + 'rem)');
	$('#searchE_item span').removeClass('chose');
	$('#searchE_item span').eq(searchENumber).addClass('chose');
}

// ======== 保存  添加和编辑的按钮
function addFastBtn(fastIndex) {
	var fastUrl = $('#editUrl').val();
	var fastTit = $('#editTit').val();
	if (fastUrl != '' && fastTit != '') {		// 如果有输入内容，
		console.log(checkUrl(fastUrl));
		var newElement = '<div class="fast-item bg2">' +
			"<a href = " + fastUrl +
			" class= 'fast-icon  fast-icon-link'>" +
			'</a>' +
			'<span class="iconfont icon-ziyuan fast-icon-fg">' +
			'</span>' +
			'<span class="fast-title">' + fastTit +
			'</span>' +
			'</div >\n';
		if (fastIndex < $('#addFast').index()) {		// 编辑之前的按钮
			$('#fastContent').children().eq(fastIndex).replaceWith(newElement);
		} else {																		// 添加新的按钮
			$('#addFast').before(newElement);
		}
		clearFastInput();
		$('#setBtn').removeClass('set-btn-hidden');
		$('#toEdit').removeClass('to-edit-hidden');
	}
	else {																				// 如果没有输入内容，则提示err
		$('#fastForm p').addClass('input-err');
		$(document).on('focus', '#editUrl, #editTit', function () {
			$('#fastForm p').removeClass('input-err');
		})
	}
	if ($('#fastContent').children().length > 10) {
		$('#addFast').css('display', 'none');
	}
	$('.fast-icon-fg').removeClass('fast-icon-edit');
	// 每次保存后都将这个 btn 盒子保存到 localstorage 中
	localStorage.setItem("FAST_CONTENT", $('#fastContent').html());
}

// ======== 检查 URL 是否正确，这里需要有一级，二级域名和前缀，如www、http
function checkUrl(testReg) {
	var strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.|[wW][sS]:\/\/)(([A-Za-z0-9-~_:]+)\.)+([A-Za-z0-9-~_:\/])+$/;
	return strRegex.test(testReg);
}
// ======== 清除输入框输入信息
function clearFastInput() {
	$('#editUrl, #editTit').val("");
	$('#fastEdit').removeClass('show-edit');
}

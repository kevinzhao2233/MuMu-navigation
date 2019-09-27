$(document).ready(function () {
  // ======== 从 localstorage 中获取快捷按钮
  if (localStorage.getItem("FAST_CONTENT")) {
    $('#fastContent').html(localStorage.getItem("FAST_CONTENT"));
  }

  // ======== 初始化设置页面主题被选中状态
  $('#theme').children().removeClass('chose')
  $('#theme').children().eq(theme[0]).addClass('chose')

  // ======== 初始化搜索框图标 & 设置界面默认搜索引图标
  if (localStorage.getItem("SEARCH_E_ICO")) {
    searchENumber = localStorage.getItem("SEARCH_E_ICO");
    $('#searchE_f_ico').css("transform", "translateY(" + searchENumber * -0.5 + "rem)");
    $('#searchE_b_ico').css("transform", "translateY(" + searchENumber * -0.5 + "rem)");
    $('#searchE_item span').removeClass('chose');
    $('#searchE_item span').eq(searchENumber).addClass('chose');
  }
})
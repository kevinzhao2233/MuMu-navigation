
// ======== 禁止页面滚动
document.addEventListener('touchmove', preventDefault, { passive: false });


$(document).ready(function(){

})

$(document).on('touchend', '#btn', function(){
	setTimeout(function(){
		$('#rotate').addClass('rotate-run');
		$('#rotate').removeClass('rotate-start');
	}, 1000);
	setTimeout(function(){
		$('#rotate').addClass('rotate-end');
		$('#rotate').removeClass('rotate-run');
	}, 4000);
	$('#rotate').addClass('rotate-start');
})


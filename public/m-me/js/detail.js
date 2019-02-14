$(function() {
	//获取id
	var id = getUrlParams(location.href,'id')
	//获取num库存
	var num = null
	//尺码
	var sizes = null
	//产品id
	var proId = null
	//默认数量为1件
	$('#inputNum').val('1')
	//发送请求
	$.ajax({
		url: '/product/queryProductDetail',
		type: 'get',
		data: {
			id: id
		},
		success: function(res) {
			//res是个对象，可以直接写
			var html = template('proDtailTpl',res)
			num = res.num
			proId = res.id
			$('#detail-box').html(html)
			//获得slider插件对象
			var gallery = mui('.mui-slider')
			gallery.slider()
		}
	});
    
    //尺码选中事件
    $('#detail-box').on('tap','.product-number span',function() {
    	$(this).addClass('active').siblings('span').removeClass('active')
    	sizes = $(this).html()
    })

    //数量加减事件
    $('#desCount').on('tap', function() {
    	var desnum = $('#inputNum').val()
    	desnum--
    	if(desnum < 1) {
    		desnum = 1
    	}
    	$('#inputNum').val(desnum)
    });
    $('#addCount').on('tap', function() {
    	var addnum = $('#inputNum').val()
    	addnum++
    	if(addnum > num) {
    		addnum = num
    	}
    	$('#inputNum').val(addnum)
    });
    // 添加购物车
    $('#addCart').on('tap', function(){
    	if(!sizes) {
    		mui.toast('请选择一个尺码')
    		return;
    	}
    	$.ajax({
    		url: '/cart/addCart',
    		type: 'post',
    		data: {
    			productId: proId,
    			num: num,
    			size: sizes
    		},
    		success: function(res) {
    			console.log(res)
    			if(res.success) {
    				mui.confirm('要跳转到购物车页面么?',function(message){
    					if(message.index) {
    						location.href = 'cart.html'
    					}

    				});
    			}
    		}
    	});
    });
});
$(function() {
	var addressInfo = null;
	//获取用户存储的收货地址信息
	$.ajax({
		url: '/address/queryAddress',
		type: 'get',
		success: function(res) {
			addressInfo = res
			var html = template('addressTemp',{
				data: res
			});
			$('#addressBox').html(html)
		}
	});
	//编辑收货地址
	$('#addressBox').on('tap', '.edit-btn',function() {
		//获取id
		var id = this.getAttribute('data-id')
		
		for(var i=0 ; i<addressInfo.length ; i++) {
			if(addressInfo[i].id == id) {
				//如果找到当前要编辑的信息，则把信息存储到本地
				localStorage.setItem('editInfo',JSON.stringify(addressInfo[i])) 
				break;
			}
		}
		//跳转,isEdit=1表示编辑页面,isEdit=0表示添加页面
		location.href = 'addAddress.html?isEdit=1'
        
	});
	//删除收货地址
	$('#addressBox').on('tap', '.delete-btn',function() {
		    //获取id
		    var id = this.getAttribute('data-id')
		    //获取删除按钮的父节点的父节点
            var li = this.parentNode.parentNode

		    mui.confirm('确定要删除么?', function(data) {
			//index为1代表true，要删除
			if(data.index == 1){
				$.ajax({
					url: '/address/deleteAddress',
					type: 'post',
					data: {
						id: id
					},
					success: function(res) {
						if(res.success) {
							//删除成功，重新加载页面
							location.reload()
						}
					}
				})
			} else {
				//index为0代表false，取消删除
				//关闭滑动，传递要关闭的元素
				mui.swipeoutClose(li)
			}
		});
	});
});
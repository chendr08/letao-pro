$(function() {

	//初始化popPicker组件
	var picker = new mui.PopPicker({layer:3});
	//给picker对象添加数据,cityData为数组格式
	picker.setData(cityData);
    //添加轻敲事件获取省市区
	$('#editForm').on('tap', '#selectCity', function() {
		picker.show(function(selectItems) {
			$('#selectCity').val(selectItems[0].text+selectItems[1].text
			+selectItems[2].text)
	    });
	});


	//获取信息
	var isEdit = Number(getUrlParams(location.href, 'isEdit'))
	var editInfo = JSON.parse(localStorage.getItem('editInfo'))
	if(isEdit) {
	   //编辑页面
	   var html = template('editTpl',{
	   	editInfo: editInfo
	   });
	   $('#editForm').html(html)
	} else {
		var html = template('editTpl',{
			editInfo: {} 
		});
	   $('#editForm').html(html)
	}


	//添加收货地址
	$('#add-btn').on('tap', function() {
		var username = $.trim($('[name = "username"]').val())
		var postCode = $.trim($('[name = "postCode"]').val())
		var selectCity = $.trim($('[name = "selectCity"]').val())
		var detail = $.trim($('[name = "detail"]').val())
	    var url = '/address/addAddress'
	    var data = {
	    	address: selectCity,
			addressDetail: detail,
			recipients: username,
			postcode: postCode
	    }
		if(isEdit) {
		   //若是编辑页面
           url = '/address/updateAddress'
           data.id = editInfo.id
		} else{
			
			//校验
			if(!username) {
				mui.toast('请输入收货人姓名')
				return;
			}
			if(!postCode) {
				mui.toast('请输入邮编')
				return;
			}
		}
		
		//发送请求，提交数据
		$.ajax({
			url: url,
			type: 'post',
			data: data,
			success:function(res) {
				if(res.success) {
					if (isEdit) {
						mui.toast('编辑地址成功')
					} else {
						mui.toast('添加地址成功')
					}
					setTimeout(function(){
						location.href = 'address.html'
					},2000)
				}
			}
		})
	});
   
    	
	

});

$(function() {
	//获取列表数据
	$.ajax({
		url: '/product/queryProductDetailList',
		type: 'get',
		data: {
			page: 1,
			pageSize: 10
		},
		success: function(res) {
			var html = template('productTpl',res);
			$('#productBox').html(html);
		}
	});

	//添加产品数据
	//1.获取二级分类数据
	$.ajax({
		url: '/category/querySecondCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function(res) {
		
			var html = template('secondCategoryTpl',res);
            $('#secondBox').html(html);
		}
	});
    
	//上传图片
	var imgArry = [];
	$('#fileUploads').fileupload({
    	dataType: 'json',
    	done: function (e, data) {
    
    	//保存图片地址
    	imgArry.push(data.result);
    }
    });

    //实现添加商品
    $('#addProduct').on('click',function() {
    	var brandId = $.trim($('[name="brandId"]').val());
    	var proName = $.trim($('[name="proName"]').val());
    	var oldPrice = $.trim($('[name="oldPrice"]').val());
    	var price = $.trim($('[name="price"]').val());
    	var proDesc = $.trim($('[name="proDesc"]').val());
    	var size = $.trim($('[name="size"]').val());
    	var num = $.trim($('[name="num"]').val());
    	//校验 略
    	//发送请求
    	$.ajax({
    		url: '/product/addProduct',
    		type: 'post',
    		data: {
    			proName: proName,
    			oldPrice: oldPrice,
    			price: price,
    			proDesc: proDesc,
    			size: size,
    			statu: 1,
    			num: num,
    			brandId: brandId,
    			pic: imgArry
    		},
    		success: function(res) {
    			if(res.success) {
    				alert('添加成功');
    				location.href = 'product.html';
    			} else {
    				alert(res.message);
    			}
    		}
    	});
    });
});
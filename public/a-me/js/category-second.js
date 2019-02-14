$(function() {
	var page = 1;
	var pageSize = 10;
	var totalPage = 0;
	//加载页面数据
	getData();

	//点击上一页
	$('#prevBtn').on('click', function() {
		page--;
		if(page < 1) {
			alert('已经是第一页了')
			page = 1;
			return;
		}
		getData();
	});
	//点击上一页
	$('#nextBtn').on('click', function() {
		page++;
		if(page > totalPage) {
			alert('已经是最后一页了')
			page = totalPage;
			return;
		}
		getData();
	});

	function getData() {
		$.ajax({
			url: '/category/querySecondCategoryPaging',
			type: 'get',
			data: {
				page: page,
				pageSize: pageSize
			},
			success: function(res) {
			
				totalPage = Math.ceil(res.total / pageSize);
				var html = template('secondCategoryTpl', res);
				$('#secondCategoryBox').html(html);
		}
	});
	}


	//二级分类数据添加
	//1.获取一级分类数据
	$.ajax({
		url: '/category/queryTopCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function(res) {
			var html = template('firstCategoryTpl',res);
			$('#firstCategoryBox').html(html);
		}
	});
    //文件上传
    var showImg = '';
	$('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            showImg = data.result.picAddr;
            $('#showImg').attr('src',data.result.picAddr);
        }
    });
    //二级分类数据添加
	$('#save').on('click',function() {
		//获取数据
		var categoryId = $.trim($('[name="firstCategoryName"]').val());
		var brandName = $.trim($('[name="productName"]').val());
        //发送请求
		$.ajax({
			url: '/category/addSecondCategory',
			type: 'post',
			data: {
				brandName: brandName,
				categoryId: categoryId,
				brandLogo: showImg,
				hot: 0
			},
			success: function(res) {
				if(res.success) {
					alert('添加成功');
					location.href = 'category-second.html';
				}
			}
		});
	});
});
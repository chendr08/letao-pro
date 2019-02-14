
$(function() {
	var page = 1;
	var pageSize = 10;
	var totoalPage = 0;
	getData();
	//点击上一页
	$('#prev').on('click', function() {
		page--;
		if(page < 1) {
			page = 1;
			alert('已经是第一页了')
			return;
		}
	    getData();
	});
    //点击下一页
	$('#next').on('click', function() {
		page++;
		if(page > totoalPage) {
			page = totoalPage;
			alert('已经是最后一页了')
			return;
		}
	    getData();
	});


	function getData() {
		$.ajax({
		     url: '/category/queryTopCategoryPaging',
		     type: 'get',
		     data: {
		     	page: page,
		     	pageSize : pageSize
		     },
		     success: function(res) {
		     	totoalPage = Math.ceil(res.total / pageSize);
		     	var html = template('firstCategoryTpl',res);
		     	
		     	$('#firstCategoryBox').html(html);
		     }
	});
	}

	//添加一级分类
	$('#save').on('click' ,function() {
		//获取添加的数据
		var categoryName = $.trim($('[name="categoryName"]').val());
		//校验
		if(!categoryName) {
			alert('请输入分类名称');
			return;
		}
		$.ajax({
			url: '/category/addTopCategory',
			type: 'post',
			data: {
				categoryName: categoryName
			},
			success: function(res) {
				if(res.success) {
					location.reload();
				}
			}
		});
	});
});
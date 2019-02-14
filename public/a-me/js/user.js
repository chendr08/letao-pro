$(function() {
	//获取用户信息列表
	$.ajax({
		url: '/user/queryUser',
		type: 'get',
		data: {
			page: 1,
			pageSize: 10
		},
		success: function(res){
			console.log(res);
			var html = template('userInfoTpl', res);
			$('#userInfoTable').html(html);
		}
	});
	//设置禁用/启用状态按钮
	$('#userInfoTable').on('click','#toggleBtn', function(){
		var id = $(this).attr('data-id');
		var isDelete = Number($(this).attr('data-isDelete'));
		alert(isDelete)
		$.ajax({
			url: '/user/updateUser',
			type: 'post',
			data: {
				id: id,
				isDelete: isDelete ? 0 : 1
			},
			success: function(res) {
				if(res.success) {
					location.reload();
				}
			}
		})
	})
});
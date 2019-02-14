//登陆拦截
$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	async: false,
	success: function(res) {
		if(res.success ) {
			location.href = 'user.html';
		}
	}
});

$(function(){
	$('#loginBtn').on('click',function() {
		//获取数据
		var name =$.trim($('[name="username"]').val());
		var pwd = $.trim($('[name="password"]').val());
		//验证非空
		if (!name) {
			alert('请输入用户名');
			return;
		}
		if (!pwd) {
			alert('请输入密码');
			return;
		}
		//通过接口发送请求
		$.ajax({
			url: '/employee/employeeLogin',
			type: 'post',
			data: {
				username: name,
				password: pwd

			},
			success: function(res) {
				if(res.success){
					location.href = 'user.html';
				} else {
					alert(res.message);
				}
			}
		})
	});
});
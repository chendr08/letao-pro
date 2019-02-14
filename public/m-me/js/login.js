$(function() {
	//添加点击事件
	$('#login-btn').on('click', function() {
		//获取数据
		var username = $.trim($('[name = "username"]').val())
		var password = $.trim($('[name = "password"]').val())
		//校验数据
		if(!username) {
			mui.toast('请输入用户名')
			return;
		}
		if(!password) {
			mui.toast('请输入密码')
			return;
		}
		//传递数据
		$.ajax({
			url: '/user/login',
			type: 'post',
			data: {
				username: username,
				password: password
			},
			beforeSend: function(){
				$('#login-btn').html('正在登录')
			},
			success: function(res){
				if(res.success) {
					mui.toast('登录成功')
				    $('#login-btn').html('登&nbsp;&nbsp;&nbsp;&nbsp;录')
				    setTimeout( function() {
						location.href='user.html'
				    },2000)
				}else {
					$('#login-btn').html('登&nbsp;&nbsp;&nbsp;&nbsp;录')
					mui.toast('用户名或密码输入错误')
				}
			}
		})
	})
})
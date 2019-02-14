$(function() {
	//点击修改密码
	$('#modify-btn').on('tap', function() {
		var originPass=$.trim($('[name = "originPass"]').val())
		var newPass=$.trim($('[name = "newPass"]').val())
		var confirmPass=$.trim($('[name = "confirmPass"]').val())
		var vCode=$.trim($('[name = "vCode"]').val())
		//验证数据
		if(!originPass) {
			console.log(originPass)
			mui.toast('请输入原密码')
			return;
		}
		if(newPass != confirmPass) {
			mui.toast('两次密码输入不一致')
			return;
		}
		if(!vCode) {
			mui.toast('请输入认证码')
			return;
		}
		//发送修改密码请求
		$.ajax({
			url: '/user/updatePassword',
			type: 'post',
			data: {
				oldPassword: originPass,
				newPassword: newPass,
				vCode: vCode
			},
			success: function(res) {
				console.log(res)
				if(res.success) {
					mui.toast('修改密码成功')
					setTimeout(function() {
						location.href = 'login.html'
					},2000);
				}
			}
		});
	});
	//点击获取认证码
	$('#getCode').on('tap', function() {
		$.ajax({
			url: '/user/vCodeForUpdatePassword',
			type: 'get',
			success: function(res) {
				console.log(res.vCode)
			}
		});
	});


})
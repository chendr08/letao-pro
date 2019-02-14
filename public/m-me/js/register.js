$(function(){
	$('.register-btn').on('click',function() {
		//获取注册信息
		var username = $('[name = "username"]').val()
		var password = $('[name = "password"]').val()
		var confirmPass = $('[name = "confirmPass"]').val()
		var mobile = $('[name = "mobile"]').val()
		var vCode = $('[name = "vCode"]').val()
		//验证输入信息
		if(!username) {
			mui.toast('用户名不能为空')
			return;
		}
		if(mobile.length < 11) {
			mui.toast('请输入正确的电话号码')
			return;

		}
		if(password != confirmPass) {
			mui.toast('两次密码输入不一致')
			return;

		}
		if(!vCode) {
			mui.toast('请输入认证码')
			return;
			
		}
		//请求接口进行注册
		$.ajax({
			url: '/user/register',
			type: 'post',
			data: {
				username: username,
				password: password,
				mobile: mobile,
				vCode: vCode
			},
			success: function(res) {
				mui.toast('注册成功')
				location.href = 'login.html'
			}
		});
	});
	//获取验证码
	$('#getCode').on('click',function() {
		$.ajax({
			url: '/user/vCode',
			type: 'get',
			success: function(response) {
				console.log(response.vCode)
			}
		})
	})
});
//保存用户信息
var userInfo = null;
$.ajax({
	url: '/user/queryUserMessage',
	type: 'get',
	async: false,
	success: function(res) {
		//如果用户没用登陆，跳转到登录页面
		if (res.error && res.error == 400) {
			location.href = 'login.html'
		}
		//若用户进行了登录，则获取登录信息
		userInfo = res;
	}
});

$(function() {
	//添加点击事件
	$('#quit-btn').on('click', function() {
		$.ajax({
			url: '/user/logout',
			type: 'get',
			success: function(res) {
				mui.toast('退出登录成功')
				setTimeout(function() {
					if(res.success) {
					location.href='index.html'
				}
				},2000)
				
			}
		})
	})
	//处理登录状态，获取用户信息，拼接到页面中
	var html= template('userInfoTemp', userInfo)
	$('#userinfoBox').html(html)
	
});
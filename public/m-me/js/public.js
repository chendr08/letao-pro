$(function () {
	
	//恢复a元素的跳转
	$('body').on('tap', 'a', function(){
		mui.openWindow({
			url: $(this).attr('href')
		});
	});
    
});
//根据url获取参数
	function getUrlParams(url,name){
	var urlParams=url.substr(url.indexOf('?')+1)
	var paramsArr=urlParams.split('&')
	for (var i = 0; i < paramsArr.length; i++) {
		var params=paramsArr[i].split('=')
		if (params[0]==name) {
			return params[1];
		}
	}
	 return null;

}
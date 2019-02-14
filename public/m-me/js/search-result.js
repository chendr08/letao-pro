var keywords = getUrlParams(location.href,'keywords')

var page = 1

var html = ''

var priceSort = 1

var numSort = 1

var This = null

$(function(){

 	$('#priceSort').on('tap', function() {

 		priceSort = priceSort==1?2:1;
 		html = ''
 		page = 1
 		mui('#refreshContainer').pullRefresh().refresh(true);
        getData()
 	}); 

    $('#amountSort').on('tap', function() {

 		numSort = numSort==1?2:1;
 		html = ''
 		page = 1
 		mui('#refreshContainer').pullRefresh().refresh(true);
        getData()
 	});

    mui.init({
    pullRefresh : {
    container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    up : {
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:true,//可选,默认false.自动上拉加载一次
      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback : getData //注意，不能加括号
    }
  }
});

});

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
function getData() {
	if(!This){
		This=this;
	}

      	$.ajax({
  	         url:'/product/queryProduct',
  	         type:'get',
  	         data: {
  	         	proName: keywords,
  	         	page: page++,
  	         	pageSize: 3,
  	         	price: priceSort,
  	         	num: numSort
  	         },
  	         success: function (response) {
  	         	if (response.data.length>0) {
  	         	     html+=template('searchTemp', response)
                     $('#search-box').html(html)
                     This.endPullupToRefresh(false);
                }else {
                	This.endPullupToRefresh(true);
                }
  	         }
        });
  
}
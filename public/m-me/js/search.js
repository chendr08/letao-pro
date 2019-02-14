$(function() {
	// var keywordsArr=[]
	$('#btn-search').on('click',function(){
		var keywords=$('#btn-txt').val()
		if(keywords) {
			//如果localStorage中有数据，则可以继续取出来追加新的本地数据，
			//否则将关键字直接追加到本地存储
			if(localStorage.getItem('keywordsArr')){
				var keywordsArr=JSON.parse(localStorage.getItem('keywordsArr'))
				keywordsArr.push(keywords)
				localStorage.setItem('keywordsArr',JSON.stringify(keywordsArr))
			}else {
				localStorage.setItem('keywordsArr',JSON.stringify([keywords]))
			}
			// 如果输入了搜索内容则进行页面跳转
			location.href='search-result.html?keywords='+keywords;
			//清空搜索框
			$('#btn-txt').val('')
		}else {
			mui.toast('请输入搜索内容',{ duration:'short', type:'div' })
			return;
	    }
	});
    //渲染历史列表
	if(localStorage.getItem('keywordsArr')){
		var keywordsArr=JSON.parse(localStorage.getItem('keywordsArr'))
		var html=template('his-template',{
			hisData: keywordsArr
		});
		$('#his-list').html(html)
	}
    // 清空历史记录
	$('#clear-data').on('click',function(){
		$('#his-list').html('')
		localStorage.removeItem('keywordsArr')
	})
});
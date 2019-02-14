$(function(){
	mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

	$.ajax({
		url: '/category/queryTopCategory',
		type: 'get',
		success: function(response){
			var html=template('category-template',{
				result: response.rows
			})
			$('#links').html(html)
			if(response.rows.length) {
				$('#links').find('a').eq(0).addClass('active')
				var id = response.rows[0].id
				getSeconedCategory(id)
			}
		}
	});
	$('#links').on('click','a',function(){
		var id=$(this).attr('data-id')
		$(this).addClass('active').siblings().removeClass('active')
		getSeconedCategory(id)
	});

	function getSeconedCategory(id) {
		$.ajax({
			url: '/category/querySecondCategory',
			type: 'get',
			data: {
				id: id
			},
			success: function(response){
				console.log(response)
				var html=template('seconed-category',{
					result: response.rows
				});
				$('.brand-links').html(html)
			}
		});
	}
});
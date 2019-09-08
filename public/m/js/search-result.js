var keyword = getParamsByUrl(location.href, 'keyword');
var page = 1;
var html = "";//页面默认为空
var priceSort = 1;//价格排序默认升序
var numSort = 1;

var This = null;
// console.log(keyword);
$(function () {
    /*
    * 根据用户输入的关键字获取搜索结果
    * 1 获取到地址栏中用户输入的搜索关键字
    * 2 关键字调取搜索接口
    * 3 将搜索结果展示在页面
    * */

    mui.init({
        pullRefresh: {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $('#priceSort').on('tap', function () {//产品价格进行排序
        priceSort = priceSort == 1 ? 2 : 1;
        page = 1;
        html = "";
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });

    $('#numSort').on('tap', function () {//产品销量进行排序
        numSort = numSort == 1 ? 2 : 1;
        page = 1;
        html = "";
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });
});

function getData() {

    //解决this指向问题判断不为真时后传this值
    if (!This) {
        This = this;
    }
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 4,
            proName: keyword,
            price: priceSort,
            num: numSort
        },
        success: function (response) {
            if (response.data.length > 0) {
                console.log(response)
                html += template('searchTpl', response);
                $('#search-box').html(html);
                //告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(false);
            } else {
                //没了
                This.endPullupToRefresh(true);
            }
        }
    });
}
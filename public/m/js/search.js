$(function () {
    var keyArr=[];
    $('#search-btn').on('click',function () {
        //用户搜索的关键字
        var keyword=$(this).siblings('input').val();

        //用户输入了关键字
        if(keyword){
            keyArr.push(keyword);
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
            location.href='search-result.html?keyword='+keyword;
        }else{
            //用户没有输入关键字
            alert('请输入要搜索的商品关键字');
        }
    })
    if(localStorage.getItem('keyArr')){
        keyArr=JSON.parse(localStorage.getItem('keyArr'));
       var html=template('historyTpl',{ result:keyArr })
        $('#history-box').html(html);

    }
    $('#clearBtn').on('click',function () {
        $('#history-box').html("");//清空页面数据
        localStorage.removeItem("keyArr");//清空本地存储数据
    })
});
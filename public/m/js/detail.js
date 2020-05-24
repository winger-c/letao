$(function () {
    //产品ID
    var id = getParamsByUrl(location.href, 'id');
    var limite;//用于数量限制
    var size = null;//用于尺码判断
    var buyNum;

    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            var html = template('productTpl', res);
            $('#product-box').html(html);
            limite = res.num;
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    $('#product-box').on('tap', '.size span', function () {
        $(this).addClass('active').siblings('span').removeClass('active');
        size=$(this).html();
    });
    //点击加
    $('#product-box').on('tap', '#increase', function () {
        // alert(1)
        var oInp = $('#inp');
        var num = oInp.val();
        num >= 0 && num < limite ? num++ : num;
        buyNum=num;
        oInp.val(num);
    });
    //点击减
    $('#product-box').on('tap', '#reduce', function () {
        // alert(1)
        var oInp = $('#inp');
        var num = oInp.val();
        num > 1 && num < limite ? num-- : num;//商品详情页的所选数量必须大于等于1
        buyNum=num;
        oInp.val(num);
    });

    /*
    * 加入购物车
    * 1.获取加入购物车按钮 并添加点击事件
    * 2.判断用户是否选择尺码
    * 3.调用加入购物车接口
    * 4.提示用户 加入购物车成功
    * */
    $('#addToCart').on('tap', function () {
        if (!size) {
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: buyNum,
                size: size
            },
            success: function (res) {
                console.log(res)
                if(res.success){
                    mui.confirm('添加成功！是否进入购物车查看？',function (message) {
                        if(message.index==1){
                            //跳转到购物车
                            location.href='cart.html'
                        }
                    });
                }
            }
        });
    });
    $('#lookCart').on('tap', function () {
        $.ajax({
            url: '/cart/queryCart',
            type: 'get',
            data: {
            },
            success: function (res) {
                //跳转到购物车
                console.log(res)
                location.href='cart.html'
            }
        });
    });
});
$(function () {
    $.ajax({
        url: '/cart/queryCart',
        type: 'get',
        success: function (res) {
            //跳转到购物车
            console.log(res)
            var html=template('cartTpl',{data:res});
            $('#cartBox').html(html);
        }
    });
});
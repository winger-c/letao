$(function () {
    //存储收货地址
    var address = null;

    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            console.log(res);
            var html = template('addressTpl', {
                result: res
            });
            $('#address-box').html(html);
            address = res;
        }
    });

    /*
    * 删除收货地址
    * 1.给删除按钮添加点击事件
    * 2.探出一个删除确认框
    * 3.如果用户点击确认 删除
    * 4.调用删除收货地址的接口
    * 5.提示删除成功 并刷新页面
    * */
    $('#address-box').on('tap', '.delete-btn', function () {
        var id = $(this).attr('data-id');
        var li = this.parentNode.parentNode;//当前的父节点的父节点
        mui.confirm('删除后将不可找回，是否确认删除该收货地址?', function (message) {
            //确认删除
            if (message.index == 1) {
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        if (res.success) {
                            //重新加载当前界面
                            mui.toast('删除成功！');
                            setTimeout(function () {
                                location.href = 'address.html'
                            }, 2000);
                        }
                    }
                });
            } else {
                //取消删除
                mui.swipeoutClose(li);
            }
        })
    });
    /*
    * 编辑收货地址
    * 1.给编辑按钮添加点击事件
    * 2.跳转到收货地址编辑页面，将要编辑的数据传到该页面
    * 3.将数据展示在页面中
    * 4.给确定按钮添加点击事件
    * 5.调用接口，执行编辑操作
    * 6.跳转回收货地址列表页面
    * */
    $('#address-box').on('tap', '.edit-address', function () {
        var id = $(this).attr('data-id');
        for (var i = 0; i < address.length; i++) {
            if (address[i].id == id) {
                localStorage.setItem('editAddress', JSON.stringify(address[i]));
                break;
            }
        }

        location.href = 'addAddress.html?isEdit=1';
    });
});
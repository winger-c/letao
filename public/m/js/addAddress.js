$(function () {
    //创建picker选择器
    var picker = new mui.PopPicker({layer: 3});

    //为picker选择器添加数据
    picker.setData(cityData);
    $('#selectCity').on('tap', function () {
        picker.show(function (selectItems) {
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });
    });

    /*
    * 添加收货地址
    * 1.获取收货地址管理按钮并且添加点击事件
    * 2.获取用户输入的表单信息
    * 3.对用户输入的表单信息进行校验
    * 4.调用添加的收货地址接口 实现功能
    * 5.跳转回收货地址页面
    * */
    $('#confirmBtn').on('tap', function () {
        var receiver = $("[name='receiver']").val();
        var postCode = $("[name='postCode']").val();
        var area = $("[name='area']").val();
        var detailPlace = $("[name='detailPlace']").val();
        var receiverMobile = $("[name='receiverMobile']").val();
        if (!receiver) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if (!receiverMobile) {
            mui.toast('请输入联系电话');
            return;
        }
        $.ajax({
            url: '/address/addAddress',
            type: 'post',
            data: {
                address: area,
                addressDetail: detailPlace,
                recipients: receiver,
                postcode: postCode,
                receiverMobile: receiverMobile
            },
            success: function (res) {
                if (res.success) {
                    mui.toast('添加成功');
                    setTimeout(function () {
                        location.href = 'address.html';
                    },2000);
                }
            }
        });
    });
    if(localStorage.getItem('editAddress')){
        var address=JSON.parse(localStorage.getItem('editAddress'));
        $("[name='receiver']").val(address.recipients);
        $("[name='postCode']").val(address.postCode);
        $("[name='area']").val(address.address);
        $("[name='detailPlace']").val(address.addressDetail);
        $("[name='receiverMobile']").val(address.mobile);
    }
});
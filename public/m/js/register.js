/*
* 1.注册按钮添加点击事件
* 2.获取到用户注册的信息
* 3.对用户输入的信息做验证
* 4.调用注册接口 实现注册功能
* 5.做提示语句
* 6.跳转到登录界面
* */
$(function () {
    $('#register-btn').on('click', function () {
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var rePassword = $('[name="rePassword"]').val();
        var vCode = $('[name="vCode"]').val();

        // alert(username)


        if (!username) {
            mui.toast("请输入用户名");
        }
        if (mobile.length < 11) {
            mui.toast('请输入合法的手机号');
            return;
        }
        if (password != rePassword) {
            mui.toast('两次密码不一致');
            return;
        }
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function (res) {
                console.log(res);
                mui.toast('注册成功');
                setTimeout(function () {
                    location.href = 'login.html';
                },2000);
            }
        })
    });

    /*
    * 接口获取认证码
    * */
    $('#getCode').on('click', function () {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function (res) {
                console.log(res.vCode)
            }
        });
    });

});
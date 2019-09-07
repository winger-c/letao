//获取到的验证码
var vCodekey;
$(function () {
    $('#modify-btn').on('tap', function () {
        var originPass = $.trim($("[name='originPass']").val());
        var newPass = $.trim($("[name='newPass']").val());
        var confirmPass = $.trim($("[name='confirmPass']").val());
        var vCode = $.trim($("[name='vCode']").val());
        if (!originPass) {
            mui.toast('请输入原密码');
            return;
        }
        if (newPass != confirmPass) {
            mui.toast('新密码不一致');
            return;
        }
        if (vCode != vCodekey || vCode == null) {
            mui.toast('验证码错误');
            return;
        }
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function (res) {
                if (res.success) {
                    console.log(res)
                    mui.toast('修改成功');
                    setTimeout(function () {
                        location.href = 'login.html';
                    }, 2000)
                }
            }
        });
    });
    $('#getCode').on('tap', function () {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res) {
                vCodekey = res.vCode;
                console.log(res.vCode);

            }
        });
    });
});
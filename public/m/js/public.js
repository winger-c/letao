//由于mui框架默认禁止a标签的跳转所以写这个函数用于跳转页面
window.onload = function () {
    // var len = document.getElementsByTagName('a');
    // for (var i = 0; i < len.length; i++) {
    //     len[i].setAttribute('onclick', "window.location=this.href");
    // }
    // // this.onlick=document.location+'='+ this.href;
    mui('body').on('tap','a',function(){
        window.top.location.href=this.href;
    });
}


//提取地址栏的参数
function getParamsByUrl(url, name) {

    var params = url.substr(url.indexOf('?') + 1);

    var param = params.split('&');
    for (var i = 0; i < param.length; i++) {
        var current = param[i].split('=');
        if (current[0] == name) {
            return current[1];
        }
    }
    return null;
}
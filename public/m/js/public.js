//由于mui框架默认禁止a标签的跳转所以写这个函数用于跳转页面
window.onload=function () {
    var len = document.getElementsByTagName('a');
    for (var i = 0; i < len.length; i++){
        len[i].setAttribute('onclick', "window.location=this.href");
    }
    // this.onlick=document.location+'='+ this.href;
}
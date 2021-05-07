//开发环境服务器地址
let baseURL = 'http://api-breakingnews-web.itheima.net'
// 测试环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net'
// 生产环境服务器地址
// let baseURL = 'http://api-breakingnews-web.itheima.net'




// $.ajaxPrefilter() 在发送和接收ajax的时候都会优先触动
// ajaxPrefilter
$.ajaxPrefilter(function (params) {
    // http://api-breakingnews-web.itheima.net
    // console.log(params.url);
    params.url = baseURL + params.url

    // 需求二 : 包含/没有的就拦截
    if (params.url.indexOf('/my/') != -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    params.complete = function (res) {
        // console.log(res);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            console.log(123);
            location.href = '/login.html';
            localStorage.removeItem('token');
        }
    }
})
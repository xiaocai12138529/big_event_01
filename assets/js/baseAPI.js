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

    params.url = baseURL +params.url


})
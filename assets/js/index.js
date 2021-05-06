// 入口函数
$(function () {
    // 1.获取用户信息,并渲染头像
    getUserInfo();

    // 需求四 : 退出
    let layer  = layui.layer
    $('#btnLoginout').on('click',function  () {
        // 弹出对话框
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            // 关闭对话框
            layer.close(index);
            location.href = '/login.html';
            localStorage.removeItem('token');
        });
    })
})

// 渲染头像
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // 所有的头信息,都可以通过这个属性配置
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            if(res.status != 0){
                return  layui.layer.msg(res.message)
            }
            // 成功后进行渲染
            renderAvatar(res.data);
        },
        // ajax接收完成就会触发
        // complete: function  (res) {
        //     console.log(res);
        //     let obj = res.responseJSON;
        //     if (obj.status != 0 && obj.message != "获取用户基本信息成功!"){
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}

// 名称头像渲染
function renderAvatar (user) {
    // 名称渲染
    let name = user.nickname || user.username ;
    $('#welcome').html('欢迎&emsp;' + name)
    // 头像渲染   
    if(user.user_pic){
        $('.layui-nav-img').show().attr('src',user.user_pic);
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        
        $('.text-avatar').show().html(name[0].toUpperCase());
    }
}
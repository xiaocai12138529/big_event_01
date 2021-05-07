

$(function () {

    // 表单校验
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1-6位"
            }
        }
    })

    // 获取信息
    initUserInfo();

    // 提交信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        let text = form.val('formTest');
        console.log(text);
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: {
                id: text.id,
                nickname: text.nickname,
                email: text.email
            },
            success: function (res) {

                if (res.status != 0) {
                    return layui.msg(res.message);
                }
                layer.msg(res.message, {
                    time: 1000
                });
                window.parent.getUserInfo();
            }
        })
    })

    // 重置事件
    $('.layui-form').on('reset', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    function initUserInfo() {
        // 发送ajax请求
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                //给表单赋值
                form.val("formTest", res.data);
            }
        })
    }
});


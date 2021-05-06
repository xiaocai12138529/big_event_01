// 入口函数
$(function () {
    // $() == DOMcontentLoaded

    // 需求一 : 点击a连接显示隐藏指定区域
    $("#link_reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $("#link_login").on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 需求二 : 自定义检验规则
    // 导出from属性,方便后面使用
    let form = layui.form;
    form.verify({
        // 属性是校验规则名称,值是校验规则
        pwd: [/^[\S]{6,12}$/,
            "密码必须是6-12位"],
        repwd: function (value) {
            if ($('.reg-box [name=password]').val() != value) {
                return "两次密码输入不一致";
            }
        }
    });

    // 需求三 : 注册
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg input[name=username]').val(),
                password: $('#form_reg input[name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });;
                }
                // alert(res.message);
                layer.msg(res.message, { icon: 1 });
                $('#link_login').click();
                $('#form_reg')[0].reset();
            }
        })
    })

    // 需求四 : 登录
    $('#form_login').on('submit', function (e) {
        // 组织提交
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message + '<br>' + "用户名或者密码不对", { icon: 5 });
                };
                layer.msg(res.message, { icon: 1 });
                // 保存token,未来接口要使用
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = '/index.html';
            }

        })

    })



})

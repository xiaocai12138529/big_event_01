$(function () {
    // 密码校验
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return '两次密码不一致'
            }
        },
        samePwd: function (value) {
            if (value == $("[name=newPwd]").val()) {
                return '新旧密码不能一样!'
            }
        },
    });
    // let xxx = window.parent.localStorage.getItem('token');
    // console.log(xxx);
    //密码提交
    $('#formPwd').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);

                $('#formPwd')[0].reset();
            }
        })
    });
})
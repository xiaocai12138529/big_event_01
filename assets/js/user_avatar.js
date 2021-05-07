$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    let options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // $('#image').cropper({
    //     aspectRatio: 1,
    //     preview: '.img-preview'
    // });

    $('#btnChooseImage').on('click', function (e) {
        e.preventDefault();
        $('#file').click();
    })

    $('#file').on('change', function (e) {
        e.preventDefault();
        // 获取文件
        let file = e.target.files[0];
        let newImgURL = URL.revokeObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options);       // 重新初始化裁剪区域
      

    })



})
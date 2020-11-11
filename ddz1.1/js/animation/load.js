$(function () {
    //进度条宽度与加载值
    let num = 0;
    // 进度条动画

    var interval = setInterval(() => {
        num++
        if(num>100){
            num = 100;
            clearInterval(interval)
            // window.location.href = '../html/selectRoom.html';
        }
        $('.number p').text(num + '%')
    }, 50);
    
})
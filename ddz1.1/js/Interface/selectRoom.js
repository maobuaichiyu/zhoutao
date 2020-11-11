$(function () {
    $('.item').each((index, item) => {
        switch (index) {
            case 0:
                $(item).click(() => {
                    //设置底分
                    localStorage.setItem('baseScore', 25);
                    window.location.href = '../html/index.html';
                })
                break;
            case 1:
                $(item).click(() => {
                    //设置底分
                    localStorage.setItem('baseScore', 50);
                    window.location.href = '../html/index.html';
                })
                break;
            case 2:
                $(item).click(() => {
                    //设置底分
                    localStorage.setItem('baseScore', 100);
                    window.location.href = '../html/index.html';
                })
                break;
        }
    })
})
window.onload = () => {

    window.onmousemove = (e) => {
        $('.cartoon').css('left', e.clientX - 50 + 'px');
        $('.cartoon').css('top', e.clientY - 50 + 'px');
    }
    // 获取屏幕宽高
    let windowWidth = window.screen.width;
    let windowHeight = window.screen.height;

    // 创建雪花
    function creatSnow() {
        let left = 0;
        let top = 0;
        let angle = 0;
        let angle_randow = Math.random() * 360;
        let angle_num = Math.random() * 2 - 1;
        let left_num = Math.random() * 0.6 + 0.2;
        let top_num = Math.random() * 0.6 + 0.8;
        let left_random = Math.random() * windowWidth;
        let top_random = Math.random() * windowHeight;
        let div = $('<div></div>');
        let num = Math.floor(Math.random() * 5);
        // 随机生成雪花
        switch (num) {
            case 0:
                div.attr('class', 'snow snow1');
                break;
            case 1:
                div.attr('class', 'snow snow2');
                break;
            case 2:
                div.attr('class', 'snow snow3');
                break;
            case 3:
                div.attr('class', 'snow snow4');
                break;
            case 4:
                div.attr('class', 'snow snow5');
                break;
        }

        $('.bigBox').append(div);
        setInterval(() => {
            div.css('left', left_random + left + 'px');
            div.css('top', top_random + top + 'px');
            div.css('transform', `rotate(${angle_randow+angle+'deg'})`);
            // div.css('transtion',0.5+'s');
            // console.log('angle');
            left += left_num;
            top += top_num;
            angle += angle_num;
            if (left_random + left >= windowWidth) {
                left_random = Math.random();
                left = 0;
            }
            if (top_random + top >= windowHeight) {
                top_random = Math.random();
                top = 0;
            }

        }, 10)
    }

    let weak_width = 63;
    let weak_height = 67;
    let boss_width = 229;
    let boss_height = 205;
    let weak_speed = 4;

    // 鼠标七点重点位置
    let start = 0;
    let over = 0
    // 图片高度差
    let pic_height = 12;


    let flag = true;
    // 判断位置
    function is_position() {
        if ($('.weak').offset().left < 1) {
            $('.weak').css('left', 1);
        }
        if ($('.weak').offset().top < 126) {
            $('.weak').css('top', 126);
        }
        if ($('.weak').offset().top > windowHeight - weak_height) {
            $('.weak').css('top', windowHeight - weak_height);
        }

        if ($('.weak').offset().left > windowWidth - weak_width / 2) {
            $('.weak').css('left', 0);
        }
    }

    $('.weak').mousedown(function (e1) {
        clearInterval(timerID)
        $(document).on('mousemove', (e2) => {
            $('.weak').css('left', e2.clientX - weak_width / 2);
            $('.weak').css('top', e2.clientY - weak_height / 2);
            start = e1.clientX;
            is_position();
        })

    })
    $('.weak').mouseup((e) => {
        $(document).off('mousemove')
        let offsetX = e.clientX - weak_width / 2 - boss_width;
        let offsetY = e.clientY - weak_height / 2 - boss_height + pic_height + weak_height;
        $('.boss').css('left', offsetX + 'px');
        $('.boss').css('top', offsetY + 'px');
        $('.boss').css('transition', '1s');
        over = e.clientX;

        if (over - start >= 0) {
            weak_speed = 1;
            if (flag == false) {
                $('.weak').css('transform', 'rotateY(0deg)')
                $('.boss').css('transform', 'rotateY(180deg)')
                flag = true;
            }
            weak_run();
        } else {
            weak_speed = -1;
            flag = false;
            $('.weak').css('transform', 'rotateY(180deg)')
            $('.boss').css('transform', 'rotateY(0deg)')
            weak_run();
        }
    })

    function Boss_run() {
        $('.boss').css('transition', '0s');
        $('.boss').css('left', $('.weak').offset().left - boss_width + 'px');
        $('.boss').css('top', $('.weak').offset().top - boss_height + weak_height + pic_height + 'px');
    }

    function Boss_run1() {
        $('.boss').css('transition', '0s');
        $('.boss').css('left', $('.weak').offset().left + weak_width + 'px');
        $('.boss').css('top', $('.weak').offset().top - boss_height + weak_height + pic_height + 'px');

    }
    var timerID;
    // 高度
    function weak_run() {
        timerID = setInterval(() => {
            $('.weak').css('left', $('.weak').offset().left + weak_speed);
            if ($('.weak').offset().left > windowWidth - weak_width / 2) {
                $('.weak').css('left', 229);
                let weak_top = Math.random() * windowHeight;
                $('.weak').css('top', weak_top);
                is_position();
            }
            if ($('.weak').offset().left < 0) {
                $('.weak').css('left', windowWidth - weak_width / 2);
                let weak_top = Math.random() * windowHeight;
                $('.weak').css('top', weak_top);
                is_position();
            }
            if (weak_speed > 0) {
                Boss_run();
            } else {
                Boss_run1();
            }
        }, 10)
    }
    weak_run();
    for (let i = 0; i < 50; i++) {
        creatSnow();
    }

    $('.game-name').click(() => {
        $('.welcome')[0].play()
    })

    $('.start').click(() => {
        window.location.href = '../html/load.html';
    })
}
//初始化桌面牌组
function initHeap() {
    let htmlStr = '';
    for (let i = 0; i < 54; i++) {
        htmlStr += `<li style='top:-${i}px'><img src="../static/images/poker/back.png" alt=""></li>`;
    }
    $('.heap').html(htmlStr);
}

//洗牌
function shuffling() {
    //移除桌面牌组
    $('.heap li').remove()
    //通过双循环生成三个牌组的HTML代码。
    let temp_html = '';
    for (let j = 0; j < 2; j++) {
        temp_html += '<ul class="all_poker">';
        for (let i = 0; i < 27; i++) {
            temp_html += `<li><img src="../static/images/poker/back.png" alt=""></li>`;
        }
        temp_html += '</ul>';
    }
    $(".heap").append(temp_html)
    let a = 0;
    //动画效果
    for (let i = 0; i < 54; i++) {
        $(".heap li").eq(i).animate({
            left: `${5*i-81}px`
        }, 500).animate({
            left: `0px`
        }, 500).animate({
            top: `${5*i-81}px`
        }, 500).animate({
            top: `0px`
        }, 500)
        a = a + 0.01
        $(".heap li").eq(i).animate({
            left: `${(i-27)*10*Math.tanh(a*50)}px`,
            top: `${(i-27)*10*Math.tanh(a*50)}px`
        }, 500).animate({
            top: `${(i-27)*10*Math.tanh(a*50)}px`,
            left: `${(i-27)*10*Math.sin(a*50)}px`
        }, 500).animate({
            left: `${(i-27)*10*Math.tanh(a*50)}px`,
            top: `${(i-27)*10*Math.sin(a*50)}px`
        }, 500).animate({
            top: `${(i-27)*10*Math.tanh(a*50)}px`,
            left: `${(i-27)*10*Math.cos(a*50)}px`
        }, 500).animate({
            left: `${(i-27)*10*Math.tanh(a*50)}px`,
            top: `${(i-27)*10*Math.cos(a*50)}px`
        }, 500)
        $(".heap li").eq(i).animate({
            left: `${i*5*Math.cos(a*50)}px`,
            top: `${i*5*Math.sin(a*50)}px`
        }, 500)
        for (let j = 50; j < 60; j++) {
            $(".heap li").eq(i).animate({
                left: `${i*5*Math.cos(a*j)}px`,
                top: `${i*5*Math.sin(a*j)}px`
            }, 100)
        }
        $(".heap li").eq(i).animate({
            top: `0px`,
            left: `0px`
        }, 500)
    }
}

//隐藏与解绑
function hideAndUnbindCall() {
    //隐藏所有组件
    $('.call-box').hide();
    $('.time-box').hide();
    //解绑事件
    $('.call-box .call').off();
    $('.call-box .no-call').off();
}

function hideAndUnbindDiscard() {
    //隐藏所有玩家的出牌组件
    $('.discard-box').hide();
    //解绑事件
    $('.discard-box .tips').off();
    $('.discard-box .discard').off();
    $('.discard-box .no-discard').off();
    //隐藏所有计时器组件
    $('.time-box').hide();
}

//出牌音乐
function playPokeMusic(arr, number) {
    let audio;
    if (arr.length == 1) {
        for (let i = 0; i < 54; i = i + 4) {
            if (i >= 0 && i <= 51) {
                switch (arr[0]) {
                    case i:
                    case i + 1:
                    case i + 2:
                    case i + 3:
                        audio = new Audio(`../static/audio/zhuzhu/zhuzhu_${i/4+3}.ogg`);
                        audio.play();
                }
            } else if (arr[0] == 52) {
                audio = new Audio(`../static/audio/zhuzhu/zhuzhu_16.ogg`);
                audio.play();
            } else if (arr[0] == 53) {
                audio = new Audio(`../static/audio/zhuzhu/zhuzhu_17.ogg`);
                audio.play();
            }
        }
    } else if (arr.length == 2) {
        for (let i = 0; i < 54; i = i + 4) {
            if (i >= 0 && i <= 51) {
                switch (arr[0]) {
                    case i:
                    case i + 1:
                    case i + 2:
                    case i + 3:
                        audio = new Audio(`../static/audio/zhuzhu/zhuzhu_dui${i/4+3}.ogg`);
                        audio.play();
                }
            } else if (checkWangZha(arr)) {
                //更新倍数
                updateBeiNumber();
                audio = new Audio(`../static/audio/zhuzhu/zhuzhu_wangzha.ogg`);
                audio.play();
                //动画
                $('.animation4').css({
                    'display': 'block'
                })
                setTimeout(() => {
                    $('.animation4').css({
                        'display': 'none'
                    })
                }, 2000)
                //显示文字
                let textImg = '<img src="../static/images/text/wangzha.png" alt="">';
                $('.text-box').find('img').remove();
                $('.text-box').eq(number).append(textImg);
                //1秒后移除
                setTimeout(() => {
                    $('.text-box').eq(number).find('img').remove();
                }, 1000)
            }
        }
    } else if (arr.length == 3) {
        for (let i = 0; i < 54; i = i + 4) {
            switch (arr[0]) {
                case i:
                case i + 1:
                case i + 2:
                case i + 3:
                    audio = new Audio(`../static/audio/zhuzhu/zhuzhu_tuple${i/4+3}.ogg`);
                    audio.play();
            }
        }
    } else if (arr.length == 4) {
        if (checkSanDaiYi(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_sandaiyi.ogg`);
            audio.play();
        } else if (checkZhaDan(arr)) {
            //更新倍数
            updateBeiNumber();
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_zhadan.ogg`);
            audio.play();
            //动画
            $('.animation3').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation3').css({
                    'display': 'none'
                })
            }, 3000)
        }
    } else if (arr.length == 5) {
        if (checkSanDaiEr(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_sandaiyidui.ogg`);
            audio.play();
        } else if (checkShunZi(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_shunzi.ogg`);
            audio.play();
            //动画
            $('.animation2').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation2').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/shunzi.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        }
    } else if (arr.length == 6) {
        if (checkFeiJiBuDaiChiBang(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_feiji.ogg`);
            audio.play();
            //动画
            $('.animation5').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation5').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/feiji.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        } else if (checkShunZi(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_shunzi.ogg`);
            audio.play();
            //动画
            $('.animation2').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation2').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/shunzi.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        } else if (checkSiDaiEr(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_sidaier.ogg`);
            audio.play();
        } else if (checkLianDui(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_liandui.ogg`);
            audio.play();
            //动画
            $('.animation1').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation1').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/liandui.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        }
    } else if (arr.length == 7) {
        if (checkShunZi(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_shunzi.ogg`);
            audio.play();
            //动画
            $('.animation2').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation2').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/shunzi.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        }
    } else if (arr.length >= 8) {
        if (checkShunZi(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_shunzi.ogg`);
            audio.play();
            //动画
            $('.animation2').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation2').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/shunzi.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        } else if (checkSiDaiLiangDui(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_sidailiangdui.ogg`);
            audio.play();
        } else if (checkLianDui(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_liandui.ogg`);
            audio.play();
            //动画
            $('.animation1').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation1').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/liandui.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        } else if (checkFeiJiDaiChiBang(arr)) {
            audio = new Audio(`../static/audio/zhuzhu/zhuzhu_feiji.ogg`);
            audio.play();
            //动画
            $('.animation5').css({
                'display': 'block'
            })
            setTimeout(() => {
                $('.animation5').css({
                    'display': 'none'
                })
            }, 3000)
            //显示文字
            let textImg = '<img src="../static/images/text/feiji.png" alt="">';
            $('.text-box').find('img').remove();
            $('.text-box').eq(number).append(textImg);
            //1秒后移除
            setTimeout(() => {
                $('.text-box').eq(number).find('img').remove();
            }, 1000)
        }
    }
}

//更新倍数
function updateBeiNumber() {
    gameData.beiNumber = gameData.beiNumber * 2;
    $(`.info-box`).eq(gameData.landlord).find('.bei-number').text(gameData.beiNumber * 2);
    switch (gameData.landlord) {
        case 0:
            $(`.info-box`).eq(1).find('.bei-number').text(gameData.beiNumber);
            $(`.info-box`).eq(2).find('.bei-number').text(gameData.beiNumber);
            break;
        case 1:
            $(`.info-box`).eq(0).find('.bei-number').text(gameData.beiNumber);
            $(`.info-box`).eq(2).find('.bei-number').text(gameData.beiNumber);
            break;
        case 2:
            $(`.info-box`).eq(0).find('.bei-number').text(gameData.beiNumber);
            $(`.info-box`).eq(1).find('.bei-number').text(gameData.beiNumber);
            break;
    }
}

//播放音乐
function music() {
    if (gameData.bgMusic != null) {
        gameData.bgMusic.pause();
    }
    let num = 0;
    gameData.bgMusic = new Audio("../static/audio/bgMusic/MusicEx_Normal.ogg");
    gameData.bgMusic.play();
    gameData.bgMusic.loop = true;
    $('.music').click(() => {
        if (num % 2) {
            gameData.bgMusic.play();
            num++
        } else {
            gameData.bgMusic.pause();
            gameData.bgMusic.load();
            num++;
        }
    })
}

//播放不要音乐
function notOut() {
    let order;
    let pass_ramdow = Math.floor(Math.random() * 3);
    if (pass_ramdow == 0) {
        order = new Audio("../static/audio/zhuzhu/zhuzhu_buyao1.ogg");
    } else if (pass_ramdow == 1) {
        order = new Audio("../static/audio/zhuzhu/zhuzhu_buyao2.ogg");
    } else {
        order = new Audio("../static/audio/zhuzhu/zhuzhu_buyao3.ogg");
    }
    order.play();
}

//只剩两张牌了、只剩一张牌了
function pokersAlarmMusic() {
    if (gameData.bgMusic != null) {
        //匹配最后一个斜杠后的字符串
        let str = gameData.bgMusic.src.match(/([^/]*)$/);
        if (str[0] != 'MusicEx_Exciting.ogg') {
            gameData.bgMusic.pause();
            gameData.bgMusic = new Audio("../static/audio/bgMusic/MusicEx_Exciting.ogg");
            gameData.bgMusic.play();
            gameData.bgMusic.loop = true;
        }
    }
}

//获胜音乐
function judgeMusicWin() {
    //暂停
    if (gameData.bgMusic != null) {
        gameData.bgMusic.pause();
    }
    //切换
    gameData.bgMusic = new Audio("../static/audio/bgMusic/MusicEx_Win.ogg");
    gameData.bgMusic.play();
    setTimeout(() => {
        gameData.bgMusic.pause();
        //经典音乐
        /*  gameData.bgMusic = new Audio("../static/audio/bgMusic/MusicEx_Normal.ogg");
         gameData.bgMusic.play();
         gameData.bgMusic.loop = true; */
    }, 5000)
}

//失败音乐
function judegMusicLose() {
    //暂停
    if (gameData.bgMusic != null) {
        gameData.bgMusic.pause();
    }
    //切换
    gameData.bgMusic = new Audio("../static/audio/bgMusic/MusicEx_Lose.ogg");
    gameData.bgMusic.play();
    setTimeout(() => {
        gameData.bgMusic.pause();
        //经典音乐
        /* gameData.bgMusic = new Audio("../static/audio/bgMusic/MusicEx_Normal.ogg");
        gameData.bgMusic.play();
        gameData.bgMusic.loop = true; */
    }, 5000)
}

//鼠标事件
function hoverPoker() {
    $('.play').on('mousedown', function () {
        $('.play li').on('mouseenter', function () {
            $(this).toggleClass('selected');
        })
    })

    $('.play').on('mouseup', function () {
        $('.play li').off('mouseenter');
    })
}
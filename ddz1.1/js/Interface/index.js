$(function () {
    //鼠标事件
    hoverPoker();
    //监听绑定
    $('.play').on('click', 'li', function () {
        $(this).toggleClass('selected');
    })
    //播放音乐
    music();

    //初始化数据
    initPlayerData();
    //初始化桌面牌组
    initHeap();
    //开始游戏
    $('.start').click(function () {
        //显示房间信息
        initRoomInfo();
        //显示其他玩家
        $('.info-box').show();
        //初始化倍数
        $('.info-box').find('.bei-number').text(gameData.beiNumber);
        //开始游戏按钮隐藏
        $(this).hide();
        if (gameData.bgMusic == null) {
            //播放音乐
            music();
        } else {
            gameData.bgMusic.play();
        }
        //洗牌
        shuffling();
        //发牌
        dealer();
    })
    //结算页面close按钮
    $('.close').click(function () {
        //遮罩层隐藏
        $('.mask').hide();
        //清空牌堆
        $('.play-heap ul').find('li').remove();
        //显示开始按钮
        $('.start').show();
        //解绑
        $('.start').off();
        //重新绑定事件
        $('.start').click(function () {
            //关闭音乐
            /* if (gameData.bgMusic != null) {
                gameData.bgMusic.pause();
            } */
            //初始化游戏数据
            gameData = {
                landlord: null, //本局游戏地主
                tempHeap: [], //本局游戏用于存储上一次出的牌的临时牌堆
                beiNumber: 15, //本局游戏倍数
                baseScore: 25, //本局游戏底分
                bgMusic: null
            }
            //播放音乐
            music();
            //清空手牌
            $('.play').find('li').remove();
            //地主标志隐藏
            $('.info-box .rank').hide();
            //倍数
            $('.bei-number').text(gameData.beiNumber);
            //初始化数据
            initPlayerData();
            //显示房间信息
            initRoomInfo();
            //初始化桌面牌组
            initHeap();
            //发牌
            dealer();
            //开始游戏按钮隐藏
            $(this).hide();
        })
    })
    //重新开始按钮
    $('.restart').click(function () {
        //关闭音乐
        /* if (gameData.bgMusic != null) {
            gameData.bgMusic.pause();
        } */
        //初始化游戏数据
        gameData = {
            landlord: null, //本局游戏地主
            tempHeap: [], //本局游戏用于存储上一次出的牌的临时牌堆
            beiNumber: 15, //本局游戏倍数
            baseScore: 25, //本局游戏底分
            bgMusic: null
        }
        //播放音乐
        music();
        //遮罩层隐藏
        $('.mask').hide();
        //清空手牌
        $('.play').find('li').remove();
        //清空牌堆
        $('.play-heap ul').find('li').remove();
        //地主标志隐藏
        $('.info-box .rank').hide();
        //倍数
        $('.bei-number').text(gameData.beiNumber);
        //初始化数据
        initPlayerData();
        //显示房间信息
        initRoomInfo();
        //初始化桌面牌组
        initHeap();
        //发牌
        dealer();
    })
})

//初始化房间信息
function initRoomInfo() {
    if (gameData.baseScore == 25) {
        $('.room-info').find('span').text("经典玩法初级场 底分25分");
    } else if (gameData.baseScore == 50) {
        $('.room-info').find('span').text("经典玩法中级场 底分50分");
    } else if (gameData.baseScore == 100) {
        $('.room-info').find('span').text("经典玩法高级场 底分100分");
    }
}

//初始化玩家数据
function initPlayerData() {
    //读取本地数据
    let tmp = JSON.parse(localStorage.getItem('player')); //是否为第一次
    if (tmp == null) { //为空 则当前本地并没有存储数据 需要写入第一次的玩家数据
        localStorage.setItem('player', JSON.stringify(player)); //写入玩家数据
    }
    //底分
    let baseScore = localStorage.getItem('baseScore');
    gameData.baseScore = baseScore == null ? gameData.baseScore : baseScore;
    //读取本地数据
    player = JSON.parse(localStorage.getItem('player'));
    for (let i = 0; i < player.length; i++) {
        let $infoBox = $('.info-box').eq(i);
        $infoBox.find('img').attr('src', player[i].avatar);
        $infoBox.find('.nickname').text(player[i].name);
        $infoBox.find('.bean-count').text(player[i].goldBean);
    }
}

//获取牌数据
let res;
//计时器
let timer = null;

//发牌
function dealer() {
    //获取牌数据
    res = dealCards();
    //记录发牌轮数
    let count = 0;
    dealerAnimation();
    //发牌动画
    function dealerAnimation() {
        //play1
        $('.heap li:last').animate({
            left: '-642px',
            top: '76px'
        }, 100, function () {
            //改变手牌和牌组
            changeDeck(0, '.play1');
            //play2
            $('.heap li:last').animate({
                left: '38px',
                top: '376px'
            }, 100, function () {
                changeDeck(1, '.play2');
                //play3
                $('.heap li:last').animate({
                    left: '642px',
                    top: '76px'
                }, 100, function () {
                    changeDeck(2, '.play3');
                    //发牌轮数+1
                    count++;
                    if (count <= 16) {
                        dealerAnimation();
                    } else {
                        //手牌数组件显示
                        $('.card-count-box').show();
                        //调整手牌数组件位置
                        $('.left .card-count-box').css({
                            top: '94px'
                        });
                        $('.center-bottom .card-count-box').css({
                            left: '206px'
                        });
                        $('.right .card-count-box').css({
                            bottom: '92px'
                        });
                        //初始化手牌数
                        for (let i = 0; i < 3; i++) {
                            $('.card-count-box .card-count').eq(i).text(player[i].poker.length);
                        }
                        //去掉边框，解决动画时的bug
                        $('.heap li').css({
                            border: 'none'
                        });
                        //底牌显示3张牌背
                        for (let i = 0; i < 3; i++) {
                            $('.heap li').eq(i).animate({
                                left: `${120-120*i}px`,
                                top: '-160px',
                                width: '70px',
                                height: '111px',
                            }, 500)
                        }
                        $('.heap li img').css({
                            width: '70px',
                            height: '111px'
                        })
                        //抢地主阶段
                        rob();
                    }
                })
            })
        })
    }

    //改变手牌和牌组
    function changeDeck(i, play) {
        //牌组-1
        $('.heap li:last').remove();
        //玩家手牌+1
        player[i].poker.push(res[i].pop());
        $(play).prepend(`<li value="${player[i].poker[player[i].poker.length-1]}"><img src="../static/images/poker/${player[i].poker[player[i].poker.length-1]}.jpg" alt="" draggable="false"></li>`);
    }
}

//标记是否是第一次叫地主
let order_tage = true;
/**
 * 抢地主
 * @param {*} playId    玩家id
 * @param {*} count 抢地主次数
 * @param {*} info  抢地主信息
 */
function rob(playId, count, info) {
    //初始化
    playId = playId == undefined ? Math.floor(Math.random() * 3) : playId;
    count = count == undefined ? 0 : count;
    info = info == undefined ? [null, null, null] : info;
    //隐藏与解绑
    hideAndUnbindCall();
    //当前操作玩家的组件显示
    if (info[0] == 1 || info[1] == 1 || info[2] == 1) {
        //如果有一个玩家叫了地主，显示抢地主组件
        $('.call-box').eq(playId).find('.call').text('抢地主');
        $('.call-box').eq(playId).find('.no-call').text('不抢');
    }
    if (playId == 1) {
        //显示叫地主组件
        $('.call-box').eq(playId).show();
        //显示计时器
        $('.time-box').eq(playId).show();
    }
    let time = 10;
    //设置计时器的值
    $('.time-box').eq(playId).find('.time').text(time);
    timer = setInterval(() => {
        time--;
        if (time <= 0) {
            clearInterval(timer);
            //抢地主阶段超时处理
            robTimeoutHandler(playId, count, info);
            return;
        }
        $('.time-box').eq(playId).find('.time').text(time);
    }, 1000);
    //如果是第三次抢地主
    if (count == 3) {
        //且无人抢地主，则流局
        if (info[0] == 0 && info[1] == 0 && info[2] == 0) {
            //流局处理
            flowLoaclHandler();
            return;
        }
        if (info[0] == 1 && info[1] == 0 && info[2] == 0) {
            setLandlord(0);
            return;
        }
        if (info[0] == 0 && info[1] == 1 && info[2] == 0) {
            setLandlord(1);
            return;
        }
        if (info[0] == 0 && info[1] == 0 && info[2] == 1) {
            setLandlord(2);
            return;
        }
    }
    //自动抢地主
    if (playId == 0 || playId == 2) {
        let sum = 0;
        for (let i = 0; i < player[playId].poker.length; i++) {
            if (player[playId].poker[i] >= 44 && player[playId].poker[i] <= 53) {
                sum++;
            }
        }
        if (sum >= 4) {
            setTimeout(() => {
                callLandlord();
                return;
            }, 1000)
        } else {
            setTimeout(() => {
                noCallLandlord();
                return;
            }, 1000)
        }
    }
    //叫地主绑定事件
    $('.call-box').eq(playId).find('.call').on('click', callLandlord);
    //叫地主
    function callLandlord() {
        //清除定时器
        clearInterval(timer);
        //显示叫地主、抢地主文字
        let textImg = '';
        //音效
        if (order_tage == true) {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_Order.ogg");
            order.play();
            order_tage = false;
            textImg = '<img src="../static/images/text/calldz.png">';
        } else if (count == 1) {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_Rob1.ogg");
            order.play();
            textImg = '<img src="../static/images/text/robdz.png">';
        } else if (count == 2) {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_Rob2.ogg");
            order.play();
            textImg = '<img src="../static/images/text/robdz.png">';
        } else if (count == 3) {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_Rob3.ogg");
            order.play();
            textImg = '<img src="../static/images/text/robdz.png">';
        }
        $('.text-box').find('img').remove();
        $('.text-box').eq(playId).append(textImg);
        //改变标记
        info[playId] = 1;
        //次数+1
        count++;
        //如果是第四次抢地主，且当前玩家仍确定抢地主，则确定该玩家就是地主
        if (count == 4) {
            setLandlord(playId);
            return;
        }
        //下一位玩家
        playId = playId++ >= 2 ? 0 : playId;
        //如果下一个玩家不抢，则跳过
        if (count == 3 && info[playId] == 0) {
            //下一位玩家
            playId = playId++ >= 2 ? 0 : playId;
        }
        //继续调用
        rob(playId, count, info);
    }

    $('.call-box').eq(playId).find('.no-call').on('click', noCallLandlord);
    //不叫地主
    function noCallLandlord() {
        //清除定时器
        clearInterval(timer);
        //显示不叫地主文字
        let textImg = '';
        //音效
        let order;
        if (order_tage == true) {
            if (count == 0) {
                order = new Audio("../static/audio/zhuzhu/zhuzhu_NoOrder.ogg");
                order.play();
            } else if (count == 1) {
                order = new Audio("../static/audio/zhuzhu/zhuzhu_NoOrder-1.ogg");
                order.play();
            } else if (count == 2) {
                order = new Audio("../static/audio/zhuzhu/zhuzhu_NoOrder.ogg");
                order.play();
            }
            textImg = '<img src="../static/images/text/nocall.png">';
        } else {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_NoRob.ogg");
            order.play();
            textImg = '<img src="../static/images/text/norob.png">';
        }
        $('.text-box').find('img').remove();
        $('.text-box').eq(playId).append(textImg);
        //改变标记
        info[playId] = 0;
        //次数+1
        count++;
        //如果是第四次抢地主，当前玩家放弃抢地主，则上一个抢地主的玩家是地主
        if (count == 4) {
            let prePlayId = --playId < 0 ? 2 : playId;
            //判断当前玩家是否抢地主
            if (info[prePlayId] == 1) {
                setLandlord(prePlayId);
                return;
            } else {
                //如果上一个玩家不抢，则当前玩家肯定抢了地主
                prePlayId = --prePlayId < 0 ? 2 : prePlayId;
                setLandlord(prePlayId);
                return;
            }
        }
        //下一位玩家
        playId = playId++ >= 2 ? 0 : playId;
        //继续调用
        rob(playId, count, info);
    }
}

/**
 * 抢地主阶段超时处理
 * @param {*} playId    玩家id
 * @param {*} count 抢地主次数
 * @param {*} info  抢地主信息
 */
function robTimeoutHandler(playId, count, info) {
    //显示不叫地主文字
    let textImg = '';
    //音效
    let order;
    if (order_tage == true) {
        if (count == 0) {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_NoOrder.ogg");
            order.play();
        } else if (count == 1) {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_NoOrder-1.ogg");
            order.play();
        } else if (count == 2) {
            order = new Audio("../static/audio/zhuzhu/zhuzhu_NoOrder.ogg");
            order.play();
        }
        textImg = '<img src="../static/images/text/nocall.png">';
    } else {
        order = new Audio("../static/audio/zhuzhu/zhuzhu_NoRob.ogg");
        order.play();
        textImg = '<img src="../static/images/text/norob.png">';
    }
    $('.text-box').find('img').remove();
    $('.text-box').eq(playId).append(textImg);
    //默认该玩家不抢
    info[playId] = 0;
    //下一位玩家
    playId = playId++ >= 2 ? 0 : playId;
    //次数+1
    count++;
    //清除定时器
    clearInterval(timer);
    //隐藏与解绑
    hideAndUnbindCall();
    //调用
    rob(playId, count, info);
}

//流局处理
function flowLoaclHandler() {
    //清除定时器
    clearInterval(timer);
    //隐藏与解绑
    hideAndUnbindCall();
    //移除文字
    setTimeout(() => {
        $('.text-box').find('img').remove();
    }, 1000)
    //移除牌背显示的底牌
    $('.heap').find('li').remove();
    //移除手牌
    $('.play').find('li').remove();
    //移除计数器组件
    $('.card-count-box').hide();
    //移除player中的poker数据
    for (let i = 0; i < 3; i++) {
        player[i].poker = [];
    }
    setTimeout(() => {
        //初始化桌面牌组
        initHeap();
        //发牌
        dealer();
    }, 1000)
}

/**
 * 设置地主
 * @param {*} number 玩家序号
 */
function setLandlord(number) {
    //清除计时器
    clearInterval(timer);
    //隐藏与解绑
    hideAndUnbindCall();
    //移除文字
    setTimeout(() => {
        $('.text-box').find('img').remove();
    }, 1000)
    //显示底牌，并将3张底牌添加给地主
    for (let i = 0; i < res[3].length; i++) {
        //设置旋转类 
        $('.heap li').eq(i).addClass('rotate1');
        //延时改变图片显示为正面
        setTimeout(() => {
            $('.heap li img').eq(i).attr('src', `../static/images/poker/${res[3][i]}.jpg`);
            $('.heap li').eq(i).removeClass('rotate1').addClass('rotate2');
        }, 1000)
        //添加给地主
        player[number].poker.push(res[3][i]);
    }
    //添加底牌后重新排序生成手牌
    regenerate(number);
    //更新手牌数
    $('.card-count-box .card-count').eq(number).text(player[number].poker.length);
    //设置地主
    gameData.landlord = number;
    //修改地主的倍数
    updateLandlordBei();
    //显示地主头衔并调整手牌数组件位置
    switch (number) {
        case 0:
            $('.left .info-box .rank').css({
                display: 'block'
            });
            $('.card-count-box').eq(0).css({
                top: '57px'
            });
            break;
        case 1:
            $('.center-bottom .info-box .rank').css({
                display: 'block'
            });
            $('.card-count-box').eq(1).css({
                left: '170px'
            });
            break;
        case 2:
            $('.right .info-box .rank').css({
                display: 'block'
            });
            $('.card-count-box').eq(2).css({
                bottom: '57px'
            });
            break;
    }
    //出牌阶段
    discard(number, 0);
}

//修改地主的倍数
function updateLandlordBei() {
    let landlordBei = 0;
    let $infoBox = $('.info-box');
    for (let i = 0; i < $infoBox.length; i++) {
        if (i != gameData.landlord) {
            landlordBei += parseInt($infoBox.eq(i).find('.bei-number').text());
        }
    }
    $infoBox.eq(gameData.landlord).find('.bei-number').text(landlordBei);
}

/**
 * 添加底牌后重新排序生成手牌
 * @param {*} number 玩家序号
 */
function regenerate(number) {
    //排序
    player[0].poker.sort((a, b) => a - b);
    player[1].poker.sort((a, b) => a - b);
    player[2].poker.sort((a, b) => a - b);
    //移除所有手牌
    $(`.play${number+1}`).find('li').remove();
    //重新生成
    for (let i = 0; i < player[number].poker.length; i++) {
        $(`.play${number+1}`).append(`<li value="${player[number].poker[i]}"><img src="../static/images/poker/${player[number].poker[i]}.jpg" alt="" draggable="false"></li>`);
    }
}

/**
 * 出牌
 * @param {*} number 玩家序号
 * @param {*} noDiscardCount 一轮出牌中不出的次数
 */
function discard(number, noDiscardCount) {
    //接收提示返回的数组
    let tipsArr = [];
    //单个玩家出牌时按提示的次数
    let tipsCount = 0;
    //隐藏与解绑
    hideAndUnbindDiscard();
    if (number == 1) {
        //显示当前出牌玩家的组件
        $('.discard-box').eq(number).show();
        //显示当前出牌玩家的计时器组件
        $('.time-box').eq(number).show();
    }
    let time = 20;
    //设置计时器的值
    $('.time-box').eq(number).find('.time').text(time);
    timer = setInterval(() => {
        time--;
        if (time <= 0) {
            clearInterval(timer);
            //出牌阶段超时处理
            discardTimeoutHandler(number, noDiscardCount);
            return;
        }
        $('.time-box').eq(number).find('.time').text(time);
    }, 1000)
    //保存当前选中要出的牌
    let arr = [];
    //自动出牌
    let autoArr = [];
    if (number == 0 || number == 2) {
        //获取能够出的牌
        if (gameData.tempHeap.length == 0) {
            autoArr = selectCardsRobot(player[number].poker, gameData.tempHeap);
        } else {
            autoArr = tips(player[number].poker, gameData.tempHeap);
        }
        //要的起
        if (autoArr.length > 0) {
            //修改数组
            arr = autoArr;
            setTimeout(() => {
                //移除所有的样式
                $(`.play${number+1}`).find('li').removeClass('selected');
                //添加 selected 类
                $(`.play${number+1}`).find('li').each((index, item) => {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] == item.value) {
                            $(item).addClass('selected');
                        }
                    }
                })
                clickDiscard();
            }, 1000);
        } else {
            setTimeout(() => {
                clickNodiscard();
            }, 1000);
        }
    }
    //出牌绑定事件
    $('.discard-box').eq(number).find('.discard').on('click', clickDiscard);

    function clickDiscard() {
        //一旦有人要，则更新不要的次数
        noDiscardCount = 0;
        if (number == 1) {
            //每次点击之后清空
            arr = [];
            $(`.play${number+1}`).find('li').each((index, item) => {
                if ($(item).hasClass('selected')) {
                    arr.push(item.value);
                }
            })
        }
        //对要出的牌进行排序
        arr = sortPoker(arr);
        //判断是否符合出牌规则
        if (check(arr)) {
            //当前要出的牌和牌堆中的牌进行比较
            let flag = CompareTo(gameData.tempHeap, arr);
            if (flag) {
                //移除文字
                $('.text-box').find('img').remove();
                //出牌音乐
                playPokeMusic(arr, number);
                //清空牌堆
                $('.play-heap ul').find('li').remove();
                //当前出的牌添加到牌堆
                $(`.play${number+1}`).find('li').each((index, item) => {
                    if ($(item).hasClass('selected')) {
                        $(`.play${number+1}-heap ul`).append(item);
                    }
                })
                //玩家手牌数据更新
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < player[number].poker.length; j++) {
                        if (player[number].poker[j] == arr[i]) {
                            player[number].poker.splice(j, 1);
                            break;
                        }
                    }
                }
                //手牌数更新
                $('.card-count-box .card-count').eq(number).text(player[number].poker.length);
                //改变手牌数组件位置
                changePosition(number, arr.length);
                //只剩两张牌了
                if (player[number].poker.length == 2) {
                    let order = new Audio('../static/audio/zhuzhu/zhuzhu_baojing2.ogg');
                    setTimeout(() => {
                        order.play();
                        //切换音乐
                        pokersAlarmMusic();
                    }, 500)
                } else if (player[number].poker.length == 1) {
                    //只剩一张牌了
                    let order = new Audio('../static/audio/zhuzhu/zhuzhu_baojing1.ogg');
                    setTimeout(() => {
                        order.play();
                        //切换音乐
                        pokersAlarmMusic();
                    }, 500)
                }
                //判断胜负
                if (player[number].poker.length == 0) {
                    //清除定时器
                    clearInterval(timer);
                    //隐藏所有手牌数组件
                    $('.card-count-box').hide();
                    //清空文字
                    setTimeout(() => {
                        $('.text-box').find('img').remove();
                    }, 1000)
                    //隐藏与解绑
                    hideAndUnbindDiscard();
                    setTimeout(() => {
                        judgeOutcome(number);
                    }, 1000)
                    return;
                }
                //将当前出的牌数据添加到临时牌堆
                gameData.tempHeap = [...arr];
                //清除定时器
                clearInterval(timer);
                //下一位玩家出牌
                number = number++ >= 2 ? 0 : number;
                //调用
                discard(number, noDiscardCount);
            } else {
                //去掉selected
                console.log('不符合出牌规则1');
            }
        } else {
            //去掉selected
            console.log('不符合出牌规则2');
        }
    }

    $('.discard-box').eq(number).find('.no-discard').on('click', clickNodiscard);

    function clickNodiscard() {
        //判断牌堆是否有牌
        let len = gameData.tempHeap.length;
        if (len == 0) {
            console.log('您为当前出牌玩家，必须得出牌');
            return;
        }
        //播放不要音乐
        notOut();
        //清除定时器
        clearInterval(timer);
        //显示不出文字
        let textImg = '<img src="../static/images/text/buchu.png">';
        $('.text-box').find('img').remove();
        $('.text-box').eq(number).append(textImg);
        //下一位玩家出牌
        number = number++ >= 2 ? 0 : number;
        //不要的次数+1
        noDiscardCount++;
        //两个都不要
        if (noDiscardCount == 2) {
            //将牌堆的数据清空
            gameData.tempHeap = [];
            //更新不要的次数
            noDiscardCount = 0;
        }
        //调用
        discard(number, noDiscardCount);
    }

    //提示绑定事件
    $('.discard-box').eq(number).find('.tips').on('click', () => {
        //获取可以出的最小牌
        if (tipsCount == 0) {
            //第一次点击提示
            tipsArr = tips(player[number].poker, gameData.tempHeap);
        } else {
            //移除所有的样式
            $(`.play${number+1}`).find('li').removeClass('selected');
            //第n次点击提示
            tipsArr = tips(player[number].poker, tipsArr);
            //防止多次点击提示后会存入一个空的字符情况
            if (!CompareTo(gameData.tempHeap, tipsArr)) {
                tipsArr = tips(player[number].poker, gameData.tempHeap);
            }
        }
        //添加 selected 类
        $(`.play${number+1}`).find('li').each((index, item) => {
            for (let i = 0; i < tipsArr.length; i++) {
                if (tipsArr[i] == item.value) {
                    $(item).addClass('selected');
                }
            }
        })
        tipsCount++;
    })
}

/**
 * 出牌超时处理
 * @param {*} number 玩家序号
 * @param {*} noDiscardCount 一轮出牌中不出的次数
 */
function discardTimeoutHandler(number, noDiscardCount) {
    //清除定时器
    clearInterval(timer);
    //隐藏与解绑
    hideAndUnbindDiscard();
    //判断牌堆是否有牌
    let len = gameData.tempHeap.length;
    if (len == 0) {
        //必须得出
        //获取可以出的最小牌
        let arr = tips(player[number].poker, gameData.tempHeap);
        //对要出的牌进行排序
        arr = sortPoker(arr);
        //判断是否符合出牌规则
        if (check(arr)) {
            //当前要出的牌和牌堆中的牌进行比较
            let flag = CompareTo(gameData.tempHeap, arr);
            if (flag) {
                //清空文字
                $('.text-box').find('img').remove();
                //出牌音乐
                playPokeMusic(arr, number);
                //清空牌堆
                $('.play-heap ul').find('li').remove();
                //当前出的牌添加到牌堆
                $(`.play${number+1}`).find('li').each((index, item) => {
                    for (let i = 0; i < arr.length; i++) {
                        if (item.value == arr[i]) {
                            $(`.play${number+1}-heap ul`).append(item);
                            break;
                        }
                    }
                })
                //玩家手牌数据更新
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < player[number].poker.length; j++) {
                        if (player[number].poker[j] == arr[i]) {
                            player[number].poker.splice(j, 1);
                            break;
                        }
                    }
                }
                //手牌数更新
                $('.card-count-box .card-count').eq(number).text(player[number].poker.length);
                //改变手牌数组件位置
                changePosition(number, arr.length);
                //只剩两张牌了
                if (player[number].poker.length == 2) {
                    let order = new Audio('../static/audio/zhuzhu/zhuzhu_baojing2.ogg');
                    setTimeout(() => {
                        order.play();
                        //切换音乐
                        pokersAlarmMusic()
                    }, 500)
                } else if (player[number].poker.length == 1) {
                    //只剩一张牌了
                    let order = new Audio('../static/audio/zhuzhu/zhuzhu_baojing1.ogg');
                    setTimeout(() => {
                        order.play();
                        //切换音乐
                        pokersAlarmMusic();
                    }, 500)
                }
                //判断胜负
                if (player[number].poker.length == 0) {
                    //清除定时器
                    clearInterval(timer);
                    //隐藏所有手牌数组件
                    $('.card-count-box').hide();
                    //清空文字
                    setTimeout(() => {
                        $('.text-box').find('img').remove();
                    }, 1000)
                    //隐藏与解绑
                    hideAndUnbindDiscard();
                    setTimeout(() => {
                        judgeOutcome(number);
                    }, 1000)
                    return;
                }
                //将当前出的牌数据添加到临时牌堆
                gameData.tempHeap = [...arr];
                //清除定时器
                clearInterval(timer);
                //下一位玩家出牌
                number = number++ >= 2 ? 0 : number;
                //调用
                discard(number, noDiscardCount);
            } else {
                //去掉selected
                console.log('不符合出牌规则1');
            }
        } else {
            //去掉selected
            console.log('不符合出牌规则2');
        }
    } else {
        //播放不要音乐
        notOut();
        //显示不出文字
        let textImg = '<img src="../static/images/text/buchu.png">';
        $('.text-box').find('img').remove();
        $('.text-box').eq(number).append(textImg);
        //跳过
        //下一位玩家出牌
        number = number++ >= 2 ? 0 : number;
        //不要的次数+1
        noDiscardCount++;
        //两个都不要
        if (noDiscardCount == 2) {
            //将牌堆的数据清空
            gameData.tempHeap = [];
            //更新不要的次数
            noDiscardCount = 0;
        }
        //调用
        discard(number, noDiscardCount);
    }
}

/**
 * 改变手牌数组件位置
 * @param {*} number 玩家序号
 * @param {*} length 出了的牌数
 */
function changePosition(number, length) {
    switch (number) {
        case 0:
            let offsetTop = parseInt($('.left .card-count-box').css('top'));
            $('.left .card-count-box').css({
                top: `${offsetTop+12*length}px`
            })
            break;
        case 1:
            let offsetLeft = parseInt($('.center-bottom .card-count-box').css('left'));
            $('.center-bottom .card-count-box').css({
                left: `${offsetLeft+12*length}px`
            })
            break;
        case 2:
            let offsetBottom = parseInt($('.right .card-count-box').css('bottom'));
            $('.right .card-count-box').css({
                bottom: `${offsetBottom+12*length}px`
            })
            break;
    }
}

/**
 * 判断胜负
 * @param {*} number 玩家序号
 */
function judgeOutcome(number) {
    //修改标记，解决重新开始游戏后第一个随机玩家叫地主没有声音的问题
    order_tage = true;
    //清除房间信息
    $('.room-info').find('span').text('');
    //计算
    calculation(number);
    //遮罩层显示
    $('.mask').show();
    //判断
    if (gameData.landlord == number) {
        //地主胜
        if (number == 0) {
            $('.settlement-top').css({
                backgroundImage: "url(../static/images/settlement/lose1.png)"
            });
            //音乐
            judegMusicLose();
        } else if (number == 1) {
            $('.settlement-top').css({
                backgroundImage: "url(../static/images/settlement/win2.png)",
                top: "-62px"
            });
            //音乐
            judgeMusicWin();
        } else if (number == 2) {
            $('.settlement-top').css({
                backgroundImage: "url(../static/images/settlement/lose1.png)"
            });
            //音乐
            judegMusicLose();
        }
    } else {
        //地主输
        if (gameData.landlord == 0) {
            $('.settlement-top').css({
                backgroundImage: "url(../static/images/settlement/win1.png)",
                top: "-106px"
            });
            //音乐
            judgeMusicWin();

        } else if (gameData.landlord == 1) {
            $('.settlement-top').css({
                backgroundImage: "url(../static/images/settlement/lose2.png)"
            });
            //音乐
            judegMusicLose();
        } else if (gameData.landlord == 2) {
            $('.settlement-top').css({
                backgroundImage: "url(../static/images/settlement/win1.png)",
                top: "-106px"
            });
            //音乐
            judgeMusicWin();
        }
    }
    //删除所有地主标志
    for (let i = 0; i < player.length; i++) {
        $(`.play${i+1}-data td:first`).removeClass('is-landlord');
    }
    //给当前地主添加标志
    $(`.play${gameData.landlord+1}-data td:first`).addClass('is-landlord');
}

/**
 * 计算
 * @param {*} number 玩家序号
 */
function calculation(number) {
    if (gameData.landlord == number) {
        //地主胜
        if (gameData.landlord == 0) {
            player[1].goldBean -= gameData.baseScore * gameData.beiNumber;
            player[2].goldBean -= gameData.baseScore * gameData.beiNumber;
            updatePanel(1, `-${gameData.baseScore * gameData.beiNumber}`);
            updatePanel(2, `-${gameData.baseScore * gameData.beiNumber}`);
        } else if (gameData.landlord == 1) {
            player[0].goldBean -= gameData.baseScore * gameData.beiNumber;
            player[2].goldBean -= gameData.baseScore * gameData.beiNumber;
            updatePanel(0, `-${gameData.baseScore * gameData.beiNumber}`);
            updatePanel(2, `-${gameData.baseScore * gameData.beiNumber}`);
        } else if (gameData.landlord == 2) {
            player[0].goldBean -= gameData.baseScore * gameData.beiNumber;
            player[1].goldBean -= gameData.baseScore * gameData.beiNumber;
            updatePanel(0, `-${gameData.baseScore * gameData.beiNumber}`);
            updatePanel(1, `-${gameData.baseScore * gameData.beiNumber}`);
        }
        player[gameData.landlord].goldBean += gameData.baseScore * gameData.beiNumber * 2;
        updatePanel(gameData.landlord, `${gameData.baseScore * gameData.beiNumber * 2}`);
    } else {
        //农民胜
        if (gameData.landlord == 0) {
            player[1].goldBean += gameData.baseScore * gameData.beiNumber;
            player[2].goldBean += gameData.baseScore * gameData.beiNumber;
            updatePanel(1, `${gameData.baseScore * gameData.beiNumber}`);
            updatePanel(2, `${gameData.baseScore * gameData.beiNumber}`);
        } else if (gameData.landlord == 1) {
            player[0].goldBean += gameData.baseScore * gameData.beiNumber;
            player[2].goldBean += gameData.baseScore * gameData.beiNumber;
            updatePanel(0, `${gameData.baseScore * gameData.beiNumber}`);
            updatePanel(2, `${gameData.baseScore * gameData.beiNumber}`);
        } else if (gameData.landlord == 2) {
            player[0].goldBean += gameData.baseScore * gameData.beiNumber;
            player[1].goldBean += gameData.baseScore * gameData.beiNumber;
            updatePanel(0, `${gameData.baseScore * gameData.beiNumber}`);
            updatePanel(1, `${gameData.baseScore * gameData.beiNumber}`);
        }
        player[gameData.landlord].goldBean -= gameData.baseScore * gameData.beiNumber * 2;
        updatePanel(gameData.landlord, `-${gameData.baseScore * gameData.beiNumber * 2}`);
    }
    //清空手牌数据，防止存入本地，影响下局游戏
    for (let i = 0; i < player.length; i++) {
        player[i].poker = [];
    }
    //存储数据到本地
    localStorage.setItem('player', JSON.stringify(player));
}

//更新面板
function updatePanel(i, beans) {
    let $playData = $(`.play${i+1}-data`);
    $playData.find('.names').text(player[i].name);
    $playData.find('.base').text(gameData.baseScore);
    if (gameData.landlord == i) {
        $playData.find('.beis').text(`x${gameData.beiNumber * 2}`);
    } else {
        $playData.find('.beis').text(`x${gameData.beiNumber}`);
    }
    $playData.find('.beans').text(beans);
}
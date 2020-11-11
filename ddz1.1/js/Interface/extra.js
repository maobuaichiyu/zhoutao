$('.scene-btn').click(() => {
    if ($('.scene-pic').css('display') == 'none') {
        $('.scene-pic').css('display', 'block');
        let img = '';
        for (let i = 0; i < 20; i++) {
            img += `<a class="bg-img"><img src="../static/images/bg/bg${i+1}.png"></img></a>`
        }
        $('.scene-pic').append(img);
    } else {
        $('.scene-pic').css('display', 'none');
        $('.scene-pic').find('a').remove()
    }
    $('.bg-img').eq(0).css('border', '2px solid #000');

    for (let i = 0; i < 20; i++) {
        $('.bg-img').eq(i).click(() => {
            $('.bg-img').css('border', 'none');
            $('.bg-img').eq(i).css('border', '2px solid #000');
            $('.item-active').removeClass('item-active');
            $('.bg-item').eq(i).addClass('item-active');
        })
    }
})

$('.chat-btn').click(() => {
    let order;
    if ($('.chat-item').css('display') == 'none') {
        $('.chat-item').css('display', 'block');
    } else {
        $('.chat-item').css('display', 'none');
    }
    for (let i = 0; i < 14; i++) {
        $('.chat-item li').eq(i).click(() => {
            if (order != undefined && !order.ended) {
                return;
            }
            if (i < 10)
                order = new Audio(`../static/audio/zhuzhu/zhuzhu_Chat_50${i}.ogg`)
            else {
                order = new Audio(`../static/audio/zhuzhu/zhuzhu_Chat_5${i}.ogg`)
            }
            order.play();
        })
    }
})
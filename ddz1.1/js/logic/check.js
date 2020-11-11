/**
 * 判断是否符合出牌规则
 * @param {*} ReadyCard 需要判断的牌组
 * @returns boolean值
 */
function check(ReadyCard) {
    return (checkDanz(ReadyCard) || checkDuiZi(ReadyCard) || checkFeiJiBuDaiChiBang(ReadyCard) ||
        checkFeiJiDaiChiBang(ReadyCard) || checkLianDui(ReadyCard) ||
        checkSanDaiEr(ReadyCard) || checkSanDaiYi(ReadyCard) || checkSanZhang(ReadyCard) ||
        checkShunZi(ReadyCard) || checkSiDaiEr(ReadyCard) || checkSiDaiLiangDui(ReadyCard) ||
        checkWangZha(ReadyCard) || checkZhaDan(ReadyCard));
}
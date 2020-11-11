/**
 *    提示能打赢的最小牌
 * @param {*} HoldCard  手牌
 * @param {*} CurrentCards  牌堆
 * @returns 返回能出的最小手牌
 */
function tips(HoldCard, CurrentCards) { //手持牌  牌堆牌  准备出的牌
    let ReadyCard = [];
    if (CurrentCards.length == 0) {
        if (HoldCard.length != 0) {
            ReadyCard.push(HoldCard[0]);
            return ReadyCard;
        }
    }

    let c1 = []; //只有单张
    let c2 = []; //对子
    let c3 = []; //三张
    let c4 = []; //四张
    let c111 = []; //所有单张  从对子 三张  四张里面抽取

    let temp = [];
    let k = 0;
    let j = 1;
    let i1 = 0;
    let i2 = 0;
    let i3 = 0;
    let i4 = 0;
    let index = 0;
    let i111 = 0;

    for (let i in HoldCard) {
        index++;
        temp[k] = HoldCard[i];
        if (k > 0) {
            if (parseInt(temp[k] / 4) == parseInt(temp[k - 1] / 4)) {
                j++;
                k++;
                if (index == HoldCard.length) {
                    if (j == 2) {
                        c2[i2++] = temp[0];
                        c2[i2++] = temp[1];
                        c111[i111++] = temp[0];
                    }
                    if (j == 3) {
                        c3[i3++] = temp[0];
                        c3[i3++] = temp[1];
                        c3[i3++] = temp[2];
                        c111[i111++] = temp[0];
                    }
                    if (j == 4) {
                        c4[i4++] = temp[0];
                        c4[i4++] = temp[1];
                        c4[i4++] = temp[2];
                        c4[i4++] = temp[3];
                        c111[i111++] = temp[0];
                    }
                }
            } else {
                if (j == 1) {
                    c1[i1++] = temp[0];
                    c111[i111++] = temp[0];
                    if (index != HoldCard.length)
                        temp[0] = temp[1];
                    else {
                        c111[i111++] = temp[1];
                        c1[i1++] = temp[1];
                    }
                }
                if (j == 2) {
                    c2[i2++] = temp[0];
                    c2[i2++] = temp[1];
                    c111[i111++] = temp[0];
                    if (index != HoldCard.length)
                        temp[0] = temp[2];
                    else {
                        c111[i111++] = temp[2];
                        c2[i2++] = temp[2];
                    }
                }
                if (j == 3) {
                    c3[i3++] = temp[0];
                    c3[i3++] = temp[1];
                    c3[i3++] = temp[2];
                    c111[i111++] = temp[0];
                    if (index != HoldCard.length)
                        temp[0] = temp[3];
                    else {
                        c3[i3++] = temp[3];
                        c111[i111++] = temp[3];
                    }

                }
                if (j == 4) {
                    c4[i4++] = temp[0];
                    c4[i4++] = temp[1];
                    c4[i4++] = temp[2];
                    c4[i4++] = temp[3];
                    c111[i111++] = temp[0];
                    if (index != HoldCard.length)
                        temp[0] = temp[4];
                    else {
                        c111[i111++] = temp[4];
                        c4[i4++] = temp[4];
                    }
                }
                k = 1;
                j = 1;
            }
        } else
            k++;
    }

    if (index == 1) {
        c1[i1++] = HoldCard[0];
        c111[i111++] = HoldCard[0];
    }

    let cur = parseInt(CurrentCards[0] / 4);
    //自动出牌  若牌堆为空
    if (CurrentCards.length == 0) {
        if (HoldCard.length != 0) { //排列优先级  顺子  连对 三带一 对子 单张
            let cur = -1; //方便判断
            let len = 5;
            //顺子
            if (c111.length >= 5) {
                c111.sort((a, b) => a - b);
                for (let len = 12; len >= 5; len--) {
                    for (let i = 0; i < c111.length; i++) {
                        if (parseInt(c111[i] / 4) > cur && ReadyCard.length == 0) {
                            if (parseInt(c111[i + len - 1] / 4) == (parseInt(c111[i] / 4) + len - 1)) {
                                if ((parseInt(c111[i + len - 1] / 4)) == 13 || (parseInt(c111[i + len - 1] / 4)) == 12) break;
                                for (let l = i; l < i + len; l++) {
                                    ReadyCard.push(c111[l]);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            //连对
            if (c2.length >= 6 && ReadyCard.length == 0) { //对子数组有三对及以上  并且准备出的牌还是为空
                for (let len = 16; len >= 6; len--) {
                    for (let i = 0; i < c2.length; i++) {
                        if (parseInt(c2[i] / 4) > cur) {
                            if (parseInt(c2[i + len - 2] / 4) == parseInt(c2[i] / 4) + len / 2 - 1) {
                                if ((parseInt(c2[i + len - 2] / 4)) == 13) break;
                                for (let l = i; l < i + len; l++) {
                                    ReadyCard.push(c2[l]);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            //三带一
            if (c3.length != 0 && ReadyCard.length == 0) {
                if (c1.length != 0) {
                    for (let i = 0; i < c3.length; i += 3) {
                        if (parseInt(c3[i] / 4) > cur) {
                            ReadyCard.push(c3[i]);
                            ReadyCard.push(c3[i + 1]);
                            ReadyCard.push(c3[i + 2]);
                            ReadyCard.push(c1[0]);
                            break;
                        }
                    }

                } else if (c2.length != 0) {
                    for (let i = 0; i < c3.length; i += 3) {
                        if (parseInt(c3[i] / 4) > cur) {
                            ReadyCard.push(c3[i]);
                            ReadyCard.push(c3[i + 1]);
                            ReadyCard.push(c3[i + 2]);
                            ReadyCard.push(c2[0]);
                            break;
                        }
                    }
                }
            }
            //对子
            if (c2.length != 0 && ReadyCard.length == 0) {
                for (let i = 0; i < c2.length - 1; i += 2) {
                    if (parseInt(c2[i] / 4) > cur) {
                        ReadyCard.push(c2[i]);
                        ReadyCard.push(c2[i + 1]);
                        break;
                    }
                }
            }
            //单张
            if (ReadyCard.length == 0) {
                ReadyCard.push(HoldCard[0]);
            }
            return ReadyCard;
        }
    }

    if (checkDanz(CurrentCards)) {
        if (c1.length != 0) {
            for (let i = 0; i < c1.length; i++) {
                if (parseInt(c1[i] / 4) > cur) {
                    ReadyCard.push(c1[i]);
                    break;
                } else if (c1[i] == 53 && CurrentCards[0] == 52) {
                    ReadyCard.push(c1[i]);
                }
            }
        }
        if (c2.length != 0 && ReadyCard.length == 0) {
            for (let i = 0; i < c2.length; i++) {
                if (parseInt(c2[i] / 4) > cur) {
                    ReadyCard.push(c2[i]);
                    break;
                }
            }
        }
        if (c3.length != 0 && ReadyCard.length == 0) {
            for (let i = 0; i < c3.length; i++) {
                if (parseInt(c3[i] / 4) > cur) {
                    ReadyCard.push(c3[i]);
                    break;
                }
            }
        }
        if (c4.length != 0 && ReadyCard.length == 0) { //应该是c4
            for (let i = 0; i < 4; i++) {
                ReadyCard.push(c4[i]);
            }
        }
    }

    if (checkDuiZi(CurrentCards)) {
        if (c2.length != 0) {
            for (let i = 0; i < c2.length - 1; i += 2) {
                if (parseInt(c2[i] / 4) > cur) {
                    ReadyCard.push(c2[i]);
                    ReadyCard.push(c2[i + 1]);
                    break;
                }
            }
        }
        if (c3.length != 0 && ReadyCard.length == 0) {
            for (let i = 0; i < c3.length; i += 2) {
                if (parseInt(c3[i] / 4) > cur) {
                    ReadyCard.push(c3[i]);
                    ReadyCard.push(c3[i + 1]);
                    break;
                }
            }
        }
        if (c4.length != 0 && ReadyCard.length == 0) {
            for (let i = 0; i < 4; i++) {
                ReadyCard.push(c4[i]);
            }
        }
    }

    if (checkSanZhang(CurrentCards)) {
        if (c3.length != 0) {
            for (let i = 0; i < c3.length; i += 3) {
                if (parseInt(c3[i] / 4) > cur) {
                    ReadyCard.push(c3[i]);
                    ReadyCard.push(c3[i + 1]);
                    ReadyCard.push(c3[i + 2]);
                    break;
                }
            }
        }
        if (c4.length != 0 && ReadyCard.length == 0) {
            for (let i = 0; i < 4; i++) {
                ReadyCard.push(c4[i]);
            }
        }
    }

    if (checkSanDaiYi(CurrentCards)) {
        if (c3.length != 0) {
            if (c1.length != 0) {
                for (let i = 0; i < c3.length; i += 3) {
                    if (parseInt(c3[i] / 4) > cur) {
                        ReadyCard.push(c3[i]);
                        ReadyCard.push(c3[i + 1]);
                        ReadyCard.push(c3[i + 2]);
                        ReadyCard.push(c1[0]);
                        break;
                    }
                }
            } else if (c2.length != 0) {
                for (let i = 0; i < c3.length; i += 3) {
                    if (parseInt(c3[i] / 4) > cur) {
                        ReadyCard.push(c3[i]);
                        ReadyCard.push(c3[i + 1]);
                        ReadyCard.push(c3[i + 2]);
                        ReadyCard.push(c2[0]);
                        break;
                    }
                }
            }

        }
        if (c4.length != 0 && ReadyCard == 0) {
            for (let i = 0; i < 4; i++) {
                ReadyCard.push(c4[i]);
            }
        }
    }

    if (checkSanDaiEr(CurrentCards)) {
        if (c3.length != 0) {
            if (c2.length != 0) {
                for (let i = 0; i < c3.length; i += 3) {
                    if (parseInt(c3[i] / 4) > cur) {
                        ReadyCard.push(c3[i]);
                        ReadyCard.push(c3[i + 1]);
                        ReadyCard.push(c3[i + 2]);
                        ReadyCard.push(c2[0]);
                        ReadyCard.push(c2[1]);
                        break;
                    }
                }
            }

        }
        if (c4.length != 0 && ReadyCard == 0) {
            for (let i = 0; i < 4; i++) {
                ReadyCard.push(c4[i]);
            }
        }
    }
    //注意排除大小王
    if (checkLianDui(CurrentCards)) { // 首先判断是多少连对  然后判断第一对是否大于当前牌堆第一对  若大于 则加牌堆长度大小  判断是否连续
        let len = CurrentCards.length;
        if (c2.length >= len) {
            for (let i = 0; i < c2.length; i++) {
                if (parseInt(c2[i] / 4) > cur) {
                    if (parseInt(c2[i + len - 2] / 4) == parseInt(c2[i] / 4) + len / 2 - 1) {
                        if ((parseInt(c2[i + len - 2] / 4)) == 13) break;
                        for (let l = i; l < i + len; l++) {
                            ReadyCard.push(c2[l]);
                        }
                        break;
                    }
                }
            }
        }
        if (c4.length != 0 && ReadyCard == 0) {
            for (let i = 0; i < 4; i++) {
                ReadyCard.push(c4[i]);
            }
        }
    }
    if (checkShunZi(CurrentCards)) { // 首先判断是多少连对  然后判断第一对是否大于当前牌堆第一对  若大于 则加牌堆长度大小  判断是否连续
        let len = CurrentCards.length;
        c111.sort((a, b) => a - b);
        if (c111.length >= len) {
            for (let i = 0; i < c111.length; i++) {
                if (parseInt(c111[i] / 4) > cur) {
                    if (parseInt(c111[i + len - 1] / 4) == (parseInt(c111[i] / 4) + len - 1)) {
                        if ((parseInt(c111[i + len - 1] / 4)) == 13 || (parseInt(c111[i + len - 1] / 4)) == 12) break;
                        for (let l = i; l < i + len; l++) {
                            ReadyCard.push(c111[l]);
                        }
                        break;
                    }
                }
            }
        }
        if (c4.length != 0 && ReadyCard == 0) {
            for (let i = 0; i < 4; i++) {
                ReadyCard.push(c4[i]);
            }
        }
    }

    if (checkZhaDan(CurrentCards)) {
        if (c4.length != 0) {
            for (let i = 0; i < c4.length; i++) {
                if ((c4[i] > CurrentCards[0]) && (ReadyCard.length <= 3)) {
                    ReadyCard.push(c4[i]);
                }
            }
        }
    }

    //王炸  除了王炸  其他都打不起上家牌
    if (ReadyCard.length == 0) {
        if (HoldCard.indexOf(52) != -1 && HoldCard.indexOf(53) != -1) {
            ReadyCard.push(52);
            ReadyCard.push(53);
        }
    }
    return ReadyCard;
}
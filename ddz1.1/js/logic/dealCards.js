/**
 * 发牌
 * @returns result : { arr1, arr2, arr3, dipai}
 */
function dealCards() {
    let result = [];
    let arr = [];
    let role1 = [],
        role2 = [],
        role3 = [],
        p = [];
    //打开一副新牌
    for (let i = 0; i < 54; i++) {
        arr.push(i);
    }
    //洗牌
    arr.sort(() => {
        return Math.random() - 0.5
    });
    //分牌
    for (let i = 0; i < 51; i++) {
        if (i % 3 == 0) {
            role1.push(arr[i]);
        }
        if (i % 3 == 1) {
            role2.push(arr[i]);
        }
        if (i % 3 == 2) {
            role3.push(arr[i]);
        }
    }
    //底牌
    for (let i = 51; i < 54; i++) {
        p.push(arr[i]);
    }
    // 将地址给传给参数
    role1.sort((a, b) => a - b);
    role2.sort((a, b) => a - b);
    role3.sort((a, b) => a - b);
    p.sort((a, b) => a - b);
    //将3组牌和底牌保存
    /* result.push(role1);
    result.push(role2);
    result.push(role3);
    result.push(p); */
    result.push([3, 7, 11, 13, 14, 19, 20, 21, 25, 26, 27, 31, 33, 35, 38, 39, 46]);
    result.push([0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 16, 48, 49, 50, 51, 52, 53]);
    result.push([15, 17, 18, 22, 23, 24, 28, 29, 30, 32, 34, 37, 41, 42, 43, 45, 47]);
    result.push([36, 40, 44]);
    //返回已经分好的牌
    return result;
}
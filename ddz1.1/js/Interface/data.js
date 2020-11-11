//初始化玩家数据
let player = [{
    name: 'Holo',
    avatar: '../static/images/avatar/avatar2.jpg',
    goldBean: 26350,
    poker: []
}, {
    name: 'BooBoo',
    avatar: '../static/images/avatar/avatar1.jpg',
    goldBean: 28452,
    poker: []
}, {
    name: 'Alex',
    avatar: '../static/images/avatar/avatar3.jpg',
    goldBean: 29463,
    poker: []
}]

//游戏数据
let gameData = {
    landlord: null, //本局游戏地主
    tempHeap: [], //本局游戏用于存储上一次出的牌的临时牌堆
    beiNumber: 15, //本局游戏倍数
    baseScore: 25, //本局游戏底分
    bgMusic: null //本局游戏背景音乐
}

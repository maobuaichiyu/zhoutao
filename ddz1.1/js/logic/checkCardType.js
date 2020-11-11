//判断单张
function checkDanz(arr) {
	if (arr.length == 1) {
		return true;
	} else {
		return false;
	}
}
//判断对子
function checkDuiZi(arr) {
	if (arr.length == 2) {
		if (arr[0] + arr[1] == 52 + 53)
			return false;
		if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4))
			return true;
	}
	return false;
}
//判断连对
function checkLianDui(arr) {
	let flag = true;
	if (arr.length % 2 != 0 || arr.length / 2 < 3)
		return false;
	for (let i = 0; i < arr.length; i += 2) {
		if (parseInt(arr[i] / 4) != parseInt(arr[i + 1] / 4))
			flag = false;
		if (i >= 2)
			if ((parseInt(arr[i - 2] / 4) + 1) != parseInt(arr[i] / 4))
				flag = false;
	}
	return flag;
}
//判断三张
function checkSanZhang(arr) {
	if (arr.length != 3)
		return false;
	if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4) && parseInt(arr[2] / 4) == parseInt(arr[1] / 4))
		return true;
	else
		return false;
}
//判断三带一  要排除是炸弹
function checkSanDaiYi(arr) {
	if (arr.length != 4)
		return false;
	if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4) && parseInt(arr[2] / 4) == parseInt(arr[1] / 4)) {
		if (parseInt(arr[3] / 4) == parseInt(arr[2] / 4)) {
			return false;
		} else {
			return true;
		}
	} else if (parseInt(arr[1] / 4) == parseInt(arr[2] / 4) && parseInt(arr[2] / 4) == parseInt(arr[3] / 4)) {
		if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4)) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}
//判断三带二
function checkSanDaiEr(arr) {
	if (arr.length != 5)
		return false;
	if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4) && parseInt(arr[2] / 4) == parseInt(arr[1] / 4) && parseInt(arr[3] / 4) == parseInt(arr[4] / 4))
		return true;
	else if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4) && parseInt(arr[2] / 4) == parseInt(arr[3] / 4) &&
		parseInt(arr[3] / 4) == parseInt(arr[4] / 4))
		return true;
	else
		return false;
}
//判断炸弹
function checkZhaDan(arr) {
	if (arr.length != 4)
		return false;
	if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4) && parseInt(arr[2] / 4) == parseInt(arr[1] / 4) && parseInt(arr[2] / 4) == parseInt(arr[3] / 4))
		return true;
	return false;
}
//判断王炸
function checkWangZha(arr) {
	if (arr.length != 2)
		return false;
	if (arr[0] + arr[1] == 52 + 53)
		return true;
	return false;
}
//判断四带二
function checkSiDaiEr(arr) {
	if (arr.length != 6)
		return false;
	if (parseInt(arr[2] / 4) == parseInt(arr[1] / 4) && parseInt(arr[2] / 4) == parseInt(arr[3] / 4) && parseInt(arr[0] / 4) == parseInt(arr[1] / 4))
		return true;
	return false;
}
//判断四带两对
function checkSiDaiLiangDui(arr) {
	if (arr.length != 8)
		return false;
	if (parseInt(arr[0] / 4) == parseInt(arr[1] / 4) && parseInt(arr[1] / 4) == parseInt(arr[2] / 4) && parseInt(arr[2] / 4) == parseInt(arr[3] / 4) && parseInt(arr[4] / 4) == parseInt(arr[5] / 4) &&
		parseInt(arr[6] / 4) == parseInt(arr[7] / 4))
		return true;
	return false;
}
//判断飞机不带翅膀
function checkFeiJiBuDaiChiBang(arr) {
	let flag = true;
	if (arr.length < 6 || arr.length % 3 != 0)
		return false;
	for (let i = 0; i < arr.length; i += 3) {
		if ((parseInt(arr[i] / 4) != parseInt(arr[i + 1] / 4)) || (parseInt(arr[i + 1] / 4) != parseInt(arr[i + 2] / 4)))
			flag = false;
		if (i > 3)
			if ((parseInt(arr[i - 3] / 4) + 1) != parseInt(arr[i] / 4))
				flag = false;
	}
	return flag;
}
//判断飞机带翅膀
function checkFeiJiDaiChiBang(arr) {
	if (arr.length < 8)
		return false;
	let sum1 = 0;
	let sum2 = 0;

	for (let i = 0; i < arr.length - 2; i++) {
		if (parseInt(arr[i] / 4) == parseInt(arr[i + 1] / 4) && parseInt(arr[i + 1] / 4) == parseInt(arr[i + 2] / 4)) {
			sum1++;
			i += 2;
		}
	}
	for (let i = 0; i < arr.length - 1; i++) {
		if (parseInt(arr[i] / 4) == parseInt(arr[i + 1] / 4)) {
			sum2++;
			i += 1;
		}
	}
	// sum2 = sum2 - sum1;
	// if (sum1 * 3 + sum2 * 2 == arr.length || sum1 * 3 + 1 * sum1 == arr.length)
	// 	return true;
	// return false;
	console.log("sum1 = "+sum1+"  sum2 = "+sum2);
	if ((sum2 == sum1 * 2 && sum1 * 3 + (sum2 - sum1) * 2 == arr.length)||(sum1*3+sum1 == arr.length))
		return true;
	return false;
}
//判断顺子
function checkShunZi(arr) {
	let flag = true;
	if (arr.length < 5)
		return false;
	for (let i = 0; i < arr.length - 1; i++) {
		if (parseInt(arr[i] / 4) + 1 != (parseInt(arr[i + 1] / 4)))
			flag = false;
	}

	return flag;
}
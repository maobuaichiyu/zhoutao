/**
 * 比大小
 * @param {*} arr1	牌堆中的牌
 * @param {*} arr2	当前要出的牌
 * @returns
 */
function BiDaXiao(arr1, arr2) {
	if (parseInt(arr1[0] / 4) < parseInt(arr2[0] / 4) || (arr1[0] == 52 && arr2[0] == 53))
		return true;
	return false;
}

/**
 * 比较当前牌和前面出的牌的大小
 * @param {*} arr1	牌堆中的牌
 * @param {*} arr2	当前要出的牌
 * @returns
 */
function CompareTo(arr1, arr2) {
	//第一次出牌
	if (arr1.length == 0) {
		return true;
	}
	if (arr1.length == 1 && arr2.length == 1) {
		return BiDaXiao(arr1, arr2);
	}
	if (arr1[0] + arr1[1] == 52 + 53)
		return false;

	if (arr2[0] + arr2[1] == 52 + 53)
		return true;

	if (arr1.length == arr2.length) {
		if (checkDanz(arr1) && checkDanz(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkDuiZi(arr1) && checkDuiZi(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkLianDui(arr1) && checkLianDui(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkSanZhang(arr1) && checkSanZhang(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkSanDaiYi(arr1) && checkSanDaiYi(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkSanDaiEr(arr1) && checkSanDaiEr(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkZhaDan(arr1) && checkZhaDan(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkSiDaiEr(arr1) && checkSiDaiEr(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkFeiJiBuDaiChiBang(arr1) && checkFeiJiBuDaiChiBang(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkFeiJiDaiChiBang(arr1) && checkFeiJiDaiChiBang(arr2)) {
			return BiDaXiao(arr1, arr2);
		}

		if (checkShunZi(arr1) && checkShunZi(arr2)) {
			return BiDaXiao(arr1, arr2);
		}
		if (!checkZhaDan(arr1) && checkZhaDan(arr2)) {
			return true;
		}
	} else {
		if (!checkZhaDan(arr1) && checkZhaDan(arr2)) {
			return true;
		}
	}
	return false;
}
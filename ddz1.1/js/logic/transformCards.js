function sortPoker(arr) { // ���������к�
    let replaceArr = []
    let c1 = []; // ����
    let c2 = []; // ����
    let c3 = []; // ����
    let c4 = []; // ը�� ����
    let temp = []; // ������ʱ��
    let k = 0; // �����±�
    let j = 1;
    let i1 = 0;
    let i2 = 0;
    let i3 = 0;
    let i4 = 0;
    let index = 0; // ��¼ѭ������
    for (let i in arr) { // j��������һ������
        index++;
        temp[k] = arr[i];
        if (k > 0) {
            if (parseInt(temp[k] / 4) == parseInt(temp[k - 1] / 4)) {
                j++;
                k++;
                if (index == arr.length) { //最后一张
                    if (j == 2) {
                        c2[i2++] = temp[0];
                        c2[i2++] = temp[1];
                    }
                    if (j == 3) {
                        c3[i3++] = temp[0];
                        c3[i3++] = temp[1];
                        c3[i3++] = temp[2];
                    }
                    if (j == 4) {
                        c4[i4++] = temp[0];
                        c4[i4++] = temp[1];
                        c4[i4++] = temp[2];
                        c4[i4++] = temp[3];
                    }
                }

            } else {
                if (j == 1) {
                    c1[i1++] = temp[0];
                    // �Ƿ�Ϊ���һ����
                    if (index != arr.length)
                        temp[0] = temp[1];
                    else
                        c1[i1++] = temp[1];
                }
                if (j == 2) {
                    c2[i2++] = temp[0];
                    c2[i2++] = temp[1];
                    if (index != arr.length)
                        temp[0] = temp[2];
                    else
                        c2[i2++] = temp[2];
                }
                if (j == 3) {
                    c3[i3++] = temp[0];
                    c3[i3++] = temp[1];
                    c3[i3++] = temp[2];
                    if (index != arr.length)
                        temp[0] = temp[3];
                    else
                        c3[i3++] = temp[3];
                }
                if (j == 4) {
                    c4[i4++] = temp[0];
                    c4[i4++] = temp[1];
                    c4[i4++] = temp[2];
                    c4[i4++] = temp[3];
                    if (index != arr.length)
                        temp[0] = temp[4];
                    else
                        c4[i4++] = temp[4];
                }
                k = 1; // һ�δ�������³�ʼ��������
                j = 1;
            }
        } else
            k++;
    }
    if (index == 1)
        c1[i1++] = arr[0];
    for (let i = 0; i < i4; i++) {
        replaceArr.push(c4[i]);
    }
    for (let i = 0; i < i3; i++) {
        replaceArr.push(c3[i]);
    }
    for (let i = 0; i < i2; i++) {
        replaceArr.push(c2[i]);
    }
    for (let i = 0; i < i1; i++) {
        replaceArr.push(c1[i]);
    }

    /* for (let i2 in replaceArr) {
        console.log("replaceArr", replaceArr[i2]);
    } */
    return replaceArr;
}
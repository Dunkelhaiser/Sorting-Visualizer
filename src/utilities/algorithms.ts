const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateArray = (size: number, min: number, max: number) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(randomInt(min, max));
    }
    return arr;
};

export const bubbleSort = (arr: number[]) => {
    const array = arr.slice();
    for (let i = array.length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
};

export const selectionSort = (arr: number[]) => {
    const array = arr.slice();
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        if (i !== min) {
            const temp = array[i];
            array[i] = array[min];
            array[min] = temp;
        }
    }
    return array;
};

export const insertionSort = (arr: number[]) => {
    const array = arr.slice();
    for (let i = 1; i < array.length; i++) {
        const current = array[i];
        for (let j = i - 1; j >= 0; j--) {
            if (array[j] > current) {
                array[j + 1] = array[j];
                array[j] = current;
            }
        }
    }
    return array;
};

const merge = (arr1: number[], arr2: number[]) => {
    const res: number[] = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr2[j] > arr1[i]) {
            res.push(arr1[i]);
            i++;
        } else {
            res.push(arr2[j]);
            j++;
        }
    }
    for (; i < arr1.length; i++) {
        res.push(arr1[i]);
    }
    for (; j < arr2.length; j++) {
        res.push(arr2[j]);
    }
    return res;
};

export const mergeSort = (arr: number[]) => {
    const array = arr.slice();
    if (array.length <= 1) return array;
    const middle = Math.floor(array.length / 2);
    const left: number[] = mergeSort(array.slice(0, middle));
    const right: number[] = mergeSort(array.slice(middle));
    return merge(left, right);
};

export const quickSort = (arr: number[]): number[] => {
    const array = arr.slice();
    if (array.length <= 1) {
        return array;
    }
    const pivot = array[0];
    const left: number[] = [];
    const right: number[] = [];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
};

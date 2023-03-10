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

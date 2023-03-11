/* eslint-disable no-await-in-loop */

import VisualizerStyles from "../components/Visualizer/Visualizer.module.scss";

const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateArray = (size: number, min: number, max: number) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(randomInt(min, max));
        const bar = document.getElementById(`${i}`);
        bar?.classList.remove(VisualizerStyles.sorted);
    }
    return arr;
};

export const ownArray = (str: string) => {
    const array = [];
    const substrings = str.split(/\D+/);
    for (let i = 0; i < substrings.length; i++) {
        const num = Number(substrings[i]);
        const bar = document.getElementById(`${i}`);
        bar?.classList.remove(VisualizerStyles.sorted);
        array.push(num);
    }
    return array;
};

const timeout = 1;

export const timer = async (func: () => Promise<void>) => {
    const start = performance.now();
    await func();
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
};

const sleep = () => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const sortedAnimation = async (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
        const bar = document.getElementById(`${i}`);
        bar?.classList.add(VisualizerStyles.sorted);
        await sleep();
    }
};

const sortingAnimation = async (comparing: string | number, sorting: string | number) => {
    const bar1 = document.getElementById(`${comparing}`);
    const bar2 = document.getElementById(`${sorting}`);
    if (bar1 && bar2) {
        bar1.classList.add(VisualizerStyles.comparing);
        bar2.classList.add(VisualizerStyles.sorting);

        await sleep();

        bar1.classList.remove(VisualizerStyles.comparing);
        bar2.classList.remove(VisualizerStyles.sorting);
    }
};

export const bubbleSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    for (let i = array.length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                setState([...array]);

                await sortingAnimation(j, j + 1);
            }
        }
    }
    sortedAnimation(array);
};

export const selectionSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;

                setState([...array]);

                await sortingAnimation(min, j);
            }
        }
        if (i !== min) {
            const temp = array[i];
            array[i] = array[min];
            array[min] = temp;

            setState([...array]);

            await sortingAnimation(min, i);
        }
    }
    sortedAnimation(array);
};

export const insertionSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    for (let i = 1; i < array.length; i++) {
        const current = array[i];
        for (let j = i - 1; j >= 0; j--) {
            if (array[j] > current) {
                array[j + 1] = array[j];
                array[j] = current;

                setState([...array]);

                await sortingAnimation(j, j + 1);
            }
        }
    }
    sortedAnimation(array);
};

const merge = async (arr: number[], first: number, middle: number, last: number, setState: (arr: number[]) => void) => {
    const res: number[] = [];
    let i = first;
    let j = middle + 1;

    for (let k = 0; k < last - first + 1; k++) {
        if (i <= middle && j <= last) {
            if (arr[i] < arr[j]) {
                res[k] = arr[i];
                i++;
            } else {
                res[k] = arr[j];
                j++;
            }
        } else if (i <= middle) {
            res[k] = arr[i];
            i++;
        } else {
            res[k] = arr[j];
            j++;
        }

        await sortingAnimation(i, j);
    }

    for (let l = first; l <= last; l++) {
        // eslint-disable-next-line no-param-reassign
        arr[l] = res[l - first];
    }
    setState([...arr]);
};

const sort = async (arr: number[], first: number, last: number, setState: (arr: number[]) => void) => {
    if (first < last) {
        const middle = Math.floor((first + last) / 2);
        await sort(arr, first, middle, setState);
        await sort(arr, middle + 1, last, setState);
        await merge(arr, first, middle, last, setState);
    }
};

export const mergeSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    let isSorted = true;
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            isSorted = false;
            break;
        }
    }
    if (isSorted) {
        sortedAnimation(array);
        return;
    }
    await sort(array, 0, array.length - 1, setState);
    sortedAnimation(array);
};

const partition = async (arr: number[], first: number, last: number, setState: (arr: number[]) => void) => {
    const array = arr;
    const pivot = array[last];
    let i = first - 1;
    for (let j = first; j < last; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            await sortingAnimation(i, j);
            setState([...array]);
        }
    }

    [array[i + 1], array[last]] = [array[last], array[i + 1]];

    await sortingAnimation(i, last);

    return i + 1;
};

const sortQuick = async (arr: number[], first: number, last: number, setState: (arr: number[]) => void) => {
    if (first < last) {
        const partitionIndex = partition(arr, first, last, setState);
        setState([...arr]);
        await sortQuick(arr, first, (await partitionIndex) - 1, setState);
        await sortQuick(arr, (await partitionIndex) + 1, last, setState);
    }
};

export const quickSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    let isSorted = true;
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            isSorted = false;
            break;
        }
    }
    if (isSorted) {
        sortedAnimation(array);
        return;
    }
    await sortQuick(array, 0, array.length - 1, setState);
    sortedAnimation(array);
};

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */

import VisualizerStyles from "../components/Visualizer/Visualizer.module.scss";

const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateArray = (size: number, min: number, max: number) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(randomInt(min, max));
        const bar = document.getElementById(`${i}`)!;
        bar?.classList.remove(VisualizerStyles.sorted);
    }
    return arr;
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

const timeout = 1;

const sleep = () => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const sortedAnimation = async (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
        const bar = document.getElementById(`${i}`)!;
        bar.classList.add(VisualizerStyles.sorted);
        await sleep();
    }
};

const sortingAnimation = async (comparing: string | number, sorting: string | number) => {
    const bar1 = document.getElementById(`${comparing}`)!;
    const bar2 = document.getElementById(`${sorting}`)!;
    bar1.classList.add(VisualizerStyles.comparing);
    bar2.classList.add(VisualizerStyles.sorting);

    await sleep();

    bar1.classList.remove(VisualizerStyles.comparing);
    bar2.classList.remove(VisualizerStyles.sorting);
};

export const bubbleSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    const start = performance.now();
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
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
};

export const selectionSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    const start = performance.now();
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
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
};

export const insertionSort = async (arr: number[], setState: (arr: number[]) => void) => {
    const array = arr.slice();
    const start = performance.now();
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
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
};

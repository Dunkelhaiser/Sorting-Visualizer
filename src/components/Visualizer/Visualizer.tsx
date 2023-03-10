import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Button from "../Button/Button";
import { generateArray, bubbleSort, insertionSort, selectionSort } from "../../utilities/algorithms";
import VisualizerStyles from "./Visualizer.module.scss";

const Visualizer: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        setData(generateArray(100, 5, 1000));
    }, []);

    const bubbleSortHandler = (arr: number[]) => {
        const start = performance.now();

        const sortedArr = bubbleSort(arr);
        console.log(sortedArr);
        setData([...sortedArr]);

        const end = performance.now();
        console.log(`Execution time: ${end - start} ms`);
    };
    const selectionSortHandler = (arr: number[]) => {
        const start = performance.now();

        const sortedArr = selectionSort(arr);
        console.log(sortedArr);
        setData([...sortedArr]);

        const end = performance.now();
        console.log(`Execution time: ${end - start} ms`);
    };
    const insertionSortHandler = (arr: number[]) => {
        const start = performance.now();

        const sortedArr = insertionSort(arr);
        console.log(sortedArr);
        setData([...sortedArr]);

        const end = performance.now();
        console.log(`Execution time: ${end - start} ms`);
    };
    return (
        <main className={VisualizerStyles.main}>
            <section className={VisualizerStyles.visualizer}>
                {data.map((value) => (
                    <div key={uuid()} className={VisualizerStyles.element} style={{ height: `${value / 2}px` }} />
                ))}
            </section>
            <div className={VisualizerStyles.buttons}>
                <Button title="Generate New Array" onClick={() => setData(generateArray(10000, 5, 1000))} />
                <Button title="Bubble Sort" onClick={() => bubbleSortHandler(data)} />
                <Button title="Selection Sort" onClick={() => selectionSortHandler(data)} />
                <Button title="Insertion Sort" onClick={() => insertionSortHandler(data)} />
            </div>
        </main>
    );
};
export default Visualizer;

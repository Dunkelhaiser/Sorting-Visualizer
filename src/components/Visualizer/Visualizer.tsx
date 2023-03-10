import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { generateArray, bubbleSort, insertionSort, selectionSort, mergeSort, quickSort } from "../../utilities/algorithms";
import VisualizerStyles from "./Visualizer.module.scss";

const Visualizer: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        setData(generateArray(100, 5, 1000));
    }, []);

    const mergeSortHandler = (arr: number[]) => {
        const start = performance.now();

        const sortedArr = mergeSort(arr);
        console.log(sortedArr);
        setData([...sortedArr]);

        const end = performance.now();
        console.log(`Execution time: ${end - start} ms`);
    };
    const quickSortHandler = (arr: number[]) => {
        const start = performance.now();

        const sortedArr = quickSort(arr);
        console.log(sortedArr);
        setData([...sortedArr]);

        const end = performance.now();
        console.log(`Execution time: ${end - start} ms`);
    };
    return (
        <main className={VisualizerStyles.main}>
            <section className={VisualizerStyles.visualizer}>
                {data.map((value, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i} id={String(i)} className={VisualizerStyles.element} style={{ height: `${value / 2}px` }} />
                ))}
            </section>
            <div className={VisualizerStyles.buttons}>
                <Button title="Generate New Array" onClick={() => setData(generateArray(100, 5, 1000))} />
                <Button title="Bubble Sort" onClick={() => bubbleSort(data, setData)} />
                <Button title="Selection Sort" onClick={() => selectionSort(data, setData)} />
                <Button title="Insertion Sort" onClick={() => insertionSort(data, setData)} />
                <Button title="Merge Sort" onClick={() => mergeSortHandler(data)} />
                <Button title="Quick Sort" onClick={() => quickSortHandler(data)} />
            </div>
        </main>
    );
};
export default Visualizer;

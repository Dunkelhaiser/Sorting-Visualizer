import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { generateArray, bubbleSort, insertionSort, selectionSort, mergeSort, quickSort, ownArray } from "../../utilities/algorithms";
import VisualizerStyles from "./Visualizer.module.scss";
import Input from "../Input/Input";

const Visualizer: React.FC = () => {
    const [data, setData] = useState<number[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        setData(generateArray(100, 5, 1000));
    }, []);

    return (
        <main className={VisualizerStyles.main}>
            <section className={VisualizerStyles.visualizer}>
                {data.map((value, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i} id={String(i)} className={VisualizerStyles.element} style={{ height: `${value / 2}px` }} />
                ))}
            </section>
            {/* {data.map((value, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} id={String(i)}>
                    {value}
                </div>
            ))} */}
            <div className={VisualizerStyles.buttons}>
                <Input
                    placeholder="Enter your array..."
                    value={input}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
                />
                <Button title="Own Array" onClick={() => setData(ownArray(input))} />
                <Button title="Randomize Array" onClick={() => setData(generateArray(100, 5, 1000))} />
                <Button title="Bubble Sort" onClick={() => bubbleSort(data, setData)} />
                <Button title="Selection Sort" onClick={() => selectionSort(data, setData)} />
                <Button title="Insertion Sort" onClick={() => insertionSort(data, setData)} />
                <Button title="Merge Sort" onClick={() => mergeSort(data, setData)} />
                <Button title="Quick Sort" onClick={() => quickSort(data, setData)} />
            </div>
        </main>
    );
};
export default Visualizer;

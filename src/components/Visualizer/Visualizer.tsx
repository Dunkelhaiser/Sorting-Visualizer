import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { generateArray, bubbleSort, insertionSort, selectionSort, mergeSort, quickSort, ownArray } from "../../utilities/algorithms";
import VisualizerStyles from "./Visualizer.module.scss";
import Input from "../Input/Input";
import Select from "../Select/Select";

const Visualizer: React.FC = () => {
    const [data, setData] = useState<number[]>([]);
    const [input, setInput] = useState("");
    const [arraySize, setArraySize] = useState(100);
    const [method, setMethod] = useState("bubbleSort");

    useEffect(() => {
        setData(generateArray(100, 5, 1000));
    }, []);

    const selectAlgorithm = (algo: string) => {
        switch (algo) {
            case "bubbleSort":
                bubbleSort(data, setData);
                break;
            case "selectionSort":
                selectionSort(data, setData);
                break;
            case "insertionSort":
                insertionSort(data, setData);
                break;
            case "mergeSort":
                mergeSort(data, setData);
                break;
            case "quickSort":
                quickSort(data, setData);
                break;

            default:
                break;
        }
    };

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
                <div className={VisualizerStyles.buttons_pair}>
                    <Input
                        placeholder="Enter your array..."
                        value={input}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
                    />
                    <Button title="Own Array" onClick={() => setData(ownArray(input))} />
                </div>
                <div className={VisualizerStyles.buttons_pair}>
                    <Input
                        placeholder="Array size"
                        type="number"
                        value={String(arraySize)}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setArraySize(Number(e.currentTarget.value))}
                    />
                    <Button title="Randomize Array" onClick={() => setData(generateArray(arraySize, 5, 1000))} />
                </div>
                <div className={VisualizerStyles.buttons_pair}>
                    <Select
                        name="Sorting Method"
                        onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => setMethod(e.currentTarget.value)}
                        options={[
                            {
                                value: "bubbleSort",
                                name: "Bubble Sort",
                            },
                            {
                                value: "selectionSort",
                                name: "Selection Sort",
                            },
                            {
                                value: "insertionSort",
                                name: "Insertion Sort",
                            },
                            {
                                value: "mergeSort",
                                name: "Merge Sort",
                            },
                            {
                                value: "quickSort",
                                name: "Quick Sort",
                            },
                        ]}
                    />
                    <Button title="Sort" onClick={() => selectAlgorithm(method)} />
                </div>
            </div>
        </main>
    );
};
export default Visualizer;

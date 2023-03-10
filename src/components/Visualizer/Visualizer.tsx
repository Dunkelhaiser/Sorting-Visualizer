import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Button from "../Button/Button";
import VisualizerStyles from "./Visualizer.module.scss";

const Visualizer: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const generateArray = () => {
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(randomInt(5, 1000));
        }
        return arr;
    };

    useEffect(() => {
        setData(generateArray());
    }, []);
    return (
        <main className={VisualizerStyles.main}>
            <section className={VisualizerStyles.visualizer}>
                {data.map((value) => (
                    <div key={uuid()} className={VisualizerStyles.element} style={{ height: `${value / 2}px` }} />
                ))}
            </section>
            <Button title="Generate New Array" onClick={() => setData(generateArray)} />
        </main>
    );
};
export default Visualizer;

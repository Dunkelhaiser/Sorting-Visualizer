import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import VisualizerStyles from "./Visualizer.module.scss";

const Visualizer: React.FC = () => {
    const [data, setData] = useState<number[]>([]);

    const randomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    useEffect(() => {
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(randomInt(5, 1000));
        }
        setData(arr);
    }, []);
    return (
        <section className={VisualizerStyles.visualizer}>
            {data.map((value) => (
                <div key={uuid()} className={VisualizerStyles.element} style={{ height: `${value / 2}px` }} />
            ))}
        </section>
    );
};
export default Visualizer;

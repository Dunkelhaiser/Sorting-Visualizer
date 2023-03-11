import SelectStyles from "./Select.module.scss";

interface Props {
    name: string;
    options: { value: string; name: string }[];
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = ({ name, options, onSelect }) => {
    return (
        <div>
            <select name={name} className={SelectStyles.select} onChange={onSelect}>
                {options.map((option, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <option key={i} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;

import InputStyles from "./Input.module.scss";

interface Props {
    placeholder: string;
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ placeholder, onChange, value }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            aria-label={placeholder}
            value={value}
            className={InputStyles.input}
            onChange={onChange}
        />
    );
};
export default Input;

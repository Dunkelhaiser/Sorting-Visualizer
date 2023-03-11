import InputStyles from "./Input.module.scss";

interface Props {
    placeholder: string;
    value: string;
    type?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ placeholder, type = "text", onChange, value }) => {
    return (
        <input
            min={5}
            type={type}
            placeholder={placeholder}
            aria-label={placeholder}
            value={value}
            className={InputStyles.input}
            onChange={onChange}
        />
    );
};
export default Input;


interface ButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    const { label, onClick, className } = props;
    return (
        <button className={`button ${className ? className : ""}`} onClick={onClick}>
            {label}
        </button>
    );
}
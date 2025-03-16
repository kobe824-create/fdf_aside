
interface ButtonProps {
    label: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export default function Button(props: ButtonProps) {
    const { label, onClick, className, disabled } = props;
    return (
        <button 
            className={`button ${className && disabled ? className + " " + "disabled" : className ? className : ""}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}
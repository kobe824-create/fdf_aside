
interface ButtonProps {
    label: string;
    onClick: () => void;
}

export default function Button(props: ButtonProps) {
    const { label, onClick } = props;
    return (
        <button className="button" onClick={onClick}>
            {label}
        </button>
    );
}
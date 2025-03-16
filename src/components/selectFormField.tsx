interface Option {
    value: string | number;
    label: string | number;
}

interface SelectFormFieldProps {
    label: string;
    options: Option[];
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string | number;
}

export default function SelectFormField(props: SelectFormFieldProps) {
    const { label, options, onChange, value } = props;
    return (
        <div className="select-form-field">
            <label>{label}</label>
            <select
                onChange={onChange}
                value={value}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
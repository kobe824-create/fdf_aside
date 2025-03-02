interface Option {
    value: string;
    label: string;
}

interface SelectFormFieldProps {
    label: string;
    options: Option[];
}

export default function SelectFormField(props: SelectFormFieldProps) {
    const { label, options } = props;
    return (
        <div className="select-form-field">
            <label>{label}</label>
            <select>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
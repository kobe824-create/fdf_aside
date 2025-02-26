interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField(props: FormFieldProps) {
    const { label, type, placeholder, value, onChange } = props;
    return (
        <div className="form-field">
            <label>{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}
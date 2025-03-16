interface FormFieldProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaField(props: FormFieldProps) {
    const { label, placeholder, value, onChange } = props;
   
    return (
        <div className="form-field">
            <label>{label}</label>
            <textarea  
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}  
            >
            </textarea>
        </div>
    );
}
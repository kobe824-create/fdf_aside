import { useState } from "react";

interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string | number;
    maxLength?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField(props: FormFieldProps) {
    const { label, type, placeholder, value, onChange, maxLength } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

        // Allow only numbers if type is "number"
        if (type === "number") {
            inputValue = inputValue.replace(/\D/g, ""); // Remove non-numeric characters
        }

        // Enforce maxLength manually
        if (maxLength && inputValue.length > maxLength) {
            inputValue = inputValue.slice(0, maxLength);
        }

        // Call parent onChange handler
        onChange({
            ...event,
            target: { ...event.target, value: inputValue },
        });
    };
    return (
        <div className="form-field">
            <label>{label}</label>

            {
                type === "password" ?
                    (<div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={placeholder}
                            value={value}
                            onChange={handleChange}
                            maxLength={maxLength}
                        />
                        <i className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                        </i>
                    </div>)
                    :
                    (<input
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        maxLength={maxLength}
                    />
                    )}
        </div>
    );
}
import { useRef } from "react";

interface OtpFieldProps {
  label: string;
  onChange: (otp: string) => void;
  value: string;
  length?: number;
}

export default function OtpField({ label, onChange, value, length = 6 }: OtpFieldProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/, ""); // Allow only numbers
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Build updated OTP value
    const otpArray = value.split("");
    otpArray[index] = newValue;
    const newOtp = otpArray.join("");
    onChange(newOtp);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-field">
      <label>{label}</label>
      <div className="otp-code-inputs">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputRefs.current[index] = el!;
            }}
          />
        ))}
      </div>
    </div>
  );
}

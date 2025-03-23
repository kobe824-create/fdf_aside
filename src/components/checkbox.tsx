import React from 'react';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: CheckboxProps) {
    const { label, checked, onChange } = props;
    return (
        <div className="checkbox">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <label>{label}</label>
        </div>
    );
}
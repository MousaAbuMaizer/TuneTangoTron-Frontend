import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, placeholder, onChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-400 mb-2">{label}</label>
            <input
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-transparent rounded-md bg-primary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
        </div>
    );
};

export default InputField;

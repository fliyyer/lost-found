import React from 'react';

const InputField = ({
    label,
    id,
    name,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    children,
}) => {
    return (
        <div className="relative">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="block w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {children && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;

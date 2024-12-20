import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const OptionDropdown = ({ label, icon, options, selectedOption, onSelectOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        onSelectOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
                <div className="flex items-center space-x-2">
                    {icon}
                    <span>{selectedOption || label}</span>
                </div>
                <FaChevronDown />
            </button>
            {isOpen && (
                <ul className="absolute z-[9999] mt-2 w-full bg-white text-sm border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OptionDropdown;

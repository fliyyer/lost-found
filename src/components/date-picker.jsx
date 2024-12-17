import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const DatePicker = ({ label, selectedDate, onDateChange }) => {
    const getCurrentDate = () => new Date().toISOString().split('T')[0];

    return (
        <div className="relative">
            <label className="sr-only">{label}</label>
            <div className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus-within:ring-2 focus-within:ring-blue-500">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <input
                    type="date"
                    value={selectedDate || getCurrentDate()}
                    onChange={(e) => onDateChange(e.target.value)}
                    className="w-full border-none focus:outline-none text-[#222222] font-semibold"
                />
            </div>
        </div>
    );
};

export default DatePicker;

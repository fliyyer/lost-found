import React from 'react';
import { FaHome, FaListAlt, FaUpload, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  const navItems = [
    { icon: <FaHome className="text-xl" />, label: "Home", to: "/" },
    { icon: <FaListAlt className="text-xl" />, label: "History", to: "/history" },
    { icon: <FaUpload className="text-xl" />, label: "Upload Items", to: "/upload" },
    { icon: <FaUser className="text-xl" />, label: "Profile", to: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex flex-col items-center text-gray-600 hover:text-[#004BFE] cursor-pointer ${location.pathname === item.to ? 'text-blue-500' : ''
              }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;

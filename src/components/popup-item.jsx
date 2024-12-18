import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopupItem = ({ item, onClose }) => {
  const history = useNavigate();

  if (!item) return null;

  const handleClaim = () => {
    history('/history');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{item.name}</h2>
        <img
          src={`http://localhost:5000/uploads/${item.photo}`}
          alt={item.name}
          className="w-full h-[200px] object-contain mb-4 rounded-lg"
        />
        <div className="mb-4">
          <p className="text-sm"><strong>Stasiun:</strong> {item.lastLocation}</p>
          <p className="text-sm"><strong>Waktu Ditemukan:</strong> {item.date}</p>
          <p className="text-sm"><strong>Deskripsi:</strong> {item.description}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleClaim}
            className="w-full bg-[#004BFE] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Klaim Barang
          </button>
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-gray-400 transition duration-200">Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupItem;

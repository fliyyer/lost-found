import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const PopupRequest = ({ item, onClose, onClaim }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      const decoded = jwtDecode(token);
      setName(decoded.name);
      setEmail(decoded.email);
      setPhone(decoded.phone);
    }
  }, []);

  const handleClaim = () => {
    if (name && email) {
      onClaim();
    } else {
      alert("Please fill in both fields.");
    }
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Request Claim Items</h2>
        <p className="mb-2"><strong>Nama Barang:</strong> {item.name}</p>
        <p className="mb-2"><strong>Stasiun:</strong> {item.lastLocation}</p>
        <div className="mb-4">
          {item.photo ? (
            <img
              src={`http://localhost:5000/uploads/${item.photo}`}
              alt="Item"
              className="w-full h-[225px] object-contain rounded-md "
            />
          ) : (
            <p className="border rounded-md w-full p-2 bg-gray-100 text-center">No photo available</p>
          )}
        </div>
        <div className='flex flex-col space-y-2'>
          <p className="text-lg font-bold mb-1 text-center">Penerima:</p>
          <p className="block mb-1"><strong>Nama:</strong> {name}</p>
          <p className="block mb-1"><strong>Phone:</strong> {phone}</p>
          <p className="block mb-1"><strong>Email:</strong> {email}</p>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <button
            onClick={handleClaim}
            className="bg-[#004BFE] w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Klaim
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 w-full text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupRequest;

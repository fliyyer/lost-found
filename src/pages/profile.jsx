import React, { useState, useEffect } from 'react';
import { Container } from '../components/container';
import NavigationBar from '../components/navigation-bar';
import Bubble from '../assets/Bubbles.png';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '********',
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData((prevState) => ({
          ...prevState,
          name: decoded.name,
          email: decoded.email,
          phone: decoded.phone || '',
        }));
        setIsAdmin(decoded.role === 'admin');
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleAccept = () => {
    navigate('/accept');
  };

  const logout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <Container>
      <main className="w-full relative p-4 mx-auto">
        <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
        <h1 className="text-2xl font-bold text-white text-center mb-6">Profile</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              disabled
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              disabled
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              disabled
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              disabled
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </form>
        {isAdmin && (
          <div className="flex mt-5 justify-center">
            <button
              onClick={handleAccept}
              className='w-full rounded-sm p-3 bg-green-500 text-white hover:bg-green-700'
            >
              Accept Item
            </button>
          </div>
        )}
        <div className="flex mt-5 justify-center">
          <button onClick={logout} className='w-full rounded-sm p-3 bg-red-500 text-white hover:bg-red-700'>Logout</button>
        </div>
      </main>
      <NavigationBar />
    </Container>
  );
};

export default Profile;

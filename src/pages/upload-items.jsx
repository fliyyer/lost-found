import React, { useState } from 'react';
import { Container } from '../components/container';
import NavigationBar from '../components/navigation-bar';
import Bubble from '../assets/Bubbles.png';
import InputField from '../components/input-filed';

const UploadItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    lastLocation: '',
    date: '',
    description: '',
    photo: null,
  });

  const categories = ['Electronics', 'Clothing', 'Accessories', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      lastLocation: '',
      date: '',
      description: '',
      photo: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    handleReset();
  };

  return (
    <Container>
      <main className="p-6 relative pb-24">
        <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
        <h1 className="text-2xl font-bold mb-6">Lost Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputField
              label="Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <InputField
            label="Last Location"
            id="lastLocation"
            name="lastLocation"
            type="text"
            value={formData.lastLocation}
            onChange={handleChange}
            placeholder="Enter last location"
            required
          />
          <InputField
            label="Date"
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Item Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Description of the item"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="photo">
              Upload Photo (if available)
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[45%] py-2 px-4 bg-[#004BFE] text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 w-[45%] py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </form>
      </main>
      <NavigationBar />
    </Container>
  );
};

export default UploadItems;
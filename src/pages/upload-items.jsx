import React, { useState } from 'react';
import { Container } from '../components/container';
import NavigationBar from '../components/navigation-bar';
import Bubble from '../assets/Bubbles.png';
import InputField from '../components/input-filed';
import { ToastContainer, toast } from 'react-toastify';
import { uploadItem } from '../../service/api';

const UploadItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    lastLocation: '',
    date: '',
    description: '',
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const categories = ["Aksesories", "Elektronik", "Pakaian", "Makanan", "Lainnya"];
  const stations = ["Tugu", "Lempuyangan", "Klaten", "Solo Balapan", "Purwosari", "Solo Jebres"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.lastLocation || !formData.date || !formData.description) {
      toast.error('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    try {
      const result = await uploadItem(formData);
      toast.success(result.message || 'Item uploaded successfully!');
      handleReset();
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to upload item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <main className="p-4 h-full min-h-screen w-full mx-auto relative pb-24">
        <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
        <h1 className="text-2xl text-center font-bold mb-6">Upload Items</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700" htmlFor="category">
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
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700" htmlFor="lastLocation">
              Last Location
            </label>
            <select
              id="lastLocation"
              name="lastLocation"
              value={formData.lastLocation}
              onChange={handleChange}
              className="block w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select Last Location</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>
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
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[45%] py-2 px-4 bg-[#004BFE] text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Submit'}
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

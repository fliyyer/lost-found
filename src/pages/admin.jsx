import React, { useEffect, useState } from 'react';
import { Container } from '../components/container';
import Bubble from '../assets/Bubbles.png';
import NavigationBar from '../components/navigation-bar';
import { getAllItems, acceptItem } from '../../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/useAuth';

const Admin = () => {
  useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        // Filter items with status 'Checking'
        const checkingItems = data.filter(item => item.status === 'Checking');
        setItems(checkingItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAdmin = async (itemId) => {
    try {
      const response = await acceptItem(itemId);
      setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
      toast.success("Item Admined successfully!");
    } catch (error) {
      console.error("Error Admining item:", error);
      toast.error("Failed to Admin item.");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <main className="p-4 h-full min-h-screen mx-auto relative pb-24">
        <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
        <h1 className="text-xl font-bold mb-4 text-center">Admin Lost Items</h1>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-xs rounded-md text-left font-light">
                <thead className="border-b bg-gray-200 font-medium">
                  <tr>
                    <th scope="col" className="py-2 px-2">Barang</th>
                    <th scope="col" className="py-2 px-2">Stasiun</th>
                    <th scope="col" className="py-2 px-2">Status</th>
                    <th scope="col" className="py-2 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-neutral-100'}`}>
                      <td className="px-2 py-2">{item.name}</td>
                      <td className="px-2 py-2">{item.lastLocation}</td>
                      <td className="px-2 py-2">
                        <span className="px-2 py-1 rounded-full bg-red-300 text-gray-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                          onClick={() => handleAdmin(item.id)}
                        >
                          Acc
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <NavigationBar />
    </Container>
  );
};

export default Admin;

import React, { useEffect, useState } from 'react';
import { Container } from '../components/container';
import Bubble from '../assets/Bubbles.png';
import NavigationBar from '../components/navigation-bar';
import { getAllItems, acceptItem, getUserById } from '../../service/api'; // Pastikan getUserById diimpor
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/useAuth';

const Admin = () => {
  useAuth();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State untuk modal konfirmasi
  const [requesterName, setRequesterName] = useState(''); // State untuk menyimpan nama pemohon

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
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

  const handleItemClick = async (item) => {
    setSelectedItem(item); // Set item yang dipilih
    setIsModalOpen(true); // Buka modal

    // Ambil nama pengguna berdasarkan claimedBy
    if (item.claimedBy) {
      try {
        const userResponse = await getUserById(item.claimedBy); // Ambil data pengguna
        setRequesterName(userResponse.name); // Simpan nama pengguna
      } catch (error) {
        console.error("Error fetching user:", error);
        setRequesterName('Unknown'); // Jika gagal, set sebagai Unknown
      }
    } else {
      setRequesterName('Unknown'); // Jika claimedBy tidak ada
    }
  };

  const openConfirmModal = (item) => {
    setSelectedItem(item); // Set item yang akan di-acc
    setIsConfirmModalOpen(true); // Buka modal konfirmasi
  };

  const closeModal = () => {
    setIsModalOpen(false); // Tutup modal
    setSelectedItem(null); // Reset item yang dipilih
    setRequesterName(''); // Reset nama pemohon
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false); // Tutup modal konfirmasi
    setSelectedItem(null); // Reset item yang dipilih
  };

  const confirmAdmin = () => {
    if (selectedItem) {
      handleAdmin(selectedItem.id); // Panggil fungsi handleAdmin
    }
    closeConfirmModal(); // Tutup modal konfirmasi
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
              <table className="min-w-full rounded-lg text-left text-sm font-light shadow-md overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th scope="col" className="py-2 px-2">Barang</th>
                    <th scope="col" className="py-2 px-2">Stasiun</th>
                    <th scope="col" className="py-2 px-2">Status</th>
                    <th scope="col" className="py-2 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b text-xs ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer`}
                      onClick={() => handleItemClick(item)}
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.lastLocation}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full ${item.status === 'Checking' ? 'bg-yellow-300' : 'bg-red-300'} text-gray-800`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmModal(item);
                          }}
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

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
              <h2 className="text-lg font-bold mb-4">Request Details</h2>
              {selectedItem && (
                <div>
                  <p><strong>Barang:</strong> {selectedItem.name}</p>
                  <p><strong>Stasiun:</strong> {selectedItem.lastLocation}</p>
                  <p><strong>Status:</strong> {selectedItem.status}</p>
                  <p><strong>Requested By:</strong> {requesterName || 'Unknown'}</p>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isConfirmModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
              <h2 className="text-lg font-bold mb-4">Konfirmasi</h2>
              <p> Anda yakin ingin menyetujui permintaan <strong>{selectedItem?.name}</strong>?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 mr-2"
                  onClick={closeConfirmModal}
                >
                  Tidak
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                  onClick={confirmAdmin}
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <NavigationBar />
    </Container>
  );
};

export default Admin;

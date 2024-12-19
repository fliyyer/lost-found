import React, { useEffect, useState } from 'react';
import { Container } from '../components/container';
import Bubble from '../assets/Bubbles.png';
import NavigationBar from '../components/navigation-bar';
import { getAllItems, claimItem } from '../../service/api';
import PopupRequest from '../components/popup-request';
import { toast, ToastContainer } from 'react-toastify';

const History = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        const sortedItems = data.sort((a, b) => b.id - a.id);
        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };

  const handleClaim = async () => {
    if (!selectedItem) return;
    try {
      await claimItem(selectedItem.id);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id ? { ...item, status: 'Checking' } : item
        )
      );
      setPopupVisible(false);
      toast.success("Item claimed successfully!");
    } catch (error) {
      console.error("Error claiming item:", error);
      toast.error("Failed to claim item.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <ToastContainer />
      <main className="p-4 h-full min-h-screen mx-auto relative pb-24">
        <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
        <h1 className="text-xl text-white font-bold mb-4 text-center">History</h1>
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
                  {currentItems.map((item, index) => (
                    <tr key={index} className={`border-b text-xs ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer`} onClick={() => handleItemClick(item)}>
                      <td className="px-2 py-3">{item.name}</td>
                      <td className="px-2 py-3">{item.lastLocation}</td>
                      <td className="px-2 py-3">
                        <span
                          className={`px-2 py-1 rounded-full ${item.status === 'Checking'
                            ? 'bg-red-300 text-gray-800'
                            : item.status === 'Accepted'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-yellow-200 text-yellow-800'
                            }`}
                        >
                          {item.status === 'Accepted' ? 'Claimed' : item.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        {item.status === 'Available' ? (
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            onClick={() => handleItemClick(item)}
                          >
                            Claim
                          </button>
                        ) : item.status === 'Checking' ? (
                          <span className="text-red-500">Checking</span>
                        ) : (
                          <button
                            disabled
                            className="px-1 py-2 bg-gray-500 text-white rounded-md"
                          >
                            Accepted
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'} hover:bg-blue-500`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
      <NavigationBar />
      {popupVisible && (
        <PopupRequest
          item={selectedItem}
          onClose={() => setPopupVisible(false)}
          onClaim={handleClaim}
        />
      )}
    </Container>
  );
};

export default History;

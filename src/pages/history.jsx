import React from 'react';
import { Container } from '../components/container';
import Bubble from '../assets/Bubbles.png';
import NavigationBar from '../components/navigation-bar';

const History = () => {
  const items = [
    { name: 'Laptop Asus', station: 'Manggarai', status: 'Checking' },
    { name: 'Powerbank', station: 'Tanah Abang', status: 'Accepted' },
    { name: 'Headphone Sony', station: 'Duri', status: 'Checking' },
    { name: 'Flashdisk Samsung', station: 'Sudirman', status: 'Accepted' },
  ];

  return (
    <Container>
      <main className="p-4 max-w-[375px] h-full min-h-screen mx-auto relative pb-24">
        <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
        <h1 className="text-xl font-bold mb-4 text-center">History of Lost Items</h1>
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
                      <td className="px-2 py-2">{item.station}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 rounded-full ${item.status === 'Checking'
                            ? 'bg-red-300 text-gray-800'
                            : 'bg-green-200 text-green-800'
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        {item.status === 'Checking' ? (
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                            Claim
                          </button>
                        ) : (
                          <span className="text-gray-500">Claimed</span>
                        )}
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

export default History;

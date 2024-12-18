import React, { useEffect, useState } from 'react';
import { Container } from '../components/container';
import Bubble from '../assets/Bubbles.png';
import Logo from '../assets/logo.png';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import OptionDropdown from '../components/option-dropdown';
import { BiSolidCategory } from "react-icons/bi";
import DatePicker from '../components/date-picker';
import NavigationBar from '../components/navigation-bar';
import { getAllItems, getItemDetails } from '../../service/api';
import PopupItem from '../components/popup-item';

const Homepage = () => {
    const categories = ["Aksesories", "Elektronik", "Pakaian", "Makanan", "Lainnya"];
    const stations = ["Tugu", "Lempuyangan", "Klaten", "Solo Balapan", "Purwosari", "Solo Jebres"];
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        date: '',
        lastLocation: ''
    });

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    const handleItemClick = async (itemId) => {
        try {
            const itemDetails = await getItemDetails(itemId);
            setSelectedItem(itemDetails);
            setIsPopupOpen(true);
        } catch (error) {
            console.error("Error fetching item details:", error);
        }
    };

    useEffect(() => {
        const getAllItem = async () => {
            try {
                const data = await getAllItems(filters);
                setItems(data);
            } catch (error) {
                console.error("Error get all items:", error);
            }
        }
        getAllItem();
    }, [filters]);

    return (
        <Container>
            <main className="relative flex flex-col h-full p-6 overflow-y-hidden w-full">
                <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
                <div className="flex flex-col space-y-4">
                    <img src={Logo} alt="Logo" className="w-[200px]" />
                    <div className="relative w-full">
                        <FaSearch className="absolute top-4 text-sm left-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Laptop"
                            value={filters.name}
                            onChange={(e) => handleFilterChange('name', e.target.value)}
                            className="w-full py-3 px-10 bg-white text-sm font-medium text-gray-700 placeholder-gray-400 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <OptionDropdown
                            label="Kategori"
                            icon={<BiSolidCategory className="text-gray-500" />}
                            options={categories}
                            selectedOption={filters.category}
                            onSelectOption={(value) => handleFilterChange('category', value)}
                        />
                        <DatePicker
                            label="Date"
                            selectedDate={filters.date}
                            onDateChange={(date) => handleFilterChange('date', date)}
                        />
                        <OptionDropdown
                            label="Stasiun"
                            icon={<FaMapMarkerAlt className="text-gray-500" />}
                            options={stations}
                            selectedOption={filters.lastLocation}
                            onSelectOption={(value) => handleFilterChange('lastLocation', value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full rounded-md text-left text-sm font-light">
                                        <thead className="border-b bg-gray-200 font-medium">
                                            <tr className='text-xs'>
                                                <th scope="col" className="py-4 px-2">Barang</th>
                                                <th scope="col" className="py-4 px-2">Stasiun</th>
                                                <th scope="col" className="py-4 px-2 text-nowrap">Waktu ditemukan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b text-xs ${index % 2 === 0 ? 'bg-neutral-50' : 'bg-neutral-100'} hover:bg-gray-200 cursor-pointer`}
                                                    onClick={() => handleItemClick(item.id)}>
                                                    <td className="whitespace-wrap px-2 py-4">{item.name}</td>
                                                    <td className="whitespace-wrap py-4 px-2">{item.lastLocation}</td>
                                                    <td className="whitespace-wrap py-4 px-2">{item.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isPopupOpen && <PopupItem item={selectedItem} onClose={() => setIsPopupOpen(false)} />}
                <NavigationBar />
            </main>
        </Container>
    );
};

export default Homepage;

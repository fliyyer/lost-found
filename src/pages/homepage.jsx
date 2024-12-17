import React from 'react';
import { Container } from '../components/container';
import Bubble from '../assets/Bubbles.png';
import Logo from '../assets/logo.png';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import OptionDropdown from '../components/option-dropdown';
import { BiSolidCategory } from "react-icons/bi";
import DatePicker from '../components/date-picker';
import NavigationBar from '../components/navigation-bar';

const Homepage = () => {
    const categories = ["Aksesories", "Elektronik", "Pakaian", "Makanan", "Lainnya",];
    const stations = ["Tugu", "Lempuyangan", "Klaten", "Solo Balapan", "Purwosari", "Solo Jebres"];

    return (
        <Container>
            <main className="relative flex flex-col h-full p-6 overflow-x-hidden w-full">
                <img src={Bubble} alt="Bubble" className="absolute -z-10 top-0 right-0" />
                <div className="flex flex-col space-y-4">
                    <img src={Logo} alt="Logo" className="w-[200px]" />
                    <div className="relative w-full">
                        <FaSearch className="absolute top-4 text-sm left-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full py-3 px-10 bg-white text-sm font-medium text-gray-700 placeholder-gray-400 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <OptionDropdown
                            label="Kategori"
                            icon={<BiSolidCategory className="text-gray-500" />}
                            options={categories}
                        />
                        <DatePicker label="Date" />
                        <OptionDropdown
                            label={stations[0]}
                            icon={<FaMapMarkerAlt className="text-gray-500" />}
                            options={stations}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full rounded-md text-left text-sm font-light">
                                        <thead
                                            className="border-b bg-gray-200 font-medium ">
                                            <tr className='text-xs'>
                                                <th scope="col" className="py-4 px-2">Barang</th>
                                                <th scope="col" className="py-4 px-2">Stasiun</th>
                                                <th scope="col" className="py-4 px-2 text-nowrap">Waktu ditemukan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                className="border-b text-xs bg-neutral-50">
                                                <td className="whitespace-wrap px-2 py-4">Batrai & charger kamera nikon</td>
                                                <td className="whitespace-wrap py-4 px-2">Manggarai</td>
                                                <td className="whitespace-wrap py-4 px-2">30-11-2024-14:46</td>
                                            </tr>
                                            <tr
                                                className="border-b text-xs bg-neutral-100">
                                                <td className="whitespace-wrap px-2 py-4">Batrai & charger kamera nikon</td>
                                                <td className="whitespace-wrap px-2 py-4">Manggarai</td>
                                                <td className="whitespace-wrap px-2 py-4">30-11-2024-14:46</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NavigationBar />
            </main>
        </Container>
    );
};

export default Homepage;

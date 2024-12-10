import React, { useState } from 'react';
import { Container } from '../components/container';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '../components/input-filed';
import LoginRight from '../assets/login-right.svg';
import LoginLeft from '../assets/login-left.svg';
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container>
            <main className="relative flex flex-col h-full justify-center p-6 rounded-lg w-full">
                <img src={LoginRight} alt="Bubble" className="absolute top-0 right-0" />
                <img src={LoginLeft} alt="Bubble" className="absolute top-0 left-0" />
                <h1 className="text-3xl font-bold text-center z-10 mb-8">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email" />
                    <InputField
                        label="Password"
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password">
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="text-gray-500 mt-6">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </InputField>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#004BFE] text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Login
                        </button>
                    </div>
                    <div className='text-center text-sm'>
                        <p>Don't have an account? <Link to="/register" className="text-[#004BFE]">Register</Link></p>
                    </div>
                    <div className='flex justify-center'>
                        <img src={Logo} alt="Lost & Found" />
                    </div>
                </form>
            </main>
        </Container>
    );
};

export default Login;

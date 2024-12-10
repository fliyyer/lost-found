import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '../components/input-filed';
import RegisterRight from '../assets/login-right.svg';
import RegisterLeft from '../assets/login-left.svg';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { Container } from '../components/container';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(formData);
    };

    return (
        <Container>
            <main className="relative flex flex-col h-full justify-center px-6 rounded-lg w-full">
                <img src={RegisterRight} alt="Bubble" className="absolute top-0 right-0" />
                <img src={RegisterLeft} alt="Bubble" className="absolute top-0 left-0" />
                <h1 className="text-3xl font-bold text-center z-10 mb-4">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-3.5">
                    <InputField
                        label="Name"
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your name" />
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
                        label="Phone"
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your phone number" />
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
                            className="text-gray-500">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </InputField>
                    <InputField
                        label="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder="Confirm your password">
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="text-gray-500">
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </InputField>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-2 px-4 bg-[#004BFE] text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center text-sm">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#004BFE]">
                                Login
                            </Link>
                        </p>
                    </div>
                    <div className="flex justify-center mt-6">
                        <img src={Logo} alt="Lost & Found" className="h-10" />
                    </div>
                </form>
            </main>
        </Container>
    );
};

export default Register;

import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import userImage from '../assets/logo.jpg';
import logo from '../assets/logo-black.webp';

const Navbar = () => {
    const navigate = useNavigate();
    const { userData, setUserData, token, setToken } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');
        if (storedToken) {
            setToken(storedToken);
            setUserData(storedUserData ? JSON.parse(storedUserData) : null);
        }
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="flex items-center">
                            <img className="h-10 w-auto rounded-lg transition-transform duration-300 hover:scale-105" 
                                src={logo} alt="Logo" />
                        </NavLink>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1 transition-all duration-300" 
                                    : "text-white hover:text-yellow-200 transition-all duration-300 hover:border-b-2 hover:border-yellow-200 pb-1"
                            }>
                            Home
                        </NavLink>
                        <NavLink to="/features" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1 transition-all duration-300" 
                                    : "text-white hover:text-yellow-200 transition-all duration-300 hover:border-b-2 hover:border-yellow-200 pb-1"
                            }>
                            Features
                        </NavLink>
                        <NavLink to="/about" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1 transition-all duration-300" 
                                    : "text-white hover:text-yellow-200 transition-all duration-300 hover:border-b-2 hover:border-yellow-200 pb-1"
                            }>
                            About
                        </NavLink>
                    </div>

                    {/* User Profile or Login Button */}
                    <div className="flex items-center">
                        {token ? (
                            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                                <div className="relative">
                                    <img 
                                        className="w-10 h-10 rounded-full border-2 border-yellow-300 transition-all duration-300 group-hover:border-white object-cover shadow-md" 
                                        src={userImage} 
                                        alt="User Avatar" 
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-indigo-600"></div>
                                </div>
                                <span className="font-medium text-white group-hover:text-yellow-300 transition-colors duration-300">
                                    {userData?.name || 'User'}
                                </span>
                            </div>
                        ) : (
                            <button 
                                onClick={() => navigate('/login')} 
                                className="bg-yellow-300 text-indigo-800 px-6 py-2 rounded-full font-medium shadow-lg hover:bg-yellow-400 transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                            >
                                Create Account
                            </button>
                        )}

                        {/* Mobile menu button */}
                        <button 
                            onClick={toggleMenu}
                            className="md:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-700 rounded-b-lg shadow-inner">
                        <NavLink to="/" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "block px-3 py-2 rounded-md text-base font-medium text-yellow-300 bg-indigo-800" 
                                    : "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-800 hover:text-yellow-200"
                            }
                            onClick={toggleMenu}
                        >
                            Home
                        </NavLink>
                        <NavLink to="/features" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "block px-3 py-2 rounded-md text-base font-medium text-yellow-300 bg-indigo-800" 
                                    : "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-800 hover:text-yellow-200"
                            }
                            onClick={toggleMenu}
                        >
                            Features
                        </NavLink>
                        <NavLink to="/about" 
                            className={({ isActive }) => 
                                isActive 
                                    ? "block px-3 py-2 rounded-md text-base font-medium text-yellow-300 bg-indigo-800" 
                                    : "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-800 hover:text-yellow-200"
                            }
                            onClick={toggleMenu}
                        >
                            About
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
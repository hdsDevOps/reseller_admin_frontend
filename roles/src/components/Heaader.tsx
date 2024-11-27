import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">Hordanso</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/home" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Home</Link>
              <Link to="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Plan & Price</Link>
              <Link to="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">About Us</Link>
              <Link to="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">FAQ's</Link>
              <Link to="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Services</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <Link to="/login" className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Log In</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6 text-gray-500 hover:text-blue-500"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <ul className="">
          <li><Link to="/home" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">Home</Link></li>
          <li><Link to="#" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">Plan & Price</Link></li>
          <li><Link to="#" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">About Us</Link></li>
          <li><Link to="#" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">FAQ's</Link></li>
          <li><Link to="#" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">Services</Link></li>
          <li><Link to="/login" className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300">Log In</Link></li>
        </ul>
      </div>
    </nav>
  );
}
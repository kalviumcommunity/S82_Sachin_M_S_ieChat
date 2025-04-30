import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#313338] text-[#f2f3f5] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              <span className="text-[#5865F2]">ie</span>
              <span className="text-[#f2f3f5]">Chat</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-[#dbdee1] transition">Home</Link>
            <Link to="/chatrooms" className="hover:text-[#dbdee1] transition">Chatrooms</Link>
            <Link to="/about" className="hover:text-[#dbdee1] transition">About</Link>
            <Link
              to="/login"
              className="bg-[#5865F2] hover:bg-[#4752c4] px-4 py-1 rounded-md text-sm font-medium transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#232428] px-4 py-3 space-y-3 text-sm font-medium">
          <Link to="/" className="block hover:text-[#dbdee1]">Home</Link>
          <Link to="/chatrooms" className="block hover:text-[#dbdee1]">Chatrooms</Link>
          <Link to="/about" className="block hover:text-[#dbdee1]">About</Link>
          <Link
            to="/login"
            className="block w-full bg-[#5865F2] hover:bg-[#4752c4] px-4 py-1 rounded-md text-left"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;

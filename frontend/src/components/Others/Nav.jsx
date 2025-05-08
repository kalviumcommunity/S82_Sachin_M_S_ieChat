import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser(); 

  return (
    <nav className="bg-[#2f3136] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-white">
          ieChat
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/explore" className="hover:text-[#5865F2] transition">
            Explore
          </Link>
          <Link to="/search-movies" className="hover:text-[#5865F2] transition">
            Search
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-[#5865F2] transition">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#5865F2] hover:bg-[#4752c4] px-4 py-1 rounded text-sm font-semibold"
            >
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#2f3136] px-4 pb-3 space-y-2">
          <Link to="/explore" className="block hover:text-[#5865F2]">
            Explore
          </Link>
          <Link to="/search-movies" className="block hover:text-[#5865F2]">
            Search
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block hover:text-[#5865F2]">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left text-red-500 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-[#5865F2] hover:bg-[#4752c4] px-3 py-1 rounded text-sm font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

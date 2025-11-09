import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link className="flex items-center space-x-3" to="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Swift Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Swift-Chat
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu items */}
        <div
          className={`w-full md:flex md:w-auto gap-3 ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <Link
            to={isAuthenticated ? "/chathome" : "/login"}
            className="block py-2 px-4 text-white hover:text-indigo-400"
          >
            {isAuthenticated ? "Home" : "Login"}
          </Link>
          <Link
            to="/contact"
            className="block py-2 px-4 text-white hover:text-indigo-400"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;

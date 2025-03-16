import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex items-center">
              <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-3xl font-extrabold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">Lamicons</Link>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-8">
              <Link to="/courses" className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Courses</Link>
              <Link to="/documentation" className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Documentation</Link>
              <Link to="/interview" className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Interview Prep</Link>
              <Link to="/coding" className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Coding Practice</Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">Contact</Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105">About</Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={`/profile/${user.id}`} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">{user.username}</Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden bg-white border-t border-gray-200`}>
        <div className="px-4 py-3 space-y-2">
          <Link to="/courses" className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">Courses</Link>
          <Link to="/documentation" className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">Documentation</Link>
          <Link to="/interview" className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">Interview Prep</Link>
          <Link to="/coding" className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">Coding Practice</Link>
          <Link to="/contact" className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">Contact</Link>
          <Link to="/about" className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">About</Link>
          {user ? (
            <>

              <button
                onClick={logout}
                className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 block px-3 py-2 rounded-md text-base font-medium transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white hover:bg-indigo-700 block px-3 py-2 rounded-md text-base font-medium transition-colors">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
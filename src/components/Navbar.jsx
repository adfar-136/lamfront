import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 h-20 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Lamicons Logo" className="w-36 h-8" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            <Link to="/courses" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
              Courses
            </Link>
            <Link to="/documentation" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
              Documentation
            </Link>
            <Link to="/practice" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
              MCQ
            </Link>
            {/* <Link to="/coding" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
              Coding Practice
            </Link> */}
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
              Contact
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={`/profile/${user.id}`} 
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span>{user.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 transition-all duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`${
          isOpen 
            ? 'translate-x-0 opacity-100 visible' 
            : '-translate-x-full opacity-0 invisible'
        } sm:hidden fixed top-[80px] left-0 right-0 bottom-0 bg-white border-t border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out z-40`}
        style={{
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {[
            { to: "/courses", text: "Courses" },
            { to: "/documentation", text: "Documentation" },
            { to: "/practice", text: "MCQ" },
            // { to: "/coding", text: "Coding Practice" },
            { to: "/contact", text: "Contact" },
            { to: "/about", text: "About" },
          ].map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setTimeout(() => {
                  window.location.href = link.to;
                }, 300);
              }}
            >
              {link.text}
            </Link>
          ))}

          {user ? (
            <>
              <Link 
                to={`/profile/${user.id}`} 
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => {
                    window.location.href = `/profile/${user.id}`;
                  }, 300);
                }}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    logout();
                  }, 300);
                }}
                className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:text-white hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2 p-4">
              <Link 
                to="/login" 
                className="block w-full px-4 py-3 rounded-lg text-center text-base font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => {
                    window.location.href = '/login';
                  }, 300);
                }}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="block w-full px-4 py-3 rounded-lg text-center text-base font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => {
                    window.location.href = '/register';
                  }, 300);
                }}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await register(formData.username, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex bg-white/95 rounded-xl shadow-2xl overflow-hidden relative min-h-[600px] border border-red-100 backdrop-blur-sm md:flex-row flex-col">
        {/* Form Section */}
        <div className={`md:w-1/2 w-full p-8 transition-all duration-500 ease-out md:absolute relative flex flex-col justify-center ${isLogin ? 'left-0' : 'md:-left-full'} transform overflow-y-auto max-h-[600px] ${!isLogin && 'hidden md:flex'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {isLogin ? 'Sign in to Lamicons' : 'Create your account'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required={!isLogin}
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-sm text-red-600 hover:text-red-500"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>

        {/* Sign Up Form Section */}
        <div className={`md:w-1/2 w-full p-8 transition-all duration-500 ease-out md:absolute relative ${!isLogin ? 'right-0' : 'md:-right-full'} transform overflow-y-auto max-h-[600px] ${isLogin && 'hidden md:flex'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {!isLogin ? 'Create your account' : 'Sign in to Lamicons'}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                {loading ? 'Processing...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>

        {/* Illustration Section - Hidden on mobile */}
        <div className={`w-1/2 bg-gradient-to-br from-red-600 to-purple-700 p-12 hidden md:flex flex-col items-center justify-center absolute transition-all duration-500 ease-out ${isLogin ? 'right-0' : 'left-0'} h-full overflow-hidden`}>
          <div className="text-white text-center z-10 flex flex-col items-center justify-center space-y-6">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              {isLogin ? 'Welcome to Lamicons!' : 'Join Lamicons Today!'}
            </h3>
            <p className="text-lg text-red-200">
              {isLogin ? 'Access your premium tech education journey' : 'Start your journey in tech education excellence'}
            </p>
            <p className="text-sm text-red-300 mb-8">
              {isLogin ? 'Unlock expert-led courses and real-world tech skills' : 'Join our community of learners and expert educators'}
            </p>
            <button
              onClick={toggleMode}
              className="w-64 py-3 px-6 rounded-md bg-white text-red-600 font-medium hover:bg-red-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 grid grid-cols-3 gap-8 p-8">
              {/* Add some floating icons similar to the landing page */}
              <svg className="animate-float opacity-30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3H5a2 2 0 00-2 2v3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="animate-float-delayed opacity-30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6c0 1.1 3.6 2 8 2s8-.9 8-2M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6M4 6c0-1.1 3.6-2 8-2s8 .9 8 2M4 12c0 1.1 3.6 2 8 2s8-.9 8-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="animate-float-more-delayed opacity-30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
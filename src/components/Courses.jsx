import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Courses = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course cards will be mapped here */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Introduction to Web Development</h2>
          <p className="text-gray-600 mb-4">Learn the fundamentals of web development including HTML, CSS, and JavaScript.</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300">
            Enroll Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Advanced React Development</h2>
          <p className="text-gray-600 mb-4">Master React.js with advanced concepts, hooks, and state management.</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300">
            Enroll Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Backend Development with Node.js</h2>
          <p className="text-gray-600 mb-4">Build scalable backend applications using Node.js and Express.</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
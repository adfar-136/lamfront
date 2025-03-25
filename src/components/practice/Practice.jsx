import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Practice = () => {
  const [techStacks, setTechStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await axios.get('/api/practice/tech-stacks');
        setTechStacks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load practice sections');
        setLoading(false);
      }
    };

    fetchTechStacks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">{error}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice MCQ Questions</h1>
        <p className="text-lg text-gray-600">Test your knowledge across different technologies</p>
        
        <Link 
          to="/practice/add"
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Questions
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStacks.map((stack) => (
          <div 
            key={stack._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{stack.name}</h2>
              </div>
              
              <p className="text-gray-600 mb-6">{stack.description}</p>

              <div className="space-y-4">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <Link
                    key={level}
                    to={`/practice/${stack._id}/${level}`}
                    className={`block w-full text-center py-2 px-4 rounded-lg transition-colors ${
                      stack.questionCounts?.[level] > 0
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                      if (!stack.questionCounts?.[level]) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                    <span className="ml-2">
                      ({stack.questionCounts?.[level] || 0} questions)
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice; 
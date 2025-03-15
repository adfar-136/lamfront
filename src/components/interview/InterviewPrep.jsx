import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const InterviewPrep = () => {
  const { user } = useAuth();
  const [techStacks, setTechStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await fetch('https://lamback.onrender.com/api/techstack', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Tech stacks data:', data);
        setTechStacks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tech stacks:', err);
        setError(`Failed to load tech stacks: ${err.message}`);
        setLoading(false);
      }
    };

    fetchTechStacks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge across different tech stacks and prepare for technical interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techStacks.map((stack) => (
            <div key={stack._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                  <img src={stack.icon} alt={stack.name} className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{stack.name}</h2>
                <p className="text-gray-600 mb-6">{stack.description}</p>
                
                <div className="space-y-4">
                  {stack.levels.map((level) => (
                    <Link
                      key={level.name}
                      to={`/interview/${stack._id}/${level.name.toLowerCase()}`}
                      className={`block w-full text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${level.name === 'Beginner' ? 'bg-green-100 text-green-700 hover:bg-green-200' : level.name === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      {level.name}
                      <span className="block text-sm opacity-75">Required Score: {level.requiredScore}%</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Your Best Score: N/A</span>
                  <span>Attempts: 0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
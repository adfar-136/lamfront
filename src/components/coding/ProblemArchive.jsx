import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axios';

const ProblemArchive = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    techStack: 'all',
    difficulty: 'all',
    status: 'all',
    searchQuery: ''
  });

  const techStacks = [
    { id: 'JavaScript', name: 'JavaScript' },
    { id: 'Python', name: 'Python' },
    { id: 'Java', name: 'Java' },
    { id: 'C++', name: 'C++' },
    { id: 'Ruby', name: 'Ruby' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', color: 'green' },
    { id: 'medium', name: 'Medium', color: 'yellow' },
    { id: 'hard', name: 'Hard', color: 'red' }
  ];

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axiosInstance.get('/api/coding/questions');
        setProblems(Array.isArray(response.data.questions) ? response.data.questions : []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setProblems([]);
      }
    };

    fetchProblems();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredProblems = problems.filter(problem => {
    const matchesTechStack = filters.techStack === 'all' || 
      (problem.category && problem.category === filters.techStack);
    const matchesDifficulty = filters.difficulty === 'all' || 
      (problem.difficulty && problem.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'solved' && problem.solved) ||
      (filters.status === 'attempted' && problem.attempted && !problem.solved) ||
      (filters.status === 'unsolved' && !problem.attempted);
    const matchesSearch = 
      (problem.title && problem.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
      (problem.description && problem.description.toLowerCase().includes(filters.searchQuery.toLowerCase()));

    return matchesTechStack && matchesDifficulty && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Coding Problems</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice coding problems across different technologies and difficulty levels.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technology</label>
              <select
                value={filters.techStack}
                onChange={(e) => handleFilterChange('techStack', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Technologies</option>
                {techStacks.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Difficulties</option>
                {difficulties.map(diff => (
                  <option key={diff.id} value={diff.id}>{diff.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                placeholder="Search problems..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProblems.map((problem) => (
            <Link
              key={problem._id}
              to={`/coding/${problem._id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{problem.techStack}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{problem.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Success Rate: {problem.successRate}%
                  </span>
                  {problem.solved ? (
                    <span className="text-green-600 font-medium">Solved</span>
                  ) : problem.attempted ? (
                    <span className="text-yellow-600 font-medium">Attempted</span>
                  ) : (
                    <span className="text-gray-600">Not Attempted</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No problems found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemArchive;
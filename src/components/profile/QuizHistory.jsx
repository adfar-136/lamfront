import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { useAuth } from '../../contexts/AuthContext';

const QuizHistory = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuizAttempts = async () => {
      try {
        const response = await axiosInstance.get('/api/profile/quiz-attempts');
        setQuizData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quiz history');
        setLoading(false);
      }
    };

    fetchQuizAttempts();
  }, []);

  if (loading) return <div className="text-center py-4">Loading quiz history...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!quizData) return null;

  const { quizAttempts, stats } = quizData;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">Quiz Performance</h2>
      
      {/* Performance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Total Attempts</p>
          <p className="text-2xl font-bold">{stats.totalAttempts}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Best Score</p>
          <p className="text-2xl font-bold">{Math.max(...quizAttempts.map(attempt => attempt.percentageScore))}%</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Pass Rate</p>
          <p className="text-2xl font-bold">{stats.passRate}%</p>
        </div>
      </div>

      {/* Recent Attempts Table */}
      <h3 className="text-xl font-semibold mb-4">Recent Attempts</h3>
      {quizAttempts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizAttempts.map((attempt, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {attempt.techStack.icon && (
                        <img
                          src={attempt.techStack.icon}
                          alt={attempt.techStack.name}
                          className="h-8 w-8 mr-3"
                        />
                      )}
                      <span>{attempt.techStack.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{attempt.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{attempt.percentageScore}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(attempt.completedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        attempt.percentageScore >= 70
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {attempt.percentageScore >= 70 ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No quiz attempts yet</p>
      )}
    </div>
  );
};

export default QuizHistory;
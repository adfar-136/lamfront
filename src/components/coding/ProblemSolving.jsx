import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axios';

const ProblemSolving = () => {
  const { problemId } = useParams();
  const { user } = useAuth();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [executing, setExecuting] = useState(false);

  const languageOptions = [
    { id: 'javascript', name: 'JavaScript', defaultCode: '// Write your JavaScript code here\n' },
    { id: 'python', name: 'Python', defaultCode: '# Write your Python code here\n' },
    { id: 'nodejs', name: 'Node.js', defaultCode: '// Write your Node.js code here\n' },
    { id: 'html', name: 'HTML', defaultCode: '<!-- Write your HTML code here -->\n' },
    { id: 'css', name: 'CSS', defaultCode: '/* Write your CSS code here */\n' }
  ];

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axiosInstance.get(`/api/coding/questions/${problemId}`);
        setProblem(response.data);
        setLanguage(response.data.defaultLanguage || 'javascript');
        setCode(languageOptions.find(lang => lang.id === (response.data.defaultLanguage || 'javascript')).defaultCode);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languageOptions.find(lang => lang.id === newLanguage).defaultCode);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = async () => {
    setExecuting(true);
    setTestResults(null);

    try {
      const response = await axiosInstance.post(`/api/coding/run/${problemId}`, {
        code,
        language
      });
      setTestResults(response.data);
    } catch (err) {
      setError('Failed to execute code');
    } finally {
      setExecuting(false);
    }
  };

  const handleSubmit = async () => {
    setExecuting(true);
    setTestResults(null);

    try {
      const response = await axiosInstance.post(`/api/coding/submit/${problemId}`, {
        code,
        language
      });
      setTestResults(response.data);
    } catch (err) {
      setError('Failed to submit solution');
    } finally {
      setExecuting(false);
    }
  };

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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Problem Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{problem.title}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                </span>
                <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{problem.category}</span>
              </div>
            </div>

            <div className="prose max-w-none space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Problem Description</h3>
                <p className="text-gray-700 leading-relaxed">{problem.description}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Input Format</h3>
                <p className="text-gray-700 leading-relaxed">{problem.inputFormat}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Constraints</h3>
                <p className="text-gray-700 leading-relaxed">{problem.constraints}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Expected Output</h3>
                <p className="text-gray-700 leading-relaxed">{problem.expectedOutput}</p>
              </div>
            </div>

            {/* Test Cases */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-gray-900">Sample Test Cases</h3>
              <div className="flex flex-wrap gap-2">
                {problem.testCases.filter(test => !test.isHidden).map((testCase, index) => (
                  <div key={index} className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-2 text-xs">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 text-xs">Input:</span>
                        <pre className="mt-0.5 text-xs text-gray-700 bg-white p-1.5 rounded border border-gray-200 overflow-x-auto">{testCase.input}</pre>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 text-xs">Expected Output:</span>
                        <pre className="mt-0.5 text-xs text-gray-700 bg-white p-1.5 rounded border border-gray-200 overflow-x-auto">{testCase.expectedOutput}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="space-y-8 sticky top-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {languageOptions.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleRunCode}
                      disabled={executing}
                      className="px-6 py-2.5 bg-gray-700 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      {executing ? 'Running...' : 'Run Code'}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={executing}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {executing ? 'Submitting...' : 'Submit Solution'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-[600px]">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 20, bottom: 20 }
                  }}
                />
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Test Results</h3>
                <div className="space-y-6">
                  {testResults.results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-2 ${
                        result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold">
                          Test Case {index + 1}:
                          <span className={`ml-2 ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                            {result.passed ? 'Passed' : 'Failed'}
                          </span>
                        </span>
                      </div>
                      {!result.passed && (
                        <div className="space-y-4">
                          <div>
                            <span className="block text-sm font-semibold text-gray-700 mb-2">Expected Output:</span>
                            <pre className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200 overflow-x-auto">{result.expected}</pre>
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-gray-700 mb-2">Your Output:</span>
                            <pre className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200 overflow-x-auto">{result.actual}</pre>
                          </div>
                          {result.error && (
                            <div className="mt-4 p-4 bg-red-100 rounded-lg">
                              <span className="block text-sm font-semibold text-red-700 mb-1">Error:</span>
                              <span className="text-sm text-red-600">{result.error}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolving;
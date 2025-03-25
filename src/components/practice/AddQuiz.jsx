import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Or however you store your auth token
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const AddQuiz = () => {
  const [techStacks, setTechStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showAddStack, setShowAddStack] = useState(false);

  const [stackForm, setStackForm] = useState({
    name: '',
    description: '',
    icon: 'default-icon.png'
  });

  const [formData, setFormData] = useState({
    question: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    explanation: '',
    difficulty: 'beginner',
    score: 1,
    timeLimit: 30,
    techStack: ''
  });

  const fetchTechStacks = async () => {
    try {
      const response = await axios.get('/api/practice/tech-stacks'); // Public route, no auth needed
      setTechStacks(response.data);
      setLoading(false);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load tech stacks' });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechStacks();
  }, []);

  const handleAddStack = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/practice/tech-stacks', stackForm, getAuthHeader());
      setMessage({ type: 'success', text: 'Tech stack added successfully!' });
      setStackForm({ name: '', description: '', icon: 'default-icon.png' });
      setShowAddStack(false);
      fetchTechStacks();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to add tech stack' });
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    
    // If marking an option as correct, unmark others
    if (field === 'isCorrect' && value === true) {
      newOptions.forEach((opt, i) => {
        if (i !== index) opt.isCorrect = false;
      });
    }
    
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.options.some(opt => opt.isCorrect)) {
      setMessage({ type: 'error', text: 'Please mark one option as correct' });
      return;
    }

    if (formData.options.some(opt => opt.text.trim() === '')) {
      setMessage({ type: 'error', text: 'All options must be filled' });
      return;
    }

    try {
      await axios.post('/api/practice/questions', formData, getAuthHeader());
      setMessage({ type: 'success', text: 'Question added successfully!' });
      
      // Reset form
      setFormData({
        question: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        explanation: '',
        difficulty: 'beginner',
        score: 1,
        timeLimit: 30,
        techStack: ''
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to add question' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add Quiz Question</h1>
      
      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Add Tech Stack Section */}
      <div className="mb-8">
        <button
          onClick={() => setShowAddStack(!showAddStack)}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          {showAddStack ? '- Hide Tech Stack Form' : '+ Add New Tech Stack'}
        </button>

        {showAddStack && (
          <form onSubmit={handleAddStack} className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tech Stack Name
              </label>
              <input
                type="text"
                value={stackForm.name}
                onChange={(e) => setStackForm({ ...stackForm, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={stackForm.description}
                onChange={(e) => setStackForm({ ...stackForm, description: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows="2"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Tech Stack
              </button>
            </div>
          </form>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack
          </label>
          <select
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Tech Stack</option>
            {techStacks.map((stack) => (
              <option key={stack._id} value={stack._id}>
                {stack.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="space-y-3">
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={option.isCorrect}
                    onChange={() => handleOptionChange(index, 'isCorrect', true)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">Correct</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Explanation
          </label>
          <textarea
            value={formData.explanation}
            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
            className="w-full p-2 border rounded-lg"
            rows="3"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score
            </label>
            <input
              type="number"
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Limit (seconds)
            </label>
            <input
              type="number"
              value={formData.timeLimit}
              onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-lg"
              min="30"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuiz; 
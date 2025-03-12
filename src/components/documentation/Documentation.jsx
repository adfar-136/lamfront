import React, { useState,useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = 'https://lamback.onrender.com';

const Documentation = () => {
  const { technology, topicId } = useParams();
  const navigate = useNavigate();
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await axios.get('/api/documentation/technologies');
        setTechnologies(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load technologies');
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    const fetchTechnologyData = async () => {
      if (!technology) return;

      try {
        const response = await axios.get(`/api/documentation/technologies/${technology}`);
        setSelectedTechnology(response.data);

        if (topicId) {
          const topic = response.data.topics.find(t => t.slug === topicId);
          setSelectedTopic(topic || null);
        } else if (response.data.topics.length > 0) {
          setSelectedTopic(response.data.topics[0]);
          navigate(`/documentation/${technology}/${response.data.topics[0].slug}`);
        }
      } catch (err) {
        setError('Failed to load technology data');
      }
    };

    fetchTechnologyData();
  }, [technology, topicId, navigate]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 bg-white shadow-lg rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Technologies</h2>
            <nav className="space-y-2">
              {technologies.map((tech) => (
                <Link
                  key={tech.slug}
                  to={`/documentation/${tech.slug}`}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${technology === tech.slug ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  {tech.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {selectedTechnology ? (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedTechnology.name}</h1>
                  <p className="text-gray-600 mb-6">{selectedTechnology.description}</p>

                  {/* Topics Navigation */}
                  <div className="border-t border-b border-gray-200 py-4 mb-6">
                    <div className="flex gap-4 overflow-x-auto">
                      {selectedTechnology.topics.map((topic) => (
                        <Link
                          key={topic.slug}
                          to={`/documentation/${technology}/${topic.slug}`}
                          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${selectedTopic?.slug === topic.slug ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                        >
                          {topic.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Topic Content */}
                  {selectedTopic && (
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedTopic.title}</h2>
                      <div className="text-gray-600">{selectedTopic.content}</div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Documentation</h1>
                <p className="text-gray-600">Please select a technology from the sidebar to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
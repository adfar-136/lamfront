import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Documentation = () => {
  const [technologies, setTechnologies] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { techSlug, topicSlug } = useParams();

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await axios.get('https://lamback.onrender.com/api/documentation/technologies');
        setTechnologies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch technologies');
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    if (techSlug) {
      const fetchTechnology = async () => {
        try {
          const response = await axios.get(`https://lamback.onrender.com/api/documentation/technologies/${techSlug}`);
          setSelectedTech(response.data);
        } catch (err) {
          setError('Failed to fetch technology details');
        }
      };
      fetchTechnology();
    }
  }, [techSlug]);

  useEffect(() => {
    if (techSlug && topicSlug) {
      const fetchTopic = async () => {
        try {
          const response = await axios.get(`https://lamback.onrender.com/api/documentation/technologies/${techSlug}/topics/${topicSlug}`);
          if (response.data && response.data.content) {
            setSelectedTopic(response.data);
            console.log(response.data.content);
          } else {
            setError('Topic content not found');
          }
        } catch (err) {
          console.error('Error fetching topic:', err);
          setError('Failed to fetch topic details');
        }
      };
      fetchTopic();
    }
  }, [techSlug, topicSlug]);

  const renderContentBlock = (block) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.metadata.level || 2}`;
        return <HeadingTag className="text-2xl font-bold mb-4 text-left">{block.content}</HeadingTag>;
      
      case 'text':
        return <p className="text-gray-600 mb-4 leading-relaxed text-left">{block.content}</p>;
      
      case 'code':
        return (
          <pre className="bg-gray-900 rounded-lg mb-4 overflow-x-auto text-left">
            <code className={`language-${block.metadata.language} block p-4 text-gray-100`}>{block.content}</code>
          </pre>
        );
      
      case 'image':
        return (
          <figure className="mb-4">
            <img 
              src={block.content} 
              alt={block.metadata.alt || ''} 
              className="max-w-full rounded-lg shadow-lg"
            />
            {block.metadata.caption && (
              <figcaption className="text-sm text-gray-500 mt-2">
                {block.metadata.caption}
              </figcaption>
            )}
          </figure>
        );
      
      default:
        return null;
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Technologies</h2>
            <nav>
              <ul className="space-y-2">
                {technologies.map((tech) => (
                  <li key={tech.slug}>
                    <button
                      onClick={() => setSelectedTech(tech)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedTech?.slug === tech.slug ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {tech.name}
                    </button>
                    {selectedTech?.slug === tech.slug && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {tech.topics.map((topic) => (
                          <li key={topic.slug}>
                            <button
                              onClick={() => setSelectedTopic(topic)}
                              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedTopic?.slug === topic.slug ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                              {topic.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTopic ? ( 
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6">{selectedTopic.title} hello</h1>
                <div className="prose max-w-none">
                  {selectedTopic.content && selectedTopic.content.map((block, index) => (
                    <div key={index}>{renderContentBlock(block)}</div>
                  ))}
                </div>
              </div>
            ) : selectedTech ? (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{selectedTech.name}</h1>
                <p className="text-gray-600 mb-6">{selectedTech.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedTech.topics.map((topic) => (
                    <button
                      key={topic.slug}
                      onClick={() => setSelectedTopic(topic)}
                      className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-600 mb-8">Select a technology from the sidebar to get started.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technologies.map((tech) => (
                    <button
                      key={tech.slug}
                      onClick={() => setSelectedTech(tech)}
                      className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                      <p className="text-gray-600 text-sm">{tech.description}</p>
                    </button>
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

export default Documentation;
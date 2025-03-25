import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
        const response = await axiosInstance.get('/api/documentation/technologies');
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
          const response = await axiosInstance.get(`/api/documentation/technologies/${techSlug}`);
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
          const response = await axiosInstance.get(`/api/documentation/technologies/${techSlug}/topics/${topicSlug}`);
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
        return (
          <HeadingTag className={`
            ${block.metadata.level === 1 ? 'text-4xl mb-8' : 
              block.metadata.level === 2 ? 'text-3xl mb-6' : 
              block.metadata.level === 3 ? 'text-2xl mb-5' : 
              'text-xl mb-4'}
            font-bold text-gray-900 pb-3 text-left
          `}>
            {block.content}
          </HeadingTag>
        );
      
      case 'text':
        return (
          <p className="text-gray-700 text-lg leading-relaxed mb-6 text-left">
            {block.content}
          </p>
        );
      
      case 'code':
        return (
          <div className="mb-6">
            {block.metadata.language && (
              <div className="bg-gray-800 text-gray-300 text-sm py-1 px-4 rounded-t-lg">
                {block.metadata.language}
              </div>
            )}
            <SyntaxHighlighter
              language={block.metadata.language || 'javascript'}
              style={vscDarkPlus}
              className="rounded-lg !mt-0"
              customStyle={{
                margin: 0,
                borderTopLeftRadius: block.metadata.language ? 0 : '0.5rem',
                borderTopRightRadius: block.metadata.language ? 0 : '0.5rem',
              }}
            >
              {block.content}
            </SyntaxHighlighter>
          </div>
        );
      
      case 'image':
        return (
          <figure className="mb-6">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src={block.content} 
                alt={block.metadata.alt || ''} 
                className="w-full h-auto"
              />
            </div>
            {block.metadata.caption && (
              <figcaption className="text-sm text-gray-500 mt-2 text-left">
                {block.metadata.caption}
              </figcaption>
            )}
          </figure>
        );
      
      case 'table':
        return (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead>
                    {JSON.parse(block.content)[0] && (
                      <tr className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                        {JSON.parse(block.content)[0].map((header, index) => (
                          <th
                            key={index}
                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider border-r last:border-r-0"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {JSON.parse(block.content).slice(1).map((row, rowIndex) => (
                      <tr 
                        key={rowIndex}
                        className={`
                          ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                          hover:bg-indigo-50 transition-colors duration-150
                        `}
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-6 py-4 text-sm text-gray-900 border-r last:border-r-0 whitespace-pre-wrap"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'quote':
        return (
          <blockquote className="mb-8 border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-white p-6 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed text-lg">
              {block.content}
            </p>
            {block.metadata?.author && (
              <footer className="mt-4 text-sm text-gray-600">
                — <cite className="font-medium not-italic">{block.metadata.author}</cite>
              </footer>
            )}
          </blockquote>
        );
      
      case 'link':
        return (
          <a
            href={block.metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 underline mb-6 group"
          >
            <span>{block.content}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      
      case 'ordered-list':
        return (
          <ol className="list-decimal pl-6 mb-6 space-y-2 text-left w-full">
            {Array.isArray(block.metadata?.items) ? block.metadata.items.map((item, index) => (
              <li key={index} className="text-gray-700 text-lg pl-2 leading-relaxed text-left">
                {item}
              </li>
            )) : null}
          </ol>
        );
      
      case 'unordered-list':
        return (
          <ul className="list-disc pl-6 mb-6 space-y-2 text-left w-full">
            {Array.isArray(block.metadata?.items) ? block.metadata.items.map((item, index) => (
              <li key={index} className="text-gray-700 text-lg pl-2 leading-relaxed text-left">
                {item}
              </li>
            )) : null}
          </ul>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-lg sticky top-8 h-fit max-h-[calc(100vh-4rem)] overflow-y-auto">
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
          <div className="lg:col-span-9">
            {selectedTopic ? ( 
              <div className="bg-white rounded-xl shadow-lg">
                {/* Topic Header */}
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-white to-indigo-50 rounded-t-xl">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    {selectedTopic.title}
                  </h1>
                </div>

                {/* Topic Content */}
                <div className="px-8 py-6">
                  <div className="text-left">
                    {selectedTopic.content && selectedTopic.content.map((block, index) => (
                      <div key={index} className="text-left">
                        {renderContentBlock(block)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedTech ? (
              <div className="bg-white rounded-xl shadow-lg">
                {/* Technology Header */}
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-white to-indigo-50 rounded-t-xl">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
                    {selectedTech.name}
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {selectedTech.description}
                  </p>
                </div>

                {/* Topics Grid */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTech.topics.map((topic) => (
                      <button
                        key={topic.slug}
                        onClick={() => setSelectedTopic(topic)}
                        className="p-6 bg-white rounded-xl hover:bg-indigo-50 transition-all hover:shadow-lg text-left group border border-gray-200 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-indigo-600">
                            {topic.title}
                          </h3>
                          <div className="flex items-center text-gray-500 group-hover:text-indigo-500">
                            <span>Read more</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
                  Available Technologies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technologies.map((tech) => (
                    <button
                      key={tech.slug}
                      onClick={() => setSelectedTech(tech)}
                      className="p-6 bg-white rounded-xl hover:bg-indigo-50 transition-all hover:shadow-lg text-left group border border-gray-200 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-indigo-600">
                          {tech.name}
                        </h3>
                        <p className="text-gray-600 text-base mb-4">
                          {tech.description}
                        </p>
                        <div className="flex items-center text-gray-500 group-hover:text-indigo-500">
                          <span>View documentation</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
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
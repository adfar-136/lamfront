import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddDocumentation = () => {
  const navigate = useNavigate();
  const { techSlug, topicSlug } = useParams();
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    order: 0,
    topics: [{
      title: '',
      slug: '',
      content: [],
      order: 0
    }]
  });

  const [currentTopic, setCurrentTopic] = useState(0);
  const [contentBlock, setContentBlock] = useState({
    type: 'text',
    content: '',
    metadata: {}
  });

  const handleTechnologyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTopicChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedTopics = [...prev.topics];
      updatedTopics[index] = {
        ...updatedTopics[index],
        [name]: value
      };
      return { ...prev, topics: updatedTopics };
    });
  };

  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, { title: '', slug: '', content: [], order: prev.topics.length }]
    }));
  };

  const handleContentBlockChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setContentBlock({
        type: value,
        content: '',
        metadata: {}
      });
    } else if (name.startsWith('metadata.')) {
      const metadataField = name.split('.')[1];
      setContentBlock(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [metadataField]: value
        }
      }));
    } else if (name === 'content' && (contentBlock.type === 'ordered-list' || contentBlock.type === 'unordered-list')) {
      setContentBlock(prev => ({
        ...prev,
        content: value
      }));
    }
  };

  const addContentBlock = () => {
    if (!contentBlock.content) return;

    let isValid = true;
    const metadata = {};

    switch (contentBlock.type) {
      case 'heading':
        const level = parseInt(contentBlock.metadata.level);
        if (!level || level < 1 || level > 6) {
          alert('Heading level must be between 1 and 6');
          isValid = false;
        }
        metadata.level = level;
        break;
      case 'code':
        if (!contentBlock.metadata.language) {
          alert('Programming language is required for code blocks');
          isValid = false;
        }
        metadata.language = contentBlock.metadata.language;
        break;
      case 'image':
        if (!contentBlock.metadata.alt) {
          alert('Alt text is required for images');
          isValid = false;
        }
        metadata.alt = contentBlock.metadata.alt;
        metadata.caption = contentBlock.metadata.caption;
        break;
      case 'link':
        if (!contentBlock.metadata.url) {
           alert('Link URL is required');
          isValid = false;
        }
        metadata.url = contentBlock.metadata.url;
        break;
      
      case 'quote':
        if (!contentBlock.metadata.author) {
          alert('Quote author is required');
          isValid = false;
        }
        metadata.author = contentBlock.metadata.author;
        break;
      case 'table':
        try {
          const tableData = JSON.parse(contentBlock.content);
          if (!Array.isArray(tableData) || !tableData.every(row => Array.isArray(row))) {
            alert('Table content must be a valid 2D array');
            isValid = false;
          }
        } catch (e) {
          alert('Invalid table format. Please provide a valid JSON array');
          isValid = false;
        }
        break;
    }

    if (isValid) {
      setFormData(prev => {
        const updatedTopics = [...prev.topics];
        const newBlock = {
          ...contentBlock,
          metadata
        };
        
        // Check if this exact block already exists in the current topic
        const isDuplicate = updatedTopics[currentTopic].content.some(existingBlock => 
          existingBlock.type === newBlock.type && 
          existingBlock.content === newBlock.content
        );

        if (!isDuplicate) {
          updatedTopics[currentTopic].content.push(newBlock);
        }

        return { ...prev, topics: updatedTopics };
      });
      setContentBlock({
        type: 'text',
        content: '',
        metadata: {}
      });
    }
  };

  const removeContentBlock = (topicIndex, blockIndex) => {
    setFormData(prev => {
      const updatedTopics = [...prev.topics];
      updatedTopics[topicIndex].content = [
        ...updatedTopics[topicIndex].content.slice(0, blockIndex),
        ...updatedTopics[topicIndex].content.slice(blockIndex + 1)
      ];
      return { ...prev, topics: updatedTopics };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.name || !formData.slug || !formData.description) {
        alert('Name, slug, and description are required for the technology');
        return;
      }

      // Validate topics and their content
      const validTopics = formData.topics.map(topic => {
        // Remove duplicate content blocks by comparing content and type
        const uniqueContent = topic.content.reduce((acc, block) => {
          const isDuplicate = acc.some(existingBlock => 
            existingBlock.type === block.type && 
            existingBlock.content === block.content
          );
          if (!isDuplicate) acc.push(block);
          return acc;
        }, []);

        return {
          ...topic,
          content: uniqueContent.filter(block => {
            if (!block.type || !block.content) return false;
            if (!['text', 'heading', 'code', 'image', 'quote', 'table', 'link', 'button', 'divider', 'ordered-list', 'unordered-list'].includes(block.type)) return false;
            if (block.type === 'heading' && (!block.metadata?.level || block.metadata.level < 1 || block.metadata.level > 6)) return false;
            if (block.type === 'quote' && !block.metadata?.author) return false;
            if (block.type === 'table') {
              try {
                const tableData = JSON.parse(block.content);
                if (!Array.isArray(tableData) || !tableData.every(row => Array.isArray(row))) return false;
              } catch (e) {
                return false;
              }
            }
            return true;
          })
        };
      }).filter(topic => topic.title && topic.slug);

      if (validTopics.length === 0) {
        alert('At least one topic with title and slug is required');
        return;
      }

      // Check if technology exists
      let techExists = false;
      try {
        const techCheck = await axios.get(`https://lamback.onrender.com/api/documentation/technologies/${formData.slug.trim().toLowerCase()}`);
        techExists = true;
      } catch (error) {
        if (error.response?.status !== 404) {
          throw error;
        }
      }

      // If technology doesn't exist, create it
      if (!techExists) {
        await axios.post('https://lamback.onrender.com/api/documentation/technologies', {
          name: formData.name.trim(),
          slug: formData.slug.trim().toLowerCase(),
          description: formData.description.trim(),
          icon: formData.icon || 'default-icon.svg',
          order: formData.order || 0
        });
      }

      // Add topics one by one
      for (const topic of validTopics) {
        try {
          await axios.post(`https://lamback.onrender.com/api/documentation/technologies/${formData.slug.trim().toLowerCase()}/topics`, {
            title: topic.title.trim(),
            slug: topic.slug.trim().toLowerCase(),
            content: topic.content,
            order: topic.order || 0
          });
        } catch (topicError) {
          if (topicError.response?.status === 400 && topicError.response?.data?.message?.includes('already exists')) {
            alert(`Topic '${topic.title}' already exists in this technology. Please use a different slug.`);
            return;
          }
          throw topicError;
        }
      }

      alert('Documentation added successfully!');
      navigate('/documentation');
    } catch (error) {
      console.error('Error adding documentation:', error);
      alert('Error adding documentation. Please try again.');
    }
  };

  useEffect(() => {
    const fetchExistingContent = async () => {
      if (techSlug && topicSlug) {
        try {
          const techResponse = await axios.get(`https://lamback.onrender.com/api/documentation/technologies/${techSlug}`);
          const topicResponse = await axios.get(`https://lamback.onrender.com/api/documentation/technologies/${techSlug}/topics/${topicSlug}`);
          
          setSelectedTechnology(techResponse.data);
          setFormData(prev => ({
            ...prev,
            name: techResponse.data.name,
            slug: techResponse.data.slug,
            description: techResponse.data.description,
            icon: techResponse.data.icon,
            order: techResponse.data.order,
            topics: [{
              title: topicResponse.data.title,
              slug: topicResponse.data.slug,
              content: topicResponse.data.content,
              order: topicResponse.data.order
            }]
          }));
        } catch (error) {
          console.error('Error fetching existing content:', error);
          alert('Error loading content for editing');
          navigate('/documentation');
        }
      }
    };

    const fetchTechnologies = async () => {
      try {
        const response = await axios.get('https://lamback.onrender.com/api/documentation/technologies');
        setTechnologies(response.data);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      }
    };
    fetchTechnologies();
    fetchExistingContent();
  }, [techSlug, topicSlug, navigate]);

  const handleTechnologySelect = (tech) => {
    setSelectedTechnology(tech);
    setFormData(prev => ({
      ...prev,
      name: tech.name,
      slug: tech.slug,
      description: tech.description,
      icon: tech.icon,
      order: tech.order
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Add Documentation</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Technology Details</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Existing Technology</label>
            <select
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors appearance-none cursor-pointer"
              onChange={(e) => {
                const tech = technologies.find(t => t.slug === e.target.value);
                if (tech) handleTechnologySelect(tech);
              }}
              value={selectedTechnology?.slug || ''}
            >
              <option value="" className="text-gray-500">Select a Technology or Create New</option>
              {technologies.map(tech => (
                <option key={tech.slug} value={tech.slug} className="text-gray-900">{tech.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-6">
            {!selectedTechnology && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleTechnologyChange}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleTechnologyChange}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleTechnologyChange}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                    rows="4"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                    <input
                      type="text"
                      name="icon"
                      value={formData.icon}
                      onChange={handleTechnologyChange}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Order</label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleTechnologyChange}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Topics</h2>
            <button
              type="button"
              onClick={addTopic}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Add Topic
            </button>
          </div>
          
          <div className="space-y-8">
            {formData.topics.map((topic, index) => (
              <div key={index} className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Topic {index + 1}</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={topic.title}
                        onChange={(e) => handleTopicChange(e, index)}
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                      <input
                        type="text"
                        name="slug"
                        value={topic.slug}
                        onChange={(e) => handleTopicChange(e, index)}
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  {index === currentTopic && (
                    <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                      <h4 className="text-lg font-semibold mb-4 text-gray-800">Add Content Block</h4>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                          <select
                            name="type"
                            value={contentBlock.type}
                            onChange={handleContentBlockChange}
                            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                          >
                            <option value="text">Text</option>
                            <option value="heading">Heading</option>
                            <option value="code">Code</option>
                            <option value="image">Image</option>
                            <option value="quote">Quote</option>
                            <option value="table">Table</option>
                            <option value="link">Link</option>
                            <option value="ordered-list">Ordered List</option>
                            <option value="unordered-list">Unordered List</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                          <textarea
                            name="content"
                            value={contentBlock.content}
                            onChange={handleContentBlockChange}
                            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                            rows="4"
                          />
                        </div>

                        {contentBlock.type === 'heading' && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Heading Level (1-6)</label>
                            <input
                              type="number"
                              name="metadata.level"
                              min="1"
                              max="6"
                              value={contentBlock.metadata.level || ''}
                              onChange={handleContentBlockChange}
                              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                            />
                          </div>
                        )}

                        {contentBlock.type === 'code' && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Programming Language</label>
                            <input
                              type="text"
                              name="metadata.language"
                              value={contentBlock.metadata.language || ''}
                              onChange={handleContentBlockChange}
                              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                            />
                          </div>
                        )}

                        {contentBlock.type === 'image' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Text</label>
                              <input
                                type="text"
                                name="metadata.alt"
                                value={contentBlock.metadata.alt || ''}
                                onChange={handleContentBlockChange}
                                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Caption</label>
                              <input
                                type="text"
                                name="metadata.caption"
                                value={contentBlock.metadata.caption || ''}
                                onChange={handleContentBlockChange}
                                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                              />
                            </div>
                          </div>
                        )}

                        

                        {contentBlock.type === 'quote' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Quote Text</label>
                              <textarea
                                name="content"
                                value={contentBlock.content}
                                onChange={handleContentBlockChange}
                                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                                rows="3"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                              <input
                                type="text"
                                name="metadata.author"
                                value={contentBlock.metadata.author || ''}
                                onChange={handleContentBlockChange}
                                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                              />
                            </div>
                          </div>
                        )}

                        {contentBlock.type === 'table' && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Table Data (JSON format)</label>
                            <textarea
                              name="content"
                              value={contentBlock.content}
                              onChange={handleContentBlockChange}
                              placeholder='[\n  ["Header 1", "Header 2"],\n  ["Row 1 Col 1", "Row 1 Col 2"]\n]'
                              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors font-mono"
                              rows="6"
                            />
                          </div>
                        )}

                        {(contentBlock.type === 'video' || contentBlock.type === 'link' || contentBlock.type === 'button') && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
                            <input
                              type="text"
                              name="metadata.url"
                              value={contentBlock.metadata.url || ''}
                              onChange={handleContentBlockChange}
                              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                            />
                          </div>
                        )}

                        {(contentBlock.type === 'ordered-list' || contentBlock.type === 'unordered-list') && (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">List Items (one per line)</label>
                            <textarea
                              name="content"
                              value={contentBlock.content}
                              onChange={handleContentBlockChange}
                              placeholder="Enter list items, one per line"
                              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-3 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                              rows="6"
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={addContentBlock}
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg font-medium"
                        >
                          Add Block
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Content Blocks:</h4>
                    <div className="space-y-3">
                      {topic.content.map((block, blockIndex) => (
                        <div key={blockIndex} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <div className="flex justify-between items-center">
                            <p className="text-sm">
                              <span className="font-semibold">{block.type}:</span> {Array.isArray(block.content) ? block.content.join(', ').substring(0, 50) : block.content.substring(0, 50)}...
                            </p>
                            <button
                              type="button"
                              onClick={() => removeContentBlock(index, blockIndex)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg font-medium text-lg"
          >
            Save Documentation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocumentation;
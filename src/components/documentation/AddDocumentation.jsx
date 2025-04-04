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

  const [tableData, setTableData] = useState({
    rows: 2,
    cols: 2,
    cells: [
      ['', ''],
      ['', '']
    ]
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
      if (value === 'table') {
        setTableData({
          rows: 2,
          cols: 2,
          cells: [
            ['', ''],
            ['', '']
          ]
        });
      }
      setContentBlock({
        type: value,
        content: '',
        metadata: value === 'ordered-list' || value === 'unordered-list' 
          ? { items: [''] } 
          : {}
      });
    } else if (name === 'list-item') {
      const index = parseInt(e.target.dataset.index);
      const newItems = [...(contentBlock.metadata.items || [])];
      newItems[index] = value;
      
      setContentBlock(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          items: newItems
        }
      }));
    } else if (name === 'add-list-item') {
      setContentBlock(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          items: [...(prev.metadata.items || []), '']
        }
      }));
    } else if (name === 'remove-list-item') {
      const index = parseInt(e.target.dataset.index);
      const newItems = contentBlock.metadata.items.filter((_, i) => i !== index);
      
      setContentBlock(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          items: newItems.length > 0 ? newItems : ['']
        }
      }));
    } else if (name.startsWith('metadata.')) {
      const metadataField = name.split('.')[1];
      setContentBlock(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [metadataField]: value
        }
      }));
    } else {
      setContentBlock(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTableChange = (rowIndex, colIndex, value) => {
    setTableData(prev => {
      const newCells = [...prev.cells];
      newCells[rowIndex][colIndex] = value;
      return {
        ...prev,
        cells: newCells
      };
    });
  };

  const addTableRow = () => {
    setTableData(prev => ({
      ...prev,
      rows: prev.rows + 1,
      cells: [...prev.cells, new Array(prev.cols).fill('')]
    }));
  };

  const removeTableRow = (rowIndex) => {
    if (tableData.rows <= 2) return; // Maintain minimum 2 rows
    setTableData(prev => ({
      ...prev,
      rows: prev.rows - 1,
      cells: prev.cells.filter((_, index) => index !== rowIndex)
    }));
  };

  const addTableColumn = () => {
    setTableData(prev => ({
      ...prev,
      cols: prev.cols + 1,
      cells: prev.cells.map(row => [...row, ''])
    }));
  };

  const removeTableColumn = (colIndex) => {
    if (tableData.cols <= 2) return; // Maintain minimum 2 columns
    setTableData(prev => ({
      ...prev,
      cols: prev.cols - 1,
      cells: prev.cells.map(row => row.filter((_, index) => index !== colIndex))
    }));
  };

  const addContentBlock = () => {
    if (!contentBlock.type) return;

    let isValid = true;
    const metadata = { ...contentBlock.metadata };

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
        // Validate table data
        const hasEmptyHeaders = tableData.cells[0].every(cell => cell.trim() === '');
        if (hasEmptyHeaders) {
          alert('Please add at least one header to the table');
          isValid = false;
          break;
        }

        // Filter out completely empty rows (except header)
        const filteredCells = [
          tableData.cells[0], // Keep header row
          ...tableData.cells.slice(1).filter(row => row.some(cell => cell.trim() !== ''))
        ];

        if (filteredCells.length < 2) {
          alert('Table must have at least one header row and one data row');
          isValid = false;
          break;
        }

        // Set the content as stringified table data
        contentBlock.content = JSON.stringify(filteredCells);
        break;
      
      case 'ordered-list':
      case 'unordered-list':
        if (!metadata.items || !metadata.items.filter(item => item.trim()).length) {
          alert('List must contain at least one non-empty item');
          isValid = false;
        } else {
          // Filter out empty items
          metadata.items = metadata.items.filter(item => item.trim());
        }
        break;

    }

    if (isValid) {
      setFormData(prev => {
        const updatedTopics = [...prev.topics];
        const newBlock = {
          type: contentBlock.type,
          content: contentBlock.content,
          metadata: metadata
        };
        
        updatedTopics[currentTopic].content.push(newBlock);
        return { ...prev, topics: updatedTopics };
      });

      // Reset content block and table data
      setContentBlock({
        type: 'text',
        content: '',
        metadata: {}
      });
      
      // Reset table data to default state
      setTableData({
        rows: 2,
        cols: 2,
        cells: [
          ['', ''],
          ['', '']
        ]
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
        // Process content blocks before submission
        const processedContent = topic.content.map(block => {
          if (block.type === 'ordered-list' || block.type === 'unordered-list') {
            const items = block.metadata.items.filter(item => item.trim() !== '');
            return {
              type: block.type,
              content: JSON.stringify(items), // Store items as JSON string in content
              metadata: {
                items: items
              }
            };
          }
          return block;
        });

        return {
          ...topic,
          content: processedContent
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
          const processedTopic = {
            ...topic,
            content: topic.content.map(block => {
              if (block.type === 'ordered-list' || block.type === 'unordered-list') {
                const items = block.metadata.items.filter(item => item.trim() !== '');
                return {
                  type: block.type,
                  content: JSON.stringify(items), // Store items as JSON string in content
                  metadata: {
                    items: items
                  }
                };
              }
              return block;
            })
          };

          await axios.post(`https://lamback.onrender.com/api/documentation/technologies/${formData.slug.trim().toLowerCase()}/topics`, processedTopic);
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

  const renderListInput = () => {
    if (contentBlock.type !== 'ordered-list' && contentBlock.type !== 'unordered-list') {
      return null;
    }

    return (
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          List Items
        </label>
        {contentBlock.metadata.items?.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm w-8">
              {contentBlock.type === 'ordered-list' ? `${index + 1}.` : '•'}
            </span>
            <input
              type="text"
              value={item}
              onChange={(e) => handleContentBlockChange({
                target: {
                  name: 'list-item',
                  value: e.target.value,
                  dataset: { index }
                }
              })}
              className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder={`Enter list item ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleContentBlockChange({
                target: {
                  name: 'remove-list-item',
                  dataset: { index }
                }
              })}
              className="p-2 text-red-600 hover:text-red-800 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleContentBlockChange({
            target: { name: 'add-list-item' }
          })}
          className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-indigo-600 hover:border-indigo-500 transition-colors flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add New Item</span>
        </button>
      </div>
    );
  };

  const renderContentBlockPreview = (block) => {
    if (block.type === 'table') {
      try {
        const tableData = JSON.parse(block.content);
        const headers = tableData[0].join(', ');
        return `Table with headers: ${headers}`;
      } catch (e) {
        return 'Invalid table data';
      }
    }
    if (block.type === 'ordered-list' || block.type === 'unordered-list') {
      const items = block.metadata?.items || [];
      return `${block.type}: ${items.join(', ').substring(0, 50)}${items.join(', ').length > 50 ? '...' : ''}`;
    }
    return `${block.type}: ${block.content?.substring(0, 50) || ''}${block.content?.length > 50 ? '...' : ''}`;
  };

  const validateTable = () => {
    // Check if headers are empty
    const hasEmptyHeaders = tableData.cells[0].every(cell => cell.trim() === '');
    if (hasEmptyHeaders) {
      return false;
    }

    // Check if there's at least one non-empty data row
    const hasDataRow = tableData.cells.slice(1).some(row => row.some(cell => cell.trim() !== ''));
    if (!hasDataRow) {
      return false;
    }

    return true;
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
                        
                        {renderListInput()}

                        {!['ordered-list', 'unordered-list'].includes(contentBlock.type) && (
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
                        )}

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
                          <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Table Editor</label>
                            
                            <div className="overflow-x-auto border rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {tableData.cells.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="divide-x divide-gray-200">
                                      {row.map((cell, colIndex) => (
                                        <td key={colIndex} className="p-2">
                                          <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) => handleTableChange(rowIndex, colIndex, e.target.value)}
                                            className="w-full border-0 focus:ring-2 focus:ring-indigo-500 rounded p-1"
                                            placeholder={rowIndex === 0 ? `Header ${colIndex + 1}` : `Cell ${rowIndex},${colIndex}`}
                                          />
                                        </td>
                                      ))}
                                      <td className="p-2 w-10">
                                        {rowIndex > 0 && (
                                          <button
                                            type="button"
                                            onClick={() => removeTableRow(rowIndex)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Remove row"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="flex space-x-4">
                              <button
                                type="button"
                                onClick={addTableRow}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center space-x-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                <span>Add Row</span>
                              </button>

                              <button
                                type="button"
                                onClick={addTableColumn}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                <span>Add Column</span>
                              </button>
                            </div>

                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              <span>First row will be treated as header row</span>
                            </div>
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
                              <span className="font-semibold">{block.type}:</span>{' '}
                              {renderContentBlockPreview(block)}
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
          <div className="space-y-4">
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg font-medium text-lg"
            >
              Save Documentation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDocumentation;
            
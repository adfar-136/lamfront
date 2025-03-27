import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';

const ProfileForm = ({ initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    image: '',
    skills: [],
    dob: '',
    education: [{
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      current: false
    }],
    phoneNumber: '',
    linkedinUrl: '',
    githubUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profile');
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch profile data');
      }
    };

    if (!initialData) {
      fetchProfile();
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put('/api/profile', formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onCancel) onCancel();
      }, 2000);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5242880) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({ ...formData, image: base64String });
      };
      reader.onerror = () => {
        setError('Error reading image file');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institution: '',
          degree: '',
          field: '',
          startYear: '',
          endYear: '',
          current: false
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-2xl space-y-8">
      <div className="flex justify-between items-center border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-6">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 mb-6">Profile updated successfully!</div>}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center space-x-8 bg-gray-50 p-6 rounded-xl">
          <div className="shrink-0">
            <img
              className="h-36 w-36 object-cover rounded-full border-4 border-white shadow-lg"
              src={formData.image || 'https://via.placeholder.com/128'}
              alt="Profile"
              onError={(e) => e.target.src = 'https://via.placeholder.com/128'}
            />
          </div>
          <label className="flex-1">
            <span className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</span>
            <input
              type="file"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 transition-colors"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills?.join(', ') || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  skills: e.target.value ? e.target.value.split(',').map(skill => skill.trim()) : []
                })}
                placeholder="Enter skills separated by commas"
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
            <button
              type="button"
              onClick={addEducation}
              className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              Add Education
            </button>
          </div>

          {formData.education.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Education #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-600 hover:text-red-800 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                  <input
                    type="number"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                  <input
                    type="number"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    disabled={edu.current}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={edu.current}
                    onChange={(e) => handleEducationChange(index, 'current', e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${index}`} className="text-sm text-gray-700">
                    Currently studying here
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t">
          <div className="flex justify-end space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
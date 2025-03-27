import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

const CompanyRequirementForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    contactPerson: '',
    phone: '',
    industryType: '',
    educatorRequirements: '',
    engagementMode: 'Live',
    startDate: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.industryType.trim()) newErrors.industryType = 'Industry type is required';
    if (!formData.educatorRequirements.trim()) newErrors.educatorRequirements = 'Educator requirements are required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await axiosInstance.post('/api/company-requirements', formData);
      setSubmitStatus({
        type: 'success',
        message: 'Your requirement has been submitted successfully! We will contact you soon.'
      });
      setFormData({
        companyName: '',
        email: '',
        contactPerson: '',
        phone: '',
        industryType: '',
        educatorRequirements: '',
        engagementMode: 'Live',
        startDate: '',
        additionalNotes: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-gray-200">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Hire Educators</h2>

          {/* Instructions Section */}
          <div className="mb-8 p-6 bg-red-50 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-3">Instructions</h3>
            <ul className="space-y-2 text-red-700">
              <li>• Please provide accurate company information to help us understand your organization better.</li>
              <li>• Ensure your contact details are current as we'll use these for communication.</li>
              <li>• Be specific about your educator requirements, including technical expertise and experience level.</li>
              <li>• The start date should be at least two weeks from today to ensure proper planning.</li>
              <li>• Additional notes can include specific technologies, teaching methodologies, or any special requirements.</li>
            </ul>
          </div>
          
          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded-md ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your company name"
                className={`mt-1 block w-full rounded-md shadow-sm p-3 ${errors.companyName ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200`}
              />
              {errors.companyName && <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`mt-1 block w-full rounded-md shadow-sm p-3 ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`mt-1 block w-full rounded-md shadow-sm p-3 ${errors.phone ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200`}
                />
                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Enter contact person's name"
                className={`mt-1 block w-full rounded-md shadow-sm p-3 ${errors.contactPerson ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200`}
              />
              {errors.contactPerson && <p className="mt-2 text-sm text-red-600">{errors.contactPerson}</p>}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="industryType" className="block text-sm font-semibold text-gray-700 mb-2">Industry Type</label>
              <input
                type="text"
                id="industryType"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                placeholder="e.g., Technology, Healthcare, Education"
                className={`mt-1 block w-full rounded-md shadow-sm p-3 ${errors.industryType ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200`}
              />
              {errors.industryType && <p className="mt-2 text-sm text-red-600">{errors.industryType}</p>}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="educatorRequirements" className="block text-sm font-semibold text-gray-700 mb-2">Educator Requirements</label>
              <textarea
                id="educatorRequirements"
                name="educatorRequirements"
                rows="4"
                value={formData.educatorRequirements}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm p-3 ${errors.educatorRequirements ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200`}
                placeholder="Please describe your requirements for educators (skills, experience, expertise areas)..."
              />
              {errors.educatorRequirements && <p className="mt-2 text-sm text-red-600">{errors.educatorRequirements}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label htmlFor="engagementMode" className="block text-sm font-semibold text-gray-700 mb-2">Engagement Mode</label>
                <select
                  id="engagementMode"
                  name="engagementMode"
                  value={formData.engagementMode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <option value="Live">Live</option>
                  <option value="Recorded">Recorded</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm p-3 ${errors.startDate ? 'border-red-300' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200`}
                />
                {errors.startDate && <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows="3"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md shadow-sm p-3 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200"
                placeholder="Any additional information you'd like to share..."
              ></textarea>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRequirementForm;
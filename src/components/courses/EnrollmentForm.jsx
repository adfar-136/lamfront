import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axios';

const EnrollmentForm = ({ course, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    selectedCourse: course?.title || 'Frontend Development Fundamentals',
    whatsappNumber: '',
    contactNumber: '',
    education: '',
    workStatus: 'student',
    preferredTime: 'morning',
    reason: ''
  });

  const courses = [
    'Frontend Development Fundamentals',
    'React.js Mastery',
    'Node.js Backend Development'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axiosInstance.post('/api/enrollments', formData);

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrollment Request Sent!</h2>
          <p className="text-gray-600 mb-6">
            We'll contact you on WhatsApp shortly to discuss the course details and next steps.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Enroll in Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Course</label>
              <select
                name="selectedCourse"
                value={formData.selectedCourse}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
              >
                {courses.map((courseName) => (
                  <option key={courseName} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsappNumber"
                required
                pattern="[0-9]{10}"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                placeholder="Enter WhatsApp number"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Alternate Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                pattern="[0-9]{10}"
                value={formData.contactNumber}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                placeholder="Optional alternate number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
              <input
                type="text"
                name="education"
                required
                value={formData.education}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                placeholder="Highest qualification"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Status</label>
              <select
                name="workStatus"
                value={formData.workStatus}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
              >
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Contact Time</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
              >
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 7 PM)</option>
              </select>
            </div>
          </div>

          {/* Full Width Fields */}
          <div className="col-span-2 space-y-6 mt-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Why do you want to take this course?</label>
              <textarea
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                rows="3"
                className="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                placeholder="Tell us your motivation..."
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium px-4 py-2 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 text-lg shadow-lg hover:shadow-xl"
            >
              {loading ? 'Submitting...' : 'Request Enrollment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm; 
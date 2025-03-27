import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import ProfileForm from './ProfileForm';

const DEFAULT_PROFILE_IMAGE = "https://placehold.co/400/DC2626/FFFFFF/png?text=User"; // Using red theme color

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/api/profile/user/${userId}`);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center min-h-screen flex items-center justify-center">{error}</div>;
  if (!profile) return <div className="text-center min-h-screen flex items-center justify-center">Profile not found</div>;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return <ProfileForm initialData={profile} onCancel={handleEditToggle} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <img
              className="h-40 w-40 object-cover rounded-full border-4 border-white shadow-xl"
              src={profile.image || DEFAULT_PROFILE_IMAGE}
              alt={profile.fullName || "User Profile"}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if default image also fails
                e.target.src = DEFAULT_PROFILE_IMAGE;
              }}
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{profile.fullName}</h1>
              <p className="text-red-100 text-lg">{profile.user.username}</p>
            </div>
            <button
              onClick={handleEditToggle}
              className="ml-auto bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Age</span>
                    <span className="font-medium text-gray-900">{profile.age}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gender</span>
                    <span className="font-medium text-gray-900 capitalize">{profile.gender}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-medium text-gray-900">{profile.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Birth Date</span>
                    <span className="font-medium text-gray-900">{new Date(profile.dob).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Professional Links</h2>
                <div className="space-y-3">
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                      </svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {profile.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>GitHub Profile</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {profile.skills && profile.skills.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.education && profile.education.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Education</h2>
                  <div className="space-y-6">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                        <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
                        <p className="text-gray-700 mt-1">{edu.degree} in {edu.field}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          {edu.startYear} - {edu.current ? 'Present' : edu.endYear}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const courses = [
  {
    id: 'web-development',
    title: 'Introduction to Web Development',
    description: 'Master the core fundamentals of modern web development. Learn HTML5, CSS3, and JavaScript through hands-on projects and real-world applications.',
    duration: '8 weeks',
    level: 'Beginner',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Web+Development'
  },
  {
    id: 'react-development',
    title: 'Advanced React Development',
    description: 'Take your React skills to the next level. Deep dive into hooks, state management, performance optimization, and advanced component patterns.',
    duration: '10 weeks',
    level: 'Advanced',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=React+Development'
  },
  {
    id: 'node-development',
    title: 'Backend Development with Node.js',
    description: 'Build robust and scalable backend applications. Learn Express.js, RESTful APIs, database integration, and server-side architecture.',
    duration: '12 weeks',
    level: 'Intermediate',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Node.js'
  },
  {
    id: 'aws-cloud',
    title: 'Cloud Computing with AWS',
    description: 'Master cloud computing fundamentals and AWS services. Learn to deploy, scale, and manage applications in the cloud environment.',
    duration: '10 weeks',
    level: 'Intermediate',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=AWS+Cloud'
  },
  {
    id: 'data-science',
    title: 'Data Science Fundamentals',
    description: 'Explore the world of data science. Learn Python, data analysis, visualization, and machine learning basics with practical projects.',
    duration: '14 weeks',
    level: 'Beginner',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Data+Science'
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description: 'Create cross-platform mobile applications using React Native. Build and deploy apps for iOS and Android platforms.',
    duration: '12 weeks',
    level: 'Intermediate',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Mobile+Development'
  }
];

const Courses = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Courses</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of expert-led courses designed to help you master the latest technologies and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link 
              key={course.id}
              to={`/courses/${course.id}`}
              className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col justify-between h-full"
            >
              <div>
                <div className="aspect-w-16 aspect-h-9 mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors">{course.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' : 
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-gray-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                <div className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300 transform group-hover:scale-[1.02] shadow-md group-hover:shadow-lg text-center">
                  View Course Details
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
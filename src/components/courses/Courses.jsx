import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const courses = [
  {
    id: 'frontend-fundamentals',
    title: 'Frontend Development Fundamentals',
    description: 'Master HTML5, CSS3, and JavaScript with practical projects. Learn modern web development practices, responsive design, and build interactive websites from scratch.',
    duration: '12 weeks',
    level: 'Beginner',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Frontend+Development',
    price: '₹4,999'
  },
  {
    id: 'react-mastery',
    title: 'React.js Mastery',
    description: 'Become a React expert. Learn hooks, context API, Redux, Next.js, and build production-ready applications with industry best practices.',
    duration: '16 weeks',
    level: 'Intermediate',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=React.js+Mastery',
    price: '₹7,999'
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js. Master Express.js, MongoDB, RESTful APIs, authentication, and deployment.',
    duration: '14 weeks',
    level: 'Intermediate',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Node.js+Backend',
    price: '₹6,999'
  }
];

const Courses = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Transform Your Career with Our Courses</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industry-relevant curriculum designed by experienced developers. Learn through hands-on projects and real-world applications.
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
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{course.duration}</span>
                  </div>
                  <span className="font-semibold text-red-600">{course.price}</span>
                </div>
                <div className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300 transform group-hover:scale-[1.02] shadow-md group-hover:shadow-lg text-center">
                  Explore Course
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
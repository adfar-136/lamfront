import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const courses = {
  'web-development': {
    title: 'Introduction to Web Development',
    description: 'Master the core fundamentals of modern web development. Learn HTML5, CSS3, and JavaScript through hands-on projects and real-world applications.',
    duration: '8 weeks',
    level: 'Beginner',
    image: 'https://placehold.co/600x400/3730A3/FFFFFF/png?text=Web+Development',
    instructor: {
      name: 'John Smith',
      role: 'Senior Web Developer',
      image: 'https://placehold.co/200x200/3730A3/FFFFFF/png?text=JS'
    },
    prerequisites: [
      'Basic computer knowledge',
      'Understanding of internet concepts',
      'No prior coding experience required'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Introduction to HTML5',
        topics: [
          'Understanding web fundamentals',
          'HTML document structure',
          'Working with text and links',
          'Images and multimedia'
        ]
      },
      {
        week: 2,
        title: 'Styling with CSS3',
        topics: [
          'CSS syntax and selectors',
          'Box model and layouts',
          'Colors and typography',
          'Responsive design basics'
        ]
      },
      {
        week: 3,
        title: 'JavaScript Fundamentals',
        topics: [
          'Variables and data types',
          'Control structures',
          'Functions and scope',
          'DOM manipulation'
        ]
      },
      {
        week: 4,
        title: 'Advanced JavaScript',
        topics: [
          'ES6+ features',
          'Promises and async/await',
          'Error handling',
          'Working with APIs'
        ]
      },
      {
        week: 5,
        title: 'Frontend Frameworks',
        topics: [
          'Introduction to React',
          'Components and props',
          'State management',
          'Routing'
        ]
      },
      {
        week: 6,
        title: 'Backend Basics',
        topics: [
          'Server concepts',
          'RESTful APIs',
          'Database fundamentals',
          'Authentication basics'
        ]
      },
      {
        week: 7,
        title: 'Project Development',
        topics: [
          'Project planning',
          'Implementation',
          'Testing and debugging',
          'Performance optimization'
        ]
      },
      {
        week: 8,
        title: 'Deployment and Beyond',
        topics: [
          'Deployment strategies',
          'Version control with Git',
          'CI/CD basics',
          'Career guidance'
        ]
      }
    ],
    outcomes: [
      'Build responsive websites from scratch',
      'Understand modern web development practices',
      'Create interactive web applications',
      'Work with popular development tools',
      'Deploy and maintain web applications'
    ]
  },
  'react-development': {
    title: 'Advanced React Development',
    description: 'Take your React skills to the next level. Deep dive into hooks, state management, performance optimization, and advanced component patterns.',
    duration: '10 weeks',
    level: 'Advanced',
    image: 'https://placehold.co/600x400/3730A3/FFFFFF/png?text=React+Development',
    instructor: {
      name: 'Sarah Johnson',
      role: 'React Technical Lead',
      image: 'https://placehold.co/200x200/3730A3/FFFFFF/png?text=SJ'
    },
    prerequisites: [
      'Solid understanding of JavaScript',
      'Basic React knowledge',
      'Experience with npm/yarn',
      'Familiarity with ES6+ features'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Modern React Fundamentals',
        topics: [
          'React 18 features',
          'Virtual DOM and Fiber',
          'JSX in depth',
          'Component lifecycle'
        ]
      },
      {
        week: 2,
        title: 'Hooks Mastery',
        topics: [
          'useState and useEffect',
          'Custom hooks',
          'Context and reducers',
          'Performance hooks'
        ]
      },
      {
        week: 3,
        title: 'State Management',
        topics: [
          'Redux toolkit',
          'Zustand',
          'Jotai',
          'State management patterns'
        ]
      },
      {
        week: 4,
        title: 'Performance Optimization',
        topics: [
          'React profiler',
          'Memo and callbacks',
          'Code splitting',
          'Lazy loading'
        ]
      },
      {
        week: 5,
        title: 'Testing and Quality',
        topics: [
          'Jest and React Testing Library',
          'Integration testing',
          'E2E with Cypress',
          'Test-driven development'
        ]
      },
      {
        week: 6,
        title: 'Advanced Patterns',
        topics: [
          'Compound components',
          'Render props',
          'Higher-order components',
          'Custom hooks patterns'
        ]
      },
      {
        week: 7,
        title: 'Data Fetching',
        topics: [
          'React Query',
          'SWR',
          'GraphQL with Apollo',
          'Data caching strategies'
        ]
      },
      {
        week: 8,
        title: 'Animation and Styling',
        topics: [
          'Framer Motion',
          'CSS-in-JS',
          'Styled Components',
          'Animation patterns'
        ]
      },
      {
        week: 9,
        title: 'Advanced Routing',
        topics: [
          'React Router v6',
          'Protected routes',
          'Route transitions',
          'Data routing'
        ]
      },
      {
        week: 10,
        title: 'Project and Deployment',
        topics: [
          'Project architecture',
          'Performance monitoring',
          'Deployment strategies',
          'Maintenance and updates'
        ]
      }
    ],
    outcomes: [
      'Build complex React applications',
      'Implement advanced state management',
      'Optimize React performance',
      'Create reusable component libraries',
      'Deploy and monitor React apps'
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const course = courses[courseId];

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <p className="mt-2 text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' : course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {course.level}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-6">
                {course.curriculum.map((week) => (
                  <div key={week.week} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Week {week.week}: {week.title}
                    </h3>
                    <ul className="space-y-3">
                      {week.topics.map((topic, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h2>
              <div className="flex items-center">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{course.instructor.name}</h3>
                  <p className="text-gray-600">{course.instructor.role}</p>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h2>
              <ul className="space-y-3">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enroll Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
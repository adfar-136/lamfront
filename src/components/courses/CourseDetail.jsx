import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EnrollmentForm from './EnrollmentForm';

const courses = {
  'frontend-fundamentals': {
    title: 'Frontend Development Fundamentals',
    description: 'A comprehensive course covering HTML5, CSS3, and JavaScript. Learn to build modern, responsive websites from scratch. This course combines theoretical knowledge with practical projects to ensure you are job-ready.',
    duration: '12 weeks',
    level: 'Beginner',
    price: '₹4,999',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Frontend+Development',
    instructor: {
      name: 'Adfar Rasheed',
      role: 'Senior Frontend Developer',
      image: 'https://placehold.co/200x200/DC2626/FFFFFF/png?text=AR',
      bio: 'With over 6 years of experience in frontend development, Adfar has worked with numerous startups and enterprises, helping them build scalable web applications.'
    },
    prerequisites: [
      'Basic computer knowledge',
      'Understanding of internet concepts',
      'No prior coding experience required',
      'Laptop with internet connection'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Web Development Fundamentals & HTML5',
        topics: [
          'Understanding how the web works',
          'HTML5 document structure and semantics',
          'Forms and validation',
          'SEO best practices'
        ]
      },
      {
        week: 2,
        title: 'CSS3 Fundamentals',
        topics: [
          'CSS selectors and specificity',
          'Box model and layouts',
          'Flexbox and Grid systems',
          'Responsive design principles'
        ]
      },
      {
        week: 3,
        title: 'CSS Advanced Concepts',
        topics: [
          'CSS animations and transitions',
          'CSS variables and custom properties',
          'CSS preprocessors (SASS)',
          'CSS frameworks introduction'
        ]
      },
      {
        week: 4,
        title: 'JavaScript Basics',
        topics: [
          'Variables, data types, and operators',
          'Control structures and loops',
          'Functions and scope',
          'Arrays and objects'
        ]
      },
      {
        week: 5,
        title: 'JavaScript DOM Manipulation',
        topics: [
          'DOM traversal and manipulation',
          'Event handling',
          'Local storage',
          'Form validation with JavaScript'
        ]
      },
      {
        week: 6,
        title: 'Modern JavaScript',
        topics: [
          'ES6+ features',
          'Promises and async/await',
          'Fetch API and AJAX',
          'Error handling'
        ]
      },
      {
        week: 7,
        title: 'Responsive Web Design',
        topics: [
          'Mobile-first design approach',
          'Media queries',
          'Responsive images and videos',
          'CSS Grid layouts'
        ]
      },
      {
        week: 8,
        title: 'Web Performance',
        topics: [
          'Performance optimization techniques',
          'Image optimization',
          'Lazy loading',
          'Caching strategies'
        ]
      },
      {
        week: 9,
        title: 'Version Control & Deployment',
        topics: [
          'Git basics',
          'GitHub workflow',
          'Deployment platforms',
          'CI/CD introduction'
        ]
      },
      {
        week: 10,
        title: 'Frontend Build Tools',
        topics: [
          'NPM basics',
          'Webpack fundamentals',
          'Babel configuration',
          'Development workflows'
        ]
      },
      {
        week: 11,
        title: 'Project Week 1',
        topics: [
          'Portfolio website development',
          'E-commerce homepage creation',
          'Code review sessions',
          'Performance optimization'
        ]
      },
      {
        week: 12,
        title: 'Project Week 2 & Career Prep',
        topics: [
          'Project completion and deployment',
          'Code documentation',
          'Portfolio preparation',
          'Interview preparation'
        ]
      }
    ],
    outcomes: [
      'Build responsive websites from scratch',
      'Implement modern CSS layouts using Flexbox and Grid',
      'Create interactive web applications using JavaScript',
      'Debug and optimize frontend code',
      'Deploy websites to production',
      'Work with version control systems',
      'Create a professional portfolio'
    ],
    projects: [
      'Personal Portfolio Website',
      'E-commerce Product Page',
      'Interactive Dashboard',
      'Social Media Clone'
    ]
  },
  'react-mastery': {
    title: 'React.js Mastery',
    description: 'Advanced React course covering modern practices, state management, and production-ready application development. Learn from real-world projects and industry experts.',
    duration: '16 weeks',
    level: 'Intermediate',
    price: '₹7,999',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=React+Mastery',
    instructor: {
      name: 'Rishabh Sharma',
      role: 'Lead React Developer',
      image: 'https://placehold.co/200x200/DC2626/FFFFFF/png?text=RS',
      bio: 'Rishabh is a seasoned React developer with 5+ years of experience in building large-scale applications. He currently leads frontend development at a prominent tech startup.'
    },
    prerequisites: [
      'Strong JavaScript fundamentals',
      'Understanding of HTML & CSS',
      'Basic command line knowledge',
      'Familiarity with Git'
    ],
    curriculum: [
      {
        week: 1,
        title: 'React Fundamentals',
        topics: [
          'Introduction to React and its ecosystem',
          'Virtual DOM and JSX',
          'Components and props',
          'State and lifecycle methods'
        ]
      },
      {
        week: 2,
        title: 'React Hooks Deep Dive',
        topics: [
          'useState and useEffect',
          'Custom hooks development',
          'useContext and useReducer',
          'Performance hooks'
        ]
      },
      {
        week: 3,
        title: 'Advanced Component Patterns',
        topics: [
          'Higher-Order Components',
          'Render Props',
          'Component Composition',
          'Error Boundaries'
        ]
      },
      {
        week: 4,
        title: 'State Management',
        topics: [
          'Context API patterns',
          'Redux fundamentals',
          'Redux Toolkit',
          'Zustand and alternatives'
        ]
      },
      {
        week: 5,
        title: 'Routing & Navigation',
        topics: [
          'React Router v6',
          'Protected routes',
          'Dynamic routing',
          'Navigation patterns'
        ]
      },
      {
        week: 6,
        title: 'Forms & Validation',
        topics: [
          'Form handling patterns',
          'React Hook Form',
          'Formik and Yup',
          'Advanced validation'
        ]
      },
      {
        week: 7,
        title: 'API Integration',
        topics: [
          'Axios and API calls',
          'React Query',
          'SWR for data fetching',
          'Error handling patterns'
        ]
      },
      {
        week: 8,
        title: 'Testing React Applications',
        topics: [
          'Jest and React Testing Library',
          'Component testing',
          'Integration testing',
          'E2E testing with Cypress'
        ]
      },
      {
        week: 9,
        title: 'Performance Optimization',
        topics: [
          'React profiler',
          'Code splitting',
          'Lazy loading',
          'Memoization techniques'
        ]
      },
      {
        week: 10,
        title: 'Styling in React',
        topics: [
          'CSS-in-JS',
          'Styled Components',
          'Tailwind CSS',
          'Theme management'
        ]
      },
      {
        week: 11,
        title: 'Next.js Fundamentals',
        topics: [
          'Server-side rendering',
          'Static site generation',
          'API routes',
          'Next.js features'
        ]
      },
      {
        week: 12,
        title: 'Authentication & Authorization',
        topics: [
          'JWT implementation',
          'OAuth integration',
          'Role-based access',
          'Security best practices'
        ]
      },
      {
        week: 13,
        title: 'Deployment & CI/CD',
        topics: [
          'Build optimization',
          'Deployment strategies',
          'CI/CD pipeline setup',
          'Monitoring and analytics'
        ]
      },
      {
        week: 14,
        title: 'Project Week 1',
        topics: [
          'E-commerce application',
          'State management implementation',
          'API integration',
          'Testing setup'
        ]
      },
      {
        week: 15,
        title: 'Project Week 2',
        topics: [
          'Dashboard development',
          'Performance optimization',
          'Authentication implementation',
          'Error handling'
        ]
      },
      {
        week: 16,
        title: 'Project Completion & Career Prep',
        topics: [
          'Project deployment',
          'Documentation',
          'Code review',
          'Interview preparation'
        ]
      }
    ],
    outcomes: [
      'Build complex React applications',
      'Implement advanced state management',
      'Create reusable component libraries',
      'Master React hooks and patterns',
      'Deploy and optimize React apps',
      'Write testable React code',
      'Work with Next.js'
    ],
    projects: [
      'E-commerce Platform',
      'Admin Dashboard',
      'Social Media Application',
      'Real-time Chat Application'
    ]
  },
  'nodejs-backend': {
    title: 'Node.js Backend Development',
    description: 'Master backend development with Node.js. Learn to build scalable servers, RESTful APIs, handle authentication, and work with databases.',
    duration: '14 weeks',
    level: 'Intermediate',
    price: '₹6,999',
    image: 'https://placehold.co/600x400/DC2626/FFFFFF/png?text=Node.js+Backend',
    instructor: {
      name: 'Adfar Rasheed',
      role: 'Full Stack Developer',
      image: 'https://placehold.co/200x200/DC2626/FFFFFF/png?text=AR',
      bio: 'Adfar brings his extensive experience in both frontend and backend development, specializing in building scalable Node.js applications and microservices.'
    },
    prerequisites: [
      'JavaScript fundamentals',
      'Understanding of async programming',
      'Basic understanding of databases',
      'Command line familiarity'
    ],
    curriculum: [
      {
        week: 1,
        title: 'Node.js Fundamentals',
        topics: [
          'Node.js architecture',
          'Event loop and async programming',
          'Modules and npm',
          'File system operations'
        ]
      },
      {
        week: 2,
        title: 'Express.js Framework',
        topics: [
          'Express.js basics',
          'Routing and middleware',
          'Error handling',
          'Template engines'
        ]
      },
      {
        week: 3,
        title: 'RESTful API Development',
        topics: [
          'REST principles',
          'API design patterns',
          'CRUD operations',
          'API documentation'
        ]
      },
      {
        week: 4,
        title: 'Database Integration',
        topics: [
          'MongoDB setup',
          'Mongoose ODM',
          'Schema design',
          'CRUD operations'
        ]
      },
      {
        week: 5,
        title: 'Authentication & Authorization',
        topics: [
          'JWT implementation',
          'Passport.js',
          'OAuth integration',
          'Role-based access'
        ]
      },
      {
        week: 6,
        title: 'Advanced MongoDB',
        topics: [
          'Aggregation pipeline',
          'Indexing',
          'Transactions',
          'Performance optimization'
        ]
      },
      {
        week: 7,
        title: 'Security',
        topics: [
          'Common vulnerabilities',
          'Security best practices',
          'Data validation',
          'Rate limiting'
        ]
      },
      {
        week: 8,
        title: 'File Upload & Processing',
        topics: [
          'Multer implementation',
          'Image processing',
          'Cloud storage',
          'Stream handling'
        ]
      },
      {
        week: 9,
        title: 'Email & Notifications',
        topics: [
          'Nodemailer setup',
          'Email templates',
          'Push notifications',
          'SMS integration'
        ]
      },
      {
        week: 10,
        title: 'Testing',
        topics: [
          'Unit testing with Jest',
          'Integration testing',
          'API testing',
          'Test coverage'
        ]
      },
      {
        week: 11,
        title: 'Deployment & DevOps',
        topics: [
          'Docker basics',
          'CI/CD pipeline',
          'Cloud deployment',
          'Monitoring'
        ]
      },
      {
        week: 12,
        title: 'Performance & Scaling',
        topics: [
          'Caching strategies',
          'Load balancing',
          'Microservices intro',
          'Database scaling'
        ]
      },
      {
        week: 13,
        title: 'Project Week 1',
        topics: [
          'E-commerce backend',
          'Payment integration',
          'Order management',
          'User system'
        ]
      },
      {
        week: 14,
        title: 'Project Week 2 & Career Prep',
        topics: [
          'Project completion',
          'Documentation',
          'Deployment',
          'Interview preparation'
        ]
      }
    ],
    outcomes: [
      'Build scalable Node.js applications',
      'Design and implement RESTful APIs',
      'Work with MongoDB and Mongoose',
      'Implement authentication systems',
      'Deploy and monitor Node.js apps',
      'Handle file uploads and processing',
      'Implement security best practices'
    ],
    projects: [
      'E-commerce Backend',
      'Social Media API',
      'Content Management System',
      'Real-time Chat Backend'
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const course = courses[courseId];
  const [showEnrollForm, setShowEnrollForm] = useState(false);

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
              <button 
                onClick={() => setShowEnrollForm(true)}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEnrollForm && (
        <EnrollmentForm 
          course={course} 
          onClose={() => setShowEnrollForm(false)} 
        />
      )}
    </div>
  );
};

export default CourseDetail;
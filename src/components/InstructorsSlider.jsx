import React from 'react';
import { Link } from 'react-router-dom';

const instructors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'AI & Machine Learning Expert',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=SC',
    bio: 'Former Google AI researcher with 10+ years of experience in machine learning and deep learning.',
    linkedin: 'https://linkedin.com/in/sarahchen',
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    role: 'Full Stack Development Lead',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=AR',
    bio: 'Tech lead at Amazon, specialized in scalable web applications and cloud architecture.',
    linkedin: 'https://linkedin.com/in/alexrodriguez',
  },
  {
    id: 3,
    name: 'Dr. Maya Patel',
    role: 'Cloud Architecture Specialist',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=MP',
    bio: 'AWS certified solutions architect with extensive experience in cloud computing and DevOps.',
    linkedin: 'https://linkedin.com/in/mayapatel',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Cybersecurity Expert',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=JW',
    bio: 'Former NSA security analyst, specializing in application security and ethical hacking.',
    linkedin: 'https://linkedin.com/in/jameswilson',
  },
  {
    id: 5,
    name: 'Emma Zhang',
    role: 'Mobile Development Guru',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=EZ',
    bio: 'Lead mobile developer at Spotify, expert in React Native and native app development.',
    linkedin: 'https://linkedin.com/in/emmazhang',
  },
];

const InstructorsSlider = () => {
  const scrollContainer = React.useRef(null);

  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold tracking-wide uppercase">Meet Our Experts</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Learn from Industry Leaders
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our instructors bring real-world expertise and industry experience to every course.
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-indigo-600/30 hover:bg-indigo-600/50 text-white p-2 rounded-full transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-indigo-600/30 hover:bg-indigo-600/50 text-white p-2 rounded-full transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div ref={scrollContainer} className="flex overflow-x-auto space-x-8 pb-8 hide-scrollbar">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="flex-none w-80 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="p-6 text-center">
                  <div className="mb-4">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-100 shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-indigo-600 font-medium mb-3">{instructor.role}</p>
                  <p className="text-gray-600 mb-4 text-sm">{instructor.bio}</p>
                  <a
                    href={instructor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Connect on LinkedIn
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default InstructorsSlider;
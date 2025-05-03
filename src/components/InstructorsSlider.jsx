import React from 'react';
import { Link } from 'react-router-dom';

const instructors = [
  {
    id: 1,
    name: 'Adfar Rasheed',
    role: 'AI & MERN Stack Expert',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=AR',
    bio: 'Founder of Variableverse, MERN Stack instructor & Generative AI educator with 7+ years of experience.',
    linkedin: 'https://www.linkedin.com/in/adfar-rasheed/',
  },
  {
      id: 2,
      name: 'Mustansir Nisar',
      role: 'AI & Machine Learning Expert',
      image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=MN',
      bio: 'Artificial Intelligence and Machine Learning Researcher with 3+ years of experience specializing in AI, ML, and Deep Learning.',
      linkedin: 'https://www.linkedin.com/in/mustansirnisar',
    }
  ,
  {
    id: 3,
    name: 'Mohammad Idrees',
    role: 'Tech Skills Trainer',
    image: 'https://placehold.co/400x400/10B981/FFFFFF/png?text=MI',
    bio: 'Senior EdTech Consultant, SME for AI/ML, Data Analytics trainer at Takeo, UI/UX trainer at UpGrad.',
    linkedin: 'https://www.linkedin.com/in/midreesbhat',
  },
  {
    id: 4,
    name: 'Dinesh Shah',
    role: 'SDE-2',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=DS',
    bio: 'Software Development Engineer at Tekion Corp with 2+ years of experience in building scalable web applications and microservices using the MERN stack.',
    linkedin: 'https://www.linkedin.com/in/dinesh-shah-02b10921b/',
  },
  {
    id: 5,
    name: 'Jitmanew Tyagi',
    role: 'SDE-2',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=JT',
    bio: 'Software Development Engineer 2 at AstroTalk, with past experience at 6thStreet and Pepcoding, specializing in scalable backend systems, financial services, and user retention solutions.',
    linkedin: 'https://www.linkedin.com/in/jitmanew-tyagi/',
  },
  {
    id: 6,
    name: 'Shivendu Tyagi',
    role: 'Developer',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=ST',
    bio: 'Developer at Brevo with 3.5 years of teaching experience, a strong foundation in DSA, and a career journey from QA to software development.',
    linkedin: 'https://www.linkedin.com/in/shivendu-tyagi/',
  },
  {
    id: 7,
    name: 'Shubham Shrivastava',
    role: 'Software Developer',
    image: 'https://placehold.co/400x400/4F46E5/FFFFFF/png?text=SS',
    bio: 'Software Developer at Extramarks with 10+ years of diverse experience across web development, manufacturing operations, and security systems, skilled in MERN stack, Django, and agile methodologies.',
    linkedin: 'https://www.linkedin.com/in/shivendu-tyagi/', // Note: This LinkedIn is duplicated from Shivendu; you may want to update it.
  }
  
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
          <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-semibold tracking-wide uppercase">Meet Our Experts</h2>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600/30 hover:bg-red-600/50 text-white p-2 rounded-full transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600/30 hover:bg-red-600/50 text-white p-2 rounded-full transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                      className="w-32 h-32 mx-auto rounded-full border-4 border-red-100 shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                  <p className="text-red-600 font-medium mb-3">{instructor.role}</p>
                  <p className="text-gray-600 mb-4 text-sm">{instructor.bio}</p>
                  <a
                    href={instructor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
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
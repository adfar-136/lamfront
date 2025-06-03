import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
  const services = [
    {
      title: 'Outsourcing Educators',
      description: 'Connect with technical trainers, mock interviewers, and subject experts for your company needs.',
      icon: (
        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Live & Recorded Courses',
      description: 'Cost-efficient courses in MERN Stack, Data Science, DSA, Python, ML, and more.',
      icon: (
        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Industry-Level Training',
      description: 'Hands-on projects and real-world problem-solving for job readiness.',
      icon: (
        <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  const highlights = [
    {
      title: 'Affordable & High-Quality Learning',
      description: 'Best courses at competitive prices.',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Expert Trainers',
      description: 'Learn from top industry professionals with real-world experience.',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Career-Oriented Approach',
      description: 'Structured learning paths, interview prep, and placement support.',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Flexibility',
      description: 'Live classes, self-paced learning, and accessible resources.',
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Adfar Rasheed',
      role: 'AI & MERN Stack Expert',
      image: 'adfar.jpg',
      bio: 'Founder of Variableverse, MERN Stack instructor & Generative AI educator with 7+ years of experience.',
      linkedin: 'https://www.linkedin.com/in/adfar-rasheed/',
    },
    
    {
      id: 2,
      name: 'Mohammad Idrees',
      role: 'Tech Skills Trainer',
      image: 'idrees.jpg',
      bio: 'Senior EdTech Consultant, SME for AI/ML, Data Analytics trainer at Takeo, UI/UX trainer at UpGrad.',
      linkedin: 'https://www.linkedin.com/in/midreesbhat',
    },
    {
      id: 3,
      name: 'Dinesh Shah',
      role: 'SDE-2',
      image: 'Dinesh.png',
      bio: 'Software Development Engineer at Tekion Corp with 2+ years of experience in building scalable web applications and microservices using the MERN stack.',
      linkedin: 'https://www.linkedin.com/in/dinesh-shah-02b10921b/',
    },
    {
      id: 4,
      name: 'Jitmanew Tyagi',
      role: 'SDE-2',
      image: 'Jitmanew.png',
      bio: 'Software Development Engineer 2 at AstroTalk, with past experience at 6thStreet and Pepcoding, specializing in scalable backend systems, financial services, and user retention solutions.',
      linkedin: 'https://www.linkedin.com/in/jitmanew-tyagi/',
    },
    {
      id: 5,
      name: 'Mustansir Nisar',
      role: 'AI & Machine Learning Expert',
      image: 'mustansir.jpg',
      bio: 'Artificial Intelligence and Machine Learning Researcher with 3+ years of experience specializing in AI, ML, and Deep Learning.',
      linkedin: 'https://www.linkedin.com/in/mustansirnisar',
    }
  ,
    {
      id: 6,
      name: 'Shivendu Tyagi',
      role: 'Developer',
      image: 'Shivendu.png',
      bio: 'Developer at Brevo with 3.5 years of teaching experience, a strong foundation in DSA, and a career journey from QA to software development.',
      linkedin: 'https://www.linkedin.com/in/shivendu-tyagi/',
    },
    {
      id: 7,
      name: 'Divya Goyal',
      role: 'MERN Stack Instructor',
      image: 'divya.jpg',
      bio: 'Experienced MERN Stack developer and mentor passionate about building scalable web applications.',
      linkedin: 'https://www.linkedin.com/in/divya-goyal/', // Replace with actual LinkedIn URL if available
    },
    {
      id: 8,
      name: 'Ankit Prajapati',
      role: 'DSA Instructor',
      image: 'AnkitP.png',
      bio: 'Skilled in Data Structures & Algorithms with a strong background in problem solving and teaching.',
      linkedin: 'https://www.linkedin.com/in/ankit-prajapati/', // Replace with actual LinkedIn URL if available
    },
    {
      id: 9,
      name: 'Akash Singh',
      role: 'DSA Instructor',
      image: 'akash.jpeg',
      bio: 'Passionate about competitive programming and teaching core computer science fundamentals.',
      linkedin: 'https://www.linkedin.com/in/akash-singh-b18153120/', // Replace with actual LinkedIn URL if available
    },
    {
      id: 10,
      name: 'Rishabh Shukla',
      role: 'DSA Instructor',
      image: 'rishabh.jpg',
      bio: 'Expert in algorithmic thinking with a focus on helping students crack coding interviews.',
      linkedin: 'https://www.linkedin.com/in/rishabh-shukla/', // Replace with actual LinkedIn URL if available
    },
    {
      id: 11,
      name: 'Vishnu Mohan Singh',
      role: 'Java Full Stack Instructor',
      image: 'vishnu.jpg',
      bio: 'Proficient Java Full Stack developer and educator with a passion for backend technologies.',
      linkedin: 'https://www.linkedin.com/in/vishnu-mohan-singh/', // Replace with actual LinkedIn URL if available
    },
    {
      id: 12,
      name: 'Vikash Tiwary',
      role: 'Java Full Stack Instructor',
      image: 'vikash.jpg',
      bio: 'Dedicated full stack Java instructor focused on real-world application and hands-on learning.',
      linkedin: 'https://www.linkedin.com/in/vikash-tiwary/', // Replace with actual LinkedIn URL if available
    },    
    {
      id: 13,
      name: 'Shubham Shrivastava',
      role: 'Software Developer',
      image: 'Shubham.png',
      bio: 'Software Developer at Extramarks with 10+ years of diverse experience across web development, manufacturing operations, and security systems, skilled in MERN stack, Django, and agile methodologies.',
      linkedin: 'https://www.linkedin.com/in/shivendu-tyagi/', // Note: This LinkedIn is duplicated from Shivendu; you may want to update it.
    }
  ];

  const [teamScrollContainer, setTeamScrollContainer] = React.useState(null);

  const scroll = (direction, container) => {
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
            >
              <span className="block mb-2">Transforming Tech Education</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">For a Better Tomorrow</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 max-w-lg mx-auto text-xl text-gray-600 sm:text-2xl md:mt-8 md:max-w-3xl"
            >
              Lamicons is revolutionizing tech education by making it accessible, practical, and industry-aligned. Our mission is to empower the next generation of tech leaders through innovative learning experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 flex justify-center space-x-4"
            >
              <Link
                to="/courses"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-red-600 bg-white hover:bg-gray-50 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
              >
                Explore Courses
              </Link>
              <Link
                to="/hire-educators"
                className="inline-flex items-center px-8 py-3 border-2 border-red-600 text-base font-medium rounded-lg text-red-600 hover:bg-red-50 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
              >
                Hire Educators
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-50"></div>
      </motion.section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">What We Do</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Learning Solutions
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="rounded-full bg-white p-2 shadow-lg">
                      {service.icon}
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <h3 className="text-xl font-medium text-gray-900">{service.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* Highlights Section
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Key Highlights
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-4">{highlight.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-base text-gray-500">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Our Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-semibold tracking-wide uppercase">Meet Our Team</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                The People Behind Lamicons
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Get to know the passionate individuals driving our mission to revolutionize tech education.
              </p>
            </div>

            <div className="relative group">
              <button
                onClick={() => scroll('left', teamScrollContainer)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600/30 hover:bg-red-600/50 text-white p-2 rounded-full transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => scroll('right', teamScrollContainer)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600/30 hover:bg-red-600/50 text-white p-2 rounded-full transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div ref={el => setTeamScrollContainer(el)} className="flex overflow-x-auto space-x-8 pb-8 hide-scrollbar">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex-none w-80 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="p-6 text-center">
                      <div className="mb-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 mx-auto rounded-full border-4 border-red-100 shadow-lg"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-red-600 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 mb-4 text-sm">{member.bio}</p>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                        >
                          LinkedIn
                          <svg
                            className="ml-2 -mr-1 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                           <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.205v4.25h-2.666V7.33h2.55v1.17h.035c.358-.678 1.225-1.387 2.52-1.387 2.695 0 3.193 1.773 3.193 4.079v4.667zM5.337 7.33H2.67v9.008h2.667V7.33zM4.002 6.354a1.348 1.348 0 110-2.696 1.348 1.348 0 010 2.696z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Highlights Section */}
       <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empowering Through Education
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We believe in making quality tech education accessible to everyone, everywhere.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative bg-gradient-to-br from-red-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="rounded-full bg-white p-2 shadow-lg">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Access</h3>
                <p className="text-gray-600">Breaking down barriers to education with our user-friendly platform and flexible learning options.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative bg-gradient-to-br from-red-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="rounded-full bg-white p-2 shadow-lg">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Efficiency</h3>
                <p className="text-gray-600">Providing high-quality education at competitive prices to ensure affordability for all learners.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative bg-gradient-to-br from-red-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="rounded-full bg-white p-2 shadow-lg">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Student-Centric</h3>
                <p className="text-gray-600">Focusing on student success with personalized learning paths and comprehensive support systems.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

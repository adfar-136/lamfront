import React from 'react';
import { Link } from 'react-router-dom';
import TeamSection from './TeamSection';
import InstructorsSlider from './InstructorsSlider';
import styles from './styles';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <style>{styles.jsx}</style>
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-5rem)]">
        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full lg:w-1/2 lg:pr-8">
            <div className="relative z-10">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Transform Your Career with</span>
                <span className="block text-red-600">Expert Tech Education</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
                Access premium tech courses led by industry experts. Whether you're looking to learn or teach, Lamicons connects you with the best opportunities in tech education.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/courses" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10">
                    Explore Courses
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/hire-educators" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 md:py-4 md:text-lg md:px-10">
                    Hire Educators
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
            <div className="relative rounded-bl-3xl shadow-2xl overflow-hidden">
              <img src="homee.jpg" alt="Tech Education" className="w-full h-[400px] sm:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Student Courses Section */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Tech Courses for Students</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Take your tech skills to the next level with our comprehensive courses. Learn from industry experts and build real-world projects:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-3 text-gray-600">Web Development Fundamentals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-3 text-gray-600">Advanced React Development</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="ml-3 text-gray-600">Cloud Computing with AWS</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link 
                    to="/courses" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    Browse All Courses
                  </Link>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Why Learn with Us?</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-red-500 flex items-center justify-center">
                          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h5 className="text-lg font-medium text-gray-900">Expert-Led Instruction</h5>
                        <p className="mt-2 text-gray-600">Learn directly from industry professionals with real-world experience</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-red-500 flex items-center justify-center">
                          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h5 className="text-lg font-medium text-gray-900">Hands-on Projects</h5>
                        <p className="mt-2 text-gray-600">Build real-world applications and expand your portfolio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-semibold tracking-wide uppercase">Educator Outsourcing</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Premier Technical Education Partner
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Connecting institutions with industry-leading tech educators for transformative learning experiences.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mb-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">University & College Solutions</h3>
                  <p className="text-gray-500">
                    Providing specialized tech educators and curriculum experts to enhance your academic programs and student outcomes.
                  </p>
                </div>
              </div>

              <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mb-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Corporate Training</h3>
                  <p className="text-gray-500">
                    Empowering businesses with expert technical trainers for employee upskilling and professional development programs.
                  </p>
                </div>
              </div>

              <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mb-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">EdTech Partnerships</h3>
                  <p className="text-gray-500">
                    Collaborating with EdTech platforms to deliver high-quality technical education through expert instructors and content creators.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link to="/hire-educators" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
                Partner With Us
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
  <InstructorsSlider/>
      {/* Partners Section */}
      <div className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-semibold tracking-wide uppercase">Our Partners</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Trusted by Leading Institutions</p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">We collaborate with top educational institutions to deliver high-quality tech education.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src="https://placehold.co/300x100/DC2626/FFFFFF/png?text=LPU"
                    alt="Lovely Professional University"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lovely Professional University</h3>
                <p className="text-gray-600 mb-4">Partnered to develop cutting-edge tech curriculum and provide industry-expert instructors for computer science programs.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8/5 Partnership Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src="https://placehold.co/300x100/DC2626/FFFFFF/png?text=Newton+School"
                    alt="Newton School"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Newton School</h3>
                <p className="text-gray-600 mb-4">Collaborated on full-stack development bootcamps, resulting in 85% placement rate for graduates in tech roles.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5 Partnership Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src="https://placehold.co/300x100/DC2626/FFFFFF/png?text=Hero+Vired"
                    alt="Hero Vired"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hero Vired</h3>
                <p className="text-gray-600 mb-4">Joint venture in creating specialized AI and ML courses, training over 1000 professionals in emerging technologies.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.7/5 Partnership Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src="https://placehold.co/300x100/DC2626/FFFFFF/png?text=Let's+Upgrad"
                    alt="Let's Upgrad"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Let's Upgrad</h3>
                <p className="text-gray-600 mb-4">Established comprehensive cloud computing programs, helping 500+ professionals achieve AWS certification.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8/5 Partnership Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src="https://placehold.co/300x100/DC2626/FFFFFF/png?text=KnowledgeHut"
                    alt="KnowledgeHut"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">KnowledgeHut</h3>
                <p className="text-gray-600 mb-4">Partnership focused on DevOps and agile methodologies, successfully training 2000+ IT professionals.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.7/5 Partnership Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src="https://placehold.co/300x100/DC2626/FFFFFF/png?text=Cuvette"
                    alt="Cuvette"
                    className="h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cuvette</h3>
                <p className="text-gray-600 mb-4">Collaborated on innovative coding bootcamps and placement programs, achieving 90% placement success rate.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.9/5 Partnership Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      {/* <TeamSection /> */}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to Transform Your Tech Career?</span>
            <span className="block text-red-200">Join Lamicons as a Student or Educator</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
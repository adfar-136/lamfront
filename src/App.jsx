import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/dashboards/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/AuthPage';
import UserProfile from './components/profile/UserProfile';
import Courses from './components/courses/Courses';
import CourseDetail from './components/courses/CourseDetail';
import Documentation from './components/documentation/Documentation';
import About from './components/About';
import Contact from './components/Contact';
import ProblemArchive from './components/coding/ProblemArchive';
import ProblemSolving from './components/coding/ProblemSolving';
import './App.css';
import CompanyRequirementForm from './components/company/CompanyRequirementForm';
import AddDocumentation from './components/documentation/AddDocumentation';
import Practice from './components/practice/Practice';
import QuizAttempt from './components/practice/QuizAttempt';
import AddQuiz from './components/practice/AddQuiz';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/documentation/:technology" element={<Documentation />} />
              <Route path="/documentation/:technology/:topicId" element={<Documentation />} />
              <Route 
                path="/add-doc" 
                element={
                  <ProtectedRoute>
                    <AddDocumentation />
                  </ProtectedRoute>
                } 
              />
              {/* <Route path="/coding" element={<ProtectedRoute allowedRoles={['student', 'admin']}><ProblemArchive /></ProtectedRoute>} />
              <Route path="/coding/:problemId" element={<ProtectedRoute allowedRoles={['student', 'admin']}><ProblemSolving /></ProtectedRoute>} /> */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/hire-educators" element={<CompanyRequirementForm/>} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/practice/:techStackId/:difficulty" element={<QuizAttempt />} />
              <Route path="/practice/add" element={<ProtectedRoute>
                <AddQuiz />
              </ProtectedRoute>} />

              {/* Add more routes as needed */}
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

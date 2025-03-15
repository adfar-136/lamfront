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
import InterviewPrep from './components/interview/InterviewPrep';
import QuizInterface from './components/interview/QuizInterface';
import About from './components/About';
import Contact from './components/Contact';
import ProblemArchive from './components/coding/ProblemArchive';
import ProblemSolving from './components/coding/ProblemSolving';
import './App.css';
import CompanyRequirementForm from './components/company/CompanyRequirementForm';
import AddDocumentation from './components/documentation/AddDocumentation';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
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
            <Route path="/courses" element={<ProtectedRoute allowedRoles={['student', 'admin']}><Courses /></ProtectedRoute>} />
            <Route path="/courses/:courseId" element={<ProtectedRoute allowedRoles={['student', 'admin']}><CourseDetail /></ProtectedRoute>} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/documentation/:technology" element={<Documentation />} />
            <Route path="/documentation/:technology/:topicId" element={<Documentation />} />
            <Route path="/add-doc" element={<AddDocumentation />} />
            <Route path="/interview" element={<ProtectedRoute allowedRoles={['student', 'admin']}><InterviewPrep /></ProtectedRoute>} />
            <Route path="/interview/:stackId/:level" element={<ProtectedRoute allowedRoles={['student', 'admin']}><QuizInterface /></ProtectedRoute>} />
            <Route path="/coding" element={<ProtectedRoute allowedRoles={['student', 'admin']}><ProblemArchive /></ProtectedRoute>} />
            <Route path="/coding/:problemId" element={<ProtectedRoute allowedRoles={['student', 'admin']}><ProblemSolving /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/hire-educators" element={<CompanyRequirementForm/>} />

            {/* Add more routes as needed */}
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

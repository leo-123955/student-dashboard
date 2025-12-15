import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import Assignments from './pages/Assignments';
import Courses from './pages/Courses';
import Tests from './pages/Tests';
import Registration from './pages/Registration';
import Reports from './pages/Reports';
import Footer from './Footer';
import './App.css';
function App() {
  const isLoggedIn = !!localStorage.getItem('user'); // simple mock auth

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <div className="grid-container">
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;

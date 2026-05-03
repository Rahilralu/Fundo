import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateInvite from './pages/PrivateInvite';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';

// Wrapper for the existing LoginPage to integrate with React Router and AuthContext
function LoginRoute() {
  const { login, register } = useAuth();
  return <LoginPage onLogin={login} onRegister={register} />;
}

// Wrapper for layout that includes Navbar/Footer
function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-[radial-gradient(circle_at_30%_30%,#1a1033_0%,#000000_100%)] text-white selection:bg-[#8155ff]/30">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/*" element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route 
                    path="/events" 
                    element={
                      <ProtectedRoute>
                        <EventsList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/events/:id" 
                    element={
                      <ProtectedRoute>
                        <EventDetail />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/events/invite/:token" 
                    element={
                      <ProtectedRoute>
                        <PrivateInvite />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import RoleModal from './components/RoleModal';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (userEmail) => {
    setEmail(userEmail);
    setIsLoggedIn(true);
  };

  const handleSelectRole = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setUserRole(null);
  };

  return (
    <div className="min-h-screen bg-bg-main text-white font-sans selection:bg-brand-500/30">
      <AnimatePresence mode="wait">
        {!isLoggedIn || !userRole ? (
          <LoginPage key="login" onLogin={handleLogin} />
        ) : (
          <Dashboard key="dashboard" userRole={userRole} userEmail={email} onLogout={handleLogout} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoggedIn && !userRole && (
          <RoleModal key="role-modal" onSelectRole={handleSelectRole} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

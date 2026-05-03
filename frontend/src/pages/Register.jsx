import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LeftPanel from '../components/LeftPanel';
import SignUpCard from '../components/SignUpCard';
import { useAuth } from '../context/AuthContext';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth(); // ← was login

  const handleRegister = async (name, email, password) => {
    const error = await register(name, email, password);
    if (error) {
      console.error(error); // replace with your toast later
      return;
    }
    // register() auto-logs in and navigates to /dashboard via AuthContext
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex bg-[radial-gradient(circle_at_30%_30%,#1a1033_0%,#000000_100%)] overflow-hidden relative"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0" />}>
          <Spline
            scene="https://prod.spline.design/ZD5HKS09EYYy0otC/scene.splinecode"
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          />
        </Suspense>
      </div>
      <LeftPanel />
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 relative bg-transparent z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] bg-purple-600/40 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="w-full max-w-[360px] relative translate-x-[10px]">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SignUpCard
              onRegister={handleRegister}               // ← was onLogin
              onSwitchToLogin={() => navigate('/login')}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
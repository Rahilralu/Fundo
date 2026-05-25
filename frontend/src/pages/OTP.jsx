import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftPanel from '../components/LeftPanel';
import OtpCard from '../components/OtpCard';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Grab the email from router state (passed during registration redirect)
  const email = location.state?.email || '';

  const handleVerify = async (code) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Verification succeeded!
        // Redirect the user to login page after a short delay so they can see the success state
        setTimeout(() => {
          navigate('/login');
        }, 1500);
        return null; // returning null signifies no error to the OtpCard component
      }
      
      return data.error || 'Verification failed. Please try again.';
    } catch (err) {
      console.error('OTP verification error:', err);
      return 'Network error. Please check your connection and try again.';
    }
  };

  const handleResend = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        return null; // success
      }

      return data.error || 'Failed to resend verification code.';
    } catch (err) {
      console.error('OTP resend error:', err);
      return 'Network error. Failed to resend code.';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex bg-[radial-gradient(circle_at_30%_30%,#1a1033_0%,#000000_100%)] overflow-hidden relative"
    >
      {/* 3D spline background */}
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
            <OtpCard
              email={email}
              onVerify={handleVerify}
              onResend={handleResend}
              onBack={() => navigate('/register')}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

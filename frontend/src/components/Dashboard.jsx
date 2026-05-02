import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import Navbar from './Navbar';

export default function Dashboard({ userRole, userEmail, onLogout }) {
  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      <Navbar userRole={userRole} userEmail={userEmail} onLogout={onLogout} />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl rounded-2xl border-2 border-dashed border-brand-500/30 bg-bg-card/50 backdrop-blur-sm p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6 border border-brand-500/20 shadow-[0_0_30px_rgba(123,110,232,0.1)]">
            <LayoutGrid className="w-10 h-10 text-brand-500" />
          </div>
          
          <div className="inline-block px-3 py-1 rounded-full bg-bg-elevated border border-border-main text-xs font-semibold tracking-wider text-gray-300 mb-4 uppercase">
            {userRole} VIEW
          </div>
          
          <h2 className="text-3xl font-heading font-bold mb-3">Dashboard Coming Soon</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            We are working hard to bring you a comprehensive overview of your financial operations. Stay tuned for updates!
          </p>
        </motion.div>
      </main>
    </div>
  );
}

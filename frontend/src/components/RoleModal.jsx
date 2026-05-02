import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Users } from 'lucide-react';

export default function RoleModal({ onSelectRole }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-main/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-bg-card border border-border-main rounded-2xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-purple-500" />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold mb-2">Who are you?</h2>
          <p className="text-gray-400">Select your role to personalize your experience.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectRole('ADMIN')}
            className="group flex flex-col items-center text-center p-6 rounded-xl border border-border-main bg-bg-elevated hover:bg-bg-elevated/80 hover:border-brand-500 hover:shadow-[0_0_20px_rgba(123,110,232,0.15)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Settings className="w-8 h-8 text-brand-500" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Admin / Organiser</h3>
            <p className="text-xs text-gray-400">Manage events, track payments, and view analytics.</p>
          </button>

          <button
            onClick={() => onSelectRole('STUDENT')}
            className="group flex flex-col items-center text-center p-6 rounded-xl border border-border-main bg-bg-elevated hover:bg-bg-elevated/80 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Student / Participant</h3>
            <p className="text-xs text-gray-400">Register for events, make payments, and view tickets.</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

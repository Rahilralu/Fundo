import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar({ userRole, userEmail, onLogout }) {
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="h-20 border-b border-border-main bg-bg-card/80 backdrop-blur-md px-6 lg:px-12 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <span className="font-heading font-bold text-sm text-white">F</span>
        </div>
        <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">Fundo</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-brand-500/10 text-brand-500 text-xs font-semibold border border-brand-500/20 hidden sm:block">
            {userRole}
          </span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-brand-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-border-main">
            {initial}
          </div>
        </div>
        
        <div className="w-px h-8 bg-border-main" />
        
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="bg-transparent border border-border-main hover:bg-bg-elevated hover:text-red-400 hover:border-red-500/30 text-gray-300 h-9 px-3 gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </nav>
  );
}

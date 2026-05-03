import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl py-4 px-6 md:px-12 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link className="flex items-center gap-3" to="/">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8155ff] to-[#6035f5] flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="font-bold text-sm text-white">F</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">Fundo</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/events" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
            Browse
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                Dashboard
              </Link>
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-[#8155ff] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <span className="text-sm font-medium text-white/90">{user.name || user.email?.split('@')[0]}</span>
                </div>
                <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium h-9 px-3 border border-transparent hover:border-red-500/30 hover:bg-black/40 rounded-xl">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <Link to="/login" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-[#8155ff] to-[#6035f5] text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 text-sm border border-white/10">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-white/60 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1a1033]/95 backdrop-blur-2xl border-b border-white/5 py-4 px-6 flex flex-col gap-4 shadow-2xl">
          <Link to="/events" onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white font-medium text-sm py-2">
            Browse
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white font-medium text-sm py-2">
                Dashboard
              </Link>
              <div className="h-px bg-white/10 my-2"></div>
              <div className="flex items-center gap-2 text-white py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-[#8155ff] text-white flex items-center justify-center font-bold">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="font-medium text-sm">{user.name || user.email}</span>
              </div>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-red-400 font-medium text-sm py-2 flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <div className="h-px bg-white/10 my-2"></div>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white font-medium text-sm py-2">
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="bg-gradient-to-r from-[#8155ff] to-[#6035f5] text-white text-center px-5 py-2.5 rounded-xl font-semibold border border-white/10">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

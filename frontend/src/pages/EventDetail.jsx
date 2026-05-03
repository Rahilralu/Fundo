import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';

const MOCK_EVENT = {
  id: '1',
  title: 'Tech Startup Mixer 2026',
  description: 'Join us for an exclusive evening of networking with the top tech founders, investors, and engineers in the city. Food and drinks will be provided. Come ready to pitch your ideas and make valuable connections.',
  type: 'Public',
  date: 'Oct 12, 2026',
  price: '₹500',
  capacity: 100,
  organiser: 'Alex Doe'
};

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen relative">
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setLoading(false)}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-medium transition-colors border border-white/5"
          >
            Toggle Demo Content
          </button>
        </div>
        <LoadingSkeleton count={1} type="card" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/events')} className="text-white/60 hover:text-white font-medium text-sm transition-colors">
          &larr; Back to Events
        </button>
        <button 
          onClick={() => setIsRegistered(!isRegistered)}
          className="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-medium transition-colors border border-white/5"
        >
          Toggle Demo Registered State
        </button>
      </div>

      <div className="bg-black/40 backdrop-blur-2xl border border-white/5 border-l-purple-500/20 border-t-purple-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] rounded-[2rem] overflow-hidden">
        <div className="bg-white/5 px-8 py-10 border-b border-white/5 relative">
          <span className={`absolute top-6 right-6 px-3 py-1.5 text-[10px] tracking-widest font-bold uppercase rounded-md border ${MOCK_EVENT.type === 'Public' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
            {MOCK_EVENT.type} Event
          </span>
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">{MOCK_EVENT.title}</h1>
          <p className="text-white/60 leading-relaxed max-w-2xl text-sm">{MOCK_EVENT.description}</p>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Date</p>
              <p className="text-sm font-medium text-white/90">{MOCK_EVENT.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Organiser</p>
              <p className="text-sm font-medium text-white/90">{MOCK_EVENT.organiser}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Capacity</p>
              <p className="text-sm font-medium text-white/90">{MOCK_EVENT.capacity} seats</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Price</p>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#8155ff]">{MOCK_EVENT.price}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:items-end md:border-l border-white/10 md:pl-8">
            {isRegistered ? (
              <div className="w-full text-center bg-green-500/10 text-green-400 border border-green-500/20 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-1">You're Registered!</h3>
                <p className="text-xs text-green-400/60">See you at the event.</p>
              </div>
            ) : (
              <div className="w-full">
                <button className="w-full h-12 bg-gradient-to-r from-[#8155ff] to-[#6035f5] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 border border-white/10">
                  Register & Pay
                </button>
                <p className="text-center text-[10px] text-white/40 mt-3 tracking-wide">Secure payment via Fundo checkout.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

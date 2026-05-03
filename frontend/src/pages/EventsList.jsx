import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';

const MOCK_EVENTS = [
  { id: '1', title: 'Tech Startup Mixer 2026', type: 'Public', date: 'Oct 12, 2026', price: '₹500', capacity: 100 },
  { id: '2', title: 'Design Leadership Summit', type: 'Private', date: 'Nov 05, 2026', price: '₹1500', capacity: 50 },
  { id: '3', title: 'Web3 Developer Bootcamp', type: 'Public', date: 'Dec 01, 2026', price: 'Free', capacity: 200 },
  { id: '4', title: 'AI & Future of Work', type: 'Public', date: 'Jan 15, 2027', price: '₹999', capacity: 150 },
  { id: '5', title: 'Founders Retreat', type: 'Private', date: 'Feb 20, 2027', price: '₹5000', capacity: 20 },
];

export default function EventsList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 min-h-screen relative">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-medium text-white">Browse Events</h1>
          <p className="text-white/60 mt-2 text-sm">Discover upcoming events and gatherings.</p>
        </div>
        <button 
          onClick={() => setLoading(!loading)}
          className="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-medium transition-colors border border-white/5"
        >
          Toggle Demo Loading
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingSkeleton count={6} />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map(event => (
            <div 
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className="bg-black/40 backdrop-blur-2xl p-6 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] border border-white/5 border-l-purple-500/20 border-t-purple-500/20 hover:bg-black/60 cursor-pointer transition-all hover:border-purple-500/40"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg text-white pr-2">{event.title}</h3>
                <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md ${event.type === 'Public' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-amber-500/20 text-amber-400 border border-amber-500/20'}`}>
                  {event.type}
                </span>
              </div>
              <div className="space-y-2 text-xs text-white/60 font-medium">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="text-white/90">{event.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="text-white/90">{event.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="text-white/90">{event.capacity} seats</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

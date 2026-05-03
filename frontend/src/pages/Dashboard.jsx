import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const MOCK_EVENT = {
  id: '1',
  title: 'My Startup Launch Party',
  status: 'ACTIVE',
  registrationsCount: 42,
  capacity: 100
};

const MOCK_REGISTRATIONS = [
  { id: '1', eventName: 'Tech Startup Mixer 2026', date: 'Oct 12, 2026', status: 'CONFIRMED' },
  { id: '2', eventName: 'Design Leadership Summit', date: 'Nov 05, 2026', status: 'PENDING' },
  { id: '3', eventName: 'Founders Retreat', date: 'Feb 20, 2027', status: 'CANCELLED' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('my_event');
  const { addToast } = useToast();

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 min-h-screen relative">
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-medium text-white">Dashboard</h1>
          <p className="text-white/60 mt-2 text-sm">Manage your hosted events and registrations.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => addToast('Demo Success Toast!', 'success')}
            className="text-xs bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            Test Success
          </button>
          <button 
            onClick={() => addToast('Demo Error Toast!', 'error')}
            className="text-xs bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            Test Error
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-xl transition-all text-sm font-medium border ${activeTab === 'my_event' ? 'bg-white/10 text-white border-white/20 shadow-lg' : 'bg-transparent text-white/50 border-transparent hover:text-white/80'}`}
          onClick={() => setActiveTab('my_event')}
        >
          My Event
        </button>
        <button
          className={`px-6 py-2 rounded-xl transition-all text-sm font-medium border ${activeTab === 'registrations' ? 'bg-white/10 text-white border-white/20 shadow-lg' : 'bg-transparent text-white/50 border-transparent hover:text-white/80'}`}
          onClick={() => setActiveTab('registrations')}
        >
          My Registrations
        </button>
      </div>

      {activeTab === 'my_event' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 shadow-lg rounded-[2rem] p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">{MOCK_EVENT.title}</h3>
                <div className="flex gap-3 mt-2 items-center">
                  <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-green-500/20 text-green-400 border border-green-500/30 uppercase tracking-widest">
                    {MOCK_EVENT.status}
                  </span>
                  <span className="text-xs font-medium text-white/50">
                    {MOCK_EVENT.registrationsCount} / {MOCK_EVENT.capacity} Registered
                  </span>
                </div>
              </div>
              <button className="text-xs bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-xl font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-2xl border border-white/5 border-l-purple-500/20 border-t-purple-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] rounded-[2rem] p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-black/40 pointer-events-none" />
            
            <h2 className="text-xl font-medium text-white mb-6 relative z-10">Create New Event</h2>
            <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-white/90">Title</label>
                  <input type="text" className="w-full h-11 px-4 rounded-xl bg-black/20 border border-white/5 text-white placeholder:text-white/30 focus:border-[#8155ff] focus:bg-black/40 transition-all text-xs outline-none" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-white/90">Description</label>
                  <textarea rows={3} className="w-full p-4 rounded-xl bg-black/20 border border-white/5 text-white placeholder:text-white/30 focus:border-[#8155ff] focus:bg-black/40 transition-all text-xs outline-none resize-none"></textarea>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90">Type</label>
                  <select className="w-full h-11 px-4 rounded-xl bg-black/20 border border-white/5 text-white focus:border-[#8155ff] focus:bg-black/40 transition-all text-xs outline-none appearance-none">
                    <option className="bg-gray-900">Public</option>
                    <option className="bg-gray-900">Private</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90">Date</label>
                  <input type="date" className="w-full h-11 px-4 rounded-xl bg-black/20 border border-white/5 text-white focus:border-[#8155ff] focus:bg-black/40 transition-all text-xs outline-none [&::-webkit-calendar-picker-indicator]:invert" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90">Price (₹)</label>
                  <input type="number" defaultValue={0} className="w-full h-11 px-4 rounded-xl bg-black/20 border border-white/5 text-white focus:border-[#8155ff] focus:bg-black/40 transition-all text-xs outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/90">Capacity</label>
                  <input type="number" defaultValue={50} className="w-full h-11 px-4 rounded-xl bg-black/20 border border-white/5 text-white focus:border-[#8155ff] focus:bg-black/40 transition-all text-xs outline-none" />
                </div>
              </div>
              <button type="submit" className="h-11 px-8 rounded-xl bg-gradient-to-r from-[#8155ff] to-[#6035f5] text-white font-semibold text-xs hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20 border border-white/10 mt-6">
                Publish Event
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="space-y-4 animate-in fade-in">
          {MOCK_REGISTRATIONS.map(reg => (
            <div key={reg.id} className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-6 flex justify-between items-center hover:bg-black/60 transition-colors">
              <div>
                <h3 className="font-medium text-sm text-white mb-1">{reg.eventName}</h3>
                <p className="text-[11px] text-white/50 font-medium">Date: {reg.date}</p>
              </div>
              <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-md border ${
                reg.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                reg.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                {reg.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

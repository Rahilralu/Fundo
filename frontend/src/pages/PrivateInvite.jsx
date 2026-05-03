import React from 'react';
import { useParams } from 'react-router-dom';

const MOCK_PRIVATE_EVENT = {
  title: 'Secret Founder Dinner',
  description: 'An exclusive, invite-only dinner for Series A founders in the web3 space. The exact location will be revealed 24 hours before the event to confirmed attendees only. Dietary preferences will be collected after registration.',
  date: 'Mar 15, 2027',
  price: '₹10000',
  capacity: 15,
  organiser: 'Alpha Ventures'
};

export default function PrivateInvite() {
  const { token } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-2xl border border-white/5 border-l-amber-500/20 border-t-amber-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] rounded-[2rem] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-black/40 pointer-events-none" />
        
        <div className="p-8 md:p-12 relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase">
              Private Invite
            </span>
          </div>

          <h1 className="text-3xl font-medium text-white mb-4">{MOCK_PRIVATE_EVENT.title}</h1>
          <p className="text-white/60 leading-relaxed mb-10 text-sm">
            {MOCK_PRIVATE_EVENT.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-10 pb-10 border-b border-white/10">
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Date</p>
              <p className="text-sm font-medium text-white/90">{MOCK_PRIVATE_EVENT.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Organiser</p>
              <p className="text-sm font-medium text-white/90">{MOCK_PRIVATE_EVENT.organiser}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Capacity</p>
              <p className="text-sm font-medium text-white/90">{MOCK_PRIVATE_EVENT.capacity} spots total</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Registration</p>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">{MOCK_PRIVATE_EVENT.price}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">
              Token: <span className="font-mono bg-black/40 px-2 py-1 rounded text-white/60 border border-white/5">{token || 'demo-token'}</span>
            </p>
            <button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold text-xs transition-opacity shadow-lg shadow-amber-500/20 border border-white/10 hover:opacity-90">
              Join Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

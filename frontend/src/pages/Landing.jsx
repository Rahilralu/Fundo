import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#8155ff]">Fundo</span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium">
            The simplest way to host and discover premium events.
          </p>
          <Link
            to="/events"
            className="inline-block bg-gradient-to-r from-[#8155ff] to-[#6035f5] text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30 border border-white/10"
          >
            Browse Events
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-black/40 backdrop-blur-2xl border border-white/5 border-t-purple-500/20 border-l-purple-500/20 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
            <h3 className="text-xl font-medium text-white mb-3">Host Events</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Create and manage your events with ease. Set capacity, pricing, and details in seconds.
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-2xl border border-white/5 border-t-purple-500/20 border-l-purple-500/20 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
            <h3 className="text-xl font-medium text-white mb-3">Public or Private</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Host open public events or exclusive private gatherings with invite-only links.
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-2xl border border-white/5 border-t-purple-500/20 border-l-purple-500/20 p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
            <h3 className="text-xl font-medium text-white mb-3">Secure Payments</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Seamlessly accept payments from attendees with our integrated payment flows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

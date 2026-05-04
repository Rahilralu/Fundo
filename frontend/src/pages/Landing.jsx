import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Play, CreditCard, TrendingUp, ShieldCheck, GraduationCap, Users, UsersRound, MonitorPlay, Mic, Heart, LayoutGrid, Clock, BarChart3, Globe, Zap, Smartphone, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-[#0D0B1A]">
      {/* Hide overflow to prevent horizontal scroll from absolute positioned glows/circles */}
      
      <section className="relative pt-12 pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left z-10 mt-10 lg:mt-0">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-6 shadow-sm shadow-purple-500/10">
              <Calendar size={14} className="text-[#8155ff]" />
              <span className="text-xs font-medium text-white/80 tracking-wide">Events, Simplified</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight mb-6 leading-[1.05] text-white">
              Organize events.<br />
              Collect payments.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8155ff] to-[#a88bff]">Stress less.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Fundo helps you create events, share payment links and track every contribution in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-16">
              <Link
                to="/dashboard/events"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#8155ff] hover:bg-[#6e44e5] text-white px-8 py-3.5 rounded-full font-medium text-sm transition-all shadow-[0_0_20px_rgba(129,85,255,0.3)]"
              >
                Create Your Event <ArrowRight size={16} />
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-white/5 transition-all">
                View Demo <Play size={16} className="fill-transparent" />
              </button>
            </div>
            
            {/* Features Row */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-4 text-left mb-12">
              <div className="flex gap-4 items-start flex-1 bg-white/5 border border-white/5 p-4 rounded-2xl md:bg-transparent md:border-transparent md:p-0">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl shrink-0 text-white/70">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Quick Setup</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Create events in less than a minute</p>
                </div>
              </div>
              <div className="flex gap-4 items-start flex-1 bg-white/5 border border-white/5 p-4 rounded-2xl md:bg-transparent md:border-transparent md:p-0">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl shrink-0 text-white/70">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Easy Collection</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Accept UPI, Cards, Netbanking & more</p>
                </div>
              </div>
              <div className="flex gap-4 items-start flex-1 bg-white/5 border border-white/5 p-4 rounded-2xl md:bg-transparent md:border-transparent md:p-0">
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl shrink-0 text-white/70">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-white">Live Tracking</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Track payments as they happen</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 text-white/40 text-xs font-medium">
              <ShieldCheck size={16} />
              <span>Secure payments powered by</span>
              <span className="text-white font-bold tracking-tight italic ml-1">Razorpay</span>
            </div>
          </div>
          
          {/* Right Content - Visuals */}
          <div className="flex-1 relative w-full aspect-square max-w-[650px] mx-auto hidden lg:block" style={{ perspective: "1000px" }}>
            {/* Background Glows and Rings */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8155ff]/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            
            {/* Orbiting rings */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/10 rounded-full -z-10 rotate-12" />
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full -z-10 -rotate-12" />
            
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-transparent border-t-[#8155ff]/40 rounded-full -z-10 rotate-45 blur-[1px]" />
            
            {/* Glowing star/sparkle */}
            <div className="absolute top-[10%] left-[30%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_#8155ff] animate-pulse"></div>
            <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_#8155ff] animate-pulse delay-75"></div>
            
            {/* 3D Elements Wrapper */}
            <div className="relative w-full h-[650px]" style={{ transformStyle: "preserve-3d" }}>
              
              {/* Main Dashboard Card */}
              <div 
                className="absolute top-[15%] left-[10%] w-[420px] bg-gradient-to-br from-[#1c133a]/90 to-[#0e0a1f]/90 backdrop-blur-md border border-white/10 rounded-[32px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-700 hover:rotate-0 z-10"
                style={{ transform: "rotateX(10deg) rotateY(-15deg) rotateZ(5deg)" }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-1.5 text-white/90">College Fest 2025</h3>
                    <p className="text-[13px] text-white/40">10–12 May, 2025 • Delhi</p>
                  </div>
                  <div className="bg-[#052e16]/60 border border-[#059669]/30 text-[#10b981] px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_5px_#10b981]"></span>
                    Live
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8 relative z-10">
                  <div>
                    <p className="text-[13px] text-white/40 mb-1.5">Total Collected</p>
                    <p className="text-4xl font-bold tracking-tight text-white">₹1,45,680</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[#10b981] text-xs font-semibold flex items-center gap-1 bg-[#10b981]/10 px-2 py-1 rounded-md">
                      ↑ 24.5%
                    </div>
                    <span className="text-[10px] text-white/30 mt-1">vs last event</span>
                  </div>
                </div>
                
                {/* Graph placeholder */}
                <div className="h-32 w-[110%] -ml-[5%] relative overflow-hidden flex items-end opacity-90">
                  <svg viewBox="0 0 400 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(129,85,255,0.4)]" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8155ff" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#8155ff" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0 120 L 0 80 Q 50 110, 100 70 T 200 80 T 300 40 T 400 60 L 400 120 Z" fill="url(#chart-gradient)" />
                    <path d="M0 80 Q 50 110, 100 70 T 200 80 T 300 40 T 400 60" fill="none" stroke="#8155ff" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  
                  {/* Axis labels inside graph container */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-white/30 px-6 pb-1">
                    <span>1 May</span>
                    <span>6 May</span>
                    <span>11 May</span>
                  </div>
                </div>
              </div>
              
              {/* Payments Card */}
              <div 
                className="absolute top-[25%] right-[0%] w-[180px] bg-[#120c2b]/95 backdrop-blur-xl border border-white/10 rounded-[24px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] z-20"
                style={{ transform: "rotateX(15deg) rotateY(-20deg) rotateZ(5deg)" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="text-xs text-white/50">Payments</p>
                  <div className="bg-[#8155ff]/20 p-2 rounded-xl">
                    <LayoutGrid size={14} className="text-[#8155ff]" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1 text-white">1,250</p>
                <p className="text-[11px] text-white/30">Total Transactions</p>
              </div>
              
              {/* Pending Card */}
              <div 
                className="absolute top-[52%] right-[10%] w-[180px] bg-[#120c2b]/95 backdrop-blur-xl border border-white/10 rounded-[24px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] z-20"
                style={{ transform: "rotateX(15deg) rotateY(-10deg) rotateZ(2deg)" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="text-xs text-white/50">Pending</p>
                  <div className="bg-[#f59e0b]/20 p-2 rounded-xl">
                    <Clock size={14} className="text-[#f59e0b]" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1 text-white">12</p>
                <p className="text-[11px] text-white/30">Payments</p>
              </div>
              
              {/* Floating Coins */}
              {/* Coin 1 - Top Right */}
              <div 
                className="absolute top-[5%] right-[15%] w-[110px] h-[110px] rounded-full bg-gradient-to-br from-[#a88bff] via-[#6035f5] to-[#2a0e80] border-[4px] border-[#a88bff]/30 shadow-[0_0_50px_rgba(129,85,255,0.8),inset_0_5px_20px_rgba(255,255,255,0.4)] flex items-center justify-center z-30"
                style={{ transform: "rotateX(40deg) rotateY(30deg) rotateZ(10deg)" }}
              >
                <div className="w-[85%] h-[85%] rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br from-[#8155ff] to-[#4520b8] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)]">
                  <span className="text-white font-bold text-5xl italic font-serif">F</span>
                </div>
              </div>
              
              {/* Coin 2 - Bottom Center */}
              <div 
                className="absolute bottom-[-5%] left-[50%] w-[130px] h-[130px] rounded-full bg-gradient-to-br from-[#a88bff] via-[#6035f5] to-[#2a0e80] border-[4px] border-[#a88bff]/30 shadow-[0_0_60px_rgba(129,85,255,0.8),inset_0_5px_20px_rgba(255,255,255,0.4)] flex items-center justify-center z-30"
                style={{ transform: "rotateX(50deg) rotateY(-20deg) rotateZ(-15deg)" }}
              >
                <div className="w-[85%] h-[85%] rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br from-[#8155ff] to-[#4520b8] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)]">
                  <span className="text-white font-bold text-6xl italic font-serif">F</span>
                </div>
              </div>
              
              {/* Coin 3 - Middle Far Right */}
              <div 
                className="absolute top-[45%] right-[-10%] w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[#a88bff] via-[#6035f5] to-[#2a0e80] border-[2px] border-[#a88bff]/30 shadow-[0_0_30px_rgba(129,85,255,0.6),inset_0_3px_10px_rgba(255,255,255,0.4)] flex items-center justify-center z-0 blur-[1px]"
                style={{ transform: "rotateX(30deg) rotateY(40deg) rotateZ(20deg)" }}
              >
                <div className="w-[85%] h-[85%] rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br from-[#8155ff] to-[#4520b8] shadow-[inset_0_-5px_10px_rgba(0,0,0,0.5)]">
                  <span className="text-white font-bold text-2xl italic font-serif">F</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer / Trust Section */}
      <section className="pb-10 pt-10 relative z-10 px-6">
        <div className="max-w-5xl mx-auto border border-white/5 bg-black/20 rounded-3xl p-8 md:p-10 backdrop-blur-xl">
          <p className="text-sm text-white/50 mb-8 font-medium text-center">Trusted by thousands of organizers</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4 opacity-70">
            <div className="flex flex-col items-center gap-3 text-center">
              <GraduationCap size={24} className="text-white" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider">College Events</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <Users size={24} className="text-white" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider">Club Activities</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <UsersRound size={24} className="text-white" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider">Community Gatherings</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <MonitorPlay size={24} className="text-white" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider">Workshops</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <Mic size={24} className="text-white" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider">Conferences</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <Heart size={24} className="text-white" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/80 uppercase tracking-wider">Fundraisers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="py-24 relative z-10 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Everything you need.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8155ff] to-[#a88bff]">Nothing you don't.</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Powerful tools designed to make event management feel effortless. Focus on your guests, we'll handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Box 1 - Big */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#1c133a]/50 to-[#0e0a1f]/50 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-12 hover:border-[#8155ff]/30 transition-colors">
              <div className="bg-[#8155ff]/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="text-[#8155ff]" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Real-time Analytics</h3>
              <p className="text-white/60 mb-8 max-w-md leading-relaxed">
                Watch your ticket sales and revenue grow in real-time. Get detailed insights into your attendees and track conversion rates effortlessly.
              </p>
              <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex gap-4 items-end overflow-hidden">
                <div className="w-8 bg-gradient-to-t from-[#8155ff]/20 to-[#8155ff] h-12 rounded-t-md"></div>
                <div className="w-8 bg-gradient-to-t from-[#8155ff]/20 to-[#8155ff] h-20 rounded-t-md"></div>
                <div className="w-8 bg-gradient-to-t from-[#8155ff]/20 to-[#8155ff] h-16 rounded-t-md"></div>
                <div className="w-8 bg-gradient-to-t from-[#8155ff]/20 to-[#8155ff] h-28 rounded-t-md"></div>
                <div className="w-8 bg-gradient-to-t from-[#8155ff]/20 to-[#8155ff] h-24 rounded-t-md"></div>
                <div className="w-8 bg-gradient-to-t from-[#8155ff]/20 to-[#8155ff] h-32 rounded-t-md"></div>
                <div className="w-8 bg-gradient-to-t from-[#8155ff]/20 to-[#a88bff] h-40 rounded-t-md relative">
                   <div className="absolute -top-3 -right-2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                </div>
              </div>
            </div>

            {/* Bento Box 2 - Small */}
            <div className="bg-gradient-to-br from-[#1c133a]/50 to-[#0e0a1f]/50 backdrop-blur-md border border-white/10 rounded-[32px] p-8 hover:border-[#8155ff]/30 transition-colors flex flex-col justify-between">
              <div>
                <div className="bg-[#10b981]/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="text-[#10b981]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Instant Payouts</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Don't wait for your money. Get funds routed directly to your bank account as soon as tickets are sold.
                </p>
              </div>
              <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex items-center gap-3">
                <ShieldCheck className="text-[#10b981]" />
                <span className="text-sm font-medium text-white/80">Secured by Razorpay</span>
              </div>
            </div>

            {/* Bento Box 3 - Small */}
            <div className="bg-gradient-to-br from-[#1c133a]/50 to-[#0e0a1f]/50 backdrop-blur-md border border-white/10 rounded-[32px] p-8 hover:border-[#8155ff]/30 transition-colors">
              <div className="bg-[#f59e0b]/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="text-[#f59e0b]" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Custom Event Pages</h3>
              <p className="text-white/60 leading-relaxed">
                Create stunning, mobile-optimized landing pages for your events in minutes. No coding required.
              </p>
            </div>

            {/* Bento Box 4 - Big */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#1c133a]/50 to-[#0e0a1f]/50 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-12 hover:border-[#8155ff]/30 transition-colors flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="bg-[#ef4444]/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="text-[#ef4444]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Seamless Check-in</h3>
                <p className="text-white/60 leading-relaxed">
                  Scan QR codes, search by name, and manage guest lists right from your phone. Eliminate lines and start your event smoothly.
                </p>
              </div>
              <div className="w-full md:w-64 aspect-square bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                <div className="w-32 h-32 bg-white rounded-xl p-2 shadow-2xl relative z-10">
                  <div className="w-full h-full border-4 border-black border-dashed opacity-80 flex items-center justify-center">
                    <span className="text-black font-bold text-xs text-center">QR<br/>Code</span>
                  </div>
                </div>
                {/* Scanner line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_10px_2px_rgba(239,68,68,0.8)] z-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative z-10 px-6">
        <div className="max-w-[1000px] mx-auto bg-gradient-to-r from-[#8155ff]/20 to-[#6035f5]/20 border border-[#8155ff]/30 rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8155ff]/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 relative z-10">
            Ready to host your next big event?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 relative z-10">
            Join thousands of organizers who use Fundo to create, manage, and scale their events effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to="/dashboard/events"
              className="w-full sm:w-auto bg-white text-[#1a1033] px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Get Started for Free
            </Link>
            <Link
              to="/events"
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/5 transition-all"
            >
              Explore Events
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/50 relative z-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#10b981]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#10b981]" />
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#10b981]" />
              <span>Free for free events</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

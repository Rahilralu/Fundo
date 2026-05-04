import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, LayoutGrid, GraduationCap, Trophy, Music, Users, Monitor, Heart, CheckCircle2, Calendar, MapPin, ChevronLeft, ChevronRight, Bell, Moon, Plus } from 'lucide-react';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'TechFest 2K25',
    description: 'Annual Tech Festival',
    organizer: 'Tech Society, IIT Delhi',
    verified: true,
    raised: '4,25,890',
    goal: '5,00,000',
    progress: 85,
    users: 256,
    date: '21 May 2025',
    location: 'Delhi',
    badge: 'Featured',
    badgeColor: 'bg-[#8155ff]',
    imageGradient: 'from-[#8155ff]/40 to-[#0D0B1A]',
    imagePattern: 'radial-gradient(circle at 50% 50%, rgba(129, 85, 255, 0.2) 0%, transparent 70%)'
  },
  {
    id: '2',
    title: 'SportX Tournament',
    description: 'Inter College Football Championship',
    organizer: 'DTU Sports Club',
    verified: true,
    raised: '3,60,000',
    goal: '4,00,000',
    progress: 90,
    users: 312,
    date: '10 Jun 2025',
    location: 'Delhi',
    badge: 'Active',
    badgeColor: 'bg-[#10b981]',
    imageGradient: 'from-[#10b981]/30 to-[#0D0B1A]',
    imagePattern: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1) 25%, transparent 25%, transparent 75%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1)), linear-gradient(45deg, rgba(16, 185, 129, 0.1) 25%, transparent 25%, transparent 75%, rgba(16, 185, 129, 0.1) 75%, rgba(16, 185, 129, 0.1))'
  },
  {
    id: '3',
    title: 'Education for All',
    description: 'Help us build better futures',
    organizer: 'Helping Hands Foundation',
    verified: true,
    raised: '2,80,450',
    goal: '4,00,000',
    progress: 70,
    users: 189,
    date: '30 May 2025',
    location: 'Mumbai',
    badge: 'Trending',
    badgeColor: 'bg-[#f59e0b]',
    imageGradient: 'from-[#f59e0b]/30 to-[#0D0B1A]',
    imagePattern: 'radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.2) 0%, transparent 50%)'
  },
  {
    id: '4',
    title: 'Art & Culture Fest',
    description: 'Celebrate creativity and culture',
    organizer: 'Kalakriti Foundation',
    verified: true,
    raised: '1,75,000',
    goal: '3,00,000',
    progress: 58,
    users: 124,
    date: '18 Jun 2025',
    location: 'Bengaluru',
    badge: '',
    badgeColor: '',
    imageGradient: 'from-pink-500/30 to-[#0D0B1A]',
    imagePattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(236, 72, 153, 0.1) 10px, rgba(236, 72, 153, 0.1) 20px)'
  },
  {
    id: '5',
    title: 'Blood Donation Camp',
    description: 'Donate blood, save lives',
    organizer: 'Life Warriors',
    verified: true,
    raised: '95,000',
    goal: '2,00,000',
    progress: 47,
    users: 98,
    date: '25 May 2025',
    location: 'Pune',
    badge: 'Active',
    badgeColor: 'bg-[#10b981]',
    imageGradient: 'from-red-500/30 to-[#0D0B1A]',
    imagePattern: 'radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.2) 0%, transparent 50%)'
  },
  {
    id: '6',
    title: 'Music Night Live',
    description: 'An evening of melodies',
    organizer: 'Melody Makers',
    verified: true,
    raised: '2,20,000',
    goal: '3,00,000',
    progress: 73,
    users: 203,
    date: '07 Jun 2025',
    location: 'Delhi',
    badge: '',
    badgeColor: '',
    imageGradient: 'from-blue-500/30 to-[#0D0B1A]',
    imagePattern: 'linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)'
  }
];

export default function EventsList() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: <LayoutGrid size={14} /> },
    { name: 'Education', icon: <GraduationCap size={14} /> },
    { name: 'Sports', icon: <Trophy size={14} /> },
    { name: 'Music', icon: <Music size={14} /> },
    { name: 'Community', icon: <Users size={14} /> },
    { name: 'Tech', icon: <Monitor size={14} /> },
    { name: 'Health', icon: <Heart size={14} /> },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 min-h-screen">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Public Events</h1>
          <p className="text-white/50 text-sm">Discover and support awesome events happening around you.</p>
        </div>
        
        {/* We keep this hidden on smaller screens assuming the Navbar handles generic actions, 
            but showing it here for the mockup fidelity on desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
            <Moon size={18} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
              <Bell size={18} />
            </button>
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#8155ff] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#0D0B1A]">3</span>
          </div>
          <button className="bg-[#8155ff] hover:bg-[#6035f5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all">
            <Plus size={16} /> Create Event
          </button>
        </div>
      </div>

      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center bg-[#120c2b]/80 border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#8155ff]/50 transition-colors">
          <Search className="text-white/40 mr-3 shrink-0" size={18} />
          <input 
            type="text" 
            placeholder="Search events, organizers or causes..." 
            className="bg-transparent border-none text-white text-sm outline-none placeholder:text-white/40 w-full"
          />
        </div>
        <div className="flex gap-4 shrink-0">
          <button className="flex items-center justify-between w-[160px] bg-[#120c2b]/80 border border-white/10 text-white/80 px-4 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors">
            <span>All Categories</span>
            <ChevronDown size={16} className="text-white/40" />
          </button>
          <button className="flex items-center justify-between w-[160px] bg-[#120c2b]/80 border border-white/10 text-white/80 px-4 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors">
            <span>Sort by: Latest</span>
            <ChevronDown size={16} className="text-white/40" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat.name 
                ? 'bg-[#8155ff] text-white border border-[#8155ff]' 
                : 'bg-transparent border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-transparent border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-all ml-auto">
          More <ChevronDown size={14} />
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {MOCK_EVENTS.map((event) => (
          <div 
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="bg-[#120c2b]/60 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-[#8155ff]/30 transition-all cursor-pointer group flex flex-col"
          >
            {/* Card Image Area */}
            <div className={`h-40 w-full relative bg-gradient-to-t ${event.imageGradient}`} style={{ backgroundImage: event.imagePattern, backgroundSize: '20px 20px' }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                {event.badge ? (
                  <span className={`${event.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wide uppercase`}>
                    {event.badge}
                  </span>
                ) : <div></div>}
                <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-colors border border-white/10">
                  <Heart size={14} />
                </button>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#8155ff] transition-colors">{event.title}</h3>
              <p className="text-white/50 text-[13px] mb-3">{event.description}</p>
              
              <div className="flex items-center gap-1.5 mb-6">
                <span className="text-white/60 text-xs">by {event.organizer}</span>
                {event.verified && <CheckCircle2 size={12} className="text-[#8155ff] fill-[#8155ff]/20" />}
              </div>

              {/* Progress Section */}
              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white font-bold text-sm">₹{event.raised} <span className="text-white/40 text-xs font-normal">raised</span></span>
                  <span className="text-white/80 font-bold text-xs">{event.progress}%</span>
                </div>
                
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden">
                  <div 
                    className="h-full bg-[#8155ff] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${event.progress}%` }}
                  ></div>
                </div>
                
                <p className="text-white/40 text-[11px]">of ₹{event.goal} goal</p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-white/5 p-4 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-medium">
                <Users size={12} /> {event.users}
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-medium">
                <Calendar size={12} /> {event.date}
              </div>
              <div className="flex items-center gap-1.5 text-white/50 text-[11px] font-medium">
                <MapPin size={12} /> {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50" disabled>
          <ChevronLeft size={16} />
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#8155ff] text-white flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(129,85,255,0.4)]">
          1
        </button>
        <button className="w-8 h-8 rounded-lg bg-transparent text-white/60 hover:bg-white/5 flex items-center justify-center text-xs font-medium transition-colors">
          2
        </button>
        <button className="w-8 h-8 rounded-lg bg-transparent text-white/60 hover:bg-white/5 flex items-center justify-center text-xs font-medium transition-colors">
          3
        </button>
        <button className="w-8 h-8 rounded-lg bg-transparent text-white/60 hover:bg-white/5 flex items-center justify-center text-xs font-medium transition-colors">
          4
        </button>
        <button className="w-8 h-8 rounded-lg bg-transparent text-white/60 hover:bg-white/5 flex items-center justify-center text-xs font-medium transition-colors">
          5
        </button>
        <span className="text-white/40 px-1">...</span>
        <button className="w-8 h-8 rounded-lg bg-transparent text-white/60 hover:bg-white/5 flex items-center justify-center text-xs font-medium transition-colors">
          12
        </button>
        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}

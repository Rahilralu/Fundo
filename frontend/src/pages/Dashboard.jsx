import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, CreditCard, Landmark, 
  RefreshCcw, UserCheck, FileText, ShieldAlert, BarChart3, 
  FileCode2, Settings, ShieldCheck, ArrowRight, Search, 
  Bell, CalendarRange, ArrowDownLeft, ArrowUpRight, UserPlus, 
  FilePlus, Download, RotateCw, AlertTriangle, User,
  Filter, MoreVertical, Mail, Phone, MapPin, Edit3, Moon, CalendarDays,
  ArrowLeft, Check, UploadCloud, ImageIcon, LogOut, Monitor, Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '', icon: <LayoutDashboard size={18} /> },
    { name: 'Events', path: 'events', icon: <Calendar size={18} /> },
    { name: 'Transactions', path: 'transactions', icon: <CreditCard size={18} /> },
    { name: 'Profile', path: 'profile', icon: <User size={18} /> },
    { name: 'Settings', path: 'settings', icon: <Settings size={18} /> },
  ];

  // Helper to determine if a nav item is active
  const isActive = (path) => {
    if (path === '') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(`/dashboard/${path}`);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#0D0B1A] font-sans text-white overflow-hidden selection:bg-[#8155ff]/30 border-t border-white/5">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#120c2b]/80 border-r border-white/5 flex-col hidden lg:flex shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8155ff] to-[#6035f5] flex items-center justify-center shadow-lg shadow-[#8155ff]/20">
            <span className="font-bold text-white text-lg">F</span>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-white block leading-tight">Fundo</span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-medium">Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-4 custom-scrollbar">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.name}
                onClick={() => navigate(`/dashboard${item.path ? '/' + item.path : ''}`)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active 
                    ? 'bg-[#8155ff]/10 text-[#8155ff] shadow-sm' 
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={active ? 'text-[#8155ff]' : 'text-white/40'}>
                  {item.icon}
                </div>
                {item.name}
              </button>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-colors mt-auto" onClick={logout}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 p-[2px]">
            <div className="w-full h-full bg-[#120c2b] rounded-full flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Aarav+Mehta&background=random" alt="Aarav" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white leading-tight">Aarav Mehta</p>
            <p className="text-[11px] text-white/50">Organizer</p>
          </div>
          <LogOut size={16} className="text-white/40 hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Main Content Router Area */}
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/events/*" element={<EventsView />} />
        <Route path="/transactions" element={<TransactionsView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="*" element={
          <main className="flex-1 flex items-center justify-center bg-[#0a0714]">
            <div className="text-center text-white/50">
              <p className="mb-2"><Calendar size={48} className="mx-auto opacity-20" /></p>
              <h2 className="text-xl font-bold text-white/80">Page under construction</h2>
            </div>
          </main>
        } />
      </Routes>

    </div>
  );
}

function SettingsView() {
  const { logout } = useAuth();
  
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#0a0714] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <header className="h-24 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0714] sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
          <p className="text-xs text-white/50">Manage your account settings.</p>
        </div>
      </header>

      <div className="p-8 max-w-5xl mx-auto w-full space-y-6">
        
        {/* Account Section */}
        <section className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1c133a] flex items-center justify-center text-white/70 shadow-inner">
              <User size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Account</h3>
              <p className="text-[11px] text-white/50">View your account details.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 ml-14">
            <div className="w-16 h-16 rounded-full border-2 border-[#1c133a] overflow-hidden bg-gray-800 shrink-0 shadow-lg">
              <img src="https://ui-avatars.com/api/?name=Aarav+Mehta&background=random" alt="Aarav" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">Aarav Mehta</h4>
              <div className="flex items-center gap-3">
                <span className="inline-block px-2 py-0.5 rounded bg-[#8155ff]/10 text-[#8155ff] text-[10px] font-bold border border-[#8155ff]/20">
                  Organizer
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <Mail size={12} />
                  aarav.mehta@gmail.com
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-6">
            <div className="w-10 h-10 rounded-full bg-[#1c133a] flex items-center justify-center text-[#8155ff] shadow-inner">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Security</h3>
              <p className="text-[11px] text-white/50">Manage your session and security.</p>
            </div>
          </div>
          
          <div className="space-y-4 ml-14">
            {/* Logout Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1c133a] flex items-center justify-center text-white/50">
                  <LogOut size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Logout</h4>
                  <p className="text-[11px] text-white/50">Sign out of your account on this device.</p>
                </div>
              </div>
              <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#8155ff]/30 text-[#8155ff] text-xs font-bold hover:bg-[#8155ff]/10 transition-colors">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone Section */}
        <section className="bg-[#120c2b]/50 border border-red-500/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-red-500/10 pb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shadow-inner">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Danger Zone</h3>
              <p className="text-[11px] text-white/50">Irreversible and destructive actions.</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between ml-14">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <Trash2 size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">Delete Account</h4>
                <p className="text-[11px] text-white/50">Permanently delete your account and all data.</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500/10 transition-colors">
              Delete Account
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}

function EventsView() {
  const [view, setView] = useState('create'); // 'list' or 'create'

  // If there were events, we might show a list first. Since we want to display the mockup immediately, 
  // we'll default to the 'create' view, or pretend there's an empty state.
  if (view === 'list') {
    return (
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0714] items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-[#1c133a] rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarDays size={32} className="text-[#8155ff]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No events created yet</h2>
          <p className="text-sm text-white/50 mb-8">You haven't hosted any events. Create your first event and start collecting payments instantly.</p>
          <button 
            onClick={() => setView('create')}
            className="bg-[#8155ff] hover:bg-[#6035f5] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(129,85,255,0.3)] flex items-center gap-2 mx-auto"
          >
            <FilePlus size={18} /> Create New Event
          </button>
        </div>
      </main>
    );
  }

  // The Create / Edit Event Mockup View
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#0a0714]">
      {/* Top Header */}
      <header className="h-24 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0714] sticky top-0 z-10 shrink-0">
        <div>
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-3">
            <ArrowLeft size={14} /> Back to Events
          </button>
          <h1 className="text-2xl font-bold text-white mb-1">Create / Edit Event</h1>
          <p className="text-xs text-white/50">Fill in the details below to create your event</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-transparent border border-white/10 hover:bg-white/5 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Save Draft
          </button>
          <button className="flex items-center gap-2 bg-[#8155ff] hover:bg-[#6035f5] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-[0_0_15px_rgba(129,85,255,0.3)]">
            Next <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-white/5 px-8 py-6">
        <div className="flex items-center max-w-4xl gap-2">
          <Step active={true} number="1" label="Basic Info" />
          <div className="flex-1 h-px bg-white/10 mx-2"></div>
          <Step active={false} number="2" label="Additional Details" />
          <div className="flex-1 h-px bg-white/10 mx-2"></div>
          <Step active={false} number="3" label="Goal & Settings" />
          <div className="flex-1 h-px bg-white/10 mx-2"></div>
          <Step active={false} number="4" label="Review & Publish" />
        </div>
      </div>

      {/* Content Form Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-5 gap-8">
          
          {/* Left Column: Form */}
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Basic Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Event Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter event name" className="w-full bg-[#1c133a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-[#8155ff]/50 transition-colors placeholder:text-white/30" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Short Description <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <textarea placeholder="A short description about your event" rows="4" className="w-full bg-[#1c133a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-[#8155ff]/50 transition-colors placeholder:text-white/30 resize-none"></textarea>
                    <span className="absolute bottom-3 right-3 text-[10px] text-white/30">0/120</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Category <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-[#1c133a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 outline-none focus:border-[#8155ff]/50 transition-colors appearance-none cursor-pointer">
                      <option value="">Select category</option>
                      <option value="tech">Technical</option>
                      <option value="cultural">Cultural</option>
                      <option value="sports">Sports</option>
                    </select>
                    <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Event Type <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 bg-[#1c133a] border border-[#8155ff]/50 rounded-xl p-4 cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-[#8155ff] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1">Public Event</div>
                        <div className="text-[10px] text-white/50">Anyone can view and contribute</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 bg-transparent border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-colors">
                      <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center shrink-0 mt-0.5"></div>
                      <div>
                        <div className="text-sm font-medium text-white/70 mb-1">Private Event</div>
                        <div className="text-[10px] text-white/40">Only invited people can contribute</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Event Cover Image <span className="text-red-500">*</span></label>
                  <div className="border-2 border-dashed border-[#8155ff]/30 rounded-2xl p-8 flex flex-col items-center justify-center bg-[#8155ff]/5 hover:bg-[#8155ff]/10 cursor-pointer transition-colors text-center">
                    <div className="w-10 h-10 rounded-lg bg-[#8155ff]/20 flex items-center justify-center text-[#8155ff] mb-3">
                      <ImageIcon size={20} />
                    </div>
                    <div className="text-sm font-bold text-white mb-1">Upload cover image</div>
                    <div className="text-[10px] text-white/50 mb-1">JPG, PNG or WEBP (Max. 5MB)</div>
                    <div className="text-[10px] text-white/40">Recommended size: 1200x630px</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Previews */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Live Preview */}
            <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white">Live Preview</h3>
                <span className="text-[10px] font-medium text-white/50 bg-white/5 px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                  <Check size={10} /> Public
                </span>
              </div>
              
              {/* Event Card Mock */}
              <div className="bg-[#1c133a] border border-white/10 rounded-xl overflow-hidden shadow-lg group">
                <div className="h-40 bg-gradient-to-br from-indigo-900 to-purple-900 relative">
                  {/* Decorative mockup image pattern */}
                  <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 transition-colors">
                    <Edit3 size={14} />
                  </button>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-white mb-2">Event Title</h4>
                  <p className="text-xs text-white/50 mb-4 line-clamp-2">Short description will appear here...</p>
                  
                  <div className="flex items-center gap-4 text-[11px] text-white/60 mb-4">
                    <div className="flex items-center gap-1.5"><Calendar size={12} /> Date</div>
                    <div className="flex items-center gap-1.5"><MapPin size={12} /> Location</div>
                  </div>
                  
                  <div className="inline-block px-3 py-1 rounded bg-[#8155ff]/10 text-[#8155ff] text-[10px] font-bold border border-[#8155ff]/20">
                    Category
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Information */}
            <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white">Organizer Information</h3>
                <button className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 transition-colors">Edit</button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-[#1c133a] overflow-hidden bg-gray-800 shrink-0">
                  <img src="https://ui-avatars.com/api/?name=Aarav+Mehta&background=random" alt="Aarav" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="text-sm font-bold text-white">Aarav Mehta</h4>
                    <ShieldCheck size={14} className="text-[#8155ff]" />
                  </div>
                  <p className="text-[11px] text-white/60 mb-0.5">aarav.mehta@gmail.com</p>
                  <p className="text-[11px] text-white/60">+91 98765 43210</p>
                </div>
              </div>

              <div className="bg-[#1c133a] border border-[#8155ff]/20 rounded-xl p-4 flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#8155ff]/10 flex items-center justify-center text-[#8155ff] shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#8155ff] mb-1">Verified Organizer</h5>
                  <p className="text-[10px] text-white/50 leading-relaxed">Your identity has been verified. People can trust your events and contributions.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="border-t border-white/5 bg-[#0a0714] p-6 shrink-0 z-10 flex items-center justify-between mt-auto">
        <p className="text-xs text-white/40">You can save draft and continue later</p>
        <div className="flex gap-3">
          <button className="bg-transparent border border-white/10 hover:bg-white/5 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Save Draft
          </button>
          <button className="flex items-center gap-2 bg-[#8155ff] hover:bg-[#6035f5] text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-[0_0_15px_rgba(129,85,255,0.3)]">
            Next <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </main>
  );
}

function Step({ active, number, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? 'bg-[#8155ff] text-white shadow-[0_0_10px_rgba(129,85,255,0.5)]' : 'border border-white/20 text-white/40'}`}>
        {number}
      </div>
      <span className={`text-xs font-medium ${active ? 'text-white' : 'text-white/40'}`}>{label}</span>
    </div>
  );
}

// ... existing subcomponents ...

function DashboardContent() {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#0a0714]">
      {/* Top Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#120c2b]/30 backdrop-blur-md sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-xs text-white/50">Overview of platform activity and key metrics</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notification bell removed as requested */}
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* 6 Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <MetricCard title="Total Users" value="12,582" trend="+18.6%" isPositive={true} icon={<Users size={16} className="text-[#8155ff]" />} bgClass="bg-[#8155ff]/10" />
          <MetricCard title="Total Events" value="1,248" trend="+14.3%" isPositive={true} icon={<Calendar size={16} className="text-[#3b82f6]" />} bgClass="bg-[#3b82f6]/10" />
          <MetricCard title="Total Amount Collected" value="₹45,28,890" trend="+22.7%" isPositive={true} icon={<Landmark size={16} className="text-[#10b981]" />} bgClass="bg-[#10b981]/10" />
          <MetricCard title="Total Transactions" value="8,963" trend="+18.1%" isPositive={true} icon={<CreditCard size={16} className="text-[#8b5cf6]" />} bgClass="bg-[#8b5cf6]/10" />
        </div>

        {/* Activity Row */}
        <div className="grid lg:grid-cols-1 gap-6 mb-6">

          {/* Recent Activity */}
          <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-medium text-sm">Recent Activity</h3>
              <button className="text-[11px] text-[#8155ff] hover:text-white transition-colors">View all</button>
            </div>
            <div className="flex-1 space-y-5">
              <ActivityRow icon={<ArrowDownLeft size={14} />} color="text-green-500" bg="bg-green-500/10" title="Payment of ₹750 received" subtitle="TechFest 2K25" time="2 min ago" />
              <ActivityRow icon={<UserPlus size={14} />} color="text-[#8155ff]" bg="bg-[#8155ff]/10" title="New user registered" subtitle="rahul.sharma@email.com" time="10 min ago" />
              <ActivityRow icon={<ArrowUpRight size={14} />} color="text-amber-500" bg="bg-amber-500/10" title="Payout of ₹12,500 initiated" subtitle="To HDFC Bank **** 3456" time="25 min ago" />
              <ActivityRow icon={<FilePlus size={14} />} color="text-blue-500" bg="bg-blue-500/10" title="Event created" subtitle="Hackathon 2025" time="32 min ago" />
              <ActivityRow icon={<RefreshCcw size={14} />} color="text-red-500" bg="bg-red-500/10" title="Refund of ₹500 processed" subtitle="Payment ID: pay_N8X4K6L" time="1 hr ago" />
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-medium text-sm">Recent Transactions</h3>
              <button className="text-[11px] text-[#8155ff] hover:text-white transition-colors">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] text-white/40 uppercase tracking-wider">
                    <th className="pb-3 font-medium px-2">Transaction ID</th>
                    <th className="pb-3 font-medium px-2">User</th>
                    <th className="pb-3 font-medium px-2">Event</th>
                    <th className="pb-3 font-medium px-2">Amount</th>
                    <th className="pb-3 font-medium px-2">Status</th>
                    <th className="pb-3 font-medium px-2 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <TableRow id="pay_N8X4K6L2r4aB7s" user="rahul.sharma@email.com" event="TechFest 2K25" amount="₹750" status="Successful" date="24 May, 10:24 AM" />
                  <TableRow id="pay_M7Y3P2Q9x1zL8k" user="priya.singh@email.com" event="Hackathon 2025" amount="₹1,200" status="Successful" date="24 May, 09:45 AM" />
                  <TableRow id="pay_L4W8R6Tfy9uV2b" user="aman.verma@email.com" event="College Fest" amount="₹500" status="Pending" date="24 May, 09:20 AM" />
                  <TableRow id="pay_P3O619U2i7oJ4h" user="neha.gupta@email.com" event="Sports Day" amount="₹300" status="Failed" date="24 May, 08:15 AM" />
                  <TableRow id="pay_K2J7H4G1f6dS9a" user="vishal.k@email.com" event="TechFest 2K25" amount="₹1,000" status="Successful" date="24 May, 08:01 AM" />
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4 text-[11px] text-white/40">
              <span>Showing 1 to 5 of 20 results</span>
              <div className="flex gap-1">
                <button className="w-6 h-6 rounded bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">&lt;</button>
                <button className="w-6 h-6 rounded bg-[#8155ff] text-white flex items-center justify-center font-bold">1</button>
                <button className="w-6 h-6 rounded bg-transparent hover:bg-white/5 flex items-center justify-center transition-colors">2</button>
                <button className="w-6 h-6 rounded bg-transparent hover:bg-white/5 flex items-center justify-center transition-colors">3</button>
                <button className="w-6 h-6 rounded bg-transparent hover:bg-white/5 flex items-center justify-center transition-colors">4</button>
                <button className="px-2 h-6 rounded bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">Next &gt;</button>
              </div>
            </div>
          </div>

          <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-medium text-sm">Top Events by Collection</h3>
              <button className="text-[11px] text-[#8155ff] hover:text-white transition-colors">View all</button>
            </div>
            <div className="flex-1 space-y-4">
              <TopEventRow rank="1" title="TechFest 2K25" org="IIT Delhi" amount="₹12,45,780" percent="28%" imgColor="bg-purple-500" />
              <TopEventRow rank="2" title="Hackathon 2025" org="IIIT Bangalore" amount="₹8,75,230" percent="19.4%" imgColor="bg-blue-500" />
              <TopEventRow rank="3" title="College Fest" org="DTU, Delhi" amount="₹6,25,890" percent="13.8%" imgColor="bg-green-500" />
              <TopEventRow rank="4" title="Sports Day" org="St. Xavier's College" amount="₹4,85,600" percent="10.7%" imgColor="bg-amber-500" />
              <TopEventRow rank="5" title="Cultural Night" org="Mumbai University" amount="₹3,45,320" percent="7.6%" imgColor="bg-pink-500" />
            </div>
          </div>
        </div>

        {/* Bottom Alert/Action Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#120c2b]/50 border border-red-500/20 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-red-500/5 transition-colors">
            <div>
              <h4 className="text-xs text-red-500 font-medium mb-1">Fraud Alerts</h4>
              <div className="flex items-baseline gap-2"><span className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">7</span><span className="text-[11px] text-white/50">high risk activities</span></div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500"><AlertTriangle size={20} /></div>
          </div>
          <div className="bg-[#120c2b]/50 border border-amber-500/20 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-amber-500/5 transition-colors">
            <div>
              <h4 className="text-xs text-amber-500 font-medium mb-1">KYC Pending</h4>
              <div className="flex items-baseline gap-2"><span className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">23</span><span className="text-[11px] text-white/50">verifications pending</span></div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500"><UserCheck size={20} /></div>
          </div>
          <div className="bg-[#120c2b]/50 border border-blue-500/20 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-blue-500/5 transition-colors">
            <div>
              <h4 className="text-xs text-blue-500 font-medium mb-1">Refund Requests</h4>
              <div className="flex items-baseline gap-2"><span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">5</span><span className="text-[11px] text-white/50">requests pending</span></div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><RotateCw size={20} /></div>
          </div>
          <button className="bg-[#8155ff] hover:bg-[#6035f5] text-white rounded-2xl p-5 flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(129,85,255,0.3)]">
            <Download size={20} />
            <span className="font-bold">Download Reports</span>
          </button>
        </div>
      </div>
    </main>
  );
}

function TransactionsView() {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#0a0714]">
      {/* Top Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#120c2b]/30 backdrop-blur-md sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Payments</h1>
          <p className="text-xs text-white/50">View and manage all payments for your events</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#1c133a] border border-white/10 rounded-lg px-3 py-2 w-72 focus-within:border-[#8155ff]/50 transition-colors">
            <Search className="text-white/40 mr-2" size={14} />
            <input type="text" placeholder="Search by email, name or transaction ID..." className="bg-transparent border-none text-white text-xs outline-none placeholder:text-white/40 w-full" />
          </div>
          
          <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <Bell size={18} className="text-white/70" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#8155ff] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-[#0a0714]">3</span>
          </div>

          <button className="flex items-center gap-2 bg-[#8155ff] hover:bg-[#6035f5] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-[0_0_15px_rgba(129,85,255,0.3)]">
            <Download size={14} /> Export
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricCard title="Total Collected" value="₹24,56,890" trend="+18.6%" isPositive={true} icon={<CalendarRange size={16} className="text-[#8155ff]" />} bgClass="bg-[#8155ff]/10" />
          <MetricCard title="Total Transactions" value="1,248" trend="+12.4%" isPositive={true} icon={<CreditCard size={16} className="text-[#3b82f6]" />} bgClass="bg-[#3b82f6]/10" />
          <MetricCard title="Successful Payments" value="1,186" trend="+14.7%" isPositive={true} icon={<ShieldCheck size={16} className="text-[#10b981]" />} bgClass="bg-[#10b981]/10" />
        </div>

        {/* Filter Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-[#1c133a] border border-white/10 rounded-lg px-3 py-2 w-64">
            <Search className="text-white/40 mr-2" size={14} />
            <input type="text" placeholder="Search by email..." className="bg-transparent border-none text-white text-xs outline-none placeholder:text-white/40 w-full" />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#1c133a] border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium">
              <CalendarRange size={14} className="text-white/40" /> All Events <ChevronDownIcon />
            </button>
            <button className="flex items-center gap-2 bg-[#1c133a] border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium">
              <div className="w-3 h-3 rounded-full border border-white/40"></div> All Status <ChevronDownIcon />
            </button>
            <button className="flex items-center gap-2 bg-[#1c133a] border border-white/10 text-white/70 px-4 py-2 rounded-lg text-xs font-medium">
              <Filter size={14} /> Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] text-white/40 uppercase tracking-wider bg-black/20">
                <th className="py-4 px-6 font-medium">Payer (Email)</th>
                <th className="py-4 px-6 font-medium">Event</th>
                <th className="py-4 px-6 font-medium">Amount</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Date & Time</th>
                <th className="py-4 px-6 font-medium">TXN ID</th>
                <th className="py-4 px-6 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <TransactionRow user="Rahul Kumar" email="rahul.k@example.com" userColor="bg-pink-600" letter="R" event="TechFest 2K25" eventColor="bg-purple-600" amount="₹750.00" status="Success" date="May 18, 2025" time="10:24 AM" txnid="pay_8Xh2j9kL1" />
              <TransactionRow user="Priya Singh" email="priya.singh@example.com" userColor="bg-blue-600" letter="P" event="TechFest 2K25" eventColor="bg-purple-600" amount="₹1,000.00" status="Success" date="May 18, 2025" time="09:47 AM" txnid="pay_8Xh2j7gK3" />
              <TransactionRow user="Arjun Mehta" email="arjun.m@example.com" userColor="bg-orange-600" letter="A" event="Music Night Live" eventColor="bg-orange-600" amount="₹500.00" status="Success" date="May 18, 2025" time="09:15 AM" txnid="pay_8Xh2j2bF9" />
              <TransactionRow user="Neha Verma" email="neha.verma@example.com" userColor="bg-purple-600" letter="N" event="Education for All" eventColor="bg-blue-600" amount="₹1,200.00" status="Success" date="May 17, 2025" time="08:32 PM" txnid="pay_8Xh1p9mT2" />
              <TransactionRow user="Sachin R" email="sachin.r@example.com" userColor="bg-green-600" letter="S" event="SportX Tournament" eventColor="bg-green-600" amount="₹350.00" status="Pending" date="May 17, 2025" time="07:21 PM" txnid="pay_8Xh1p3kL8" />
              <TransactionRow user="Vikas Bansal" email="vikas.b@example.com" userColor="bg-yellow-600" letter="V" event="TechFest 2K25" eventColor="bg-purple-600" amount="₹800.00" status="Failed" date="May 17, 2025" time="06:11 PM" txnid="pay_8Xh1o7dR6" />
              <TransactionRow user="Kavita P" email="kavita.p@example.com" userColor="bg-teal-600" letter="K" event="Art & Culture Fest" eventColor="bg-amber-600" amount="₹600.00" status="Success" date="May 17, 2025" time="05:33 PM" txnid="pay_8Xh1o1sN4" />
              <TransactionRow user="Deepak J" email="deepak.j@example.com" userColor="bg-indigo-600" letter="D" event="Blood Donation Camp" eventColor="bg-red-600" amount="₹200.00" status="Success" date="May 17, 2025" time="04:45 PM" txnid="pay_8Xh1n9wQ1" />
            </tbody>
          </table>
          <div className="flex justify-between items-center p-6 bg-black/10 border-t border-white/5 text-[11px] text-white/40">
            <span>Showing 1 to 8 of 1,248 transactions</span>
            <div className="flex gap-1 items-center">
              <button className="w-6 h-6 rounded flex items-center justify-center hover:text-white transition-colors">&lt;</button>
              <button className="w-6 h-6 rounded bg-[#8155ff] text-white flex items-center justify-center font-bold">1</button>
              <button className="w-6 h-6 rounded bg-transparent hover:text-white flex items-center justify-center transition-colors">2</button>
              <button className="w-6 h-6 rounded bg-transparent hover:text-white flex items-center justify-center transition-colors">3</button>
              <button className="w-6 h-6 rounded bg-transparent hover:text-white flex items-center justify-center transition-colors">4</button>
              <button className="w-6 h-6 rounded bg-transparent hover:text-white flex items-center justify-center transition-colors">5</button>
              <span className="px-1">...</span>
              <button className="w-6 h-6 rounded bg-transparent hover:text-white flex items-center justify-center transition-colors">125</button>
              <button className="w-6 h-6 rounded flex items-center justify-center hover:text-white transition-colors">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileView() {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-[#0a0714]">
      {/* Top Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#120c2b]/30 backdrop-blur-md sticky top-0 z-10 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Profile</h1>
          <p className="text-xs text-white/50">Manage your account, view your activity and update your preferences.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#1c133a] border border-white/10 rounded-lg px-3 py-2 w-72 focus-within:border-[#8155ff]/50 transition-colors">
            <Search className="text-white/40 mr-2" size={14} />
            <input type="text" placeholder="Search events, payments..." className="bg-transparent border-none text-white text-xs outline-none placeholder:text-white/40 w-full" />
          </div>
          
          <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <Bell size={18} className="text-white/70" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#8155ff] text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-[#0a0714]">3</span>
          </div>

          <div className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <Moon size={18} className="text-white/70" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* Profile Info Card */}
        <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-8 mb-8 relative">
          <button className="absolute top-8 right-8 bg-[#8155ff] hover:bg-[#6035f5] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-[0_0_15px_rgba(129,85,255,0.3)]">
            Edit Profile
          </button>
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left part: Avatar and Details */}
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full border-4 border-[#1c133a] overflow-hidden bg-gray-800">
                  <img src="https://ui-avatars.com/api/?name=Aarav+Mehta&background=random" alt="Aarav Mehta" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#8155ff] hover:bg-[#6035f5] rounded-full flex items-center justify-center text-white border-2 border-[#120c2b] transition-colors">
                  <Edit3 size={12} />
                </button>
              </div>

              {/* Details */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-white">Aarav Mehta</h2>
                  <ShieldCheck size={18} className="text-[#8155ff]" />
                </div>
                <p className="text-sm text-white/50 mb-4">Organizer</p>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Mail size={14} className="text-white/40" /> aarav.mehta@gmail.com
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <MapPin size={14} className="text-white/40" /> Bengaluru, Karnataka
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Phone size={14} className="text-white/40" /> +91 98765 43210
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Calendar size={14} className="text-white/40" /> Joined May 2025
                  </div>
                </div>
              </div>
            </div>

            {/* Right part: Stats inline */}
            <div className="lg:ml-auto flex flex-col justify-center gap-4 lg:pl-10 lg:border-l border-white/5 w-full lg:w-72">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-white/60"><CalendarDays size={16} /> Total Events</div>
                <div className="font-bold text-white">12</div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-white/60"><Landmark size={16} /> Total Collected</div>
                <div className="font-bold text-white">₹24,56,890</div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-white/60"><Users size={16} /> Total Participants</div>
                <div className="font-bold text-white">1,248</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 mb-8">
          <button className="px-6 py-3 text-sm font-medium text-[#8155ff] border-b-2 border-[#8155ff]">Overview</button>
          <button className="px-6 py-3 text-sm font-medium text-white/50 hover:text-white transition-colors">My Events</button>
          <button className="px-6 py-3 text-sm font-medium text-white/50 hover:text-white transition-colors">Payments</button>
          <button className="px-6 py-3 text-sm font-medium text-white/50 hover:text-white transition-colors">Security</button>
          <button className="px-6 py-3 text-sm font-medium text-white/50 hover:text-white transition-colors">Settings</button>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Total Events" value="12" trend="8 Active • 3 Completed" isPositive={null} icon={<CalendarDays size={16} className="text-[#8155ff]" />} bgClass="bg-[#8155ff]/10" />
          <MetricCard title="Total Collected" value="₹24,56,890" trend="+18.6% from last month" isPositive={true} icon={<Landmark size={16} className="text-[#10b981]" />} bgClass="bg-[#10b981]/10" />
          <MetricCard title="Total Participants" value="1,248" trend="+12.4% from last month" isPositive={true} icon={<Users size={16} className="text-[#3b82f6]" />} bgClass="bg-[#3b82f6]/10" />
          <MetricCard title="Successful Payments" value="1,186" trend="95.2% Success Rate" isPositive={true} icon={<ShieldCheck size={16} className="text-[#f59e0b]" />} bgClass="bg-[#f59e0b]/10" />
        </div>

        {/* Bottom Split */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Recent Activity */}
          <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-medium text-sm">Recent Activity</h3>
              <button className="text-[11px] text-[#8155ff] hover:text-white transition-colors">View all</button>
            </div>
            <div className="flex-1 space-y-6">
              <ActivityRow2 
                icon={<ArrowDownLeft size={14} />} color="text-green-500" bg="bg-green-500/10" 
                title="Payment received from rahul.k@email.com" subtitle="For TechFest 2K25" 
                rightTitle="+ ₹750.00" rightColor="text-green-500" rightSubtitle="10:24 AM" 
              />
              <ActivityRow2 
                icon={<CalendarDays size={14} />} color="text-[#8155ff]" bg="bg-[#8155ff]/10" 
                title="New event created: Music Night Live" subtitle="30 May 2025" 
                rightTitle="May 17, 2025" rightColor="text-white/60" rightSubtitle="" 
              />
              <ActivityRow2 
                icon={<ArrowDownLeft size={14} />} color="text-green-500" bg="bg-green-500/10" 
                title="Payment received from priya.singh@email.com" subtitle="For TechFest 2K25" 
                rightTitle="+ ₹1,000.00" rightColor="text-green-500" rightSubtitle="May 17, 2025" 
              />
              <ActivityRow2 
                icon={<ShieldCheck size={14} />} color="text-blue-500" bg="bg-blue-500/10" 
                title="Event completed: Art & Culture Fest" subtitle="" 
                rightTitle="May 16, 2025" rightColor="text-white/60" rightSubtitle="" 
              />
            </div>
          </div>

          {/* Collection Overview */}
          <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-medium text-sm">Collection Overview</h3>
              <button className="text-xs bg-[#1c133a] border border-white/10 text-white/70 px-3 py-1.5 rounded-lg flex items-center gap-2">
                This Month <ChevronDownIcon />
              </button>
            </div>
            <div className="flex-1 min-h-[220px] relative w-full rounded-lg bg-gradient-to-b from-[#8155ff]/10 to-transparent border-b border-l border-white/10 flex items-end ml-4">
              {/* Y Axis labels */}
              <div className="absolute left-[-28px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-white/40 py-2">
                <span>₹6L</span>
                <span>₹4L</span>
                <span>₹2L</span>
                <span>₹0</span>
              </div>
              
              <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none">
                <path d="M0,200 L0,170 L80,150 L160,160 L240,110 L320,60 L400,20 L400,200 Z" fill="url(#grad2)" opacity="0.3" />
                <path d="M0,170 L80,150 L160,160 L240,110 L320,60 L400,20" fill="none" stroke="#8155ff" strokeWidth="3" />
                <circle cx="240" cy="110" r="4" fill="#8155ff" stroke="#fff" strokeWidth="2" />
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8155ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8155ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute left-[60%] top-[40%] bg-[#1c133a] border border-[#8155ff]/50 px-3 py-1.5 rounded-lg text-center transform -translate-x-1/2 -translate-y-full shadow-lg">
                <div className="text-[10px] text-white/60 mb-0.5">18 May, 2025</div>
                <div className="text-xs font-bold text-[#8155ff]">₹4,25,890</div>
              </div>

              {/* X Axis labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-white/40 px-2">
                <span>1 May</span>
                <span>8 May</span>
                <span>15 May</span>
                <span>22 May</span>
                <span>31 May</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}

// Subcomponents for cleaner code

function ChevronDownIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MetricCard({ title, value, trend, isPositive, icon, bgClass }) {
  return (
    <div className="bg-[#120c2b]/50 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bgClass}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-[11px] text-white/50 font-medium mb-1">{title}</p>
        <h4 className="text-lg font-bold text-white mb-2">{value}</h4>
        <div className="flex items-center gap-1.5">
          {isPositive !== null ? (
            <>
              <span className={`text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{trend.split(' ')[0]}</span>
              <span className="text-[10px] text-white/40">{trend.substring(trend.indexOf(' ')+1)}</span>
            </>
          ) : (
            <span className="text-[10px] text-white/40">{trend}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivityRow({ icon, color, bg, title, subtitle, time }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bg} ${color}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-white/90 truncate">{title}</p>
        <p className="text-[10px] text-white/50 truncate">{subtitle}</p>
      </div>
      <div className="text-[10px] text-white/40 whitespace-nowrap">{time}</div>
    </div>
  );
}

function ActivityRow2({ icon, color, bg, title, subtitle, rightTitle, rightSubtitle, rightColor }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bg} ${color}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-xs font-medium text-white/90 truncate">{title}</p>
          <p className="text-[10px] text-white/50 truncate mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="text-right shrink-0 pt-0.5">
        <p className={`text-xs font-bold ${rightColor}`}>{rightTitle}</p>
        <p className="text-[10px] text-white/40 mt-0.5">{rightSubtitle}</p>
      </div>
    </div>
  );
}

function TableRow({ id, user, event, amount, status, date }) {
  const isSuccess = status === 'Successful';
  const isPending = status === 'Pending';
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
      <td className="py-3 px-2 text-white/70 font-mono">{id}</td>
      <td className="py-3 px-2 text-white/90">{user}</td>
      <td className="py-3 px-2 text-white/70">{event}</td>
      <td className="py-3 px-2 text-white font-medium">{amount}</td>
      <td className="py-3 px-2">
        <span className={`px-2 py-1 text-[9px] uppercase tracking-wider font-bold rounded bg-opacity-10 border ${
          isSuccess ? 'bg-green-500 text-green-500 border-green-500/20' : 
          isPending ? 'bg-amber-500 text-amber-500 border-amber-500/20' : 
          'bg-red-500 text-red-500 border-red-500/20'
        }`}>
          {status}
        </span>
      </td>
      <td className="py-3 px-2 text-right text-white/40">{date}</td>
    </tr>
  );
}

function TopEventRow({ rank, title, org, amount, percent, imgColor }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white/50 font-bold shrink-0 border border-white/10">
        {rank}
      </div>
      <div className={`w-10 h-10 rounded-lg ${imgColor} shrink-0 opacity-80 bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center`}>
        <Calendar size={16} className="text-white/50" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white truncate">{title}</p>
        <p className="text-[10px] text-white/50 truncate">{org}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-bold text-white">{amount}</p>
        <p className="text-[9px] text-white/40">{percent} of total</p>
      </div>
    </div>
  );
}

function TransactionRow({ user, email, letter, userColor, event, eventColor, amount, status, date, time, txnid }) {
  const isSuccess = status === 'Success';
  const isPending = status === 'Pending';
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${userColor} flex items-center justify-center text-white font-bold shrink-0 shadow-lg`}>
            {letter}
          </div>
          <div>
            <p className="text-white/90 font-medium leading-tight mb-0.5">{email}</p>
            <p className="text-[10px] text-white/50">{user}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${eventColor} shrink-0 opacity-80 bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center`}>
            <Calendar size={12} className="text-white" />
          </div>
          <span className="text-white/70">{event}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-white font-medium">{amount}</td>
      <td className="py-4 px-6">
        <span className={`px-2 py-1 text-[10px] font-medium rounded bg-opacity-10 border ${
          isSuccess ? 'bg-green-500/20 text-green-400 border-green-500/20' : 
          isPending ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' : 
          'bg-red-500/20 text-red-400 border-red-500/20'
        }`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-6">
        <p className="text-white/80 leading-tight mb-0.5">{date}</p>
        <p className="text-[10px] text-white/40">{time}</p>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <span className="text-white/50 font-mono text-[11px]">{txnid}</span>
          <button className="text-white/20 hover:text-white/60 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </td>
      <td className="py-4 px-6 text-right">
        <button className="text-white/40 hover:text-white transition-colors">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}

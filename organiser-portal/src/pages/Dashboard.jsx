import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEventRegistrations } from '../utils/mockData';
import { Calendar, Users, DollarSign, ArrowRight, PlusCircle, TrendingUp, Sparkles, Receipt } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import { addRealtimeRegistration } from '../utils/mockData';

export default function Dashboard() {
  const { token } = useAuth();
  const { socket } = useSocket();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    totalRevenue: 0
  });

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/my`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        const myEvents = data.events || [];
        setEvents(myEvents);

        // Gather all registrations across events
        let allRegs = [];
        myEvents.forEach(evt => {
          const regs = getEventRegistrations(evt);
          allRegs = [...allRegs, ...regs];
        });

        // Sort by date descending
        allRegs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentActivities(allRegs.slice(0, 5));

        // Calculate stats
        const totalRegistrations = allRegs.length;
        const totalRevenue = allRegs.reduce((sum, reg) => sum + reg.amount, 0);

        setStats({
          totalEvents: myEvents.length,
          totalRegistrations,
          totalRevenue
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Listen for real-time payment confirmations
  useEffect(() => {
    if (!socket) return;

    const handlePaymentConfirmed = (data) => {
      console.log('Realtime payment confirmed in Dashboard:', data);
      // Find event
      const matchedEvent = events.find(e => e.title === data.eventName);
      if (matchedEvent) {
        // Add registration
        addRealtimeRegistration(matchedEvent.id, {
          userName: data.userName,
          amount: data.amount,
          eventName: data.eventName
        });
        // Refresh dashboard statistics and list
        fetchDashboardData();
      }
    };

    socket.on('payment:confirmed', handlePaymentConfirmed);

    return () => {
      socket.off('payment:confirmed', handlePaymentConfirmed);
    };
  }, [socket, events]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050508]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#8155ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60 text-xs font-sans">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white px-6 md:px-12 py-10 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.04]">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-200">
              Organiser Command Center
            </h1>
            <p className="text-sm text-white/55">
              Monitor event performance, check transaction volumes, and review real-time checkouts.
            </p>
          </div>
          <Link
            to="/events/create"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#8155ff] to-[#6035f5] hover:opacity-90 text-white px-5 py-3 rounded-2xl font-bold text-[13px] shadow-lg shadow-purple-500/20 transition-all w-fit cursor-pointer"
          >
            <PlusCircle size={16} /> Create Event
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Events */}
          <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8155ff]/5 blur-[30px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#8155ff]">
                <Calendar size={20} />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp size={10} /> Active
              </span>
            </div>
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Total Events</p>
            <h3 className="text-3xl font-extrabold mt-1 tracking-tight">{stats.totalEvents}</h3>
          </div>

          {/* Total Registrations */}
          <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[30px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-purple-400">
                <Users size={20} />
              </div>
              <span className="text-[11px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <Sparkles size={10} /> Live
              </span>
            </div>
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Total Registrations</p>
            <h3 className="text-3xl font-extrabold mt-1 tracking-tight">{stats.totalRegistrations}</h3>
          </div>

          {/* Revenue */}
          <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[30px] rounded-full pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-emerald-400">
                <DollarSign size={20} />
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                INR
              </span>
            </div>
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-extrabold mt-1 tracking-tight">₹{stats.totalRevenue.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Middle: My Events List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">My Events</h2>
              <Link to="/events" className="text-xs font-semibold text-[#8155ff] hover:text-[#a88bff] flex items-center gap-1 transition-colors">
                View All Events <ArrowRight size={14} />
              </Link>
            </div>

            {events.length === 0 ? (
              <div className="bg-white/[0.02] border border-white/[0.04] rounded-3xl p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-white/35">
                  <Calendar size={28} />
                </div>
                <h3 className="text-base font-bold mb-1">No Events Found</h3>
                <p className="text-xs text-white/45 max-w-sm mb-6 leading-relaxed">
                  Start creating events to receive payments and registrations online.
                </p>
                <Link
                  to="/events/create"
                  className="bg-white text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-white/95 transition-all"
                >
                  Create Your First Event
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.slice(0, 4).map((evt) => {
                  const regs = getEventRegistrations(evt);
                  const revenue = regs.reduce((sum, r) => sum + r.amount, 0);
                  return (
                    <div 
                      key={evt.id} 
                      className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden hover:border-[#8155ff]/30 hover:bg-white/[0.03] transition-all flex flex-col justify-between"
                    >
                      {evt.image && (
                        <div className="h-32 w-full overflow-hidden relative border-b border-white/[0.04]">
                          <img 
                            src={evt.image} 
                            alt={evt.title} 
                            className="w-full h-full object-cover"
                          />
                          <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            evt.type === 'PRIVATE' ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/20' : 'bg-[#8155ff]/15 text-[#8155ff] border border-[#8155ff]/20'
                          }`}>
                            {evt.type}
                          </span>
                        </div>
                      )}
                      
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-sm text-white line-clamp-1">{evt.title}</h4>
                          <p className="text-[12px] text-white/50 line-clamp-2 leading-relaxed">{evt.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/[0.04]">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-white/35">Registrations</span>
                            <p className="text-xs font-bold text-white/80">{regs.length} / {evt.capacity}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-white/35">Revenue</span>
                            <p className="text-xs font-bold text-white/80">₹{revenue.toLocaleString('en-IN')}</p>
                          </div>
                        </div>

                        <Link
                          to={`/events/${evt.id}`}
                          className="w-full mt-2 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] text-white py-2 rounded-xl text-center text-xs font-semibold block transition-all"
                        >
                          Manage Event
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Recent Activity Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Registrations</h2>
              <Link to="/transactions" className="text-xs font-semibold text-[#8155ff] hover:text-[#a88bff] flex items-center gap-1 transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-5 space-y-4 max-h-[500px] overflow-y-auto">
              {recentActivities.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center text-white/30 mb-3">
                    <Receipt size={18} />
                  </div>
                  <p className="text-xs text-white/45">No recent activity</p>
                </div>
              ) : (
                recentActivities.map((act) => (
                  <div 
                    key={act.id} 
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-transparent hover:border-white/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center text-[#8155ff] font-bold text-xs shrink-0">
                      {act.userName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{act.userName}</p>
                      <p className="text-[10px] text-white/50 truncate mb-1">Registered for <span className="text-[#8155ff] font-medium">{act.eventName}</span></p>
                      <span className="text-[9px] text-white/35 font-medium">{new Date(act.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 shrink-0">
                      +₹{act.amount}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

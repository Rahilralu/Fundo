import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Mail, Phone, Clock, MessageSquare, Headphones, Book, Calendar, CreditCard, Shield, BarChart3, AlertCircle, ChevronDown, ArrowRight } from 'lucide-react';

export default function Contact() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
          <p className="text-white/60 text-sm">We're here to help! Find answers or get in touch with our support team.</p>
        </div>
        <button className="bg-[#8155ff]/20 text-[#8155ff] border border-[#8155ff]/30 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#8155ff]/30 transition-all">
          <Headphones size={16} /> Contact Support
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1c133a] to-[#0e0a1f] border border-white/10 rounded-[32px] p-8 md:p-12 mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-full bg-[#8155ff]/10 blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-xl">
          <p className="text-white/80 font-medium mb-2">Hi {user?.name || 'there'}! 👋</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">How can we help you today?</h2>
          <p className="text-white/60 text-sm mb-6">Search our knowledge base or contact our support team.</p>
          
          <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl overflow-hidden focus-within:border-[#8155ff]/50 transition-colors p-1.5 pl-4">
            <Search className="text-white/40 mr-3" size={18} />
            <input 
              type="text" 
              placeholder="Search for articles, topics or FAQs..." 
              className="flex-1 bg-transparent border-none text-white text-sm outline-none placeholder:text-white/30"
            />
            <button className="bg-[#8155ff] hover:bg-[#6035f5] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* 3D Asset Placeholder (CSS drawn) */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-48 hidden md:block">
          <div className="relative w-full h-full animate-[bounce_4s_infinite]">
            {/* Simple headphone shape with CSS */}
            <div className="absolute top-4 left-4 w-40 h-40 border-[16px] border-[#8155ff] rounded-t-full rounded-b-[40px] border-b-transparent drop-shadow-[0_0_30px_rgba(129,85,255,0.4)]"></div>
            <div className="absolute bottom-4 left-0 w-12 h-20 bg-gradient-to-b from-[#8155ff] to-[#4520b8] rounded-2xl shadow-xl"></div>
            <div className="absolute bottom-4 right-0 w-12 h-20 bg-gradient-to-b from-[#8155ff] to-[#4520b8] rounded-2xl shadow-xl"></div>
            <div className="absolute bottom-10 right-12 w-24 h-4 bg-[#8155ff] rounded-full rotate-45 transform origin-right"></div>
            <div className="absolute bottom-6 right-[100px] w-6 h-6 bg-black rounded-full border-2 border-[#8155ff]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Topics and FAQs */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Browse Help Topics */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Browse Help Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Getting Started', icon: <Book className="text-[#8155ff]" size={20} />, color: 'from-[#8155ff]/20 to-transparent', border: 'border-[#8155ff]/30', articles: 8, desc: 'Learn the basics of Fundo and how to create your first event.' },
                { title: 'Events', icon: <Calendar className="text-[#10b981]" size={20} />, color: 'from-[#10b981]/20 to-transparent', border: 'border-[#10b981]/30', articles: 12, desc: 'Create, manage and share events with your audience.' },
                { title: 'Payments & Payouts', icon: <CreditCard className="text-[#3b82f6]" size={20} />, color: 'from-[#3b82f6]/20 to-transparent', border: 'border-[#3b82f6]/30', articles: 10, desc: 'Understand payments, fees and payout timelines.' },
                { title: 'Account & Security', icon: <Shield className="text-[#f59e0b]" size={20} />, color: 'from-[#f59e0b]/20 to-transparent', border: 'border-[#f59e0b]/30', articles: 7, desc: 'Manage your account, password and security settings.' },
                { title: 'Analytics & Reports', icon: <BarChart3 className="text-[#d946ef]" size={20} />, color: 'from-[#d946ef]/20 to-transparent', border: 'border-[#d946ef]/30', articles: 6, desc: 'Track performance and generate insights for your events.' },
                { title: 'Refunds & Disputes', icon: <AlertCircle className="text-[#ef4444]" size={20} />, color: 'from-[#ef4444]/20 to-transparent', border: 'border-[#ef4444]/30', articles: 5, desc: 'Learn about refunds, disputes and chargeback policies.' },
              ].map((topic, i) => (
                <div key={i} className="bg-[#120c2b]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 hover:bg-[#1a1033] transition-colors cursor-pointer group">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br ${topic.color} border ${topic.border} flex items-center justify-center`}>
                      {topic.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#8155ff] transition-colors">{topic.title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed mb-4">{topic.desc}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-auto">
                    <span className="text-white/40 text-[11px] font-medium">{topic.articles} Articles</span>
                    <ArrowRight size={14} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
              <button className="text-[#8155ff] text-sm font-semibold flex items-center gap-1 hover:text-[#a88bff] transition-colors">
                View all FAQs <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="bg-[#120c2b]/60 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
              {[
                'How do I create a new event?',
                'What payment methods are supported?',
                'When will I receive my payouts?',
                'How can I get a refund for a payment?'
              ].map((faq, i) => (
                <div key={i} className="p-5 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
                  <span className="text-white/80 text-sm font-medium">{faq}</span>
                  <ChevronDown size={16} className="text-white/40" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Still need help? */}
        <div>
          <div className="bg-gradient-to-b from-[#1c133a] to-[#0e0a1f] border border-white/10 rounded-[24px] p-8 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Can't find the answer you're looking for? Our support team is ready to assist you.
            </p>
            
            <button className="w-full bg-[#8155ff] hover:bg-[#6035f5] text-white px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(129,85,255,0.2)] mb-8">
              <Headphones size={18} /> Contact Support
            </button>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-2.5 rounded-xl text-[#8155ff] border border-white/5 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium mb-1">Phone Number</p>
                  <p className="text-white text-sm font-medium">+91 8943602873</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-2.5 rounded-xl text-[#8155ff] border border-white/5 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium mb-1">Email / Live Chat Support</p>
                  <a href="mailto:fundoooooo12@gmail.com" className="text-white text-sm font-medium hover:text-[#8155ff] transition-colors">fundoooooo12@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/5 p-2.5 rounded-xl text-[#8155ff] border border-white/5 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium mb-1">Operating Hours</p>
                  <p className="text-white text-sm font-medium">All days 9 AM - 10 PM</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}

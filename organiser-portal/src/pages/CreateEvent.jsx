import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Calendar, Users, DollarSign, Upload, ArrowLeft, Key, Globe, FileImage, Sparkles } from 'lucide-react';

export default function CreateEvent() {
  const { token } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('PUBLIC'); // PUBLIC, PRIVATE
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !capacity || !date || !location) {
      addToast('Please fill in all fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('capacity', capacity);
      formData.append('date', date);
      formData.append('location', location);
      formData.append('type', type);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        addToast('Event created successfully!', 'success');
        navigate('/events');
      } else {
        addToast(data.error || 'Failed to create event', 'error');
      }
    } catch (err) {
      console.error('Create event error:', err);
      addToast('Network error. Failed to create event.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white px-6 md:px-12 py-10 font-sans">
      <div className="max-w-[750px] mx-auto space-y-8">
        
        {/* Back Button & Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/events')}
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] text-white/70 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Create New Event</h1>
            <p className="text-xs text-white/50">Setup pricing, capacity, and private invite keys.</p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8155ff]/5 blur-[80px] rounded-full pointer-events-none" />
          
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Event Banner Image</label>
            <div className="relative border-2 border-dashed border-white/10 hover:border-[#8155ff]/50 rounded-2xl p-6 transition-all flex flex-col items-center justify-center min-h-[160px] bg-black/35 overflow-hidden group">
              {imagePreview ? (
                <>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition-all">
                      Change Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-white/50">
                    <Upload size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold">Click to upload cover photo</p>
                    <p className="text-[10px] text-white/30 font-medium">Supports JPG, PNG or WEBP (Max 5MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Event Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual College Tech Fest"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#8155ff] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Event Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write detailed event highlights, rules, and guidelines..."
                required
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#8155ff] transition-colors resize-none font-sans"
              />
            </div>
          </div>

          {/* Pricing, Capacity, and Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Ticket Price (INR)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/40">₹</span>
                <input 
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0 (Free)"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-xs text-white outline-none focus:border-[#8155ff] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Total Capacity</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                <input 
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="100"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white outline-none focus:border-[#8155ff] transition-colors"
                />
              </div>
            </div>

            {/* Type selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Event Privacy</label>
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 p-1.5 rounded-xl h-[42px]">
                <button
                  type="button"
                  onClick={() => setType('PUBLIC')}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold py-1.5 rounded-lg transition-all cursor-pointer ${
                    type === 'PUBLIC' 
                      ? 'bg-[#8155ff] text-white' 
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  <Globe size={11} /> Public
                </button>
                <button
                  type="button"
                  onClick={() => setType('PRIVATE')}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-bold py-1.5 rounded-lg transition-all cursor-pointer ${
                    type === 'PRIVATE' 
                      ? 'bg-[#f59e0b] text-white' 
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  <Key size={11} /> Private
                </button>
              </div>
            </div>
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Date & Time</label>
              <div className="relative">
                <input 
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#8155ff] transition-colors font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-white/55">Location / Venue</label>
              <input 
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Seminar Hall B, Campus"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#8155ff] transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-white/[0.04] justify-end">
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="px-6 py-3 rounded-2xl text-xs font-bold border border-white/10 hover:bg-white/[0.03] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-[#8155ff] to-[#6035f5] hover:opacity-90 disabled:opacity-50 text-white px-8 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-lg shadow-purple-500/20"
            >
              {submitting ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

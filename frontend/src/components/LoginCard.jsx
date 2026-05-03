import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export default function LoginCard({ onLogin, onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onLogin(email,password);
  };

  return (
    <motion.div
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[380px]"
    >
      <Card className="relative overflow-hidden border border-white/5 border-l-purple-500/20 border-t-purple-500/20 bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] rounded-[2rem] p-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-black/40 pointer-events-none" />
        <CardHeader className="space-y-3 pb-3 pt-5">
          <div className="flex flex-col items-center relative">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8155ff] to-[#6035f5] flex items-center justify-center shadow-lg shadow-brand-500/30">
                <span className="font-heading font-bold text-xl text-white">F</span>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-white">Fundo</span>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <CardTitle className="text-xl font-heading text-white font-medium">Welcome Back</CardTitle>
            <CardDescription className="text-white/60 text-[11px]">
              Login to view your daily finance updates
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5 relative group">
              <label className="text-xs font-medium text-white/90">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-brand-400 transition-colors" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11 rounded-xl bg-black/20 border-white/5 text-white placeholder:text-white/30 focus:border-brand-400 focus:bg-black/40 transition-all text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5 relative group">
              <label className="text-xs font-medium text-white/90">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-brand-400 transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-11 rounded-xl bg-black/20 border-white/5 text-white placeholder:text-white/30 focus:border-brand-400 focus:bg-black/40 transition-all text-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" defaultChecked className="border-white/30 data-[state=checked]:bg-[#8155ff] w-4 h-4" />
                <label htmlFor="remember" className="text-xs text-white/80 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-xs text-[#a385ff] hover:text-white transition-colors">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-500 font-semibold text-sm mt-1">
              Sign In
            </Button>
          </form>

          <div className="mt-5">
            <div className="flex items-center gap-4 py-1.5">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="text-[10px] uppercase text-white/50 font-medium tracking-wider">or continue with</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-black/20 border border-white/5 hover:bg-black/40 rounded-xl h-10 hover:border-brand-500/30 hover:text-white transition-all duration-300 active:scale-95 text-white/80 font-medium text-xs">
                <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 bg-black/20 border border-white/5 hover:bg-black/40 rounded-xl h-10 hover:border-brand-500/30 hover:text-white transition-all duration-300 active:scale-95 text-white/80 font-medium text-xs">
                <svg viewBox="0 0 21 21" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                </svg>
                Microsoft
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button onClick={onSwitchToSignUp} className="text-brand-500 hover:text-brand-600 font-medium">
              Create account
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

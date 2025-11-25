
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Lock, User, Mail, ShieldAlert } from 'lucide-react';
import { AuthMode, UserProfile } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (profile: UserProfile | null, isAdmin: boolean) => void;
  mode: AuthMode;
}

export const LoginModal: React.FC<Props> = ({ isOpen, onClose, onLogin, mode }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
        setError('');
        setUsername('');
        setPassword('');
        setEmail('');
        setIsSignup(false);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'ADMIN') {
        // Admin Auth Logic
        if (username === 'admin' && password === 'password') {
            onLogin(null, true);
            onClose();
        } else {
            setError('ACCESS DENIED. Invalid Credentials.');
        }
    } else {
        // User Auth Logic (Simulated)
        if (!username || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (isSignup && !email) {
            setError('Email is required for registration.');
            return;
        }

        // Simulate successful login/signup
        const profile: UserProfile = {
            username: username,
            email: email,
            avatarColor: `bg-${['red','blue','green','yellow','purple'][Math.floor(Math.random()*5)]}-500`
        };
        onLogin(profile, false);
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: mode === 'ADMIN' ? 0 : -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        className={`w-full max-w-md bg-white shadow-[10px_10px_0_rgba(0,0,0,1)] border-4 border-black relative overflow-hidden ${mode === 'ADMIN' ? 'rounded-none' : 'rounded-lg'}`}
      >
        {/* Decorative Header Bar */}
        <div className={`h-4 border-b-4 border-black ${mode === 'ADMIN' ? 'bg-red-600' : 'bg-comic-cyan'}`}></div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-4 text-black hover:scale-110 transition-transform bg-white border-2 border-black rounded-full p-1"
        >
          <X size={20} />
        </button>

        <div className="p-8">
            
            {/* Header Section */}
            <div className="flex flex-col items-center mb-6 text-center">
                {mode === 'ADMIN' ? (
                    <>
                        <div className="bg-black p-4 rounded-full mb-4 border-4 border-red-500 shadow-comic">
                            <ShieldAlert className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-3xl font-comic text-black uppercase tracking-wider">Restricted Area</h2>
                        <p className="font-mono-comic text-xs text-red-600 mt-1">AUTHORIZED PERSONNEL ONLY</p>
                    </>
                ) : (
                    <>
                        {/* Hero Mask SVG Logo */}
                        <div className="mb-4 relative">
                            <svg width="80" height="40" viewBox="0 0 100 50" className="drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                                <path d="M10,10 Q25,35 50,10 Q75,35 90,10 L95,20 Q75,50 50,30 Q25,50 5,20 Z" fill="#22d3ee" stroke="black" strokeWidth="3" />
                                <circle cx="30" cy="20" r="6" fill="white" stroke="black" strokeWidth="2" />
                                <circle cx="70" cy="20" r="6" fill="white" stroke="black" strokeWidth="2" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-comic text-black drop-shadow-[2px_2px_0_#d946ef]">
                            {isSignup ? 'JOIN THE SQUAD' : 'WELCOME BACK'}
                        </h2>
                        <p className="font-marker text-gray-500 text-sm mt-2">
                            {isSignup ? 'Create your hero identity.' : 'Access your dashboard.'}
                        </p>
                    </>
                )}
            </div>

            {/* Toggle Tabs (User Mode Only) */}
            {mode === 'USER' && (
                <div className="flex border-b-4 border-black mb-6">
                    <button 
                        onClick={() => setIsSignup(false)}
                        className={`flex-1 py-2 font-comic text-xl transition-colors ${!isSignup ? 'bg-comic-yellow text-black' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        LOGIN
                    </button>
                    <button 
                        onClick={() => setIsSignup(true)}
                        className={`flex-1 py-2 font-comic text-xl transition-colors ${isSignup ? 'bg-comic-magenta text-white' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        SIGN UP
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Fields */}
            {mode === 'USER' && isSignup && (
                 <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 focus:border-black rounded-none outline-none font-mono-comic transition-all bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0_#000]"
                    placeholder="hero@webmail.com"
                    />
                </div>
            )}

            <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 focus:border-black rounded-none outline-none font-mono-comic transition-all bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0_#000]"
                placeholder={mode === 'ADMIN' ? "Admin ID" : "Username"}
                />
            </div>
            
            <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 focus:border-black rounded-none outline-none font-mono-comic transition-all bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0_#000]"
                placeholder="Password"
                />
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-xs font-bold font-mono">
                {error}
                </div>
            )}

            <button 
                type="submit"
                className={`w-full py-3 mt-4 border-2 border-black font-comic text-xl shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all
                    ${mode === 'ADMIN' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-black text-white hover:bg-gray-900'}
                `}
            >
                {mode === 'ADMIN' ? 'AUTHENTICATE' : (isSignup ? 'CREATE ACCOUNT' : 'ENTER')}
            </button>
            </form>
        </div>
      </motion.div>
    </div>
  );
};

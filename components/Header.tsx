
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Zap, User } from 'lucide-react';
import { NavItem, View, UserProfile } from '../types';

interface Props {
  onLoginClick: () => void;
  setView: (view: View) => void;
  currentView: View;
  user: UserProfile | null;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', view: 'HOME' },
  { label: 'BLOGS', view: 'BLOGS' },
  { label: 'VIDEOS', view: 'VIDEOS' },
  { label: 'ABOUT', view: 'ABOUT' },
];

export const Header: React.FC<Props> = ({ onLoginClick, setView, currentView, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full perspective-1000">
      {/* Dynamic diagonal background */}
      <div className="absolute inset-0 bg-comic-dark/95 border-b-4 border-black backdrop-blur-sm shadow-comic transform -skew-y-1 origin-top-left h-full w-full z-0 overflow-hidden">
         <div className="absolute inset-0 bg-halftone opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
            whileHover={{ scale: 1.1, rotate: -3 }}
            onClick={() => setView('HOME')}
            className="relative font-comic text-4xl md:text-5xl text-comic-yellow cursor-pointer"
        >
          <span className="relative z-10 drop-shadow-[4px_4px_0_#000]" style={{ WebkitTextStroke: '2px black' }}>
            JOULES<span className="text-comic-magenta">BLOG</span>
          </span>
          <Zap className="absolute -top-4 -right-6 w-8 h-8 text-comic-cyan animate-bounce" />
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {NAV_ITEMS.map((item, idx) => (
            <motion.button
              key={item.label}
              onClick={() => setView(item.view)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-6 py-2 font-comic text-xl border-2 border-black
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]
                transition-all cursor-pointer
                ${currentView === item.view ? 'bg-comic-cyan text-black rotate-0 scale-110' : 'bg-white text-black'}
                ${idx % 2 === 0 && currentView !== item.view ? 'rotate-2' : ''}
                ${idx % 2 !== 0 && currentView !== item.view ? '-rotate-2' : ''}
              `}
              style={{
                clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
              }}
            >
              {item.label}
            </motion.button>
          ))}
          
          <button 
            onClick={onLoginClick} 
            className={`flex items-center gap-2 px-3 py-2 border-2 border-white rounded-full transition-colors ${user ? 'bg-comic-cyan text-black border-black' : 'bg-black text-white hover:bg-comic-magenta'}`}
            title={user ? "My Profile" : "Member Login"}
          >
            <User size={18} />
            {user && <span className="font-comic text-sm hidden lg:inline">{user.username}</span>}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
             <button 
                onClick={onLoginClick} 
                className={`p-2 border-2 border-white rounded-full ${user ? 'bg-comic-cyan text-black border-black' : 'bg-black text-white'}`}
            >
                <User size={18} />
            </button>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-comic-magenta border-2 border-black shadow-comic text-white"
            >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="md:hidden bg-comic-dark border-b-4 border-black relative z-40"
        >
          <div className="flex flex-col p-4 gap-4">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label}
                onClick={() => {
                    setView(item.view);
                    setIsOpen(false);
                }}
                className={`text-left font-comic text-2xl transition-all ${currentView === item.view ? 'text-comic-cyan pl-4' : 'text-white hover:text-comic-cyan hover:pl-2'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

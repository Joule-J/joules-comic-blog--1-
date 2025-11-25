import React from 'react';
import { Github, Twitter, Instagram, Lock } from 'lucide-react';

interface Props {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onAdminClick: () => void;
}

export const Footer: React.FC<Props> = ({ onLoginClick, isLoggedIn, onAdminClick }) => {
  return (
    <footer className="relative bg-comic-dark pt-20 pb-10 overflow-hidden border-t-8 border-black">
      {/* Decorative Top Edge */}
      <div className="absolute top-0 left-0 w-full h-12 bg-comic-yellow transform -skew-y-2 -translate-y-6 border-b-4 border-black"></div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Panel 1 */}
        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_#22d3ee] transform rotate-1">
            <h4 className="font-comic text-3xl text-black mb-4 border-b-4 border-black inline-block">CONTACT HQ</h4>
            <p className="font-mono-comic text-black mb-2">Joules</p>
            <p className="font-mono-comic text-black mb-2">Queens, New York</p>
            <p className="font-mono-comic text-black font-bold">joules@webmail.com</p>
        </div>

        {/* Panel 2 (Center) */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
             <div className="font-comic text-5xl text-white drop-shadow-[4px_4px_0_#d946ef]">
                THANKS FOR <br/> VISITING!
             </div>
             <div className="flex gap-4">
                {[Github, Twitter, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 bg-black border-2 border-white text-white hover:bg-comic-cyan hover:text-black hover:-translate-y-1 transition-all shadow-[4px_4px_0_#fff]">
                        <Icon size={24} />
                    </a>
                ))}
             </div>
        </div>

        {/* Panel 3 */}
        <div className="bg-comic-magenta p-6 border-4 border-black shadow-[8px_8px_0_#000] transform -rotate-1">
             <h4 className="font-comic text-3xl text-white mb-4 border-b-4 border-black inline-block">LATEST TWEET</h4>
             <div className="bg-white border-2 border-black p-3 relative rounded-lg">
                <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l-2 border-b-2 border-black transform rotate-45"></div>
                <p className="font-marker text-black text-sm">
                    "Just ate the best bagel in the multiverse. You won't believe the cream cheese ratio. #bagelverse"
                </p>
             </div>
        </div>
      </div>

      <div className="text-center mt-12 font-mono-comic text-gray-500 text-xs flex flex-col items-center gap-2">
         <p>© {new Date().getFullYear()} JOULES-BLOG. DESIGNED IN THE MULTIVERSE.</p>
         
         {isLoggedIn ? (
             <button onClick={onAdminClick} className="flex items-center gap-1 text-comic-cyan hover:text-white transition-colors">
                 <Lock size={12} /> Admin Active
             </button>
         ) : (
             <button onClick={onAdminClick} className="opacity-20 hover:opacity-100 transition-opacity flex items-center gap-1">
                 <Lock size={12} /> Admin Access
             </button>
         )}
      </div>
    </footer>
  );
};
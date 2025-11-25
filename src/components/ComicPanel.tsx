import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BlogPost } from '../types';
import { GlitchText } from './GlitchText';

interface Props {
  post: BlogPost;
  index: number;
  onReadMore: (post: BlogPost) => void;
  onComment: (post: BlogPost) => void;
}

export const ComicPanel: React.FC<Props> = ({ post, index, onReadMore, onComment }) => {
  // Determine grid span based on size
  const gridClass = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 row-span-2',
    tall: 'col-span-1 row-span-2'
  }[post.size];

  const borderColor = {
    cyan: 'hover:shadow-neon-blue border-white',
    magenta: 'hover:shadow-neon-pink border-white',
    yellow: 'hover:shadow-[0_0_15px_#facc15] border-white'
  }[post.color];

  const accentColor = {
    cyan: 'bg-comic-cyan',
    magenta: 'bg-comic-magenta',
    yellow: 'bg-comic-yellow'
  }[post.color];

  // Effect Classes
  const effectClass = post.effect === 'pulse' ? 'animate-pulse' : 
                      post.effect === 'shake' ? 'animate-bounce' : ''; 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 4 - 2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? 1 : -1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.02, 
        zIndex: 10,
        rotate: 0,
        transition: { type: 'spring', stiffness: 300 } 
      }}
      className={`relative group ${gridClass} bg-white border-4 border-black overflow-hidden shadow-comic transition-shadow duration-300 ${effectClass}`}
    >
      {/* Image Background */}
      <div className="absolute inset-0" onClick={() => onReadMore(post)}>
        <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 cursor-pointer"
        />
        <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      {/* Category Badge - Angled */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <div className={`
            px-4 py-1 border-r-4 border-b-4 border-black font-comic text-lg text-black
            ${accentColor}
        `}>
            {post.category}
        </div>
      </div>

      {/* Content Content - Comic Caption Style */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-start gap-2 pointer-events-none">
         {/* Date Box */}
         <div className="bg-white border-2 border-black px-2 py-0.5 transform -rotate-2 mb-1">
            <span className="font-mono-comic text-xs font-bold text-black">{post.date}</span>
         </div>

         <div className="bg-comic-dark text-white font-comic text-3xl px-2 py-1 leading-none border-l-4 border-comic-yellow shadow-[4px_4px_0_#000]">
            {post.effect === 'glitch' ? (
                <GlitchText text={post.title} color="white" />
            ) : (
                post.title
            )}
         </div>

         <p className="font-marker text-sm text-gray-200 line-clamp-2 max-w-[90%] drop-shadow-md">
            {post.excerpt}
         </p>

         <div className="w-full flex justify-between items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 pointer-events-auto">
            <button 
                onClick={(e) => { e.stopPropagation(); onReadMore(post); }}
                className={`px-3 py-1 font-comic text-black border-2 border-black text-sm flex items-center gap-1 cursor-pointer bg-white hover:${accentColor}`}
            >
                READ MORE <ArrowRight size={14} />
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onComment(post); }}
                className="text-white hover:text-comic-yellow transition-colors"
            >
                <MessageCircle size={24} />
            </button>
         </div>
      </div>

      {/* Hover Outline Glow */}
      <div className={`absolute inset-0 border-4 ${borderColor} opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 mix-blend-overlay`}></div>
    </motion.div>
  );
};
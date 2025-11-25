
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Share2, Calendar } from 'lucide-react';
import { BlogPost } from '../types';
import { GlitchText } from './GlitchText';

interface Props {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenComments: () => void;
}

export const PostModal: React.FC<Props> = ({ post, isOpen, onClose, onOpenComments }) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!post || !isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-comic-dark/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ y: '100%', rotate: 5 }}
          animate={{ y: 0, rotate: 0 }}
          exit={{ y: '100%', rotate: 5 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-5xl h-full md:h-[90vh] bg-white border-4 border-black shadow-[20px_20px_0_#000] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-comic-magenta text-white p-2 border-2 border-black hover:scale-110 transition-transform shadow-comic"
          >
            <X size={24} />
          </button>

          {/* Left: Image */}
          <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black">
             <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             
             <div className="absolute bottom-6 left-6 right-6">
                <div className={`inline-block px-3 py-1 mb-2 border-2 border-black font-comic text-black bg-${post.color === 'magenta' ? 'comic-magenta' : post.color === 'cyan' ? 'comic-cyan' : 'comic-yellow'}`}>
                    {post.category}
                </div>
                <h2 className="font-comic text-5xl text-white drop-shadow-[4px_4px_0_#000] leading-[0.9] mb-2">
                    {post.title}
                </h2>
                <div className="flex items-center gap-2 text-white font-mono-comic text-sm">
                    <Calendar size={14} /> {post.date}
                </div>
             </div>
          </div>

          {/* Right: Text Content */}
          <div className="md:w-1/2 h-full overflow-y-auto p-8 bg-halftone relative">
             <div className="absolute inset-0 bg-white/90 backdrop-blur-sm -z-10"></div>
             
             <div className="prose prose-lg font-sans text-gray-800">
                <p className="font-marker text-xl leading-relaxed text-black mb-8 border-l-4 border-comic-cyan pl-4">
                    {post.excerpt}
                </p>
                <div className="space-y-4 whitespace-pre-line">
                    {post.content || "No content available. Go to Admin Panel to write this story!"}
                </div>
             </div>

             {/* Action Bar */}
             <div className="mt-12 pt-6 border-t-4 border-black border-dashed flex justify-between items-center">
                <button 
                    onClick={onOpenComments}
                    className="flex items-center gap-2 font-comic text-xl hover:text-comic-magenta transition-colors group"
                >
                    <MessageCircle className="group-hover:rotate-12 transition-transform" /> 
                    COMMENTS
                </button>
                <button className="flex items-center gap-2 font-comic text-xl hover:text-comic-cyan transition-colors group">
                    <Share2 className="group-hover:-translate-y-1 transition-transform" /> 
                    SHARE
                </button>
             </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User } from 'lucide-react';
import { Comment } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export const CommentsModal: React.FC<Props> = ({ isOpen, onClose, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[105]"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white border-l-4 border-black z-[110] shadow-[-10px_0_0_rgba(0,0,0,0.2)] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-comic-yellow border-b-4 border-black flex justify-between items-center">
               <h3 className="font-comic text-2xl text-black">THE CHATTER</h3>
               <button onClick={onClose} className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-black bg-white">
                  <X size={20} />
               </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dots">
               {comments.length === 0 ? (
                 <div className="text-center py-10 font-mono-comic text-gray-500">
                    Be the first to say something!
                 </div>
               ) : (
                 comments.map((c) => (
                    <div key={c.id} className="bg-white border-2 border-black p-3 shadow-[4px_4px_0_#ccc]">
                        <div className="flex items-center gap-2 mb-2">
                             <div className={`w-6 h-6 rounded-full border border-black ${c.avatarColor} flex items-center justify-center`}>
                                <User size={14} className="text-black" />
                             </div>
                             <span className="font-bold font-mono-comic text-xs">{c.user}</span>
                        </div>
                        <p className="font-marker text-sm text-gray-800">{c.text}</p>
                    </div>
                 ))
               )}
            </div>

            {/* Input */}
            <div className="p-4 border-t-4 border-black bg-gray-50">
               <form onSubmit={handleSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Say something cool..."
                    className="flex-1 border-2 border-black p-2 font-mono-comic text-sm outline-none focus:shadow-[4px_4px_0_#22d3ee] transition-shadow"
                  />
                  <button type="submit" className="bg-black text-white p-2 hover:bg-comic-magenta transition-colors border-2 border-black">
                     <Send size={18} />
                  </button>
               </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
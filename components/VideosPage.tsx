
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { VideoItem } from '../types';

const VIDEOS: VideoItem[] = [
  { id: '1', title: 'SWING MECHANICS 101', thumbnail: 'https://picsum.photos/600/400?random=10', views: '1.2M' },
  { id: '2', title: 'POV: ROOFTOP RUN', thumbnail: 'https://picsum.photos/600/400?random=11', views: '850K' },
  { id: '3', title: 'GADGET LAB TOUR', thumbnail: 'https://picsum.photos/600/400?random=12', views: '2.1M' },
  { id: '4', title: 'DEFEATING THE GLITCH', thumbnail: 'https://picsum.photos/600/400?random=13', views: '45K' },
  { id: '5', title: 'MIDNIGHT SNACK RUN', thumbnail: 'https://picsum.photos/600/400?random=14', views: '300K' },
  { id: '6', title: 'Q&A WITH SPIDEY', thumbnail: 'https://picsum.photos/600/400?random=15', views: '5M' },
];

export const VideosPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
        >
            <h2 className="font-comic text-6xl text-white drop-shadow-[4px_4px_0_#22d3ee] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                SURVEILLANCE FEED
            </h2>
            <p className="text-white font-mono-comic bg-black inline-block px-2">LIVE FROM THE MULTIVERSE</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS.map((video, index) => (
                <motion.div
                    key={video.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-black border-4 border-gray-800 p-1 rounded-sm group cursor-pointer"
                >
                    {/* Screen Frame */}
                    <div className="relative overflow-hidden border-2 border-gray-700 aspect-video">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-green-500/10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay"></div>
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <div className="bg-comic-cyan p-4 rounded-full border-2 border-white shadow-[0_0_20px_#22d3ee]">
                                <Play fill="white" className="text-white ml-1" />
                            </div>
                        </div>

                        {/* REC Indicator */}
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-[10px] text-red-500 font-mono">REC</span>
                        </div>
                    </div>

                    <div className="mt-3 px-2 pb-2">
                        <h3 className="text-comic-cyan font-mono-comic text-lg truncate">{video.title}</h3>
                        <div className="flex justify-between items-center text-gray-500 text-xs font-mono">
                            <span>ID: VID-{video.id}092</span>
                            <span>{video.views} VIEWS</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
  );
};

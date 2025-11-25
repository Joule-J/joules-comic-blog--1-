
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SoundEffect } from '../types';

const WORDS = ["BAM!", "POW!", "ZAP!", "SNAP!", "CRASH!", "BOOM!", "SWISH!"];

interface Props {
  enabled: boolean;
}

export const SoundEffectLayer: React.FC<Props> = ({ enabled }) => {
  const [effects, setEffects] = useState<SoundEffect[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!enabled) return;

    // Only trigger on interactive elements or global background if desired.
    // We'll trigger globally for the fun effect as requested.
    const id = Date.now();
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const rotation = Math.random() * 40 - 20; // -20 to 20 degrees

    setEffects(prev => [...prev, {
      id,
      x: e.clientX,
      y: e.clientY,
      text: word,
      rotation
    }]);

    // Cleanup after animation
    setTimeout(() => {
      setEffects(prev => prev.filter(effect => effect.id !== id));
    }, 1000);
  }, [enabled]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {effects.map((effect) => (
          <motion.div
            key={effect.id}
            initial={{ scale: 0, opacity: 0, rotate: effect.rotation }}
            animate={{ scale: [0.5, 1.5, 1.2], opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            style={{ 
                left: effect.x, 
                top: effect.y,
                position: 'absolute',
                transform: 'translate(-50%, -50%)'
            }}
            className="font-comic text-4xl md:text-6xl text-comic-yellow drop-shadow-[4px_4px_0_#000] stroke-black"
          >
            <span className="text-stroke-3 select-none" style={{ WebkitTextStroke: '2px black' }}>
                {effect.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlitchText } from './GlitchText';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-[90vh] w-full overflow-hidden border-b-8 border-black bg-comic-dark flex items-center justify-center">
      
      {/* Background Cityscape (Abstract) */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 opacity-60"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,#0f172a_100%)] z-10"></div>
        <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="City Background" 
            className="w-full h-full object-cover mix-blend-luminosity contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-comic-magenta/30 to-comic-cyan/30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-halftone opacity-40"></div>
      </motion.div>

      {/* Dynamic Lines / Neon Rain */}
      <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-[2px] bg-comic-cyan shadow-[0_0_10px_#22d3ee]"
                style={{
                    height: `${Math.random() * 40 + 20}%`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: 'rotate(15deg)',
                    opacity: 0.6
                }}
              />
          ))}
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-20 container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row items-center justify-between"
      >
        <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-comic-yellow border-4 border-black px-4 py-1 transform -rotate-3 shadow-comic">
                <span className="font-comic text-xl text-black">ISSUE #42: ORIGIN STORY</span>
            </div>
            
            <h1 className="font-comic text-7xl md:text-9xl leading-[0.8] drop-shadow-[8px_8px_0_#000] text-white italic relative">
                <span className="block transform -skew-x-6 text-comic-cyan mix-blend-screen absolute top-0 left-0 opacity-50 translate-x-1">INTO THE</span>
                <span className="block transform -skew-x-6 relative z-10">INTO THE</span>
                <GlitchText text="UNKNOWN" color="magenta" className="block text-8xl md:text-[10rem]" />
            </h1>

            <div className="bg-white/90 border-4 border-black p-6 transform rotate-1 max-w-lg shadow-comic backdrop-blur-sm">
                <p className="font-marker text-xl text-black leading-relaxed">
                    "Anyone can wear the mask. But how you wear it... that's what makes you a hero. Welcome to my digital multiverse."
                </p>
                <div className="mt-4 flex gap-2">
                    <div className="h-3 w-3 bg-comic-cyan rounded-full border border-black"></div>
                    <div className="h-3 w-3 bg-comic-magenta rounded-full border border-black"></div>
                    <div className="h-3 w-3 bg-comic-yellow rounded-full border border-black"></div>
                </div>
            </div>
        </div>

        {/* Hero Image / Silhouette */}
        <div className="md:w-1/2 relative mt-12 md:mt-0">
            <div className="relative w-64 h-80 md:w-96 md:h-[30rem] mx-auto bg-comic-cyan border-4 border-black shadow-[15px_15px_0px_0px_rgba(217,70,239,1)] transform rotate-3 overflow-hidden">
                <img 
                    src="https://picsum.photos/600/800" 
                    alt="Hero Avatar" 
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/80 p-2 border-t-4 border-black">
                    <p className="font-mono-comic text-comic-yellow text-sm text-center"> &gt; SYSTEM.STATUS: ONLINE</p>
                </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-comic-yellow rounded-full border-4 border-black flex items-center justify-center animate-bounce z-30">
                <span className="font-comic text-3xl text-black rotate-12">NEW!</span>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

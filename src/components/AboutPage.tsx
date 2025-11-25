import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
       
       <div className="max-w-4xl mx-auto bg-white border-4 border-black p-2 transform rotate-1 shadow-[10px_10px_0_#d946ef]">
          <div className="border-2 border-black p-6 md:p-10 relative overflow-hidden">
             
             {/* Stamp */}
             <div className="absolute top-10 right-10 border-4 border-red-600 text-red-600 font-black text-4xl p-2 transform -rotate-12 opacity-50 pointer-events-none select-none">
                TOP SECRET
             </div>

             <div className="flex flex-col md:flex-row gap-8">
                 {/* Mugshot */}
                 <div className="md:w-1/3">
                    <div className="bg-gray-200 border-4 border-black h-64 relative mb-4">
                        <img src="https://picsum.photos/400/500?grayscale" className="w-full h-full object-cover mix-blend-multiply" />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black text-white font-mono text-xs px-2">
                            SUBJ: JOULES
                        </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="space-y-2 font-mono-comic text-xs">
                        <div className="flex justify-between">
                            <span>STRENGTH</span>
                            <div className="w-24 bg-gray-300 h-2 border border-black"><div className="w-[80%] bg-comic-magenta h-full"></div></div>
                        </div>
                        <div className="flex justify-between">
                            <span>AGILITY</span>
                            <div className="w-24 bg-gray-300 h-2 border border-black"><div className="w-[95%] bg-comic-cyan h-full"></div></div>
                        </div>
                        <div className="flex justify-between">
                            <span>CODING</span>
                            <div className="w-24 bg-gray-300 h-2 border border-black"><div className="w-[60%] bg-comic-yellow h-full"></div></div>
                        </div>
                    </div>
                 </div>

                 {/* Info */}
                 <div className="md:w-2/3">
                     <h1 className="font-comic text-5xl mb-2">JOULES <span className="text-gray-400">///</span></h1>
                     <p className="font-mono-comic text-sm bg-black text-white inline-block px-2 mb-6">ORIGIN: QUEENS, EARTH-616</p>

                     <div className="prose font-marker text-gray-800">
                        <p>
                            It started with a radioactive router. Okay, maybe not. But it definitely started with a passion for breaking things to see how they work.
                        </p>
                        <p>
                            I build digital experiences that feel alive. No boring corporate templates here. We deal in glitches, neon, and raw energy.
                        </p>
                        <p>
                            When I'm not coding, I'm probably swinging through the city (parkour, not webs... yet), snapping photos of the underground, or mixing tracks that sound like a robot panic attack.
                        </p>
                     </div>

                     <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-yellow-100 border-2 border-black p-3 transform -rotate-2">
                            <h4 className="font-bold text-sm">MISSION</h4>
                            <p className="text-xs">Disrupt the boring web.</p>
                        </div>
                        <div className="bg-cyan-100 border-2 border-black p-3 transform rotate-2">
                            <h4 className="font-bold text-sm">WEAKNESS</h4>
                            <p className="text-xs">Good bagels.</p>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
};
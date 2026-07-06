import React, { useRef } from 'react';
import Image from 'next/image';

const SoundCard = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.volume = 0.5; // Set volume (0-1)
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  return (
    <div className="col-span-1 md:col-span-6 lg:col-span-7 lg:row-span-5 h-full">
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3" 
        preload="auto" 
      />
      
      {/* Main Card */}
      <a
        href="/contact"
        className="relative w-full h-full flex flex-col items-center justify-end pb-8 md:pb-10 overflow-hidden group cursor-pointer bg-gradient-to-br from-background via-background/90 to-background/80 rounded-2xl ring-1 ring-border shadow-sm transition-all hover:shadow-md hover:ring-indigo-500/30"
        onMouseEnter={playHoverSound}
      >
        {/* The Overlapping Rings Wrapper */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
          {/* Center Avatar */}
          <div className="absolute z-20 w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-background overflow-hidden ring-2 ring-transparent transition-all duration-700 group-hover:ring-indigo-500/50 shadow-xl">
            <Image src="https://i.pravatar.cc/150?img=11" alt="Center Avatar" width={150} height={150} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Outer 4 Avatars */}
        {/* Top Left */}
        <div className="absolute top-[15%] md:top-[20%] left-[10%] md:left-[25%] z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background overflow-hidden opacity-0 scale-50 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 ring-2 ring-indigo-500/40 shadow-lg">
          <Image src="https://i.pravatar.cc/100?img=1" alt="Outer 1" width={100} height={100} className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom Left */}
        <div className="absolute bottom-[35%] md:bottom-[35%] left-[5%] md:left-[20%] z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background overflow-hidden opacity-0 scale-50 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 delay-75 ring-2 ring-indigo-500/40 shadow-lg">
          <Image src="https://i.pravatar.cc/100?img=2" alt="Outer 2" width={100} height={100} className="w-full h-full object-cover" />
        </div>
        
        {/* Top Right */}
        <div className="absolute top-[15%] md:top-[20%] right-[10%] md:right-[25%] z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background overflow-hidden opacity-0 scale-50 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 delay-150 ring-2 ring-indigo-500/40 shadow-lg">
          <Image src="https://i.pravatar.cc/100?img=3" alt="Outer 3" width={100} height={100} className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom Right */}
        <div className="absolute bottom-[35%] md:bottom-[35%] right-[5%] md:right-[20%] z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-background overflow-hidden opacity-0 scale-50 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 delay-200 ring-2 ring-indigo-500/40 shadow-lg">
          <Image src="https://i.pravatar.cc/100?img=4" alt="Outer 4" width={100} height={100} className="w-full h-full object-cover" />
        </div>

        {/* Typography & Bottom Elements */}
        <div className="z-30 text-center flex flex-col items-center gap-2 px-6">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Let's Build Together
          </p>
          <h3 className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
            Clear communication, fast iterations, no surprises
          </h3>
        </div>

        {/* Arrow Button */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex h-6 w-6 md:h-10 md:w-10 items-center justify-center rounded-full bg-muted/50 backdrop-blur-sm text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20 border border-border">
          <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path d="M18.5 12L4.99997 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </svg>
        </div>
      </a>
    </div>
  );
};

export default SoundCard;
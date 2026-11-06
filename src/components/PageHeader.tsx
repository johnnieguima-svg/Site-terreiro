import React from 'react';
import { motion } from 'motion/react';

export function PageHeader({ 
  title, 
  subtitle, 
  imageSrc,
  kicker = "Casa de Umbanda Corrente de Akuan",
  meta,
  containerBg = "bg-[#FBF9F5]"
}: { 
  title: React.ReactNode;
  subtitle: React.ReactNode;
  imageSrc: string;
  kicker?: string;
  meta?: string;
  containerBg?: string;
}) {
  const gradientClass =
    containerBg === 'bg-white'
      ? 'from-white via-white/85 to-transparent'
      : 'from-[#FBF9F5] via-[#FBF9F5]/85 to-transparent';

  return (
    <div className="relative w-full min-h-[46vh] md:min-h-[52vh] flex items-center justify-center px-6 md:px-16 pt-28 pb-16 overflow-hidden mb-10">
      <div className="absolute inset-0 z-0 bg-[#1C1917]">
        <img 
          src={imageSrc} 
          alt="" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 grayscale-[15%]" 
          style={{
            maskImage: "linear-gradient(to bottom, black 15%, black 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 15%, black 65%, transparent 100%)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1917]/80 via-vinho/35 to-transparent mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/90 via-[#1C1917]/30 to-[#1C1917]/40 pointer-events-none"></div>
        <div className={`absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t ${gradientClass} z-10 pointer-events-none`}></div>
      </div>
      
      <div className="relative z-20 text-center max-w-4xl mx-auto pt-8 pb-8">
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-5 text-xs uppercase tracking-[0.3em] text-[#C0A080] font-semibold"
        >
          <span className="h-px w-8 bg-[#C0A080]/50 hidden sm:inline-block" aria-hidden="true" />
          <span>{kicker}</span>
          {meta && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-white/75 font-normal tracking-[0.2em]">{meta}</span>
            </>
          )}
          <span className="h-px w-8 bg-[#C0A080]/50 hidden sm:inline-block" aria-hidden="true" />
        </motion.div>

        <motion.h1 
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-white mb-6 tracking-tight drop-shadow-sm leading-[1.1]"
        >
          {title}
        </motion.h1>

        <motion.div 
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-xl text-white/90 leading-relaxed font-serif font-light max-w-2xl mx-auto drop-shadow-sm"
        >
          {subtitle}
        </motion.div>
      </div>
    </div>
  );
}

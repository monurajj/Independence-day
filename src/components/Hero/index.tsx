"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const DESIRED_PLAYBACK_RATE = 0.6;
  
  // Staggered appearance for elements
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Ensure background videos play slower for a calmer ambience
  useEffect(() => {
    const applyRate = (video: HTMLVideoElement | null) => {
      if (!video) return;
      try {
        video.defaultPlaybackRate = DESIRED_PLAYBACK_RATE;
        video.playbackRate = DESIRED_PLAYBACK_RATE;
      } catch {}
    };

    const onReady = (e: Event) => applyRate(e.currentTarget as HTMLVideoElement);

    applyRate(mobileVideoRef.current);
    applyRate(desktopVideoRef.current);

    mobileVideoRef.current?.addEventListener('loadedmetadata', onReady);
    mobileVideoRef.current?.addEventListener('play', onReady);
    desktopVideoRef.current?.addEventListener('loadedmetadata', onReady);
    desktopVideoRef.current?.addEventListener('play', onReady);

    return () => {
      mobileVideoRef.current?.removeEventListener('loadedmetadata', onReady);
      mobileVideoRef.current?.removeEventListener('play', onReady);
      desktopVideoRef.current?.removeEventListener('loadedmetadata', onReady);
      desktopVideoRef.current?.removeEventListener('play', onReady);
    };
  }, []);
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="min-h-[90vh] sm:min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 relative overflow-hidden flex items-center">
      {/* Background: dark radial + responsive background videos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        {/* Mobile background video */}
        <video
          ref={mobileVideoRef}
          className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/assets/mobilebgvideo.mp4" type="video/mp4" />
        </video>
        {/* Desktop background video */}
        <video
          ref={desktopVideoRef}
          className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/assets/desktopbgvideo.mp4" type="video/mp4" />
        </video>
        
        {/* Abstract geometric shapes */}
        <motion.div 
          className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-[#FF9933] blur-xl opacity-20"
          animate={{ scale: [1, 1.2, 1], x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 right-[15%] w-40 h-40 rounded-full bg-[#138808] blur-xl opacity-15"
          animate={{ scale: [1, 1.3, 1], x: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        
        {/* Animated line dividers */}
        <motion.div 
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9933] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.div 
          className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#138808] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
        {/* Text content - Left side */}
        <motion.div 
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          
          <motion.div variants={item} className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-2 min-h-[60px] sm:min-h-[70px]">
              Honoring Our Freedom
            </h2>
          </motion.div>
          
          <motion.p 
            variants={item}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 my-4 sm:my-6 md:my-8 max-w-xl"
          >
            Honoring our freedom fighters and celebrating our unity in diversity
            <motion.span
              className="inline-block ml-2"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🇮🇳
            </motion.span>
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 w-full sm:w-auto"
          >
            <button 
              id="host-flag-btn"
              data-host-flag
              className="group px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg bg-[#FF9933] hover:bg-[#e87b00] text-white text-sm sm:text-base font-bold shadow-lg relative"
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
                Host the Flag
              </span>
            </button>
            
            {/* <button 
              className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg bg-transparent border-2 border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white text-sm sm:text-base font-bold transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => {
                const element = document.querySelector('#celebrate-india');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Learn More</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button> */}
          </motion.div>
        </motion.div>
        
        {/* Visual elements - Right side (visible on md+ screens) */}
        <motion.div 
          className="flex items-center justify-center relative mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Stylized Indian flag with modern 3D effect */}
          <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-md h-40 sm:h-60 md:h-80">
            {/* Saffron stripe */}
            <motion.div 
              className="absolute w-full h-1/3 bg-[#FF9933] rounded-t-lg shadow-lg transform perspective-800"
              animate={{ rotateX: [0, 2, 0], rotateY: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            
            {/* White stripe with Ashoka Chakra */}
            <motion.div 
              className="absolute top-1/3 w-full h-1/3 bg-white flex items-center justify-center shadow-lg transform perspective-800"
              animate={{ rotateX: [0, -2, 0], rotateY: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
            >
              <motion.div 
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 sm:border-3 md:border-4 border-[#000080] relative"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              >
                {/* Spokes of the wheel */}
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute top-1/2 left-1/2 w-px h-1/2 bg-[#000080] origin-bottom"
                    style={{ transform: `translate(-50%, -100%) rotate(${i * 15}deg)` }}
                  />
                ))}
              </motion.div>
            </motion.div>
            
            {/* Green stripe */}
            <motion.div 
              className="absolute top-2/3 w-full h-1/3 bg-[#138808] rounded-b-lg shadow-lg transform perspective-800"
              animate={{ rotateX: [0, 2, 0], rotateY: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.4 }}
            />
            
            {/* Floating decorative elements */}
            <motion.div 
              className="absolute -top-10 -right-10 text-6xl"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
            <motion.div 
              className="absolute -bottom-10 -left-10 text-6xl"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              🎉
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <motion.div 
          className="w-8 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-3 bg-white rounded-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

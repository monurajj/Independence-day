"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Button Container */}
          <div className="relative w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-white/20 backdrop-blur-sm">
            {/* Indian Flag Background */}
            <div className="absolute inset-0">
              {/* Saffron */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FF9933]"></div>
              {/* White with Chakra */}
              <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white flex items-center justify-center">
                <motion.div
                  className="w-4 h-4 rounded-full border-2 border-[#000080] relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {/* Chakra spokes */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-px h-1/2 bg-[#000080] origin-bottom"
                      style={{ 
                        transform: `translate(-50%, -100%) rotate(${i * 45}deg)` 
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              {/* Green */}
              <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[#138808]"></div>
            </div>

            {/* Arrow Icon Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="drop-shadow-lg"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <path d="m18 15-6-6-6 6"/>
              </motion.svg>
            </div>

            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            Back to Top
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
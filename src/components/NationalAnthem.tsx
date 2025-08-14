"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NationalAnthem = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setShowLyrics(true);
      }
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setShowLyrics(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-[#FF9933] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-[#138808] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-10 w-28 h-28 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Our National Anthem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Jana Gana Mana - A tribute to the unity and diversity of our great nation
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Audio Controls */}
            <div className="text-center mb-8">
              <audio
                ref={audioRef}
                src="/assets/audio/jana-gana-mana.mp3"
                onEnded={handleAudioEnd}
                preload="auto"
              />
              
              <motion.button
                onClick={handlePlay}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                    : 'bg-gradient-to-r from-[#FF9933] to-[#138808] hover:from-[#e87b00] hover:to-[#0f6b06]'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </motion.button>
              
              <p className="text-gray-300 mt-4 text-lg">
                {isPlaying ? 'Playing National Anthem' : 'Click to Play National Anthem'}
              </p>
            </div>

            {/* Lyrics Display */}
            <AnimatePresence>
              {showLyrics && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-8 border border-gray-600">
                    <h3 className="text-2xl font-bold text-[#FF9933] mb-6">Jana Gana Mana</h3>
                    <div className="text-gray-200 space-y-4 text-lg leading-relaxed">
                      <p className="font-semibold">जन गण मन अधिनायक जय हे</p>
                      <p>भारत भाग्य विधाता</p>
                      <p>पंजाब सिंधु गुजरात मराठा</p>
                      <p>द्राविड़ उत्कल बंग</p>
                      <p>विंध्य हिमाचल यमुना गंगा</p>
                      <p>उच्छल जलधि तरंग</p>
                      <p>तव शुभ नामे जागे</p>
                      <p>तव शुभ आशीष मांगे</p>
                      <p>गाहे तव जयगाथा</p>
                      <p className="font-bold text-[#138808]">जन गण मंगलदायक जय हे</p>
                      <p className="font-bold text-[#138808]">भारत भाग्य विधाता</p>
                      <p className="font-bold text-[#138808] text-xl mt-6">जय हे! जय हे! जय हे!</p>
                      <p className="font-bold text-[#138808] text-xl">जय जय जय जय हे!</p>
                    </div>
                    
                    <div className="mt-8 p-4 bg-gray-600/30 rounded-lg">
                      <p className="text-gray-300 text-sm italic">
                        "Thou art the ruler of the minds of all people, dispenser of India's destiny. 
                        The name rouses the hearts of Punjab, Sind, Gujarat and Maratha, of the Dravid and Orissa and Bengal."
                      </p>
                      <p className="text-gray-400 text-xs mt-2">- Rabindranath Tagore</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Information */}
            <motion.div 
              className="mt-8 grid md:grid-cols-3 gap-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h4 className="text-[#FF9933] font-bold mb-2">Written By</h4>
                <p className="text-gray-300">Rabindranath Tagore</p>
                <p className="text-gray-400 text-sm">Nobel Laureate (1911)</p>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h4 className="text-white font-bold mb-2">Adopted</h4>
                <p className="text-gray-300">January 24, 1950</p>
                <p className="text-gray-400 text-sm">As National Anthem</p>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h4 className="text-[#138808] font-bold mb-2">Duration</h4>
                <p className="text-gray-300">52 seconds</p>
                <p className="text-gray-400 text-sm">Official Version</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NationalAnthem;
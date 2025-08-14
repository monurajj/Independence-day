"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NationalPledge = () => {
  const [isReciting, setIsReciting] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  const pledgeLines = [
    "India is my country.",
    "All Indians are my brothers and sisters.",
    "I love my country, and I am proud of its rich and varied heritage.",
    "I shall always strive to be worthy of it.",
    "I shall give my parents, teachers and all elders respect and treat everyone with courtesy.",
    "To my country and my people, I pledge my devotion.",
    "In their well-being and prosperity alone lies my happiness."
  ];

  const startRecitation = () => {
    setIsReciting(true);
    setCurrentLine(0);
    
    // Auto-advance through lines
    pledgeLines.forEach((_, index) => {
      setTimeout(() => {
        setCurrentLine(index);
        if (index === pledgeLines.length - 1) {
          setTimeout(() => {
            setIsReciting(false);
            setCurrentLine(0);
          }, 3000);
        }
      }, index * 2500);
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-36 h-36 border-2 border-[#FF9933] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-28 h-28 border-2 border-[#138808] rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
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
            National Pledge
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A solemn promise to our motherland - recite with pride and honor
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 md:p-12 border border-gray-700 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Pledge Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-8 relative mr-4 shadow-lg">
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FF9933] rounded-t-sm"></div>
                  <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full border-2 border-[#000080] relative">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-px h-1/2 bg-[#000080] origin-bottom"
                          style={{ transform: `translate(-50%, -100%) rotate(${i * 45}deg)` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[#138808] rounded-b-sm"></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-100">राष्ट्रीय प्रतिज्ञा</h3>
              </div>
              
              <motion.button
                onClick={startRecitation}
                disabled={isReciting}
                className={`px-8 py-4 rounded-lg font-bold text-white shadow-lg transition-all duration-300 ${
                  isReciting 
                    ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-[#FF9933] to-[#138808] hover:from-[#e87b00] hover:to-[#0f6b06] hover:scale-105'
                }`}
                whileHover={!isReciting ? { scale: 1.05 } : {}}
                whileTap={!isReciting ? { scale: 0.95 } : {}}
              >
                {isReciting ? 'Reciting...' : 'Start Recitation'}
              </motion.button>
            </div>

            {/* Pledge Content */}
            <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-xl p-8 border border-gray-600">
              <div className="space-y-6">
                {pledgeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className={`text-lg md:text-xl leading-relaxed transition-all duration-500 ${
                      isReciting && currentLine === index
                        ? 'text-[#FF9933] font-bold transform scale-105'
                        : isReciting && currentLine > index
                        ? 'text-[#138808] font-semibold'
                        : 'text-gray-300'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        isReciting && currentLine === index
                          ? 'bg-[#FF9933] text-white animate-pulse'
                          : isReciting && currentLine > index
                          ? 'bg-[#138808] text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </span>
                      <p className="flex-1 pt-1">{line}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Completion Message */}
            <AnimatePresence>
              {!isReciting && currentLine === 0 && (
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-[#FF9933]/20 via-white/10 to-[#138808]/20 rounded-lg p-6 border border-gray-600">
                    <h4 className="text-xl font-bold text-gray-100 mb-2">
                      🙏 Pledge with Pride
                    </h4>
                    <p className="text-gray-300">
                      This pledge reminds us of our duty towards our nation and fellow citizens. 
                      Let us carry these words in our hearts and actions.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Information Cards */}
            <motion.div 
              className="mt-8 grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                <h4 className="text-[#FF9933] font-bold mb-2">Written By</h4>
                <p className="text-gray-300">Pydimarri Venkata Subba Rao</p>
                <p className="text-gray-400 text-sm">Indian Writer & Poet</p>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                <h4 className="text-[#138808] font-bold mb-2">First Recited</h4>
                <p className="text-gray-300">August 26, 1962</p>
                <p className="text-gray-400 text-sm">In Indian Schools</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NationalPledge;
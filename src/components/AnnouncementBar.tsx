"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnnouncementBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: isScrolled ? 0 : 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-10 left-0 right-0 z-40 bg-transparent text-white text-center py-2 px-4 pointer-events-none transition-opacity duration-300 ${
        isScrolled ? 'opacity-0' : 'opacity-100'
      }`}
    >
      Celebrating <span className="font-semibold text-[#FF9933]">79 years of freedom</span>! Join millions and <span className="font-semibold text-[#138808]">digitally host the Tiranga</span> to honor our nation.
    </motion.div>
  );
};

export default AnnouncementBar;


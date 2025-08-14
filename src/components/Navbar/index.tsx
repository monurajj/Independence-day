"use client";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when user scrolls
  useEffect(() => {
    const closeMobileMenuOnScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', closeMobileMenuOnScroll);
    return () => window.removeEventListener('scroll', closeMobileMenuOnScroll);
  }, [mobileMenuOpen]);

  // Fetch flag count and listen for updates
  useEffect(() => {
    const fetchCount = () => {
      fetch('/api/flags')
        .then((r) => r.json())
        .then((d) => {
          if (typeof d.today === 'number') setFlagCount(d.today);
        })
        .catch(() => {});
    };

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { count: number };
      if (detail?.count !== undefined) setFlagCount(detail.count);
    };

    fetchCount();
    window.addEventListener('flags-hosted-updated', onUpdate as EventListener);
    return () => window.removeEventListener('flags-hosted-updated', onUpdate as EventListener);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="relative container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Indian Flag Icon */}
            <Link href="/" className="flex items-center gap-2 sm:gap-4 hover:opacity-90 transition-opacity duration-300">
              <div className="w-6 h-4 sm:w-8 sm:h-6 relative flex-shrink-0 shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FF9933] rounded-t-sm"></div>
                <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-[#000080]"></div>
                </div>
                <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[#138808] rounded-b-sm"></div>
              </div>
              
              {/* Brand text - clean slide in (hidden on mobile) */}
              <div className={`hidden md:block font-bold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-500 ease-out overflow-hidden ${
                isScrolled 
                  ? 'opacity-100 max-w-full translate-x-0' 
                  : 'opacity-0 max-w-0 -translate-x-4'
              }`}>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                  <a 
                    href="https://monadnocks.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FF9933] drop-shadow-sm hover:text-[#e87b00] transition-colors duration-300 cursor-pointer"
                  >
                    Monadnocks
                  </a>
                  <span className="text-gray-200 drop-shadow-sm">wishing you all</span>
                  <span className="text-[#138808] drop-shadow-sm">Happy Independence Day</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            {/* Flag count */}
            <div className={`text-xs sm:text-sm transition-all duration-500 ${
              isScrolled ? 'text-gray-300' : 'text-white'
            }`}>
              <span className="text-base sm:text-lg font-bold text-[#138808] drop-shadow-sm">{flagCount}</span> 
              <span className="ml-1">flags hosted</span>
            </div>
            
            {/* Host Flag button */}
            <Link
              href="/host-flag"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FF9933] to-[#ff8800] hover:from-[#e87b00] hover:to-[#d66f00] text-white text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/10"
            >
              Host Flag
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Flag count - minimal for mobile */}
            <div className={`text-xs transition-all duration-500 mr-1 ${
              isScrolled ? 'text-gray-300' : 'text-white'
            }`}>
              <span className="text-sm font-bold text-[#138808] drop-shadow-sm">{flagCount}</span> 
              <span className="ml-0.5">flags</span>
            </div>
            
            {/* Hamburger button - always visible on mobile */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex p-2 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 transition-colors border border-gray-700"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1'}`}></span>
                <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'} top-2.5`}></span>
                <span className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-xl flex flex-col pt-20 px-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {/* Mobile brand text */}
              <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-2">
                  <a 
                    href="https://monadnocks.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FF9933] text-2xl font-bold hover:text-[#e87b00] transition-colors duration-300 cursor-pointer"
                  >
                    Monadnocks
                  </a>
                  <span className="text-gray-200 text-lg">wishing you all</span>
                  <span className="text-[#138808] text-xl font-bold">Happy Independence Day</span>
                </div>
              </div>
              
              {/* Mobile navigation links */}
              <div className="flex flex-col items-center gap-6 mb-10">
                <Link 
                  href="/"
                  className="text-white text-xl hover:text-[#FF9933] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="#celebrate-india"
                  className="text-white text-xl hover:text-[#FF9933] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Journey to Independence
                </Link>
                <div className="text-center">
                  <div className="text-lg mb-1">
                    <span className="text-xl font-bold text-[#138808]">{flagCount}</span> 
                    <span className="text-gray-300 ml-2">flags hosted</span>
                  </div>
                </div>
              </div>
              
              {/* Mobile CTA button */}
              <Link
                href="/host-flag"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#FF9933] to-[#ff8800] hover:from-[#e87b00] hover:to-[#d66f00] text-white text-lg font-semibold transition-all duration-300 shadow-lg border border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Host the Flag
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

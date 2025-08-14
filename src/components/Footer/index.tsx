"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const digitalIndiaInitiatives = [
    {
      title: "Digital Payments",
      icon: "💳",
      description: "UPI, Digital Wallets, Cashless Economy"
    },
    {
      title: "E-Governance",
      icon: "🏛️",
      description: "Online Services, Transparency, Efficiency"
    },
    {
      title: "Digital Literacy",
      icon: "📚",
      description: "Education, Skills, Empowerment"
    },
    {
      title: "Tech Innovation",
      icon: "🚀",
      description: "Startups, AI, Future Technologies"
    }
  ];

  const socialIcons = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#FF9933] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#138808] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Digital India Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
              Contributing to 
              <span className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent ml-2">
                Digital India
              </span>
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Building a digitally empowered society and knowledge economy - transforming India through technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {digitalIndiaInitiatives.map((initiative, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-[#FF9933]/50 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {initiative.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-100 mb-2">
                    {initiative.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {initiative.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Independence Day Message */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-8 h-6 relative mr-3">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-[#FF9933] rounded-t-sm"></div>
                <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full border border-[#000080]"></div>
                </div>
                <div className="absolute top-2/3 left-0 w-full h-1/3 bg-[#138808] rounded-b-sm"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-100">Independence Day 2024</h3>
            </div>
            {/* Hidden on mobile, visible on sm screens and above */}
            <p className="text-gray-300 mb-4 hidden sm:block">
              Celebrating 78 years of freedom, unity, and progress. Together we honor our past and build our future.
            </p>
            <div className="text-2xl">🇮🇳</div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-100 mb-4">Digital Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">UPI Transactions</span>
                <span className="text-[#138808] font-semibold">Billions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Internet Users</span>
                <span className="text-[#FF9933] font-semibold">800M+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Digital Services</span>
                <span className="text-white font-semibold">Growing</span>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-100 mb-4">Our Vision</h3>
            <p className="text-gray-300 mb-4">
              Empowering every citizen with digital tools, creating opportunities, and fostering innovation for a self-reliant India.
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-2 text-sm text-gray-400">
              <span>🚀</span>
              <span>Innovation</span>
              <span>•</span>
              <span>🌟</span>
              <span>Progress</span>
              <span>•</span>
              <span>💪</span>
              <span>Unity</span>
            </div>
          </motion.div>
        </div>

        {/* Social Links and Copyright */}
        <motion.div 
          className="flex flex-col items-center space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Social Icons */}
          <div className="flex space-x-6">
            {socialIcons.map((social) => (
              <motion.div
                key={social.name}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#FF9933] hover:to-[#138808] transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              Celebrating India&apos;s 78th Independence Day | Jai Hind 🇮🇳
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Independence Day Celebration | Building Digital India Together
            </p>
          </div>

          {/* Animated Tricolor Line */}
          <motion.div
            className="w-full max-w-md h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlagHosting = () => {
  const [isHosting, setIsHosting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: initial, 1: arranging flowers, 2: flag rising, 3: celebration
  const [confettiParticles, setConfettiParticles] = useState<{ x: number; y: number; color: string; size: number; flowerType: string }[]>([]);
  const [fireworks, setFireworks] = useState<{ x: number; y: number; id: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Setup audio ended event listener
  useEffect(() => {
    const audioElement = audioRef.current;
    
    const handleAudioEnded = () => {
      // When anthem ends, move to celebration phase
      setAnimationPhase(3);
      setShowShare(true);
    };
    
    if (audioElement) {
      audioElement.addEventListener('ended', handleAudioEnded);
    }
    
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);
  
  // Create enhanced confetti particles and fireworks
  useEffect(() => {
    if (showConfetti) {
      // Create continuous flower petals throughout the anthem duration
      const createFlowerPetals = () => {
        // Use real flower emojis instead of hearts and stars
        const flowerEmojis = ['🌸', '🌹', '🌺', '🌻', '🌼', '🌷', '💐', '🏵️'];
        
        // Create more particles with better distribution across the entire screen width
        const particles = Array.from({ length: 300 }, () => {
          // Create clusters of flowers in different areas of the screen
          // This creates a more natural "raining from the sky" effect
          const xPosition = Math.random() * 100; // Full window width coverage
          
          return {
            x: xPosition,
            y: -10 - Math.random() * 30, // Start further above the screen
            color: ['#FF9933', '#FFFFFF', '#138808', '#FFD700', '#FF69B4'][Math.floor(Math.random() * 5)],
            size: 8 + Math.random() * 24, // More size variation
            flowerType: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
          };
        });
        setConfettiParticles(particles);
      };
      
      // Initial creation
      createFlowerPetals();
      
      // Continue creating flower petals throughout the anthem
      // Use a shorter interval for more continuous flow of flowers
      const interval = setInterval(createFlowerPetals, 2000); // Refresh petals every 2 seconds
      
      // Create fireworks
      const fireworksData = Array.from({ length: 8 }, (_, i) => ({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 40,
        id: i,
      }));
      setFireworks(fireworksData);
      
      return () => clearInterval(interval);
    }
  }, [showConfetti]);
  
  // Set up event listener for the flag hosting button
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll('[data-host-flag]')) as HTMLButtonElement[];
    if (buttons.length === 0) return;

    const handleClick = () => {
      setIsHosting(true);
      setAnimationPhase(1); // Start arranging flowers (4 seconds)
      
      // Update server-side counter
      fetch('/api/flags', { method: 'POST' }).catch(() => {});

      // Increment local counter and emit event
      try {
        const current = Number(localStorage.getItem('flagsHosted') || '0');
        const next = current + 1;
        localStorage.setItem('flagsHosted', String(next));
        window.dispatchEvent(new CustomEvent('flags-hosted-updated', { detail: { count: next } }));
      } catch {}
      
      // Phase 1: Arranging flowers (4 seconds)
      setTimeout(() => {
        setAnimationPhase(2); // Start flag rising
        
        // Play the national anthem after flowers are arranged
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.error("Audio play failed:", err));
        }
        
        // Start flower petals falling
        setShowConfetti(true);
        
        // Phase 2: Flag hosting with anthem
        // The audio 'ended' event listener will handle transition to phase 3
        // No need for timeout here as we're using the actual audio end event
        
      }, 4000); // 4 seconds for arranging flowers
    };

    buttons.forEach((b) => b.addEventListener('click', handleClick));
    return () => buttons.forEach((b) => b.removeEventListener('click', handleClick));
  }, []);
  
  return (
    <>
      {/* Audio element for the national anthem */}
      <audio 
        ref={audioRef} 
        src="/National Anthem of India _ 52 Seconds(MP3_160K).mp3"
        preload="auto"
      />
      
      {/* Enhanced Flag hosting animation */}
      <AnimatePresence>
        {isHosting && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80">
              {/* Animated background patterns */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 80%, #FF9933 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 20%, #138808 0%, transparent 50%)",
                    "radial-gradient(circle at 40% 40%, #FF9933 0%, transparent 50%)",
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative h-[80vh] w-full max-w-2xl flex justify-center">
              {/* Flower arrangement animation (visible only during phase 1) */}
              {animationPhase === 1 && (
                <motion.div 
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl mb-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: 4, repeatType: "loop" }}
                    >
                      🌺 🌸 🌹 🌻 🌼
                    </motion.div>
                    <p className="text-white text-lg font-medium drop-shadow-lg mb-2">Arranging flowers...</p>
                    
                    {/* Volume reminder */}
                    <motion.div 
                      className="flex items-center justify-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-white text-xl">🔊</span>
                      <p className="text-white text-sm font-medium">Put your volume to full!</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {/* Enhanced Flagpole with base - Mobile */}
              <div className="absolute bottom-32 left-8 md:hidden">
                {/* Mobile Pole base */}
                <motion.div 
                  className="w-12 h-6 bg-gradient-to-t from-stone-600 to-stone-400 rounded-lg mb-[-393px] ml-[-19px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                {/* Mobile Pole */}
                <motion.div 
                  className="w-2 h-[50vh] bg-gradient-to-t from-stone-500 via-stone-300 to-stone-200 rounded-full shadow-lg"
                  initial={{ height: 0 }}
                  animate={{ height: "50vh" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              {/* Enhanced Flagpole with base - Desktop */}
              <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2">
                {/* Desktop Pole base */}
                <motion.div 
                  className="w-16 h-8 bg-gradient-to-t from-stone-600 to-stone-400 rounded-lg mb-[-660px] ml-[-22px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                {/* Desktop Pole */}
                <motion.div 
                  className="w-3 h-[70vh] bg-gradient-to-t from-stone-500 via-stone-300 to-stone-200 rounded-full shadow-lg"
                  initial={{ height: 0 }}
                  animate={{ height: "70vh" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              
              {/* Enhanced Flag with realistic movement - Mobile */}
              <motion.div
                className="absolute top-24 left-[50px] md:hidden"
                initial={{ y: 200, opacity: 0 }}
                animate={{ 
                  y: animationPhase >= 2 ? 0 : 200, // Flag stops at mobile position
                  opacity: animationPhase >= 2 ? 1 : 0
                }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                style={{ transformOrigin: "left center" }}
              >
                <motion.div 
                  className="relative -translate-x-2 flex flex-col h-28 shadow-2xl"
                  animate={{
                    rotateY: [0, 5, -5, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Mobile Saffron stripe */}
                  <motion.div 
                    className="h-1/3 w-40 bg-gradient-to-r from-[#FF9933] to-[#ff8800] relative overflow-hidden"
                    animate={{ boxShadow: ["0 0 15px #FF9933", "0 0 30px #FF9933", "0 0 15px #FF9933"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  
                  {/* Mobile White stripe with Ashoka Chakra */}
                  <motion.div 
                    className="h-1/3 w-40 bg-white relative flex items-center justify-center overflow-hidden"
                    animate={{ boxShadow: ["0 0 15px white", "0 0 30px white", "0 0 15px white"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    <motion.div
                      className="w-6 h-6 rounded-full border-2 border-[#000080] relative z-10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Mobile Chakra spokes */}
                      {[...Array(24)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-0.5 h-1/2 bg-[#000080] origin-bottom"
                          style={{ transform: `translate(-50%, -100%) rotate(${i * 15}deg)` }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  {/* Mobile Green stripe */}
                  <motion.div 
                    className="h-1/3 w-40 bg-gradient-to-r from-[#138808] to-[#0f6b06] relative overflow-hidden"
                    animate={{ boxShadow: ["0 0 15px #138808", "0 0 30px #138808", "0 0 15px #138808"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Enhanced Flag with realistic movement - Desktop */}
              <motion.div
                className="hidden md:block absolute bottom-[50%] left-1/2"
                initial={{ y: 200, opacity: 0 }}
                animate={{ 
                  y: animationPhase >= 2 ? -100 : 200, // Only start rising after flower arrangement (phase 2)
                  opacity: animationPhase >= 2 ? 1 : 0
                }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                style={{ transformOrigin: "left center" }}
              >
                <motion.div 
                  className="relative -translate-x-2 flex flex-col h-40 shadow-2xl"
                  animate={{
                    rotateY: [0, 5, -5, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Saffron stripe with gradient */}
                  <motion.div 
                    className="h-1/3 w-56 bg-gradient-to-r from-[#FF9933] to-[#ff8800] relative overflow-hidden"
                    animate={{ boxShadow: ["0 0 20px #FF9933", "0 0 40px #FF9933", "0 0 20px #FF9933"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  
                  {/* White stripe with enhanced Ashoka Chakra */}
                  <motion.div 
                    className="h-1/3 w-56 bg-white relative flex items-center justify-center overflow-hidden"
                    animate={{ boxShadow: ["0 0 20px white", "0 0 40px white", "0 0 20px white"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    <motion.div
                      className="w-8 h-8 rounded-full border-3 border-[#000080] relative z-10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Enhanced Chakra spokes */}
                      {[...Array(24)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-0.5 h-1/2 bg-[#000080] origin-bottom"
                          style={{ transform: `translate(-50%, -100%) rotate(${i * 15}deg)` }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  {/* Green stripe with gradient */}
                  <motion.div 
                    className="h-1/3 w-56 bg-gradient-to-r from-[#138808] to-[#0f6b06] relative overflow-hidden"
                    animate={{ boxShadow: ["0 0 20px #138808", "0 0 40px #138808", "0 0 20px #138808"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Confetti and Fireworks */}
              {showConfetti && (
                <>
                  {/* Fireworks */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {fireworks.map((firework) => (
                      <motion.div
                        key={firework.id}
                        className="absolute"
                        style={{
                          left: `${firework.x}%`,
                          top: `${firework.y}%`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0] }}
                        transition={{
                          duration: 2,
                          delay: firework.id * 0.3,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        {/* Firework burst */}
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-8 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-full"
                            style={{
                              transformOrigin: 'bottom center',
                              transform: `rotate(${i * 30}deg)`,
                            }}
                            animate={{
                              scaleY: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: firework.id * 0.3 + i * 0.05,
                              repeat: Infinity,
                              repeatDelay: 3.5
                            }}
                          />
                        ))}
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Flower Rain - Full Window Coverage */}
                  <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
                    {confettiParticles.map((particle, index) => (
                      <motion.div
                        key={index}
                        className="absolute"
                        style={{
                          left: `${particle.x}%`,
                          top: '-50px', // Start above the visible area
                          fontSize: `${particle.size}px`,
                        }}
                        animate={{
                          y: ['0vh', '120vh'], // Move beyond bottom of screen
                          x: [
                            `${particle.x}%`,
                            `${particle.x + (Math.random() * 40 - 20)}%`, // Wider spread
                          ],
                          opacity: [1, 0.95, 0.9, 0],
                          rotate: [0, 360],
                          scale: [1, 1.1, 0.9],
                        }}
                        transition={{
                          duration: 8 + Math.random() * 6, // Slower falling
                          ease: 'easeOut',
                          delay: Math.random() * 5, // More staggered appearance
                        }}
                      >
                        <div
                          className="relative drop-shadow-lg"
                          style={{
                            filter: "drop-shadow(0 0 5px rgba(255,255,255,0.7))"
                          }}
                        >
                          {particle.flowerType}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
              
              {/* Enhanced Celebratory Message - Only shown after hosting is complete */}
              <AnimatePresence>
                {animationPhase === 3 && showShare && (
                  <motion.div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-lg px-4"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-white via-gray-50 to-white backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 text-center"
                      animate={{
                        boxShadow: [
                          "0 20px 40px rgba(0,0,0,0.1)",
                          "0 25px 50px rgba(255,153,51,0.2)",
                          "0 20px 40px rgba(0,0,0,0.1)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {/* Success Icon */}
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF9933] to-[#138808] rounded-full flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      >
                        <motion.span 
                          className="text-3xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          🇮🇳
                        </motion.span>
                      </motion.div>

                      <motion.h3 
                        className="text-2xl font-bold mb-3 text-white"
                        style={{ color: '#ffffff' }}
                      >
                        Flag Hosted Successfully! 🎉
                      </motion.h3>
                      
                      <p className="text-gray-700 text-lg mb-2 font-medium">
                        Happy Independence Day, India!
                      </p>
                      <p className="text-gray-600 text-sm mb-6">
                        Share your patriotic spirit and spread the joy of freedom! 🗽
                      </p>

                      {/* Enhanced Share Buttons */}
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <motion.a
                          href={`https://wa.me/?text=${encodeURIComponent('I just digitally hosted the Indian Tiranga! 🇮🇳 Join the celebration: ' + window.location.origin + '/host-flag')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg flex items-center gap-2 hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>📱</span> WhatsApp
                        </motion.a>
                        <motion.button
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-semibold shadow-lg flex items-center gap-2 hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={async () => {
                            try {
                              // Create a canvas with enhanced design for Instagram Story
                              const canvas = document.createElement('canvas');
                              const ctx = canvas.getContext('2d');
                              canvas.width = 1080;
                              canvas.height = 1920;

                              // Check if context is available
                              if (!ctx) {
                                console.error("Could not get canvas context");
                                return;
                              }

                              // Create dark background with subtle pattern
                              ctx.fillStyle = '#1a1a1a';
                              ctx.fillRect(0, 0, canvas.width, canvas.height);

                              // Add decorative border
                              const borderGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                              borderGradient.addColorStop(0, '#FF9933');
                              borderGradient.addColorStop(0.5, '#FFFFFF');
                              borderGradient.addColorStop(1, '#138808');
                              ctx.strokeStyle = borderGradient;
                              ctx.lineWidth = 20;
                              ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

                              // Draw large Indian flag in center
                              const flagX = canvas.width / 2 - 300;
                              const flagY = canvas.height / 2 - 200;
                              const flagWidth = 600;
                              const flagHeight = 400;

                              // Flag background with shadow
                              ctx.shadowColor = 'rgba(0,0,0,0.5)';
                              ctx.shadowBlur = 20;
                              ctx.shadowOffsetX = 10;
                              ctx.shadowOffsetY = 10;

                              // Saffron stripe
                              ctx.fillStyle = '#FF9933';
                              ctx.fillRect(flagX, flagY, flagWidth, flagHeight / 3);

                              // White stripe
                              ctx.fillStyle = '#FFFFFF';
                              ctx.fillRect(flagX, flagY + flagHeight / 3, flagWidth, flagHeight / 3);

                              // Green stripe
                              ctx.fillStyle = '#138808';
                              ctx.fillRect(flagX, flagY + (2 * flagHeight / 3), flagWidth, flagHeight / 3);

                              // Draw Ashoka Chakra
                              ctx.shadowColor = 'transparent';
                              const chakraX = flagX + flagWidth / 2;
                              const chakraY = flagY + flagHeight / 2;
                              const chakraRadius = 60;

                              // Chakra circle
                              ctx.strokeStyle = '#000080';
                              ctx.lineWidth = 6;
                              ctx.beginPath();
                              ctx.arc(chakraX, chakraY, chakraRadius, 0, 2 * Math.PI);
                              ctx.stroke();

                              // Chakra spokes
                              for (let i = 0; i < 24; i++) {
                                const angle = (i * 15) * Math.PI / 180;
                                ctx.beginPath();
                                ctx.moveTo(chakraX, chakraY);
                                ctx.lineTo(
                                  chakraX + Math.cos(angle) * chakraRadius,
                                  chakraY + Math.sin(angle) * chakraRadius
                                );
                                ctx.stroke();
                              }

                              // Add celebratory elements
                              ctx.fillStyle = '#FFD700';
                              for (let i = 0; i < 20; i++) {
                                const x = Math.random() * canvas.width;
                                const y = Math.random() * 300 + 100;
                                ctx.font = '40px Arial';
                                ctx.fillText('✨', x, y);
                              }

                              // Monadnocks credit in top corner
                              ctx.shadowColor = 'rgba(0,0,0,0.8)';
                              ctx.shadowBlur = 8;
                              ctx.fillStyle = '#FFFFFF';
                              ctx.font = 'bold 28px Arial';
                              ctx.textAlign = 'right';
                              ctx.fillText('Thanks Monadnocks', canvas.width - 80, 120);
                              
                              // Reset text alignment and shadow
                              ctx.textAlign = 'center';
                              ctx.shadowColor = 'rgba(0,0,0,0.5)';
                              ctx.shadowBlur = 5;

                              // Main title with better positioning
                              ctx.fillStyle = '#FFFFFF';
                              ctx.font = 'bold 70px Arial';
                              ctx.fillText('I HOSTED THE', canvas.width / 2, 280);
                              
                              // INDIAN TIRANGA with gradient
                              ctx.font = 'bold 75px Arial';
                              const titleGradient = ctx.createLinearGradient(0, 350, canvas.width, 350);
                              titleGradient.addColorStop(0, '#FF9933');
                              titleGradient.addColorStop(0.5, '#FFFFFF');
                              titleGradient.addColorStop(1, '#138808');
                              ctx.fillStyle = titleGradient;
                              ctx.fillText('INDIAN TIRANGA', canvas.width / 2, 360);

                              // Add emojis with better spacing
                              ctx.shadowColor = 'transparent';
                              ctx.font = '80px Arial';
                              ctx.fillText('🇮🇳', canvas.width / 2, 450);

                              // Reset shadow for bottom text
                              ctx.shadowColor = 'rgba(0,0,0,0.3)';
                              ctx.shadowBlur = 3;

                              // Bottom text section with better spacing
                              ctx.fillStyle = '#FFFFFF';
                              ctx.font = 'bold 48px Arial';
                              ctx.fillText('Happy Independence Day!', canvas.width / 2, 1300);
                              
                              // Digital India section with better positioning
                              ctx.font = 'bold 55px Arial';
                              ctx.fillStyle = '#FFFFFF';
                              ctx.fillText('DIGITAL INDIA', canvas.width / 2, 1370);
                              
                              // Hashtags with better spacing
                              ctx.shadowColor = 'transparent';
                              ctx.font = 'bold 40px Arial';
                              ctx.fillStyle = '#FF9933';
                              ctx.fillText('#IndependenceDay', canvas.width / 2, 1450);
                              
                              ctx.fillStyle = '#138808';
                              ctx.fillText('#JaiHind #DigitalIndia', canvas.width / 2, 1510);
                              
                              // Small website credit with better positioning
                              ctx.fillStyle = '#AAAAAA';
                              ctx.font = '22px Arial';
                              ctx.fillText('Created with love for India 🇮🇳', canvas.width / 2, 1580);

                              // Convert canvas to blob
                              canvas.toBlob(async (blob) => {
                                if (blob) {
                                  // Check if Web Share API is available (mobile)
                                  if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'tiranga-story.png', { type: 'image/png' })] })) {
                                    try {
                                      await navigator.share({
                                        title: 'I hosted the Indian Tiranga!',
                                        text: 'I just digitally hosted the Indian Tiranga! 🇮🇳 #IndependenceDay #JaiHind #DigitalIndia',
                                        files: [new File([blob], 'tiranga-story.png', { type: 'image/png' })]
                                      });
                                    } catch {
                                      // Fallback to download
                                      downloadImage(blob);
                                    }
                                  } else {
                                    // Fallback: Download the image
                                    downloadImage(blob);
                                  }
                                }
                              }, 'image/png');

                              function downloadImage(blob: Blob) {
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'tiranga-story.png';
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                                
                                // Show clear instructions
                                alert('🎉 Perfect! Your Independence Day story image has been downloaded!\n\n📱 Next steps:\n1. Open Instagram app\n2. Tap your profile picture to add a story\n3. Select the downloaded image\n4. Share your patriotic moment!\n\n🇮🇳 The image already includes your message and hashtags!');
                              }

                            } catch {
                              // Simple fallback
                              const text = 'I just digitally hosted the Indian Tiranga! 🇮🇳 #IndependenceDay #JaiHind #DigitalIndia';
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(text).then(() => {
                                  alert('Message copied to clipboard! Open Instagram and paste it in your story.');
                                });
                              } else {
                                alert('Please share: ' + text);
                              }
                            }
                          }}
                        >
                          <span>📸</span> Instagram Story
                        </motion.button>
                      </div>

                      {/* Patriotic Quote */}
                      <motion.div
                        className="mt-4 p-3 bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10 rounded-lg border border-[#FF9933]/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                      >
                        <p className="text-sm italic text-gray-700">
                          &quot;Freedom is not given, it is taken.&quot; - Netaji Subhas Chandra Bose
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Enhanced Close button - Only shown after ceremony is complete */}
              {animationPhase === 3 && (
                <motion.button
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={() => {
                    setIsHosting(false);
                    setShowConfetti(false);
                    setShowShare(false);
                    setAnimationPhase(0);
                    if (audioRef.current) {
                      audioRef.current.pause();
                      audioRef.current.currentTime = 0;
                    }
                  }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FlagHosting;

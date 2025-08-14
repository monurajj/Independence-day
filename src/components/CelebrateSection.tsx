"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CelebrateSection = () => {
  const [count, setCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('flagsHosted') || '0');
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as { count: number };
      if (detail?.count !== undefined) setCount(detail.count);
    };
    window.addEventListener('flags-hosted-updated', onUpdate as EventListener);

    // Fetch server counts
    fetch('/api/flags')
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.today === 'number') setCount(d.today);
      })
      .catch(() => {});

    return () => window.removeEventListener('flags-hosted-updated', onUpdate as EventListener);
  }, []);

  return (
    <section id="celebrate" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Celebrate with us</h3>
          <p className="text-gray-300 mb-6">
            As a proud Indian startup, Monadnocks stands together with the nation. Click the button to digitally host the flag and share the spirit of freedom.
          </p>
          <div className="flex items-center gap-4">
            <a href="#home" data-host-flag className="px-6 py-3 rounded-lg bg-[#FF9933] hover:bg-[#e87b00] text-white font-semibold">Host the Flag</a>
            <div className="text-gray-300">
              <span className="text-2xl font-bold text-[#138808]">{count}</span> flags hosted
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-white/10 p-6 bg-white/5"
        >
          <ul className="space-y-3 text-gray-200">
            <li>• Interactive flag hoisting animation</li>
            <li>• Patriotic music plays on your click</li>
            <li>• Tricolor confetti celebration</li>
            <li>• Works beautifully on mobile and desktop</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CelebrateSection;


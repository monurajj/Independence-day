"use client";
import React from 'react';

const Timeline = () => {
  const timelineEvents = [
    { year: "1857", event: "First War of Independence", desc: "Sepoy Mutiny begins the organized resistance" },
    { year: "1885", event: "Indian National Congress formed", desc: "Political platform for independence movement" },
    { year: "1905", event: "Partition of Bengal", desc: "British divide-and-rule policy sparks protests" },
    { year: "1919", event: "Jallianwala Bagh Massacre", desc: "Tragic event that united India against British rule" },
    { year: "1920", event: "Non-Cooperation Movement", desc: "Gandhi launches mass civil disobedience" },
    { year: "1930", event: "Salt March", desc: "Gandhi's iconic march to break salt laws" },
    { year: "1942", event: "Quit India Movement", desc: "Final push for independence with 'Do or Die'" },
    { year: "1947", event: "Independence Day", desc: "India gains freedom on August 15" }
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Timeline of Freedom
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Key dates in India's journey to independence
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF9933] via-white to-[#138808]"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((item, index) => (
              <div key={index} className="relative flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#FF9933] to-[#138808] flex items-center justify-center text-white font-bold z-10 shadow-lg">
                  {item.year.slice(-2)}
                </div>
                <div className="flex-1 bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-[#FF9933]/50 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-100">{item.event}</h3>
                    <span className="text-[#FF9933] font-semibold">{item.year}</span>
                  </div>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
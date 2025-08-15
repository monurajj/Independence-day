"use client";
import React from 'react';

const IndependenceMovements = () => {
  const movements = [
    {
      title: "Salt March (Dandi March) - 1930",
      icon: "🧂",
      color: "FF9933",
      description: "Gandhi's 240-mile march to the Arabian Sea to make salt, defying British salt laws. This act of civil disobedience sparked nationwide protests and international attention.",
      tags: ["Civil Disobedience", "Non-Violence", "Satyagraha"]
    },
    {
      title: "Quit India Movement - 1942",
      icon: "✊",
      color: "138808",
      description: "The final push for independence with the slogan \"Do or Die.\" Mass protests erupted across India, leading to the arrest of major leaders but strengthening the resolve for freedom.",
      tags: ["Mass Movement", "Do or Die", "Final Push"]
    },
    {
      title: "Jallianwala Bagh Massacre - 1919",
      icon: "🕯️",
      color: "dc2626",
      description: "A turning point in India's freedom struggle when British forces opened fire on unarmed civilians, killing hundreds. This tragedy united Indians against colonial rule.",
      tags: ["Tragedy", "Unity", "Turning Point"]
    },
    {
      title: "Non-Cooperation Movement - 1920",
      icon: "🚫",
      color: "FF9933",
      description: "Gandhi's first major satyagraha movement where Indians boycotted British goods, institutions, and honors, demonstrating the power of unified resistance.",
      tags: ["Boycott", "Unity", "Satyagraha"]
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Major Independence Movements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Key movements that shaped India&apos;s path to freedom
          </p>
        </div>

        <div className="space-y-8">
          {movements.map((movement, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors duration-300">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full bg-[#${movement.color}] flex items-center justify-center text-2xl`}>
                    {movement.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">{movement.title}</h3>
                  <p className="text-gray-300 mb-4">
                    {movement.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {movement.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={`px-3 py-1 bg-[#${movement.color}]/20 text-[#${movement.color}] rounded-full text-sm`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndependenceMovements;
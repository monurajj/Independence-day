"use client";
import React from 'react';

const CulturalHeritage = () => {
  const heritageAspects = [
    {
      icon: "🏛️",
      title: "Ancient Civilization",
      description: "5000+ years of rich history and cultural heritage",
      color: "FF9933"
    },
    {
      icon: "🗣️",
      title: "Languages",
      description: "22 official languages, 1600+ spoken languages",
      color: "FFFFFF"
    },
    {
      icon: "🎭",
      title: "Art & Culture",
      description: "Diverse dance forms, music, and artistic traditions",
      color: "138808"
    },
    {
      icon: "🏔️",
      title: "Geography",
      description: "From Himalayas to oceans, deserts to forests",
      color: "FF9933"
    },
    {
      icon: "🍛",
      title: "Cuisine",
      description: "Rich culinary diversity across regions",
      color: "FFFFFF"
    },
    {
      icon: "🎪",
      title: "Festivals",
      description: "Countless celebrations throughout the year",
      color: "138808"
    },
    {
      icon: "🧘",
      title: "Philosophy",
      description: "Ancient wisdom of yoga, meditation, and spirituality",
      color: "FF9933"
    },
    {
      icon: "🎨",
      title: "Handicrafts",
      description: "Traditional crafts and artisan skills",
      color: "FFFFFF"
    }
  ];

  const achievements = [
    { title: "World's Largest Democracy", value: "1.4B+ citizens" },
    { title: "IT & Software Hub", value: "Global leader" },
    { title: "Space Exploration", value: "Mars mission success" },
    { title: "Economic Growth", value: "5th largest economy" }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">
            Our Rich Heritage & Modern Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrating the diversity, unity, and progress that makes India incredible
          </p>
        </div>

        {/* Cultural Heritage */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {heritageAspects.map((aspect, index) => (
            <div 
              key={index} 
              className={`text-center p-6 rounded-lg bg-gradient-to-br from-[#${aspect.color}]/10 to-transparent border border-[#${aspect.color}]/20 hover:border-[#${aspect.color}]/40 transition-colors duration-300`}
            >
              <div className="text-4xl mb-4">{aspect.icon}</div>
              <h3 className={`text-lg font-bold mb-2 ${aspect.color === 'FFFFFF' ? 'text-white' : `text-[#${aspect.color}]`}`}>
                {aspect.title}
              </h3>
              <p className="text-gray-300 text-sm">{aspect.description}</p>
            </div>
          ))}
        </div>

        {/* Modern India Achievements */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Modern India: A Global Power</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-900/50 border border-gray-600">
                <h4 className="text-lg font-bold text-[#FF9933] mb-2">{achievement.title}</h4>
                <p className="text-[#138808] font-semibold">{achievement.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
            &quot;Unity in Diversity&quot;
          </blockquote>
          <p className="text-xl text-gray-300 mb-6">
            Our strength lies in our differences, our beauty in our variety, and our power in our unity.
          </p>
          <div className="inline-flex items-center gap-2 text-4xl">
            <span>🇮🇳</span>
            <span className="text-[#FF9933]">•</span>
            <span>🕉️</span>
            <span className="text-white">•</span>
            <span>☪️</span>
            <span className="text-[#138808]">•</span>
            <span>✝️</span>
            <span className="text-[#FF9933]">•</span>
            <span>☸️</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalHeritage;
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Achievement = {
  title: string;
  icon: string;
  color: string;
  items: {
    year: string;
    title: string;
    description: string;
  }[];
};

type AchievementCategories = {
  space: Achievement;
  technology: Achievement;
  economy: Achievement;
  social: Achievement;
};

const IndiaAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof AchievementCategories>('space');

  const achievements: AchievementCategories = {
    space: {
      title: "Space Exploration",
      icon: "🚀",
      color: "#FF9933",
      items: [
        {
          year: "1975",
          title: "Aryabhata Launch",
          description: "India's first satellite launched, marking entry into space age"
        },
        {
          year: "2008",
          title: "Chandrayaan-1",
          description: "Discovered water molecules on the Moon's surface"
        },
        {
          year: "2014",
          title: "Mars Orbiter Mission",
          description: "First country to reach Mars in first attempt, most cost-effective mission"
        },
        {
          year: "2017",
          title: "104 Satellites Record",
          description: "Launched 104 satellites in a single mission - world record"
        },
        {
          year: "2019",
          title: "Chandrayaan-2",
          description: "Advanced lunar mission with orbiter, lander, and rover"
        }
      ]
    },
    technology: {
      title: "Technology Revolution",
      icon: "💻",
      color: "#138808",
      items: [
        {
          year: "1998",
          title: "Nuclear Tests",
          description: "Pokhran-II tests established India as nuclear power"
        },
        {
          year: "2000s",
          title: "IT Services Boom",
          description: "Became global IT services hub, software exports grew exponentially"
        },
        {
          year: "2016",
          title: "Digital India Launch",
          description: "Massive digitization initiative transforming governance and services"
        },
        {
          year: "2016",
          title: "UPI Revolution",
          description: "Unified Payments Interface revolutionized digital transactions"
        },
        {
          year: "2020",
          title: "Vaccine Development",
          description: "Developed Covaxin and became world's largest vaccine manufacturer"
        }
      ]
    },
    economy: {
      title: "Economic Growth",
      icon: "📈",
      color: "#000080",
      items: [
        {
          year: "1991",
          title: "Economic Liberalization",
          description: "Market reforms opened economy, leading to rapid growth"
        },
        {
          year: "2000s",
          title: "Service Sector Boom",
          description: "Became global leader in IT, finance, and business services"
        },
        {
          year: "2014",
          title: "Make in India",
          description: "Manufacturing initiative to boost domestic production"
        },
        {
          year: "2017",
          title: "GST Implementation",
          description: "Unified tax system streamlined business operations nationwide"
        },
        {
          year: "2023",
          title: "5th Largest Economy",
          description: "Became world's 5th largest economy, fastest growing major economy"
        }
      ]
    },
    social: {
      title: "Social Progress",
      icon: "🏥",
      color: "#FF6B35",
      items: [
        {
          year: "1977",
          title: "Smallpox Eradication",
          description: "Successfully eradicated smallpox, WHO recognized achievement"
        },
        {
          year: "2005",
          title: "Right to Information",
          description: "Landmark legislation for transparency and accountability"
        },
        {
          year: "2014",
          title: "Swachh Bharat Mission",
          description: "Massive sanitation drive, built 100+ million toilets"
        },
        {
          year: "2017",
          title: "Triple Talaq Ban",
          description: "Progressive legislation for women's rights and gender equality"
        },
        {
          year: "2019",
          title: "Ayushman Bharat",
          description: "World's largest healthcare scheme covering 500 million people"
        }
      ]
    }
  };

  const categories = Object.keys(achievements) as Array<keyof AchievementCategories>;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-[#FF9933] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-[#138808] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-36 h-36 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
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
            India&apos;s Remarkable Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            From independence to becoming a global power - celebrating 77 years of progress, innovation, and growth
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const data = achievements[category];
            return (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                style={{
                  background: selectedCategory === category 
                    ? `linear-gradient(135deg, ${data.color}, ${data.color}dd)` 
                    : undefined
                }}
                whileHover={{ scale: selectedCategory === category ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">{data.icon}</span>
                {data.title}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Achievement Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{achievements[selectedCategory].icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
                  {achievements[selectedCategory].title}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements[selectedCategory].items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700/40 rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: achievements[selectedCategory].color }}
                      >
                        {item.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Footer */}
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-gray-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-[#FF9933]">77+</div>
                    <div className="text-gray-400 text-sm">Years of Progress</div>
                  </div>
                  <div className="p-4 bg-gray-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-[#138808]">1.4B</div>
                    <div className="text-gray-400 text-sm">Population</div>
                  </div>
                  <div className="p-4 bg-gray-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-white">5th</div>
                    <div className="text-gray-400 text-sm">Largest Economy</div>
                  </div>
                  <div className="p-4 bg-gray-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-[#FF6B35]">∞</div>
                    <div className="text-gray-400 text-sm">Possibilities</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IndiaAchievements;
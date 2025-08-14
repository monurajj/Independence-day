"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Fighter {
  name: string;
  title: string;
  initials: string;
  birth: string;
  death: string;
  birthPlace: string;
  imageUrl: string;
  shortDesc: string;
  fullBio: string;
  majorEvents: string[];
  famousQuotes: string[];
}

const FreedomFighters = () => {
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);

  const fighters = [
    {
      name: "Mahatma Gandhi",
      title: "Father of the Nation",
      initials: "MG",
      birth: "October 2, 1869",
      death: "January 30, 1948",
      birthPlace: "Porbandar, Gujarat",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/400px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
      shortDesc: "Led India's non-violent independence movement through satyagraha, inspiring millions with his philosophy of truth and non-violence.",
      fullBio: "Mohandas Karamchand Gandhi was born on October 2, 1869, in Porbandar, Gujarat. He studied law in London and worked as a lawyer in South Africa, where he first developed his philosophy of satyagraha (non-violent resistance). Returning to India in 1915, he became the leader of the Indian independence movement. His major campaigns included the Non-Cooperation Movement (1920-1922), Salt March (1930), and Quit India Movement (1942). He was assassinated on January 30, 1948, by Nathuram Godse in New Delhi. His principles of truth, non-violence, and civil disobedience influenced civil rights movements worldwide.",
      majorEvents: [
        "1893-1915: Developed Satyagraha in South Africa",
        "1920: Launched Non-Cooperation Movement", 
        "1930: Led Salt March (Dandi March)",
        "1942: Started Quit India Movement",
        "1947: India gained independence"
      ],
      famousQuotes: [
        "Be the change you wish to see in the world",
        "An eye for an eye only ends up making the whole world blind",
        "Live as if you were to die tomorrow. Learn as if you were to live forever"
      ]
    },
    {
      name: "Subhas Chandra Bose",
      title: "Netaji",
      initials: "SB",
      birth: "January 23, 1897",
      death: "August 18, 1945",
      birthPlace: "Cuttack, Odisha",
      imageUrl: "https://cdn.britannica.com/37/171337-004-0B980E9D/Subhas-Chandra-Bose-Indian-National-Army.jpg",
      shortDesc: "Founded the Indian National Army and gave us the slogan 'Give me blood, and I shall give you freedom!'",
      fullBio: "Subhas Chandra Bose was born on January 23, 1897, in Cuttack, Odisha. A brilliant student, he passed the Indian Civil Services exam but resigned to join the independence movement. He served as President of the Indian National Congress twice but had ideological differences with Gandhi's non-violent approach. During WWII, he escaped to Germany and later to Japan, where he formed the Indian National Army (Azad Hind Fauj) with Indian prisoners of war. He established the Provisional Government of Free India in 1943. He died in a plane crash in Taiwan on August 18, 1945, though the circumstances remain controversial.",
      majorEvents: [
        "1920: Joined Indian National Congress",
        "1938-39: Served as Congress President",
        "1941: Escaped to Germany via Afghanistan",
        "1943: Formed Azad Hind Government in Singapore",
        "1944: Led INA in Burma campaign"
      ],
      famousQuotes: [
        "Give me blood, and I shall give you freedom!",
        "No real change in history has ever been achieved by discussions",
        "It is our duty to pay for our liberty with our own blood"
      ]
    },
    {
      name: "Bhagat Singh",
      title: "Shaheed-e-Azam",
      initials: "BS",
      birth: "September 28, 1907",
      death: "March 23, 1931",
      birthPlace: "Banga, Punjab",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bhagat_Singh_1929.jpg/400px-Bhagat_Singh_1929.jpg",
      shortDesc: "Revolutionary freedom fighter who sacrificed his life at age 23, inspiring youth across the nation.",
      fullBio: "Bhagat Singh was born on September 28, 1907, in Banga village, Punjab, into a Sikh family deeply involved in independence activities. Inspired by the Jallianwala Bagh massacre, he joined the independence movement as a teenager. He was a member of the Hindustan Republican Association and later the Hindustan Socialist Republican Association. Along with Rajguru and Sukhdev, he threw bombs in the Central Legislative Assembly in 1929 to protest repressive laws. He was arrested, tried, and hanged on March 23, 1931, at age 23. His martyrdom inspired countless young Indians to join the freedom struggle.",
      majorEvents: [
        "1926: Joined Naujawan Bharat Sabha",
        "1928: Avenged Lala Lajpat Rai's death",
        "1929: Threw bombs in Central Assembly",
        "1929-1931: Imprisonment and trial",
        "1931: Executed with Rajguru and Sukhdev"
      ],
      famousQuotes: [
        "Inquilab Zindabad! (Long Live Revolution!)",
        "It is easy to kill individuals but you cannot kill the ideas",
        "Revolution is an inalienable right of mankind"
      ]
    },
    {
      name: "Rani Lakshmibai",
      title: "Warrior Queen of Jhansi",
      initials: "RL",
      birth: "November 19, 1828",
      death: "June 18, 1858",
      birthPlace: "Varanasi, Uttar Pradesh",
      imageUrl: "https://cdn.britannica.com/31/155931-004-7885201A/Lakshmi-Bai.jpg",
      shortDesc: "The brave queen of Jhansi who fought valiantly against British rule during the 1857 rebellion.",
      fullBio: "Born as Manikarnika Tambe on November 19, 1828, in Varanasi, she was trained in martial arts, sword fighting, and horse riding from childhood. She married Raja Gangadhar Rao of Jhansi in 1842 and became Rani Lakshmibai. After her husband's death in 1853, the British applied the Doctrine of Lapse to annex Jhansi. She refused to surrender and became one of the leading figures of the 1857 rebellion. She fought bravely against British forces, defending Jhansi with remarkable courage. She died in battle on June 18, 1858, at Kalpi, while fighting the British. She remains a symbol of resistance and women's power.",
      majorEvents: [
        "1842: Married Raja Gangadhar Rao",
        "1851: Birth of son Damodar Rao",
        "1853: Jhansi annexed under Doctrine of Lapse",
        "1857: Joined the Great Rebellion",
        "1858: Died fighting at Kalpi"
      ],
      famousQuotes: [
        "Main apni Jhansi nahi dungi! (I will not give up my Jhansi!)",
        "Har Har Mahadev!",
        "Freedom is my birthright and I shall have it"
      ]
    },
    {
      name: "Sardar Vallabhbhai Patel",
      title: "Iron Man of India",
      initials: "SP",
      birth: "October 31, 1875",
      death: "December 15, 1950",
      birthPlace: "Nadiad, Gujarat",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Sardar_patel_%28cropped%29.jpg/250px-Sardar_patel_%28cropped%29.jpg",
      shortDesc: "United India by integrating 562 princely states, earning the title 'Iron Man of India.'",
      fullBio: "Vallabhbhai Jhaverbhai Patel was born on October 31, 1875, in Nadiad, Gujarat. He became a successful barrister before joining the independence movement under Gandhi's influence. He organized farmers in Kheda and Bardoli satyagrahas, earning the title 'Sardar' (leader). After independence, as India's first Deputy Prime Minister, he undertook the monumental task of integrating 562 princely states into the Indian Union through diplomacy and, when necessary, force. His efforts in unifying India earned him the title 'Iron Man of India.' He established the All India Services and laid the foundation of modern Indian administration. He died on December 15, 1950.",
      majorEvents: [
        "1917: Organized Kheda Satyagraha",
        "1928: Led Bardoli Satyagraha",
        "1947: Became Deputy Prime Minister",
        "1947-1950: Integrated princely states",
        "1948: Handled Hyderabad integration"
      ],
      famousQuotes: [
        "Manpower without unity is not a strength unless it is harmonized",
        "Every citizen of India must remember that he is an Indian",
        "Faith is of no avail in the absence of strength"
      ]
    },
    {
      name: "Chandrashekhar Azad",
      title: "The Fearless Revolutionary",
      initials: "CA",
      birth: "July 23, 1906",
      death: "February 27, 1931",
      birthPlace: "Bhavra, Madhya Pradesh",
      imageUrl: "https://cdn.britannica.com/40/274440-050-4EC6EAAB/Portrait-Of-Indian-Freedom-Fighter-Chandra-Shekhar-Azad.jpg",
      shortDesc: "Fierce revolutionary who vowed never to be captured alive and kept his promise till the end.",
      fullBio: "Chandrashekhar Tiwari, known as Azad, was born on July 23, 1906, in Bhavra village, Madhya Pradesh. Inspired by the Non-Cooperation Movement, he joined the independence struggle as a teenager. He was a key member of the Hindustan Republican Association and later reorganized it as the Hindustan Socialist Republican Association. He mentored young revolutionaries like Bhagat Singh, Rajguru, and Sukhdev. He participated in the Kakori train robbery and the assassination of British officials. True to his vow never to be captured alive, he shot himself during a police encounter at Alfred Park, Allahabad, on February 27, 1931. His fearless spirit and ultimate sacrifice inspired countless freedom fighters.",
      majorEvents: [
        "1922: First arrested during Non-Cooperation Movement",
        "1925: Participated in Kakori Conspiracy",
        "1928: Reorganized HRA as HSRA",
        "1928: Avenged Lala Lajpat Rai's death",
        "1931: Died fighting police at Alfred Park"
      ],
      famousQuotes: [
        "If yet your blood does not rage, then it is water that flows in your veins",
        "Don't see others doing better than you, beat your own records everyday",
        "Dushman ki goliyon ka hum samna karenge, Azad hee rahey hain, Azad hee rahenge"
      ]
    }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-2 border-[#FF9933] rounded-full"></div>
        <div className="absolute top-32 right-10 sm:right-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 border-2 border-[#138808] rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-14 sm:w-20 md:w-28 h-14 sm:h-20 md:h-28 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 mb-3 sm:mb-4">
            Heroes of Independence
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Immortal souls who gave everything for our freedom - their complete life stories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {fighters.map((fighter, index) => (
            <motion.div 
              key={index} 
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl overflow-hidden border border-gray-700 hover:border-[#FF9933]/50 transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedFighter(fighter)}
            >
              {/* Hero Image */}
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-800 flex items-center justify-center">
                <img 
                  src={fighter.imageUrl} 
                  alt={fighter.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to a colored background with initials if image fails
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback div */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                  style={{ display: 'none' }}
                >
                  {fighter.initials}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-lg">{fighter.name}</h3>
                  <p className="text-[#FF9933] text-xs sm:text-sm font-semibold drop-shadow-lg">{fighter.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
                  <div className="text-xs sm:text-sm text-gray-400">
                    <span className="block">Born: {fighter.birth}</span>
                    <span className="block">Died: {fighter.death}</span>
                  </div>
                  <div className="text-left sm:text-right text-xs sm:text-sm text-gray-400">
                    <span className="block">{fighter.birthPlace}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  {fighter.shortDesc}
                </p>
                
                <div className="flex items-center justify-between">
                  <button 
                    className="text-[#FF9933] hover:text-[#e87b00] text-xs sm:text-sm font-semibold transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFighter(fighter);
                    }}
                  >
                    Read Full Story →
                  </button>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center text-xs font-bold text-white">
                    {fighter.initials}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Modal */}
      <AnimatePresence>
        {selectedFighter && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFighter(null)}
          >
            <motion.div 
              className="bg-gray-900 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-xl sm:rounded-t-2xl bg-gray-800 flex items-center justify-center">
                <img 
                  src={selectedFighter.imageUrl} 
                  alt={selectedFighter.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback to a colored background with initials if image fails
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback div for modal */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center text-4xl sm:text-5xl md:text-6xl font-bold text-white"
                  style={{ display: 'none' }}
                >
                  {selectedFighter.initials}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <button 
                  onClick={() => setSelectedFighter(null)}
                  className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-20"
                >
                  <svg className="w-5 sm:w-5 md:w-6 h-5 sm:h-5 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 z-10">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">{selectedFighter.name}</h2>
                  <p className="text-[#FF9933] text-sm sm:text-base md:text-lg font-semibold drop-shadow-lg">{selectedFighter.title}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-200 drop-shadow-lg">
                    <span>{selectedFighter.birth} - {selectedFighter.death}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{selectedFighter.birthPlace}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Biography */}
                <div className="mb-6 sm:mb-7 md:mb-8">
                  <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-100 mb-2 sm:mb-3 md:mb-4">Life Story</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{selectedFighter.fullBio}</p>
                </div>

                {/* Major Events */}
                <div className="mb-6 sm:mb-7 md:mb-8">
                  <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-100 mb-2 sm:mb-3 md:mb-4">Major Life Events</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {selectedFighter.majorEvents.map((event, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF9933] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm sm:text-base">{event}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Famous Quotes */}
                <div>
                  <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-100 mb-2 sm:mb-3 md:mb-4">Famous Quotes</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {selectedFighter.famousQuotes.map((quote, idx) => (
                      <blockquote key={idx} className="border-l-2 sm:border-l-4 border-[#138808] pl-3 sm:pl-4 py-1 sm:py-2">
                        <p className="text-gray-300 text-sm sm:text-base italic">"{quote}"</p>
                      </blockquote>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FreedomFighters;
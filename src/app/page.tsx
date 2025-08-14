import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FlagHosting from "../components/FlagHosting";
import Footer from "../components/Footer";
import AnnouncementBar from "../components/AnnouncementBar";
import FreedomFighters from "../components/FreedomFighters";
import IndependenceMovements from "../components/IndependenceMovements";
import Timeline from "../components/Timeline";
import CulturalHeritage from "../components/CulturalHeritage";
import NationalAnthem from "../components/NationalAnthem";
import NationalPledge from "../components/NationalPledge";
import IndiaAchievements from "../components/IndiaAchievements";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AnnouncementBar />
      <main>
        <section id="home">
          <Hero />
        </section>

        {/* Journey to Independence */}
        <section id="celebrate-india" className="py-10 sm:py-12 md:py-16 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 mb-3 sm:mb-4">
                The Journey to Independence
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto px-2">
                On August 15, 1947, India gained independence from British rule after centuries of struggle. This is the story of courage, sacrifice, and the indomitable spirit of our freedom fighters.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
              <div className="text-center p-4 sm:p-5 md:p-6 rounded-lg bg-gradient-to-br from-[#FF9933]/20 to-[#FF9933]/5 border border-[#FF9933]/20">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚔️</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#FF9933] mb-1 sm:mb-2">1857 - First War</h3>
                <p className="text-sm sm:text-base text-gray-300">The Sepoy Mutiny marked the beginning of organized resistance against British colonial rule.</p>
              </div>
              
              <div className="text-center p-4 sm:p-5 md:p-6 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/20">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🕊️</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">1920s - Non-Violence</h3>
                <p className="text-sm sm:text-base text-gray-300">Gandhi's non-violent resistance movement gained momentum across the nation.</p>
              </div>
              
              <div className="text-center p-4 sm:p-5 md:p-6 rounded-lg bg-gradient-to-br from-[#138808]/20 to-[#138808]/5 border border-[#138808]/20">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🗽</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#138808] mb-1 sm:mb-2">1947 - Freedom</h3>
                <p className="text-sm sm:text-base text-gray-300">India finally achieved independence, becoming a sovereign nation.</p>
              </div>
            </div>
          </div>
        </section>

        <FreedomFighters />
        <IndependenceMovements />
        <Timeline />
        <CulturalHeritage />
        <IndiaAchievements />
        <NationalAnthem />
        <NationalPledge />

        <FlagHosting />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}

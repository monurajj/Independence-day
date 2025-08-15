import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FlagHosting from "../../components/FlagHosting";
import Link from "next/link";

export const metadata = {
  title: "Host the Tiranga | Happy Independence Day",
  description:
    "Digitally host the Indian Tiranga and celebrate India's 78th Independence Day with animation, music and confetti.",
};

export default function HostFlagPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      <main>
        <section className="pt-28 pb-16 relative overflow-hidden">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Digitally Host the Tiranga
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Join millions in celebrating India&apos;s 78th Independence Day. Click the
                button to hoist the Tiranga and let the patriotic celebration begin!
              </p>

              <div className="flex gap-4">
                <button
                  data-host-flag
                  className="px-8 py-4 rounded-lg bg-[#FF9933] hover:bg-[#e87b00] text-white font-bold shadow-lg"
                >
                  Start Hoisting
                </button>
                <Link
                  href="/"
                  className="px-8 py-4 rounded-lg border-2 border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white font-bold"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            <div className="relative h-72 md:h-96 rounded-xl bg-gradient-to-br from-[#FF9933]/30 via-white/10 to-[#138808]/30 border border-white/10 flex items-center justify-center">
              <div className="relative w-72 h-48 md:w-96 md:h-64">
                <div className="absolute inset-0 bg-[#FF9933] rounded-t-lg" style={{height:'33%'}}></div>
                <div className="absolute inset-0 top-1/3 h-1/3 bg-white flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-[#000080] relative">
                    {Array.from({length:24}).map((_,i)=> (
                      <div key={i} className="absolute top-1/2 left-1/2 w-px h-1/2 bg-[#000080] origin-bottom" style={{transform:`translate(-50%,-100%) rotate(${i*15}deg)`}} />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 top-2/3 bg-[#138808] rounded-b-lg" style={{height:'34%'}}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Overlay host animation & audio */}
        <FlagHosting />
      </main>

      <Footer />
    </div>
  );
}



import { Tv, Download, Globe, Users } from "lucide-react";

const Reason = () => {
  const features = [
    {
      title: "Big-Screen Experience",
      desc: "Enjoy cinema-quality streaming on Smart TVs, consoles, and connected devices.",
      icon: Tv,
    },
    {
      title: "Offline Viewing",
      desc: "Download your favourite shows and movies to watch without internet.",
      icon: Download,
    },
    {
      title: "Stream Anywhere",
      desc: "Watch seamlessly on phones, tablets, laptops, and TVs — anytime.",
      icon: Globe,
    },
    {
      title: "Kids Profiles",
      desc: "Create safe profiles for kids with parental controls and curated content.",
      icon: Users,
    },
  ];

  return (
    <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white overflow-hidden">
      
      <div className="absolute -top-32 left-1/4 w-[420px] h-[420px] bg-red-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-purple-600/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        
        <div className="mb-16 text-center">
          <span className="text-red-500 uppercase tracking-widest text-sm">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3">
            Built for the Way You Watch
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#0b0b0b] border border-gray-800 rounded-2xl p-8 hover:border-red-600/50 transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-600/10 text-red-500 mb-6 group-hover:scale-110 transition">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
                
                <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-red-600/30 transition" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reason;

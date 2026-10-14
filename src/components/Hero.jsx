import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg')",
      }}
    >

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <span className="inline-block mb-6 px-4 py-1 rounded-full bg-red-600/20 text-red-400 text-sm tracking-wide">
            New Originals Streaming Now
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Watch Stories <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              That Never End
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl">
            Stream movies, series, and exclusive originals anytime, anywhere —
            crafted for true entertainment lovers.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/signin"
              className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              <Play size={20} /> Start Watching
            </Link>

            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-lg bg-[#0b0b0b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

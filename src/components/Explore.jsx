import React, { useState, useEffect, useRef } from "react";
import { Play, Info, Search, Bell, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FEATURE_VIDEO, VIDEO_URL } from "../utils/constant";
import {
  Top5Movie,
  recentlyAdded,
  awardWinning,
  actionMovies,
  Top5Thriller,
  Comedy,
  Tvserials,
  KidsEnjoys,
} from "../utils/data";

/* ================= MOVIE CARD ================= */
const MovieCard = ({ movie, index, showRank }) => {
  return (
    <div className="relative min-w-[280px] h-[160px] rounded-xl overflow-visible cursor-pointer transition-transform duration-300 hover:scale-105 group">
      <img
        src={movie.img}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
      />

      {showRank && (
        <span
          className="absolute left-[-15px] bottom-[-15px] text-8xl font-black italic select-none z-10"
          style={{
            color: "black",
            WebkitTextStroke: "2px white",
            lineHeight: "1",
          }}
        >
          {index + 1}
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition rounded-lg z-20">
        <div className={`absolute bottom-3 ${showRank ? "left-14" : "left-3"}`}>
          <div className="flex gap-2 mb-1">
            <Play size={16} fill="white" className="text-white" />
            <Info size={16} className="text-white" />
          </div>
          <p className="text-sm font-semibold text-white">{movie.title}</p>
        </div>
      </div>
    </div>
  );
};

const HorizontalRow = ({ title, data, showRank = false }) => {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -450 : 450,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-14">
      <h2 className="text-2xl font-bold mb-4 px-10 text-white">{title}</h2>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 p-3 rounded-full hover:bg-black text-white"
      >
        ❮
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 p-3 rounded-full hover:bg-black text-white"
      >
        ❯
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-10 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {data &&
          data.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              showRank={showRank}
            />
          ))}
      </div>
    </div>
  );
};

/* ================= MAIN EXPLORE ================= */
const Explore = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "user@streamify.com";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center ">
        {/* Full Screen Video */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute inset-0 w-full h-full border-0 scale-125"
            src={VIDEO_URL}
            title="Stranger Things Trailer"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-20 max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-8xl font-black italic text-red-800">
            STRANGER
            <br />
            THINGS
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            When a young boy vanishes, a small town uncovers a mystery involving
            secret experiments and terrifying supernatural forces.
          </p>

          <div className="flex gap-4">
            <button className="px-10 py-3 bg-white text-black font-bold rounded hover:bg-gray-200">
              ▶ Play
            </button>

            <button className="px-10 py-3 bg-gray-500/70 text-white font-bold rounded">
              ⓘ More Info
            </button>
          </div>
        </div>
      </section>

      {/* MOVIE ROWS SECTION */}
      <section className="bg-black pt-16 pb-20 space-y-16 relative z-20">
        <HorizontalRow
          title="Top-5 Movies in Streamify Today"
          data={Top5Movie}
          showRank={true}
        />

        <HorizontalRow title="Recently Added" data={recentlyAdded} />
        <HorizontalRow title="Award-Winning Movies" data={awardWinning} />
        <HorizontalRow title="Get in on the Action" data={actionMovies} />
        <HorizontalRow
          title="Top-5 Thriller Movies"
          data={Top5Thriller}
          showRank={true}
        />
        <HorizontalRow title="Comedy" data={Comedy} />
        <HorizontalRow title="TV Serials" data={Tvserials} />
        <HorizontalRow title="Kids & Family" data={KidsEnjoys} />
      </section>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Explore;

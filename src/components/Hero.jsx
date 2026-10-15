import React from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Trending from "./Trending";
import Reason from "./Reasons";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Header from "./Header";
import { BACK_HOME } from "../utils/constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleStartWatching = () =>{
       if (user) {
      navigate("/browse");
    } else {
      navigate("/login");
    }
  };


  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="relative w-full min-h-screen text-white overflow-hidden bg-cover bg-center bg-no-repeat">
        <img
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={BACK_HOME}
          alt="backgroundImage"
        />

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
         
         <button 
          onClick={handleStartWatching}
         className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-lg font-semibold transition">
                <Play size={20} /> Start Watching
         </button>
             
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white">
        <Trending />
        <Reason />
        <FAQ />
        <Footer />
      </div>
    </div>
  );

};
export default Hero;

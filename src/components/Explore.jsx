import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Info,
  Search,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Top5Movie = [
   {id: 40, title: 'Mahavtar Narsimha', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjwUHokS9vZzinFHMZiQiVTEtw-AgmO-pxA&s' },
  { id: 36, title: 'De De Pyar De 2', img: 'https://www.dazzlerr.com/wp-content/uploads/2025/10/De-De-Pyaar-De-2.webp' },
  { id: 37, title: 'The R.I.P', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQ7PzYnrUN9_GSx948gbBtpAZAli7vEx3Xw&s' },
  { id: 38, title: 'HAQ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs-wZGXsI0G13TmreMfD3iao6wXIyGiOcOLw&s' },
  { id: 39, title: 'Akhanda', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdb5No_UCDE7EVNjsxE_PB0zRtVE80gHM0cA&s' },
];

const recentlyAdded = [
  { id: 6, title: 'Avtar Fire & Ash', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qpn1qtlEOLWMOpQa-3DaSSsGfYHZ9HGVJQ&s' },
  { id: 7, title: '120 Bahadur', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpx9xcf50dPJG12JTbRplYP-_GYWs0i37nEg&s' },
  { id: 8, title: 'Dangal', img: 'https://m.media-amazon.com/images/S/pv-target-images/fdec579c49acfbcd73c8fe3a69ad3995a96b63bdaf08befe72c8f89d6c4b3452.jpg' },
  { id: 9, title: 'URI- The Surgical Strick', img: 'https://i0.wp.com/myvoice.opindia.com/wp-content/uploads/sites/3/2018/12/images-5-1.jpeg?fit=744%2C412&ssl=1' },
  { id: 10, title: 'Legend Of Hanuman', img: 'https://i.ytimg.com/vi/RLR46zUb1i4/sddefault.jpg' },
  { id: 11, title: 'Avengers- The Infinity War', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvrLbOUzl2NC3zniwBe2si2ioCvYmVqzTbg&s' },
  { id: 12, title: 'Bhay-The Gaurav Tiwari Mystry', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAUQ9ni5iPiQBNx0bC4FSrXVOtVhQolUv4sg&s' },
  { id: 13, title: 'Dhurandar', img: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/medium/dhurandhar-et00452447-1764571309.jpg' },
  { id: 14, title: 'Varisu', img: 'https://i.ytimg.com/vi/RbQgF_vocLU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBEnPXUwJkaQ_Cj4gpAWcjo47AcMA' },
  { id: 15, title: 'KGF', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpefqeqeJz_vAUYTfK0WVIHhQTc-V3zF-hw&s' },
];

const awardWinning = [
  { id: 16, title: '13 Hours -The Secret Soldiers Of Benghazi', img: 'https://thecinemafiles.com/wp-content/uploads/2016/01/Banner.jpg' },
  { id: 17, title: 'RRR ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ354WVZMwx5PtGdl-uhUtS1xr_3-5MMKX99A&s' },
  { id: 18, title: 'Transformers-The BumbelBee', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlp57Xdl0WeVcyCcscr9lXQ1nJfj1Wnc5Nrg&s' },
  { id: 19, title: 'Kantara', img: 'https://hindupost.in/wp-content/uploads/2025/10/G2k-xSBaAAAPmpx.jpeg' },
  { id: 20, title: 'Sam Bahadur', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFG_Nlzy3ZeOEV7aJhUZSLuCGTODMh2jyEg&s' },
  { id: 21, title: 'Mirai', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI5qtRrp6wGE5Rxj23dShuAPosIuwdXxEhbg&s' },
  { id: 22, title: 'Shaurya', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlfHxC4O107evHAoE5abeCDzz6WEgk7ZnqQ&s' },
  { id: 23, title: 'Lucifer', img: 'https://data1.ibtimes.co.in/en/full/711268/lucifer.jpg' },
  { id: 24, title: 'Avengers- The End Game ', img: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/7b350a2f-0b3e-4033-8125-34c4d67e3bbe/compose?aspectRatio=1.78&format=webp&width=1200' },
  { id: 25, title: '1920-London', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStlOW-D45pZjLwQiAhd1zeKTeDg6qzNb1ttw&s' },
];

const actionMovies = [
  { id: 26, title: 'Chhaava', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR80vLlk1REUPbhRLSzZegdUtejaZCXUH72GA&s' },
  { id: 27, title: 'Snowpiercer ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIhAlIhL3y3-2MVGFEQz4roW53CQBdahTJ2w&s' },
  { id: 28, title: 'Designated Survivor', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1XQnz7VDAsrWj215XZ6rjTQKVuEjIjiM0A&s' },
  { id: 29, title: 'The Bourne Legacy', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDmpMoVRPR3AOFuIcSHSJr7hGmvk5AZM1iAA&s' },
  { id: 30, title: 'Commondo 2', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyugnz3toN3ixY6WnTKAi6jbA-3dgJweC02A&s' },
  { id: 31, title: 'Baaghi', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWZqAhvY0Wx09iUl8Tyq5egpoy4edP_bSpg&sss' },
  { id: 32, title: 'Fast & Furious', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI5YfwtvrZPwje1_LSfVDTUa-vypm2PNNw2Q&s' },
  { id: 33, title: 'Action Jackdson', img: 'https://onlookersmedia.in/wp-content/uploads/2014/12/Sunny-Wayne-in-Villain-Malayalam-Movie-Stills-Images-Photos-Onlookers-Media1.jpg' },
  { id: 34, title: 'Theri ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpr0Jv7k5XCtaOBOWXwxitUzstoQq911T1g&s' },
  { id: 35, title: 'Jack Reacher', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBctVCX675uKcFWxSX8XjnEBLxK0K_RXZUQ&s' },
];



const Top5Thriller = [
  { id: 41, title: 'Parasite ', img: 'https://i.ytimg.com/vi/SEUXfv87Wpk/sddefault.jpg' },
  { id: 42, title: 'Se7en ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0X3JKLZEEJtamYjAOhHbokiXpy-OUkV9Hg&s' },
  { id: 43, title: 'The Silence of the Lambs ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdyHIdZ2yKTeQ4HJwCxtQj014eYBcppfoAww&s'},
  { id: 44, title: 'Inception', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEUFR6YsLHWdVtnHgbSS1yPq8ANJlheNHOyg&s'},
  { id: 45, title: 'The Dark Knight', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77pn9nAtHPaqM6EGK28nO7niXSMxgHsMdBA&s' },
];

const Comedy = [
  { id: 46, title: 'Dhamaal', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOjMl7EnzOQYToowxwscysug7ozYRsH3aKyg&s' },
  { id: 47, title: 'Housefull ', img: 'https://i.ytimg.com/vi/wFtF1zedwbw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCD-AnyIVZCTSpT_D9GvQDKeoTyJQ' },
  { id: 48, title: 'Kis Kis Ko Pyar Karu ', img: 'https://i.ytimg.com/vi/CpGIAwvM4j0/sddefault.jpg' },
  { id: 49, title: 'Welcome', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8WtFnWq9PDqHgRuVZovFMdWalvb4_zpzxWA&s' },
  { id: 50, title: 'Golmaal', img: 'https://i.ytimg.com/vi/lVR6sXQx__o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAxyykIdcoj514Ou3PN4LHN2oxeMA' },
  { id: 51, title: 'Phir Hera Pheri', img: 'https://i.ytimg.com/vi/mxU6GAN5uM8/hqdefault.jpg' },
  { id: 52, title: 'Munna Bhai M.B.B.S', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAWeP_4FqLzAkJsg-1AVfKNINS6iIdSri5Ww&s' },
  { id: 53, title: 'Chup Chup Ke', img: 'https://i.ytimg.com/vi/0HsYX_6Xd24/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBTiThvr-zWhvK7YAcCB7QWbbs_QQ' },
  { id: 54, title: 'Singh is Bling', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMvsCnK0uJURqcVesEfca2R0_hkK8Rujml0g&s' },
  { id: 55, title: 'Bhool Bhulaiyaa', img: 'https://m.media-amazon.com/images/S/pv-target-images/28f5b57d2b93cc91d22c598802e57c12c736bbfd1713f8adc301aa4ada004d2a.jpg' },
];

const Tvserials = [
  { id: 56, title: 'Ramayan', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQus6UIyl_FzUmFk67-JYZlpmVlxltUQZHUpA&s' },
  { id: 57, title: 'Mahabharat ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDT_NzGySR6Vgirl85zCTDuBvnTb6SKaoZwQ&s' },
  { id: 58, title: 'Poras', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7KxRMXpsu1rRlbewMU_a14cBADMjEKdp3A&s' },
  { id: 59, title: 'Laughter Chefs', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCJYTJaPvCERIq0gRtApQdJjaEBH6uNC55bg&s' },
  { id: 60, title: 'C.I.D', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjoH8SjVUywNBbNd7pdz-ILxb5I7DMon-bQQ&s' },
  { id: 61, title: 'Devo Ke Dev Maha Dev', img: 'https://upload.wikimedia.org/wikipedia/hi/c/c0/%E0%A4%A6%E0%A5%87%E0%A4%B5%E0%A5%8B%E0%A4%82_%E0%A4%95%E0%A5%87_%E0%A4%A6%E0%A5%87%E0%A4%B5..._%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A6%E0%A5%87%E0%A4%B5.jpg' },
  { id: 62, title: 'Tarak Mehta Ka Ulta Chasma', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZo3rGBqBvrLmS3WnjKzYw1sserRh5yx4rIQ&s' },
  { id: 63, title: 'Crime Petrol', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1t8cM6aTISq8idiXyB0VjCE1S-CdMsr5Ng&s' },
  { id: 64, title: ' Satyamev Jayate', img: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201207/aamir-660_070612102526.jpg?VersionId=oPIz4PpwgutsZsYBeoTP.lYHl.9FmnbH&size=690:388' },
  { id: 65, title: 'Bharat Ki Khoj', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsKkZ_qBVPJeQa3o0-lOIs6yzsF_XnFbxCqQ&s' },
];

const KidsEnjoys = [
  { id: 66, title: 'Little Krishna', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVELuXhL96_raFeJXP0QRHxEDeUgazWSpPVQ&s' },
  { id: 67, title: 'Motu Patlu ', img: 'https://m.media-amazon.com/images/S/pv-target-images/bf4e3d6e68b51dfd17cdacad6461cdc24371b1102f840f9ba06b1db9bb42a6ad._BR-6_AC_SX720_FMjpg_.jpg' },
  { id: 68, title: 'Tom and Jerry', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1RJIqsls0HlQ5wRPdoSEADL5zlTyOjtQo7Q&s' },
  { id: 69, title: 'Shinchan', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDd1Etx0nYqmdfnegtpU4h7RvcjLU16gk1ng&s' },
  { id: 70, title: 'Doremon', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3OVqDi56-VwQeNKtmZS4EBDLlAhbikBMr5g&s' },
  { id: 71, title: 'Oggy and The Cockroches', img: 'https://m.media-amazon.com/images/S/pv-target-images/41f4b81d291fbe68836f1e91c65774ad628c9c27fd82a7462055607b60725a7e._SX1080_FMjpg_.jpg' },
  { id: 72, title: 'Batman', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTafmeerLErXEIa0bqXFjkw0WZR7EINHmsJtA&ss' },
  { id: 73, title: 'The Simpsons', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc03Hew7nmz-79iAKc23vApNsUOoVPnRYiwQ&s' },
  { id: 74, title: 'Pokeymon ', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV7oP6EDWckAHKX-SAOHaxDeBjO432TBVEeg&s' },
  { id: 75, title: 'Chhota Bheem', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc0u1s60dx2X9kRU_GKDxMGsbxx3A-Esmp-w&s' },
];

/* ================= MOVIE CARD ================= */
const MovieCard = ({ movie, index, showRank }) => {
  return (
    <div className="relative min-w-[280px] h-[160px] rounded-xl overflow-visible cursor-pointer transition-transform duration-300 hover:scale-105 group">
      <img src={movie.img} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
      
      {showRank && (
        <span 
          className="absolute left-[-15px] bottom-[-15px] text-8xl font-black italic select-none z-10"
          style={{ 
            color: 'black', 
            WebkitTextStroke: '2px white', 
            lineHeight: '1' 
          }}
        >
          {index + 1}
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition rounded-lg z-20">
        <div className={`absolute bottom-3 ${showRank ? 'left-14' : 'left-3'}`}>
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
      scrollRef.current.scrollBy({ left: dir === 'left' ? -450 : 450, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-14">
      <h2 className="text-2xl font-bold mb-4 px-10 text-white">{title}</h2>
      <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 p-3 rounded-full hover:bg-black text-white">❮</button>
      <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/70 p-3 rounded-full hover:bg-black text-white">❯</button>
      <div ref={scrollRef} className="flex gap-6 overflow-x-scroll scrollbar-hide px-10 py-4">
        {data && data.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} showRank={showRank} />
        ))}
      </div>
    </div>
  );
};

/* ================= FOOTER ================= */
const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 border-t border-gray-800 text-center text-sm">
      © {new Date().getFullYear()} Streamify. All rights reserved.
    </footer>
  );
};


/* ================= MAIN EXPLORE ================= */
const Explore = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const userEmail = localStorage.getItem('userEmail') || 'user@streamify.com';


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
      <section className="relative h-[85vh] w-full flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcIFFHqGrDletH1OSvfXQGpiRFbGRJKYKoYOu_EczGNAgalhWFdfvwg3pF86qtuHZu6x_o3S6-t1_WIJ6_Q-FtfCyPCi6qMzXVJ2.jpg?r=00f')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 px-10 md:px-20 max-w-2xl space-y-6">
          <h1 className="text-6xl md:text-8xl font-black italic drop-shadow-2xl">STRANGER THINGS</h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.
          </p>
          <div className="flex gap-4">
            <button className="px-10 py-3 bg-white text-black font-black rounded hover:bg-gray-200 transition text-lg flex items-center gap-2 shadow-xl">
              <Play size={20} fill="black" /> Play
            </button>
            <button className="px-10 py-3 bg-gray-500/50 text-white font-bold rounded hover:bg-gray-500/30 transition text-lg backdrop-blur-md flex items-center gap-2 shadow-xl">
              <Info size={20} /> More Info
            </button>
          </div>
        </div>
      </section>

      {/* MOVIE ROWS SECTION */}
      <section className="bg-black pt-16 pb-20 space-y-16 relative z-20">
        <HorizontalRow title="Top-5 Movies in Streamify Today" data={Top5Movie} showRank={true} />
        <HorizontalRow title="Recently Added" data={recentlyAdded} />
        <HorizontalRow title="Award-Winning Movies" data={awardWinning} />
        <HorizontalRow title="Get in on the Action" data={actionMovies} />
        <HorizontalRow title="Top-5 Thriller Movies" data={Top5Thriller} showRank={true} />
        <HorizontalRow title="Comedy" data={Comedy} />
        <HorizontalRow title="TV Serials" data={Tvserials} />
        <HorizontalRow title="Kids & Family" data={KidsEnjoys} />
      </section>

      <Footer />
    </div>
  );
};

export default Explore;
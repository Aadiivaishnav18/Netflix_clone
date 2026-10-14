import { Play, Plus } from "lucide-react";

const Trending = () => {
  const movies = [
    { id: 1, title: "Stranger Things", imageUrl: "https://m.media-amazon.com/images/M/MV5BNjRiMTA4NWUtNmE0ZC00NGM0LWJhMDUtZWIzMDM5ZDIzNTg3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 2, title: "Kantara", imageUrl: "https://m.media-amazon.com/images/M/MV5BNDU2ZTYxYTMtMjhlZC00ZjEwLThhNDUtMzdlNWM4ZDcyYTM1XkEyXkFqcGc@._V1_.jpg" },
    { id: 3, title: "Legends of Hanuman", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGrJv-Ww0zVqm6amlvwudjNDRdTNA0NEwIg&s" },
    { id: 4, title: "Bhay", imageUrl: "https://images.justwatch.com/poster/340104374/s718/bhay-the-gaurav-tiwari-mystery.jpg" },
    { id: 5, title: "120 Bahadur", imageUrl: "https://m.media-amazon.com/images/M/MV5BM2ZkZjRhMjItN2ZlNS00MTc3LTkyYWYtYTM1MWVjZGZlOWU5XkEyXkFqcGc@._V1_QL75_UY281_CR18,0,190,281_.jpg" },
    { id: 6, title: "Transformers", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-_DnyshP2Ax6a-KQMDCiDclhegJ4VwJm-Q&s" },
    { id: 7, title: "Sam Bahadur", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3sbaTLIt5gVostyKgca-CT9cEBiVg-iInCg&s" },
    { id: 8, title: "Varisu", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJUaBtLzmwcjDpxYbzyFhVZfndIRn4p6vE_w&s" },
    { id: 9, title: "Veronica", imageUrl: "https://m.media-amazon.com/images/M/MV5BNDI3MjMxYTktZjQ0My00MDVlLWE1MzYtYjliNjFmNmNjMzQxXkEyXkFqcGc@._V1_.jpg" },
    { id: 10, title: "KGF", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfh_pfyJlHwH9ZjIkoESpMSZ678tGkuK9xyA&s" },
  ];

  return (
    <section className="px-6 md:px-12 py-16 bg-black text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold">Trending This Week</h2>
        <span className="text-sm text-gray-400">Updated daily</span>
      </div>

      {/* Horizontal Scroll */}
      <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="group relative min-w-[180px] md:min-w-[220px] rounded-xl overflow-hidden bg-[#111] border border-gray-800 hover:border-red-600/40 transition-all duration-300"
          >
            {/* Poster */}
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-[280px] object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

            {/* Rank */}
            <span className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded text-xs font-bold">
              #{index + 1}
            </span>

            {/* Hover Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-sm font-semibold mb-3 line-clamp-2">
                {movie.title}
              </h3>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded text-sm font-semibold hover:bg-gray-200 transition">
                  <Play size={14} /> Play
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full hover:border-white transition">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;

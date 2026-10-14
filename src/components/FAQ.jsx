import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-700">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left text-lg md:text-2xl hover:text-red-500 transition"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-300 text-base md:text-lg">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is FilmSphere ?",
      answer:
        "Streamify is an online streaming platform offering movies, TV shows, documentaries, anime, and exclusive originals anytime, anywhere.",
    },
    {
      question: "How much does FilmSphere cost?",
      answer:
        " FilmSphere offers affordable monthly plans with unlimited access across all supported devices.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch on smart TVs, laptops, tablets, smartphones, and streaming devices with an internet connection.",
    },
    {
      question: "How do I cancel?",
      answer:
        "You can cancel your subscription anytime from your account settings — no contracts, no hidden fees.",
    },
    {
      question: "What can I watch on FilmSphere?",
      answer:
        "Enjoy thousands of movies, web series, documentaries, kids content, and FilmSphere Originals.",
    },
    {
      question: "Is FilmSphere safe for kids?",
      answer:
        "Yes. FilmSphere includes parental controls and a kids-friendly experience designed for family viewing.",
    },
  ];

  return (
    <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-2 mb-16">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={activeIndex === index}
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          />
        ))}
      </div>
      
    </section>
  );
};

export default FAQ;

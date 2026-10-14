import { Link } from "react-router-dom";

const Footer = () => {
    const links = [
    { name: "Help Centre" },
    { name: "Account"},
    { name: "Media Centre" },
    { name: "Investor Relations" },
    { name: "Jobs"},
    { name: "Ways to Watch"},
    { name: "Terms of Use" },
    { name: "Privacy" },
    { name: "Cookie Preferences" },
    { name: "Corporate Information" },
    { name: "Contact Us"},
    { name: "Speed Test" },
    { name: "Legal Notices" },
    { name: "Only on Netflix" },
  ];

  return (
    <footer className="px-6 md:px-12 py-20 border-t-8 border-[#232323] text-gray-400 bg-black">
      <div className="max-w-6xl mx-auto space-y-12">

        <div className="flex flex-col md:flex-row justify-between gap-8">
          <p className="text-sm">
            Questions? Call{" "}
            <span className="underline cursor-pointer hover:text-white">
              000-800-919-1694
            </span>
          </p>

          <select className="w-36 bg-black border border-gray-600 px-4 py-2 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-white">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              className="text-sm hover:underline hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs tracking-wide">
          © {new Date().getFullYear()} NETFLIX. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;

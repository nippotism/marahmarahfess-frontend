import { ReactNode, useEffect, useState } from "react";
import { Home, Send} from "lucide-react"; // Icons for navbar
import { Link } from "react-router-dom";

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Top Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md border-b" : "bg-transparent"
        }`}
      >
        <Link
          to="/"
          className="flex flex-col font-bold font-rock-salt items-center text-gray-600 hover:text-black"
        >
          DipoFess
        </Link>
        <button
          onClick={() => document.getElementById("my_modal_5")?.showModal()}
          className="bg-black hidden md:block text-white px-4 py-1 rounded-full text-sm"
        >
          + Kirim Menfess
        </button>
      </nav>

      {/* Content */}
      <div className="w-full pt-16 pb-16 font-jakarta-sans">{children}</div>

      {/* Bottom Navigation Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 md:hidden">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center text-gray-600 hover:text-black"
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <button
          onClick={() => document.getElementById("my_modal_5")?.showModal()}
          className="flex flex-col items-center text-gray-600 hover:text-black"
        >
          <Send className="w-6 h-6" />
          <span className="text-xs">Kirim Menfess</span>
        </button>
      </div>
    </div>
  );
}

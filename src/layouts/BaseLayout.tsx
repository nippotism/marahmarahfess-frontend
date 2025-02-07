import { ReactNode, useEffect, useState } from "react";

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
    <div className="min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
      <nav
        className={`flex text-black justify-between items-center sticky top-0 py-4 px-8  z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-[#a7dbd8] border-b-2 border-black shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold font-jakarta-sans">Temyfess</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <a href="#home" className="hover:text-blue-500">
            Kirim
          </a>
          <a href="#about" className="hover:text-blue-500">
            Dukungan
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Services", "Gallery", "About", "Contact"];

  return (
    <nav
  className={`fixed top-0 z-50 w-full transition-all duration-300
    backdrop-blur-sm
    ${
      scrolled
        ? "bg-white/80 shadow-sm"
        : "bg-white/40"
    }
  `}
>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="AR Nails Logo" width={80} height={80} />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`transition-colors font-body ${
                scrolled ? "text-gray-700 hover:text-pink-500" : "text-pink-700 hover:text-pink-300"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
          >
            <span
              className={`block h-0.5 w-8 bg-pink-700 transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-8 bg-pink-700 transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-8 bg-pink-700 transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full left-0 bg-white/95 backdrop-blur border-t border-pink-100 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)} // close menu on click
              className="text-pink-700 font-semibold text-lg hover:text-pink-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

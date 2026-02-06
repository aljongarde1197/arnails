"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.2); // navbar solid after 20% scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur border-pink-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="AR Nails Logo"
            width={80}
            height={80}
          />
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Services", "Gallery", "About", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors font-body ${
                  scrolled
                    ? "text-gray-700 hover:text-pink-500"
                    : "text-pink-700 hover:text-pink-300"
                }`}
              >
                {item}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

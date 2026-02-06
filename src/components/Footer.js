// components/Footer.jsx
"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-pink-50 text-pink-800 px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Logo / Branding */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative rounded-full overflow-hidden bg-pink-100 flex items-center justify-center shadow-md">
            <Image
              src="/images/logo.png"
              alt="AR Nails Logo"
              fill
              className="object-contain"
            />
          </div>
          {/* <span className="font-semibold text-lg">AR Nails</span> */}
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-6 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition transform hover:scale-110"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition transform hover:scale-110"
          >
            <FaTiktok />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-pink-200"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-pink-400">
        &copy; {new Date().getFullYear()} AR Nails. All rights reserved.
      </div>
    </footer>
  );
}

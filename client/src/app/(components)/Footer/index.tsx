"use client";

import { Twitter, Instagram, Facebook } from "@mui/icons-material"; // Material Design Icons
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-4 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        {/* App Name and Copyright */}
        <div className="text-gray-700 text-sm">
          &copy; 2025 <span className="font-bold">LEAP</span>. All rights reserved.
        </div>

        {/* Privacy and Terms Links */}
        <div className="flex gap-4 text-gray-700 text-sm">
          <Link href="/privacy" className="hover:text-blue-500 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-blue-500 transition-colors">
            Terms
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-500 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-pink-500 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
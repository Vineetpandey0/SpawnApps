"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-20">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center gap-6">

        {/* Logo / Name */}
        <div className="text-2xl font-semibold">
          AI App Generator
        </div>

        {/* Description */}
        <p className="text-center max-w-xl text-sm text-gray-400">
          Build full-stack applications instantly using structured JSON.
          Dynamic UI, APIs, and database — all generated at runtime.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6 mt-4 text-xl">
          
          <a href="#" target="_blank" className="hover:text-gray-400">
            <FaGithub />
          </a>

          <a href="#" target="_blank" className="hover:text-gray-400">
            <FaLinkedin />
          </a>

          <a href="#" target="_blank" className="hover:text-gray-400">
            <FaTwitter />
          </a>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:underline">
            AI App Generator
          </Link>
          . All rights reserved.
        </div>
      </div>

    </footer>
  );
}
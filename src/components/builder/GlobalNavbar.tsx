"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
//   const navLinks = [
//     { name: "Create App", path: "/create" },
//   ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="mb-10 w-full bg-white text-black flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-4 z-50 shadow-md">

      {/* Logo */}
      <Link href="/" className="text-xl font-semibold">
        App Builder
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {/* {navLinks.map((link, i) => (
          <Link key={i} href={link.path} className="hover:underline">
            {link.name}
          </Link>
        ))} */}

        <Link href="/login">
          <button className="bg-white text-black px-5 py-2 rounded-full">
            Start Building
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-black flex flex-col items-center justify-center gap-6 transition-all ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        {/* {navLinks.map((link, i) => (
          <Link key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))} */}

        <Link href="/login">
          <button className="bg-black text-white px-6 py-2 rounded-full">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
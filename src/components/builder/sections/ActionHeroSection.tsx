"use client";

import {
  Loader2Icon,
  SparklesIcon,
  TrendingUpIcon,
  UploadCloudIcon,
  MicIcon,
  ArrowRightIcon,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

interface Prompt {
  label: string;
  prompt: string;
}

const categoryChips = [
  "Tasks & Workflows",
  "CRM & Sales",
  "Content & Sites",
  "Finance",
  "Booking",
  "HR & People",
  "Project Mgmt",
  "Marketing",
];

const prompts: Prompt[] = [
  {
    label: "Portfolio Website",
    prompt:
      "Create a modern portfolio website to showcase my skills, projects, experience, and personal brand professionally",
  },
  {
    label: "E-commerce Website",
    prompt:
      "Build a fast, secure e-commerce website with product listings, cart system, payments, and admin dashboard",
  },
  {
    label: "Blog",
    prompt:
      "Create a clean, SEO-optimized blog website for writing articles, managing content, and growing audience online",
  },
  {
    label: "Landing Page",
    prompt:
      "Design a high-conversion landing page with strong hero section, CTA buttons, and lead capture form",
  },
  {
    label: "Resume Website",
    prompt:
      "Generate a professional resume website with skills, experience, education, projects, and downloadable CV section",
  },
  {
    label: "Personal Website",
    prompt:
      "Create a personal branding website with about section, social links, blogs, and contact form",
  },
  {
    label: "Business Website",
    prompt:
      "Build a professional business website with services, testimonials, pricing section, and customer inquiry form",
  },
  {
    label: "Marketing Website",
    prompt:
      "Create a marketing-focused website optimized for conversions, analytics tracking, funnels, and campaign integrations",
  },
  {
    label: "Educational Website",
    prompt:
      "Build an educational website with courses, student dashboard, lesson pages, progress tracking, and quizzes",
  },
];

const placeholders = [
  "portfolio website...",
  "e-commerce store...",
  "business landing page...",
  "personal blog...",
  "startup website...",
];

export default function ActionHeroSection() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<"apps" | "superagents">("apps");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Service is currently unavailable. Please try again later.");
      setLoading(false);
      setPrompt("");
      setSelected(null);
    }, 10000);
  };

  useEffect(() => {
    if (prompt) return;

    const currentWord = placeholders[textIndex];

    if (!deleting && charIndex === currentWord.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((prev) => (prev + 1) % placeholders.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (deleting ? -1 : 1));
    }, 50);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, prompt]);

  const animatedPlaceholder = placeholders[textIndex].substring(0, charIndex);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full px-4">

        {/* Badge */}
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <TrendingUpIcon className="w-4 h-4" />
          <span className="text-sm">Build Apps with just a prompt</span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-5xl md:text-6xl font-semibold text-gray-900 max-w-2xl leading-tight mb-3">
          What will you build next?
        </h1>

        {/* Subtext */}
        <p className="text-center text-base text-gray-500 max-w-md mb-8">
          No code. No design skills. Just describe your idea and launch instantly.
        </p>

        {/* Prompt Box */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-gray-300 transition-shadow"
        >
          <textarea
            className="w-full resize-none p-5 pb-3 outline-none text-gray-700 text-sm placeholder:text-gray-400 bg-transparent"
            placeholder={`Describe the app you want to create...`}
            rows={3}
            minLength={10}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              {/* File upload */}
              <label
                htmlFor="file-upload"
                className="p-1.5 rounded-md border border-gray-200 text-gray-400 cursor-pointer hover:bg-gray-100 hover:text-gray-600 transition-colors"
                title="Upload file"
              >
                <input type="file" id="file-upload" hidden />
                <UploadCloudIcon className="w-4 h-4" />
              </label>

              {/* Settings */}
              <button
                type="button"
                className="p-1.5 rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                title="Options"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="4" r="1" fill="currentColor" />
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="8" cy="12" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Plan toggle */}
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>Plan</span>
                <button
                  type="button"
                  className="w-9 h-5 rounded-full bg-gray-200 relative transition-colors hover:bg-gray-300"
                >
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
                </button>
              </div>

              {/* Mic */}
              <button
                type="button"
                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                title="Voice input"
              >
                <MicIcon className="w-4 h-4" />
              </button>

              {/* Submit */}
              <button
                disabled={loading}
                type="submit"
                className={`
                  inline-flex items-center justify-center gap-2 px-4 h-9 rounded-xl
                  bg-gray-900 text-white text-sm font-medium
                  hover:bg-gray-700 active:scale-[0.98]
                  transition-all duration-150
                  disabled:opacity-60 disabled:cursor-not-allowed
                  shadow-sm
                `}
              >
                {loading ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRightIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Suggestion prompt */}
        <p className="text-sm text-gray-500 mt-4 mb-3">What would you like to create?</p>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl">
          {categoryChips.map((chip, i) => (
            <button
              key={chip}
              onClick={() => {
                const matched = prompts.find((p) =>
                  p.label.toLowerCase().includes(chip.toLowerCase().split(" ")[0])
                );
                if (matched) {
                  setPrompt(matched.prompt);
                  setSelected(matched.label);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full border text-sm transition-all
                ${selected === chip
                  ? "bg-gray-200 border-gray-300 text-gray-800"
                  : "bg-white/80 border-gray-200 text-gray-600 hover:bg-white hover:border-gray-300 hover:shadow-sm"
                }
              `}
            >
              {i === categoryChips.length - 1 ? (
                <span className="flex items-center gap-1">
                  <span>···</span> More
                </span>
              ) : (
                chip
              )}
            </button>
          ))}
        </div>

        {/* Marquee of prompt suggestions */}
        <Marquee
          gradient
          gradientColor="transparent"
          speed={30}
          pauseOnHover
          className="max-w-2xl w-full mt-6 opacity-80"
        >
          {prompts.map((item) => {
            const isSelected = selected === item.label;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setPrompt(item.prompt);
                  setSelected(item.label);
                }}
                className={`px-4 py-1.5 mx-2 border rounded-full text-sm transition-all
                  ${isSelected
                    ? "bg-gray-200 text-gray-800 border-gray-300 cursor-not-allowed"
                    : "text-gray-500 bg-white/70 border-gray-200 hover:bg-white hover:shadow-sm"
                  }
                `}
              >
                <SparklesIcon className="w-3 h-3 inline mr-1.5 text-orange-400" />
                {item.label}
              </button>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}

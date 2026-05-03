import React from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Layers, Layout, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DynamicLanding({ page, data }: { page: any, data: any }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  const { brandName = "App", hero, features = [], workflow = [], pricing = [] } = data;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {brandName.charAt(0)}
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">{brandName}</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#workflow" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="?path=/dashboard" className="hidden sm:inline-flex text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Log in
              </Link>
              <Link href="?path=/dashboard" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors shadow-sm hover:shadow">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="max-w-4xl mx-auto text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
            {hero?.headline || "Build something amazing"}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            {hero?.subheadline || "The easiest way to launch your next big idea."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="?path=/dashboard" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
              {hero?.ctaPrimary || "Start for free"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <a href="#features" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              {hero?.ctaSecondary || "Learn more"}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-2">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">Everything you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                  {idx % 3 === 0 ? <Layout className="w-6 h-6" /> : idx % 3 === 1 ? <Zap className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-2">How it works</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">Simple process, powerful results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {workflow.map((w: any, idx: number) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mb-6 relative z-10 border-4 border-white shadow-sm">
                  {w.step || idx + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{w.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-sm">{w.description}</p>
                {idx < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-0.5 bg-gray-200 -z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-2">Pricing</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">Simple, transparent pricing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricing.map((p: any, idx: number) => (
              <div key={idx} className={`bg-white rounded-3xl p-8 md:p-10 border ${p.isPopular ? 'border-indigo-600 shadow-xl relative' : 'border-gray-200 shadow-sm'}`}>
                {p.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{p.planName}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl md:text-5xl font-extrabold text-gray-900">{p.price}</span>
                  <span className="text-gray-500 ml-2 font-medium">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {p.features?.map((f: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-colors ${p.isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
              {brandName.charAt(0)}
            </div>
            <span className="font-semibold text-gray-900">{brandName}</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

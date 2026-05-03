"use client";

import React, { useState } from 'react';
import { Search, MapPin, BedDouble, Bath, Square, Home, Phone, Heart, SlidersHorizontal, Check } from 'lucide-react';

export default function RealEstateExplorer({ data }: { data: any }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedProps, setSavedProps] = useState<Set<string>>(new Set());
  const [contacted, setContacted] = useState<Set<string>>(new Set());

  if (!data) return <div className="p-8">Loading...</div>;

  const { title = "Discover Premium Properties", properties = [] } = data;

  const filters = ["All", "House", "Apartment", "Condo", "Villa"];
  
  const filteredProperties = properties.filter((p: any) => 
    activeFilter === "All" || p.type?.toLowerCase() === activeFilter.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1F2C] font-sans pb-24">
      {/* Navbar Minimal */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Home className="w-6 h-6 text-emerald-600" />
          <span className="font-bold text-xl tracking-tight">LuxeEstate</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Saved ({savedProps.size})</button>
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
            US
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="px-6 py-12 md:py-20 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mb-10">Find your perfect home among our curated collection of premium real estate. From modern apartments to luxurious villas.</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search city, neighborhood..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 ring-1 ring-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-500 transition-shadow text-base"
            />
          </div>
          <button className="px-6 py-4 bg-white ring-1 ring-gray-200 rounded-2xl shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 font-medium transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" /> Filters
          </button>
          <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md font-semibold transition-colors">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === f ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Listings</h2>
          <span className="text-gray-500 font-medium">{filteredProperties.length} results</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProperties.map((prop: any) => (
            <div key={prop.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60"></div>
                {/* Fallback image style */}
                <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply"></div>
                
                {prop.isFeatured && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                    Featured
                  </div>
                )}
                
                <button 
                  onClick={() => {
                    const next = new Set(savedProps);
                    if (next.has(prop.id)) next.delete(prop.id);
                    else next.add(prop.id);
                    setSavedProps(next);
                  }}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/30 hover:bg-white/90 backdrop-blur-md rounded-full transition-colors"
                >
                  <Heart className={`w-5 h-5 ${savedProps.has(prop.id) ? 'fill-rose-500 text-rose-500' : 'text-white group-hover:text-gray-700'}`} />
                </button>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                  <span className="text-white font-extrabold text-2xl tracking-tight drop-shadow-md">{prop.price}</span>
                  <span className="text-white/90 text-sm font-medium px-2 py-1 bg-black/30 backdrop-blur-sm rounded-md capitalize">{prop.type}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">{prop.title}</h3>
                <div className="flex items-start text-gray-500 text-sm mb-5 min-h-[40px]">
                  <MapPin className="w-4 h-4 mr-1.5 mt-0.5 shrink-0" />
                  <span className="line-clamp-2 leading-relaxed">{prop.address}</span>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-5">
                  <div className="flex items-center gap-2 text-gray-700">
                    <BedDouble className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{prop.beds} <span className="font-normal text-gray-500 text-sm">Beds</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Bath className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{prop.baths} <span className="font-normal text-gray-500 text-sm">Baths</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Square className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{prop.sqft} <span className="font-normal text-gray-500 text-sm">sqft</span></span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const next = new Set(contacted);
                    next.add(prop.id);
                    setContacted(next);
                  }}
                  disabled={contacted.has(prop.id)}
                  className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${contacted.has(prop.id) ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'}`}
                >
                  {contacted.has(prop.id) ? (
                    <><Check className="w-4 h-4" /> Request Sent</>
                  ) : (
                    <><Phone className="w-4 h-4" /> Contact Agent</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

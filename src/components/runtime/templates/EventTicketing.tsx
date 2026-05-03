"use client";

import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, Search, Filter, ChevronRight, Share, CheckCircle2 } from 'lucide-react';

export default function EventTicketing({ data }: { data: any }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [purchasedTickets, setPurchasedTickets] = useState<Set<string>>(new Set());
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  if (!data) return <div className="p-8 text-center text-zinc-500 animate-pulse">Loading events...</div>;

  const { platformName = "TicketStream", events = [] } = data;

  const categories = ["All", ...Array.from(new Set(events.map((e: any) => e.category).filter(Boolean)))];

  const filteredEvents = events.filter((e: any) => 
    activeCategory === "All" || e.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans pb-24 selection:bg-fuchsia-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-fuchsia-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
              <Ticket className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">{platformName}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-400">
            <a href="#" className="text-white">Concerts</a>
            <a href="#" className="hover:text-white transition-colors">Sports</a>
            <a href="#" className="hover:text-white transition-colors">Arts & Theater</a>
            <a href="#" className="hover:text-white transition-colors">Family</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="px-5 py-2.5 bg-white text-black font-bold rounded-full text-sm hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-orange-500">Unforgettable</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 font-medium">Discover and book tickets for the best events, concerts, and shows happening near you.</p>
          
          <div className="max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur-md p-2 rounded-2xl border border-zinc-800 shadow-2xl flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
              <Search className="w-5 h-5 text-zinc-500 mr-3" />
              <input type="text" placeholder="Search events, artists, venues..." className="w-full bg-transparent border-none py-4 text-white placeholder-zinc-500 focus:outline-none" />
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-orange-500 rounded-xl font-bold text-white shadow-lg shadow-fuchsia-500/20 hover:scale-[1.02] transition-transform">
              Find Tickets
            </button>
          </div>
        </div>
      </section>

      {/* Events Feed */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Trending Events</h2>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat: any, i) => (
              <button 
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: any, idx: number) => (
            <div key={event.id || idx} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group flex flex-col">
              <div className="relative aspect-[16/10] bg-zinc-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10 opacity-80"></div>
                {/* Fallback image */}
                <div className="absolute inset-0 bg-fuchsia-900/20 mix-blend-screen group-hover:scale-105 transition-transform duration-700"></div>
                
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-center shadow-xl">
                    <div className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest leading-none mb-1">
                      {event.date?.split(' ')[0] || 'OCT'}
                    </div>
                    <div className="text-xl font-black text-white leading-none">
                      {event.date?.split(' ')[1] || '24'}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold text-white uppercase tracking-widest shadow-sm">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-orange-400 transition-all">{event.title}</h3>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center text-zinc-400 text-sm font-medium">
                    <Calendar className="w-4 h-4 mr-2 text-zinc-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-zinc-400 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">From</span>
                    <span className="text-2xl font-black text-white">{event.price}</span>
                  </div>
                  
                  {purchasedTickets.has(event.id) ? (
                    <button className="px-6 py-3 bg-zinc-800 text-emerald-400 rounded-xl font-bold flex items-center gap-2 cursor-default border border-emerald-900/30">
                      <CheckCircle2 className="w-5 h-5" /> Got Tickets
                    </button>
                  ) : (
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="px-6 py-3 bg-white hover:bg-zinc-200 text-black rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg"
                    >
                      Buy Tickets <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Checkout Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}></div>
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl shadow-fuchsia-900/20 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black mb-2">Checkout</h2>
            <p className="text-zinc-400 text-sm font-medium mb-8 pb-6 border-b border-zinc-800">Complete your purchase for {selectedEvent.title}.</p>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">{selectedEvent.title}</h3>
                  <p className="text-zinc-500 text-sm">{selectedEvent.date} • {selectedEvent.location}</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-t border-zinc-800">
                <span className="font-medium text-zinc-400">General Admission</span>
                <span className="font-bold">{selectedEvent.price}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-t border-zinc-800">
                <span className="font-medium text-zinc-400">Fees & Taxes</span>
                <span className="font-bold">$12.50</span>
              </div>
            </div>

            <button 
              onClick={() => {
                const next = new Set(purchasedTickets);
                next.add(selectedEvent.id);
                setPurchasedTickets(next);
                setSelectedEvent(null);
              }}
              className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:from-fuchsia-500 hover:to-orange-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-fuchsia-600/20 transition-all flex items-center justify-center gap-2"
            >
              Pay Now <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

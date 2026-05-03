'use client'

import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, Search, ChevronRight, CheckCircle2 } from 'lucide-react';

const sampleData = {
  platformName: "TicketStream",
  events: [
    { id: "e1", title: "Arctic Monkeys — Live World Tour", category: "Music", date: "Jun 14", location: "Madison Square Garden, NYC", price: "$89", fullDate: "June 14, 2026" },
    { id: "e2", title: "Glastonbury Festival 2026", category: "Festival", date: "Jul 25", location: "Glastonbury, Somerset UK", price: "$340", fullDate: "July 25–29, 2026" },
    { id: "e3", title: "NBA Finals — Game 7", category: "Sports", date: "Jun 22", location: "Chase Center, San Francisco", price: "$220", fullDate: "June 22, 2026" },
    { id: "e4", title: "Dune: Awakening World Premiere", category: "Film", date: "Jul 8", location: "TCL Chinese Theatre, LA", price: "$55", fullDate: "July 8, 2026" },
    { id: "e5", title: "Hamilton — Broadway Revival", category: "Theater", date: "Aug 3", location: "Richard Rodgers Theatre, NYC", price: "$150", fullDate: "August 3–November 2026" },
    { id: "e6", title: "Coachella Valley Music & Arts", category: "Festival", date: "Apr 11", location: "Empire Polo Club, CA", price: "$499", fullDate: "April 11–20, 2027" },
  ]
};

const gradients = [
  'linear-gradient(135deg,#6B21A8 0%,#C026D3 50%,#F97316 100%)',
  'linear-gradient(135deg,#1D4ED8 0%,#06B6D4 100%)',
  'linear-gradient(135deg,#DC2626 0%,#F59E0B 100%)',
  'linear-gradient(135deg,#065F46 0%,#10B981 100%)',
  'linear-gradient(135deg,#7C3AED 0%,#EC4899 100%)',
  'linear-gradient(135deg,#92400E 0%,#F59E0B 60%,#FDE68A 100%)',
];

export default function EventTicketing({ data }) {
  const safeData = data || sampleData;
  const [activeCategory, setActiveCategory] = useState("All");
  const [purchasedTickets, setPurchasedTickets] = useState(new Set());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const platformName = safeData.platformName || safeData.name || safeData.title || sampleData.platformName;
  const events = safeData.events || safeData.listings || safeData.tickets || sampleData.events;
  
  const categories = ["All", ...Array.from(new Set(events.map(e => e.category).filter(Boolean)))];
  const filteredEvents = events.filter(e => activeCategory === "All" || e.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');

        .et-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .et-root {
          min-height: 100vh;
          background: #080810;
          font-family: 'Space Grotesk', sans-serif;
          color: #F0EEFF;
        }

        /* Header */
        .et-header {
          padding: 0 48px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: sticky; top: 0; z-index: 50;
          background: rgba(8,8,16,0.9); backdrop-filter: blur(12px);
        }
        .et-logo { display: flex; align-items: center; gap: 10px; }
        .et-logo-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          display: flex; align-items: center; justify-content: center;
        }
        .et-logo-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 800; letter-spacing: -0.02em;
          background: linear-gradient(90deg,#FFF,#9CA3AF);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .et-header-links { display: flex; gap: 28px; }
        .et-header-link { font-size: 13px; font-weight: 500; color: #6B7280; cursor: pointer; transition: color 0.2s; }
        .et-header-link:hover { color: #F0EEFF; }
        .et-header-right { display: flex; gap: 12px; align-items: center; }
        .et-search-btn {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: #9CA3AF; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .et-search-btn:hover { background: rgba(255,255,255,0.12); color: #FFF; }
        .et-signin-btn {
          padding: 10px 22px; background: #FFF; color: #111;
          border: none; border-radius: 100px; cursor: pointer;
          font-size: 13px; font-weight: 700; letter-spacing: 0.02em;
          transition: background 0.2s; font-family: 'Space Grotesk', sans-serif;
        }
        .et-signin-btn:hover { background: #E8E8E8; }

        /* Hero */
        .et-hero {
          padding: 100px 48px 80px;
          position: relative; overflow: hidden; text-align: center;
        }
        .et-hero-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 900px; height: 600px;
          background: radial-gradient(ellipse at 50% 30%,rgba(124,58,237,0.25) 0%,rgba(236,72,153,0.1) 40%,transparent 70%);
          pointer-events: none;
        }
        .et-hero-grid {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.12;
          background-image: linear-gradient(rgba(124,58,237,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.5) 1px,transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at 50% 0%,black 0%,transparent 60%);
        }
        .et-hero-eyebrow {
          display: inline-block; margin-bottom: 24px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          color: #A78BFA; background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3); padding: 6px 16px; border-radius: 100px;
          position: relative;
        }
        .et-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: 72px; font-weight: 800; line-height: 1.0;
          letter-spacing: -0.03em; margin-bottom: 24px;
          position: relative;
        }
        .et-hero-title .et-gradient {
          background: linear-gradient(90deg,#C084FC,#EC4899,#F97316);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .et-hero-desc { font-size: 18px; color: #6B7280; max-width: 560px; margin: 0 auto 48px; line-height: 1.6; font-weight: 300; position: relative; }
        
        .et-search-bar {
          max-width: 640px; margin: 0 auto;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 8px;
          display: flex; gap: 8px; position: relative;
        }
        .et-search-bar:focus-within { border-color: rgba(124,58,237,0.5); }
        .et-search-input-wrap { flex: 1; display: flex; align-items: center; padding: 8px 16px; gap: 12px; }
        .et-search-input {
          background: transparent; border: none; outline: none;
          font-size: 15px; color: #F0EEFF; width: 100%;
          font-family: 'Space Grotesk', sans-serif;
        }
        .et-search-input::placeholder { color: #4B5563; }
        .et-search-submit {
          padding: 14px 28px; border-radius: 10px;
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          border: none; color: #FFF; font-size: 13px; font-weight: 700;
          cursor: pointer; white-space: nowrap; transition: opacity 0.2s;
          font-family: 'Space Grotesk', sans-serif;
        }
        .et-search-submit:hover { opacity: 0.9; }

        /* Events */
        .et-events { max-width: 1280px; margin: 0 auto; padding: 0 48px 80px; }
        .et-events-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .et-events-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; }
        .et-cats { display: flex; gap: 8px; overflow-x: auto; }
        .et-cat-pill {
          padding: 8px 18px; border-radius: 100px;
          font-size: 12px; font-weight: 600; white-space: nowrap; cursor: pointer;
          transition: all 0.2s; font-family: 'Space Grotesk', sans-serif;
        }
        .et-cat-pill.active { background: #FFF; color: #111; }
        .et-cat-pill.inactive { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #6B7280; }
        .et-cat-pill.inactive:hover { color: #F0EEFF; border-color: rgba(255,255,255,0.2); }

        .et-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .et-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; overflow: hidden;
          display: flex; flex-direction: column;
          transition: all 0.3s;
        }
        .et-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }
        
        .et-card-img {
          aspect-ratio: 16/9; position: relative; overflow: hidden;
        }
        .et-card-img-bg { position: absolute; inset: 0; opacity: 0.6; transition: opacity 0.3s; }
        .et-card:hover .et-card-img-bg { opacity: 0.8; }
        .et-card-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top,rgba(8,8,16,0.95) 0%,transparent 60%); }
        
        .et-card-date-badge {
          position: absolute; top: 16px; right: 16px;
          background: rgba(8,8,16,0.7); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 10px 16px; text-align: center;
        }
        .et-date-month { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; color: #A78BFA; text-transform: uppercase; }
        .et-date-num { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #FFF; line-height: 1.1; }
        
        .et-cat-chip {
          position: absolute; bottom: 16px; left: 16px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 6px;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15); color: #FFF;
        }

        .et-card-body { padding: 20px 24px 24px; flex: 1; display: flex; flex-direction: column; }
        .et-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 700; line-height: 1.2;
          margin-bottom: 12px; transition: all 0.2s;
        }
        .et-card:hover .et-card-title { background: linear-gradient(90deg,#C084FC,#EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .et-card-meta { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .et-card-meta-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6B7280; font-weight: 500; }

        .et-card-footer { margin-top: auto; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07); display: flex; justify-content: space-between; align-items: center; }
        .et-price-wrap { }
        .et-price-from { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4B5563; }
        .et-price { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; }
        .et-buy-btn {
          padding: 12px 22px; border-radius: 12px;
          background: #FFF; color: #111; border: none; cursor: pointer;
          font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 6px;
          transition: all 0.2s; font-family: 'Space Grotesk', sans-serif;
        }
        .et-buy-btn:hover { background: #F0EEFF; }
        .et-got-btn {
          padding: 12px 22px; border-radius: 12px;
          background: rgba(16,185,129,0.1); color: #10B981;
          border: 1px solid rgba(16,185,129,0.2); cursor: default;
          font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Modal */
        .et-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .et-modal {
          background: #0F0F1A; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; max-width: 480px; width: 100%;
          padding: 32px; position: relative;
        }
        .et-modal-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 8px; }
        .et-modal-subtitle { font-size: 14px; color: #6B7280; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .et-modal-event-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; margin-bottom: 20px; }
        .et-modal-event-name { font-weight: 700; font-size: 16px; margin-bottom: 6px; }
        .et-modal-event-meta { font-size: 13px; color: #6B7280; }
        .et-modal-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .et-modal-row-label { font-size: 14px; color: #6B7280; }
        .et-modal-row-value { font-size: 14px; font-weight: 700; }
        .et-modal-pay {
          margin-top: 24px; width: 100%; padding: 18px;
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          border: none; border-radius: 14px; color: #FFF;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.2s; font-family: 'Space Grotesk', sans-serif;
        }
        .et-modal-pay:hover { opacity: 0.9; }
        .et-modal-close { position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.08); border: none; border-radius: 50%; width: 36px; height: 36px; color: #9CA3AF; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .et-modal-close:hover { background: rgba(255,255,255,0.14); color: #FFF; }

        /* Footer */
        .et-footer {
          background: #080810; border-top: 1px solid rgba(255,255,255,0.06);
          padding: 80px 48px 40px; margin-top: 80px;
        }
        .et-footer-top {
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 64px;
          margin-bottom: 60px; max-width: 1280px; margin-left: auto; margin-right: auto;
        }
        .et-footer-brand { margin-bottom: 24px; }
        .et-footer-desc {
          font-size: 14px; color: #6B7280; line-height: 1.6; max-width: 320px;
        }
        .et-footer-links { display: flex; gap: 80px; flex-wrap: wrap; }
        .et-footer-col h4 {
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          color: #FFF; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.05em;
        }
        .et-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .et-footer-col a {
          font-size: 14px; color: #6B7280; text-decoration: none; transition: color 0.2s;
        }
        .et-footer-col a:hover { color: #A78BFA; }
        .et-footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 13px; color: #4B5563; max-width: 1280px; margin: 0 auto; flex-wrap: wrap; gap: 16px;
        }
        .et-footer-social { display: flex; gap: 24px; }
        .et-footer-social a { color: #6B7280; transition: color 0.2s; text-decoration: none; }
        .et-footer-social a:hover { color: #FFF; }

        /* Responsive */
        @media (max-width: 1024px) {
          .et-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .et-header { padding: 0 24px; }
          .et-header-links { display: none; }
          .et-hero { padding: 60px 24px 60px; }
          .et-hero-title { font-size: 48px; }
          .et-hero-desc { font-size: 16px; margin-bottom: 32px; }
          .et-search-bar { flex-direction: column; padding: 12px; }
          .et-search-submit { width: 100%; }
          .et-events { padding: 0 24px 60px; }
          .et-grid { grid-template-columns: 1fr; }
          .et-footer { padding: 60px 24px 40px; }
          .et-footer-top { gap: 40px; }
          .et-footer-links { gap: 40px; }
        }
      `}</style>

      <div className="et-root">
        <header className="et-header">
          <div className="et-logo">
            <div className="et-logo-icon"><Ticket size={18} color="#FFF" style={{transform:'rotate(-30deg)'}} /></div>
            <span className="et-logo-name">{platformName}</span>
          </div>
          <div className="et-header-links">
            {['Concerts', 'Sports', 'Theater', 'Arts', 'Family'].map(l => (
              <span key={l} className="et-header-link">{l}</span>
            ))}
          </div>
          <div className="et-header-right">
            <button className="et-search-btn"><Search size={16} /></button>
            <button className="et-signin-btn">Sign In</button>
          </div>
        </header>

        <section className="et-hero">
          <div className="et-hero-glow"></div>
          <div className="et-hero-grid"></div>
          <div className="et-hero-eyebrow">Live Experiences</div>
          <h1 className="et-hero-title">
            Experience the<br/><span className="et-gradient">Unforgettable</span>
          </h1>
          <p className="et-hero-desc">Discover and book tickets for the best concerts, sports events, and live shows in your city.</p>
          <div className="et-search-bar">
            <div className="et-search-input-wrap">
              <Search size={16} color="#4B5563" />
              <input className="et-search-input" placeholder="Search events, artists, venues..." />
            </div>
            <button className="et-search-submit">Find Tickets</button>
          </div>
        </section>

        <div className="et-events">
          <div className="et-events-header">
            <h2 className="et-events-title">Trending Events</h2>
            <div className="et-cats">
              {categories.map((cat, i) => (
                <button key={i} className={`et-cat-pill ${activeCategory === cat ? 'active' : 'inactive'}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>
          <div className="et-grid">
            {filteredEvents.map((event, ei) => (
              <div key={event.id || ei} className="et-card">
                <div className="et-card-img">
                  <div className="et-card-img-bg" style={{background: gradients[ei % gradients.length]}}></div>
                  <div className="et-card-img-overlay"></div>
                  <div className="et-card-date-badge">
                    <div className="et-date-month">{event.date?.split(' ')[0] || 'JUN'}</div>
                    <div className="et-date-num">{event.date?.split(' ')[1] || '14'}</div>
                  </div>
                  <div className="et-cat-chip">{event.category}</div>
                </div>
                <div className="et-card-body">
                  <h3 className="et-card-title">{event.title}</h3>
                  <div className="et-card-meta">
                    <div className="et-card-meta-item"><Calendar size={14} color="#6B7280" /> {event.fullDate || event.date}</div>
                    <div className="et-card-meta-item"><MapPin size={14} color="#6B7280" /><span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{event.location}</span></div>
                  </div>
                  <div className="et-card-footer">
                    <div className="et-price-wrap">
                      <div className="et-price-from">From</div>
                      <div className="et-price">{typeof event.price === 'object' ? (event.price.amount || event.price.min || JSON.stringify(event.price)) : event.price}</div>
                    </div>
                    {purchasedTickets.has(event.id) ? (
                      <div className="et-got-btn"><CheckCircle2 size={15} /> Got Tickets</div>
                    ) : (
                      <button className="et-buy-btn" onClick={() => setSelectedEvent(event)}>
                        Buy Tickets <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedEvent && (
          <div className="et-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="et-modal" onClick={e => e.stopPropagation()}>
              <button className="et-modal-close" onClick={() => setSelectedEvent(null)}>✕</button>
              <h2 className="et-modal-title">Complete Purchase</h2>
              <p className="et-modal-subtitle">You're one step away from {selectedEvent.title}.</p>
              <div className="et-modal-event-card">
                <div className="et-modal-event-name">{selectedEvent.title}</div>
                <div className="et-modal-event-meta">{selectedEvent.fullDate} · {selectedEvent.location}</div>
              </div>
              <div className="et-modal-row"><span className="et-modal-row-label">General Admission</span><span className="et-modal-row-value">{selectedEvent.price}</span></div>
              <div className="et-modal-row"><span className="et-modal-row-label">Service Fees</span><span className="et-modal-row-value">$12.50</span></div>
              <button className="et-modal-pay" onClick={() => { const n = new Set(purchasedTickets); n.add(selectedEvent.id); setPurchasedTickets(n); setSelectedEvent(null); }}>
                Pay Now <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        <footer className="et-footer">
          <div className="et-footer-top">
            <div>
              <div className="et-logo et-footer-brand">
                <div className="et-logo-icon"><Ticket size={18} color="#FFF" style={{transform:'rotate(-30deg)'}} /></div>
                <span className="et-logo-name">{platformName}</span>
              </div>
              <p className="et-footer-desc">Your ultimate destination for live experiences. We connect you to the events that define your lifestyle.</p>
            </div>
            <div className="et-footer-links">
              <div className="et-footer-col">
                <h4>Categories</h4>
                <ul>
                  <li><a href="#">Concerts</a></li>
                  <li><a href="#">Sports</a></li>
                  <li><a href="#">Theater</a></li>
                  <li><a href="#">Festivals</a></li>
                </ul>
              </div>
              <div className="et-footer-col">
                <h4>Support</h4>
                <ul>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Refund Policy</a></li>
                  <li><a href="#">Ticket Transfer</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              <div className="et-footer-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Sell Tickets</a></li>
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="et-footer-bottom">
            <div>&copy; {new Date().getFullYear()} {platformName}. Powered by TicketStream Technology.</div>
            <div className="et-footer-social">
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
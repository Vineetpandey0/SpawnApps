'use client'

import React, { useState } from 'react';
import { Clock, Users, Star, CheckCircle, ChevronRight, UserCircle2, Calendar as CalendarIcon } from 'lucide-react';

interface Service {
  name: string;
  duration: string;
  price: string | { amount?: string; value?: string; formatted?: string };
}

interface Provider {
  name: string;
  role: string;
  rating: string;
}

interface BookingData {
  serviceName?: string;
  platformName?: string;
  name?: string;
  title?: string;
  description?: string;
  subtitle?: string;
  about?: string;
  services?: Service[];
  treatments?: Service[];
  packages?: Service[];
  providers?: Provider[];
  professionals?: Provider[];
  staff?: Provider[];
  team?: Provider[];
  availableSlots?: string[];
  timeSlots?: string[];
  slots?: string[];
}

const sampleData: BookingData = {
  serviceName: "Lumière Wellness",
  description: "Indulge in our curated selection of luxury treatments. Each session is crafted to restore balance and elevate your well-being.",
  services: [
    { name: "Signature Facial", duration: "75 min", price: "$185" },
    { name: "Deep Tissue Massage", duration: "60 min", price: "$145" },
    { name: "Aromatherapy Ritual", duration: "90 min", price: "$220" },
    { name: "Hot Stone Therapy", duration: "60 min", price: "$165" }
  ],
  providers: [
    { name: "Isabelle Morel", role: "Senior Aesthetician", rating: "4.97" },
    { name: "Kenji Tanaka", role: "Lead Therapist", rating: "4.95" },
    { name: "Sofia Reyes", role: "Wellness Expert", rating: "4.98" },
    { name: "Marcus Bell", role: "Body Specialist", rating: "4.94" }
  ],
  availableSlots: ["9:00 AM", "9:45 AM", "10:30 AM", "11:15 AM", "1:00 PM", "1:45 PM", "2:30 PM", "3:15 PM", "4:00 PM", "4:45 PM"]
};

export default function BookingSystem({ data }: { data?: BookingData }) {
  const safeData = data || sampleData;
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const serviceName = safeData.serviceName || safeData.platformName || safeData.name || safeData.title || sampleData.serviceName;
  const description = safeData.description || safeData.subtitle || safeData.about || sampleData.description;
  const providers = safeData.providers || safeData.professionals || safeData.staff || safeData.team || sampleData.providers || [];
  const availableSlots = safeData.availableSlots || safeData.timeSlots || safeData.slots || sampleData.availableSlots || [];
  const services = safeData.services || safeData.treatments || safeData.packages || sampleData.services || [];

  const days = [
    { label: 'MON', num: 5 }, { label: 'TUE', num: 6 },
    { label: 'WED', num: 7 }, { label: 'THU', num: 8 }, { label: 'FRI', num: 9 }
  ];

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false); setSelectedService(null);
      setSelectedProvider(null); setSelectedDate(null); setSelectedTime(null);
    }, 4000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600;700&display=swap');
        
        .bk-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .bk-root {
          min-height: 100vh;
          background: #F9F5F1;
          font-family: 'Jost', sans-serif;
          color: #2C2420;
        }
        .bk-root, .bk-root * { font-family: 'Jost', sans-serif; }
        .bk-serif { font-family: 'Cormorant Garamond', serif !important; }

        /* Top bar */
        .bk-topbar {
          background: #2C2420;
          color: #C4A882;
          text-align: center;
          padding: 10px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* Nav */
        .bk-nav {
          background: #F9F5F1;
          padding: 24px 48px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid #EAE0D5;
        }
        .bk-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 300;
          letter-spacing: 0.15em;
          color: #2C2420;
        }
        .bk-logo span { color: #C4A882; }
        .bk-nav-links { display: flex; gap: 32px; }
        .bk-nav-link {
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: #8A7060; cursor: pointer; text-decoration: none;
          transition: color 0.2s;
        }
        .bk-nav-link:hover { color: #2C2420; }

        /* Hero */
        .bk-hero {
          text-align: center;
          padding: 80px 48px 64px;
          position: relative;
        }
        .bk-hero::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 1px; height: 40px; background: #C4A882;
        }
        .bk-hero-eyebrow {
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #C4A882; font-weight: 600; margin-bottom: 20px;
        }
        .bk-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px; font-weight: 300; line-height: 1.1;
          letter-spacing: -0.01em; margin-bottom: 20px; color: #2C2420;
        }
        .bk-hero-title em { font-style: italic; color: #C4A882; }
        .bk-hero-desc {
          font-size: 15px; color: #8A7060; max-width: 480px;
          margin: 0 auto; line-height: 1.7; font-weight: 300;
        }

        /* Container */
        .bk-container {
          max-width: 1100px; margin: 0 auto;
          padding: 0 48px 80px;
        }
        .bk-card {
          background: #FFF;
          border: 1px solid #EAE0D5;
          display: flex;
        }

        /* Sidebar */
        .bk-sidebar {
          width: 300px; flex-shrink: 0;
          background: #2C2420;
          padding: 40px 36px;
          color: #F9F5F1;
        }
        .bk-sidebar-title {
          font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
          color: #C4A882; font-weight: 600; margin-bottom: 40px;
        }
        .bk-step { margin-bottom: 32px; display: flex; gap: 16px; }
        .bk-step-num {
          width: 32px; height: 32px; border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 600; flex-shrink: 0;
          transition: all 0.3s;
        }
        .bk-step-num.done { background: #C4A882; border-color: #C4A882; color: #2C2420; }
        .bk-step-num.active { border-color: #C4A882; color: #C4A882; }
        .bk-step-num.inactive { border-color: #4A3830; color: #4A3830; }
        .bk-step-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #C4A882; margin-bottom: 4px; font-weight: 600; }
        .bk-step-value { font-size: 14px; color: #D4C4B4; font-weight: 300; }
        .bk-step-value.selected { color: #F9F5F1; font-weight: 500; }

        .bk-sidebar-divider { border: none; border-top: 1px solid #3D2E26; margin: 8px 0 32px; }
        .bk-total-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px; }
        .bk-total-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A7060; }
        .bk-total-amount { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; color: #F9F5F1; }
        .bk-confirm-btn {
          width: 100%; padding: 16px;
          background: #C4A882; color: #2C2420;
          border: none; cursor: pointer;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          transition: background 0.2s;
        }
        .bk-confirm-btn:hover { background: #D4B892; }

        /* Main area */
        .bk-main { flex: 1; padding: 40px 48px; min-height: 500px; }
        .bk-step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 400; margin-bottom: 32px;
          letter-spacing: -0.01em;
        }
        .bk-back-btn {
          background: none; border: none; cursor: pointer;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #8A7060; font-weight: 600;
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 28px; padding: 0;
          transition: color 0.2s;
        }
        .bk-back-btn:hover { color: #2C2420; }

        /* Service list */
        .bk-service-list { display: flex; flex-direction: column; gap: 2px; }
        .bk-service-item {
          padding: 20px 24px; border: 1px solid transparent;
          background: #F9F5F1; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          transition: all 0.2s;
        }
        .bk-service-item:hover { border-color: #C4A882; background: #FFF; }
        .bk-service-name { font-size: 16px; font-weight: 500; margin-bottom: 4px; }
        .bk-service-duration { font-size: 12px; color: #8A7060; display: flex; align-items: center; gap: 6px; }
        .bk-service-price { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: #2C2420; }
        .bk-chevron { color: #C4A882; flex-shrink: 0; margin-left: 16px; }

        /* Provider grid */
        .bk-provider-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .bk-provider-card {
          padding: 28px 20px; border: 1px solid #EAE0D5;
          background: #F9F5F1; cursor: pointer;
          text-align: center; transition: all 0.2s;
        }
        .bk-provider-card:hover { border-color: #C4A882; background: #FFF; }
        .bk-provider-avatar {
          width: 64px; height: 64px; border-radius: 50%;
          background: #EAE0D5; margin: 0 auto 12px;
          display: flex; align-items: center; justify-content: center;
          color: #8A7060;
        }
        .bk-provider-name { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
        .bk-provider-role { font-size: 12px; color: #8A7060; margin-bottom: 8px; }
        .bk-provider-rating { display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 13px; font-weight: 600; color: #C4A882; }

        /* Date/Time */
        .bk-date-row { display: flex; gap: 8px; margin-bottom: 36px; overflow-x: auto; }
        .bk-date-btn {
          flex-shrink: 0; width: 64px; padding: 12px 8px;
          border: 1px solid #EAE0D5; background: #F9F5F1;
          cursor: pointer; text-align: center; transition: all 0.2s;
        }
        .bk-date-btn:hover { border-color: #C4A882; }
        .bk-date-btn.selected { border-color: #C4A882; background: #2C2420; }
        .bk-date-btn.selected .bk-date-day { color: #C4A882; }
        .bk-date-btn.selected .bk-date-num { color: #F9F5F1; }
        .bk-date-day { font-size: 10px; letter-spacing: 0.12em; color: #8A7060; font-weight: 600; }
        .bk-date-num { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 400; color: #2C2420; margin-top: 4px; }

        .bk-time-section-label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8A7060; font-weight: 600; margin-bottom: 16px; }
        .bk-time-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .bk-time-btn {
          padding: 12px 8px; border: 1px solid #EAE0D5;
          background: #F9F5F1; cursor: pointer;
          font-size: 13px; font-weight: 500;
          text-align: center; transition: all 0.2s;
          color: #2C2420;
        }
        .bk-time-btn:hover { border-color: #C4A882; background: #FFF; }
        .bk-time-btn.selected { background: #2C2420; color: #C4A882; border-color: #2C2420; }

        /* Success */
        .bk-success {
          text-align: center; padding: 80px 48px;
          background: #FFF; border: 1px solid #EAE0D5;
        }
        .bk-success-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: #F0EBE3; color: #C4A882;
          margin: 0 auto 32px;
          display: flex; align-items: center; justify-content: center;
        }
        .bk-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px; font-weight: 300; margin-bottom: 16px;
        }
        .bk-success-desc { font-size: 15px; color: #8A7060; max-width: 360px; margin: 0 auto; line-height: 1.7; font-weight: 300; }

        .bk-opacity-40 { opacity: 0.4; pointer-events: none; }

        /* Footer */
        .bk-footer {
          background: #2C2420; color: #EAE0D5;
          padding: 80px 48px 40px;
          margin-top: 60px;
        }
        .bk-footer-top {
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 64px;
          margin-bottom: 60px;
        }
        .bk-footer-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 300;
          letter-spacing: 0.1em; color: #FFF; margin-bottom: 16px;
        }
        .bk-footer-brand span { color: #C4A882; }
        .bk-footer-desc {
          font-size: 14px; font-weight: 300; line-height: 1.6; color: #C4A882;
          max-width: 300px;
        }
        .bk-footer-links {
          display: flex; gap: 80px; flex-wrap: wrap;
        }
        .bk-footer-col h4 {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #FFF; font-weight: 600; margin-bottom: 24px;
        }
        .bk-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
        .bk-footer-col a {
          font-size: 13px; color: #C4A882; text-decoration: none; font-weight: 300;
          transition: color 0.2s;
        }
        .bk-footer-col a:hover { color: #FFF; }
        .bk-footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 32px; border-top: 1px solid rgba(196, 168, 130, 0.2);
          font-size: 12px; color: rgba(196, 168, 130, 0.6); font-weight: 300;
          flex-wrap: wrap; gap: 16px;
        }
        .bk-footer-social { display: flex; gap: 24px; }
        .bk-footer-social a { color: #C4A882; transition: color 0.2s; text-decoration: none; }
        .bk-footer-social a:hover { color: #FFF; }

        /* Responsive */
        @media (max-width: 1024px) {
          .bk-card { flex-direction: column; }
          .bk-sidebar { width: 100%; border-bottom: 1px solid #EAE0D5; display: flex; flex-wrap: wrap; gap: 24px; padding: 32px 24px; }
          .bk-sidebar-title { width: 100%; margin-bottom: 24px; }
          .bk-step { margin-bottom: 0; }
          .bk-sidebar-divider { display: none; }
          .bk-total-row { width: 100%; margin-top: 16px; margin-bottom: 16px; border-top: 1px solid #3D2E26; padding-top: 16px; }
          .bk-confirm-btn { width: 100%; }
        }

        @media (max-width: 768px) {
          .bk-nav { padding: 16px 24px; flex-direction: column; gap: 16px; text-align: center; }
          .bk-nav-links { display: none; }
          .bk-hero { padding: 60px 24px 40px; }
          .bk-hero-title { font-size: 40px; }
          .bk-container { padding: 0 16px 60px; }
          .bk-main { padding: 32px 20px; }
          .bk-provider-grid { grid-template-columns: 1fr; }
          .bk-time-grid { grid-template-columns: repeat(2, 1fr); }
          .bk-footer-top { gap: 40px; }
          .bk-footer-links { gap: 40px; }
        }
      `}</style>

      <div className="bk-root">
        <div className="bk-topbar">Complimentary consultation with every first appointment</div>
        <nav className="bk-nav">
          <div className="bk-logo">Lumière<span>.</span></div>
          <div className="bk-nav-links">
            {['Treatments', 'Practitioners', 'Membership', 'About', 'Contact'].map(l => (
              <span key={l} className="bk-nav-link">{l}</span>
            ))}
          </div>
          <button style={{fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',fontWeight:600,background:'none',border:'1px solid #2C2420',padding:'10px 24px',cursor:'pointer',transition:'all 0.2s'}}>
            Gift Card
          </button>
        </nav>

        <div className="bk-hero">
          <div className="bk-hero-eyebrow">Reserve Your Experience</div>
          <h1 className="bk-hero-title bk-serif">Book Your <em>Session</em></h1>
          <p className="bk-hero-desc">{description || safeData.description}</p>
        </div>

        <div className="bk-container">
          {isBooked ? (
            <div className="bk-success">
              <div className="bk-success-icon"><CheckCircle size={36} /></div>
              <h2 className="bk-success-title bk-serif">You're All Set</h2>
              <p className="bk-success-desc">
                Your {selectedService?.name} session with {selectedProvider?.name} has been confirmed for {selectedTime}. 
                A confirmation has been sent to your email.
              </p>
            </div>
          ) : (
            <div className="bk-card">
              {/* Sidebar */}
              <div className="bk-sidebar">
                <div className="bk-sidebar-title">Your Appointment</div>
                
                <div className="bk-step">
                  <div className={`bk-step-num ${selectedService ? 'done' : 'active'}`}>01</div>
                  <div>
                    <div className="bk-step-label">Service</div>
                    <div className={`bk-step-value ${selectedService ? 'selected' : ''}`}>
                      {selectedService ? selectedService.name : 'Choose a treatment'}
                    </div>
                  </div>
                </div>
                
                <div className="bk-step">
                  <div className={`bk-step-num ${selectedProvider ? 'done' : selectedService ? 'active' : 'inactive'}`}>02</div>
                  <div>
                    <div className="bk-step-label">Practitioner</div>
                    <div className={`bk-step-value ${selectedProvider ? 'selected' : ''}`}>
                      {selectedProvider ? selectedProvider.name : 'Select your expert'}
                    </div>
                  </div>
                </div>
                
                <div className="bk-step">
                  <div className={`bk-step-num ${selectedTime ? 'done' : selectedProvider ? 'active' : 'inactive'}`}>03</div>
                  <div>
                    <div className="bk-step-label">Date & Time</div>
                    <div className={`bk-step-value ${selectedTime ? 'selected' : ''}`}>
                      {selectedTime ? selectedTime : 'Pick a slot'}
                    </div>
                  </div>
                </div>

                {selectedTime && (
                  <>
                    <hr className="bk-sidebar-divider" />
                    <div className="bk-total-row">
                      <span className="bk-total-label">Total</span>
                      <span className="bk-total-amount bk-serif">{typeof selectedService?.price === 'object' ? ((selectedService?.price as any).amount || (selectedService?.price as any).value || (selectedService?.price as any).formatted || JSON.stringify(selectedService?.price)) : selectedService?.price}</span>
                    </div>
                    <button className="bk-confirm-btn" onClick={handleBook}>Confirm Booking</button>
                  </>
                )}
              </div>

              {/* Main */}
              <div className="bk-main">
                {!selectedService && (
                  <div>
                    <h2 className="bk-step-title bk-serif">Select a Treatment</h2>
                    <div className="bk-service-list">
                      {services?.map((s, i) => (
                        <button key={i} className="bk-service-item" onClick={() => setSelectedService(s)}>
                          <div>
                            <div className="bk-service-name">{s.name}</div>
                            <div className="bk-service-duration"><Clock size={13} /> {s.duration}</div>
                          </div>
                          <div style={{display:'flex',alignItems:'center'}}>
                            <span className="bk-service-price bk-serif">{typeof s.price === 'object' ? ((s.price as any).amount || (s.price as any).value || (s.price as any).formatted || JSON.stringify(s.price)) : s.price}</span>
                            <ChevronRight size={18} className="bk-chevron" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedService && !selectedProvider && (
                  <div>
                    <button className="bk-back-btn" onClick={() => setSelectedService(null)}>
                      <ChevronRight size={12} style={{transform:'rotate(180deg)'}} /> Back
                    </button>
                    <h2 className="bk-step-title bk-serif">Choose Your Practitioner</h2>
                    <div className="bk-provider-grid">
                      {providers?.map((p, i) => (
                        <button key={i} className="bk-provider-card" onClick={() => setSelectedProvider(p)}>
                          <div className="bk-provider-avatar"><UserCircle2 size={32} /></div>
                          <div className="bk-provider-name">{p.name}</div>
                          <div className="bk-provider-role">{p.role}</div>
                          <div className="bk-provider-rating">
                            <Star size={13} fill="#C4A882" />
                            {p.rating}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedService && selectedProvider && (
                  <div>
                    <button className="bk-back-btn" onClick={() => setSelectedProvider(null)}>
                      <ChevronRight size={12} style={{transform:'rotate(180deg)'}} /> Back
                    </button>
                    <h2 className="bk-step-title bk-serif">Select Date & Time</h2>
                    
                    <div style={{marginBottom:24}}>
                      <div className="bk-time-section-label">Available Days</div>
                      <div className="bk-date-row">
                        {days.map(d => (
                          <button
                            key={d.num}
                            className={`bk-date-btn ${selectedDate === d.num ? 'selected' : ''}`}
                            onClick={() => setSelectedDate(d.num)}
                          >
                            <div className="bk-date-day">{d.label}</div>
                            <div className="bk-date-num bk-serif">{d.num}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={!selectedDate ? 'bk-opacity-40' : ''}>
                      <div className="bk-time-section-label">Available Times</div>
                      <div className="bk-time-grid">
                        {availableSlots?.map((slot, i) => (
                          <button
                            key={i}
                            className={`bk-time-btn ${selectedTime === slot ? 'selected' : ''}`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="bk-footer">
          <div className="bk-footer-top">
            <div>
              <div className="bk-footer-brand">{serviceName}<span>.</span></div>
              <p className="bk-footer-desc">Elevating your well-being through curated, luxury experiences and world-class professionals.</p>
            </div>
            <div className="bk-footer-links">
              <div className="bk-footer-col">
                <h4>Services</h4>
                <ul>
                  <li><a href="#">Spa & Wellness</a></li>
                  <li><a href="#">Aesthetics</a></li>
                  <li><a href="#">Holistic Healing</a></li>
                  <li><a href="#">Consultations</a></li>
                </ul>
              </div>
              <div className="bk-footer-col">
                <h4>Information</h4>
                <ul>
                  <li><a href="#">About {serviceName}</a></li>
                  <li><a href="#">Our Team</a></li>
                  <li><a href="#">Location & Hours</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              </div>
              <div className="bk-footer-col">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Cancellation Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bk-footer-bottom">
            <div>&copy; {new Date().getFullYear()} {serviceName}. All rights reserved.</div>
            <div className="bk-footer-social">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
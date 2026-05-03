'use client'

import React, { useState } from 'react';
import { Search, MapPin, Award, DollarSign, Heart, X, ChevronRight } from 'lucide-react';

interface College {
  id: string;
  name: string;
  location: string;
  ranking: number | { national?: number; global?: number };
  acceptanceRate: string;
  tuition: string | { outOfState?: string; inState?: string };
  tags?: string[];
  description: string;
}

interface CollegeData {
  title?: string;
  heading?: string;
  platformName?: string;
  subtitle?: string;
  description?: string;
  tagline?: string;
  colleges?: College[];
  universities?: College[];
  schools?: College[];
  institutions?: College[];
}

const sampleData: CollegeData = {
  title: "Find Your Dream College",
  subtitle: "Discover the perfect university to launch your future",
  colleges: [
    { id: "c1", name: "Massachusetts Institute of Technology", location: "Cambridge, MA", ranking: 1, acceptanceRate: "4%", tuition: "$57,986/yr", tags: ["Engineering", "Computer Science", "Physics", "Mathematics"], description: "A world leader in science, technology, and innovation with unparalleled research facilities and faculty." },
    { id: "c2", name: "Stanford University", location: "Stanford, CA", ranking: 3, acceptanceRate: "4.7%", tuition: "$56,169/yr", tags: ["Business", "Engineering", "Law", "Medicine"], description: "Located in Silicon Valley, Stanford offers a unique intersection of entrepreneurship, research, and innovation." },
    { id: "c3", name: "Harvard University", location: "Cambridge, MA", ranking: 4, acceptanceRate: "3.2%", tuition: "$54,269/yr", tags: ["Law", "Business", "Medicine", "Humanities"], description: "The oldest university in the United States, offering world-class education across every discipline." },
    { id: "c4", name: "Carnegie Mellon University", location: "Pittsburgh, PA", ranking: 22, acceptanceRate: "11%", tuition: "$58,924/yr", tags: ["Computer Science", "Robotics", "Design", "Music"], description: "Renowned for its programs in computer science, engineering, and the arts with a collaborative culture." },
    { id: "c5", name: "University of California Berkeley", location: "Berkeley, CA", ranking: 8, acceptanceRate: "14%", tuition: "$44,066/yr", tags: ["Engineering", "Business", "Law", "Sciences"], description: "A top public research university known for academic excellence and pioneering research." },
    { id: "c6", name: "Princeton University", location: "Princeton, NJ", ranking: 2, acceptanceRate: "4%", tuition: "$55,240/yr", tags: ["Mathematics", "Physics", "Economics", "History"], description: "An Ivy League institution with exceptional programs in the humanities, sciences, and social sciences." }
  ]
};

export default function CollegeDiscovery({ data }: { data?: CollegeData }) {
  const safeData = data || sampleData;
  const [searchTerm, setSearchTerm] = useState("");
  const [savedColleges, setSavedColleges] = useState<Set<string>>(new Set());
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const title = safeData.title || safeData.heading || safeData.platformName || sampleData.title;
  const subtitle = safeData.subtitle || safeData.description || safeData.tagline || sampleData.subtitle;
  const colleges = safeData.colleges || safeData.universities || safeData.schools || safeData.institutions || sampleData.colleges || [];

  const filteredColleges = colleges?.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(savedColleges);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSavedColleges(next);
  };

  const tagColors = ['#1a3a5c', '#2d6a4f', '#6d3a7e', '#8b3a1a', '#1a5c5c', '#5c3a1a'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .cd-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .cd-root { font-family: 'Outfit', sans-serif; background: #F5F4F0; color: #1a1a2e; min-height: 100vh; }

        /* Header */
        .cd-header {
          background: #0D1B2A;
          padding: 0 64px;
          display: flex; align-items: center; justify-content: space-between;
          height: 68px; position: sticky; top: 0; z-index: 50;
        }
        .cd-logo {
          font-family: 'Libre Baskerville', serif;
          font-size: 20px; color: #F5F4F0;
          display: flex; align-items: center; gap: 10px;
        }
        .cd-logo-icon {
          width: 32px; height: 32px; background: #C9A84C;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .cd-header-links { display: flex; gap: 28px; }
        .cd-header-link {
          font-size: 13px; font-weight: 500; color: #9aabb8;
          cursor: pointer; text-decoration: none; transition: color 0.2s;
        }
        .cd-header-link:hover { color: #F5F4F0; }
        .cd-header-btn {
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: #C9A84C; color: #0D1B2A;
          border: none; padding: 10px 22px; cursor: pointer;
          transition: background 0.2s;
        }
        .cd-header-btn:hover { background: #D9B85C; }

        /* Hero */
        .cd-hero {
          background: #0D1B2A;
          padding: 80px 64px 120px;
          position: relative; overflow: hidden;
        }
        .cd-hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .cd-hero-lines {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 79px,
            rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px
          ),
          repeating-linear-gradient(
            90deg, transparent, transparent 79px,
            rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px
          );
        }
        .cd-hero-content { position: relative; max-width: 680px; }
        .cd-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #C9A84C; margin-bottom: 24px;
        }
        .cd-hero-eyebrow::before {
          content: ''; width: 40px; height: 1px; background: #C9A84C;
        }
        .cd-hero-title {
          font-family: 'Libre Baskerville', serif;
          font-size: 60px; font-weight: 700; line-height: 1.1;
          color: #F5F4F0; margin-bottom: 20px;
        }
        .cd-hero-title em { font-style: italic; color: #C9A84C; }
        .cd-hero-subtitle { font-size: 18px; color: #6B8BA4; margin-bottom: 48px; font-weight: 300; line-height: 1.6; }
        
        .cd-search-wrap {
          display: flex; gap: 0;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(201,168,76,0.3);
          max-width: 560px;
        }
        .cd-search-inner { position: relative; flex: 1; }
        .cd-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #6B8BA4; }
        .cd-search-input {
          width: 100%; padding: 18px 16px 18px 48px;
          background: transparent; border: none;
          font-size: 15px; color: #F5F4F0;
          font-family: 'Outfit', sans-serif;
          outline: none;
        }
        .cd-search-input::placeholder { color: #4A6274; }
        .cd-search-btn {
          padding: 18px 28px; background: #C9A84C; color: #0D1B2A;
          border: none; font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s; white-space: nowrap;
        }
        .cd-search-btn:hover { background: #D9B85C; }

        /* Stats bar */
        .cd-stats-bar {
          background: #C9A84C; padding: 20px 64px;
          display: flex; gap: 64px;
        }
        .cd-stat-item { display: flex; flex-direction: column; }
        .cd-stat-num {
          font-family: 'Libre Baskerville', serif;
          font-size: 28px; font-weight: 700; color: #0D1B2A;
        }
        .cd-stat-label { font-size: 11px; font-weight: 600; color: #5A4A1A; letter-spacing: 0.08em; margin-top: 2px; }

        /* Grid */
        .cd-main { max-width: 1280px; margin: 0 auto; padding: 64px; }
        .cd-main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .cd-main-title { font-family: 'Libre Baskerville', serif; font-size: 28px; font-weight: 700; }
        .cd-main-count { font-size: 14px; color: #666; font-weight: 400; }
        .cd-filter-row { display: flex; gap: 8px; }
        .cd-filter-btn {
          padding: 8px 18px; border: 1px solid #DDD;
          background: #FFF; font-size: 12px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
        }
        .cd-filter-btn:hover { border-color: #C9A84C; color: #0D1B2A; }

        .cd-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        
        .cd-card {
          background: #FFF; cursor: pointer;
          border: 1px solid #E8E4DC;
          transition: all 0.25s; position: relative;
          display: flex; flex-direction: column;
        }
        .cd-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(13,27,42,0.12); border-color: #C9A84C; }
        
        .cd-card-img {
          height: 160px; position: relative; overflow: hidden;
          background: #0D1B2A;
        }
        .cd-card-img-pattern {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 70%, rgba(201,168,76,0.25) 0%, transparent 60%);
        }
        .cd-card-rank {
          position: absolute; top: 16px; left: 16px;
          background: #C9A84C; color: #0D1B2A;
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.1em; padding: 5px 12px;
        }
        .cd-save-btn {
          position: absolute; top: 16px; right: 16px;
          width: 36px; height: 36px; background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; border-radius: 50%;
        }
        .cd-save-btn:hover { background: rgba(255,255,255,0.3); }
        
        .cd-card-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
        .cd-card-name {
          font-family: 'Libre Baskerville', serif;
          font-size: 18px; font-weight: 700; margin-bottom: 8px;
          line-height: 1.25; color: #0D1B2A;
          transition: color 0.2s;
        }
        .cd-card:hover .cd-card-name { color: #C9A84C; }
        .cd-card-loc { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #888; margin-bottom: 20px; }
        
        .cd-card-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .cd-card-stat { background: #F5F4F0; padding: 12px; }
        .cd-stat-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #999; margin-bottom: 4px; display: flex; align-items: center; gap: 4px; }
        .cd-stat-val { font-size: 15px; font-weight: 700; color: #0D1B2A; }
        
        .cd-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
        .cd-tag {
          font-size: 11px; font-weight: 600;
          padding: 4px 10px;
          background: transparent; letter-spacing: 0.05em;
        }

        /* Modal */
        .cd-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(13,27,42,0.8); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center; padding: 32px;
        }
        .cd-modal {
          background: #FFF; max-width: 800px; width: 100%;
          max-height: 90vh; overflow: hidden; display: flex; flex-direction: column;
          position: relative;
        }
        .cd-modal-hero {
          height: 200px; background: #0D1B2A; position: relative; flex-shrink: 0;
        }
        .cd-modal-hero-pattern {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.2) 0%, transparent 60%);
        }
        .cd-modal-close {
          position: absolute; top: 16px; right: 16px;
          width: 40px; height: 40px; background: rgba(0,0,0,0.4);
          border: none; cursor: pointer; color: #FFF;
          display: flex; align-items: center; justify-content: center; z-index: 10;
        }
        .cd-modal-hero-content { position: absolute; bottom: 24px; left: 32px; right: 32px; }
        .cd-modal-rank { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; background: #C9A84C; color: #0D1B2A; padding: 5px 12px; display: inline-block; margin-bottom: 12px; }
        .cd-modal-name { font-family: 'Libre Baskerville', serif; font-size: 32px; font-weight: 700; color: #FFF; margin-bottom: 8px; }
        .cd-modal-loc { font-size: 14px; color: #9aabb8; display: flex; align-items: center; gap: 6px; }
        
        .cd-modal-body { padding: 32px; overflow-y: auto; }
        .cd-modal-grid { display: grid; grid-template-columns: 1fr 280px; gap: 32px; margin-bottom: 28px; }
        .cd-modal-desc-title { font-family: 'Libre Baskerville', serif; font-size: 18px; font-weight: 700; margin-bottom: 12px; }
        .cd-modal-desc { font-size: 15px; color: #555; line-height: 1.7; font-weight: 300; }
        .cd-modal-stats-card { background: #F5F4F0; padding: 24px; height: fit-content; }
        .cd-modal-stats-title { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #999; margin-bottom: 20px; }
        .cd-modal-stat-row { margin-bottom: 16px; }
        .cd-modal-stat-label { font-size: 11px; color: #999; margin-bottom: 4px; }
        .cd-modal-stat-value { font-size: 16px; font-weight: 700; color: #0D1B2A; }
        
        .cd-modal-actions { display: flex; gap: 12px; padding-top: 24px; border-top: 1px solid #EEE; }
        .cd-modal-apply {
          flex: 1; padding: 16px;
          background: #0D1B2A; color: #F5F4F0;
          border: none; cursor: pointer;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s; font-family: 'Outfit', sans-serif;
        }
        .cd-modal-apply:hover { background: #1a3050; }
        .cd-modal-save {
          flex: 1; padding: 16px;
          background: transparent; color: #0D1B2A;
          border: 1px solid #DDD; cursor: pointer;
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s; font-family: 'Outfit', sans-serif;
        }
        .cd-modal-save:hover { border-color: #0D1B2A; }

        /* Footer */
        .cd-footer {
          background: #0D1B2A; color: #9aabb8;
          padding: 80px 64px 40px;
          margin-top: 80px;
        }
        .cd-footer-top {
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 64px;
          margin-bottom: 60px;
        }
        .cd-footer-brand {
          font-family: 'Libre Baskerville', serif;
          font-size: 24px; color: #F5F4F0; margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .cd-footer-brand-icon {
          width: 32px; height: 32px; background: #C9A84C;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; color: #0D1B2A;
        }
        .cd-footer-desc {
          font-size: 14px; font-weight: 300; line-height: 1.6;
          max-width: 300px;
        }
        .cd-footer-links {
          display: flex; gap: 80px; flex-wrap: wrap;
        }
        .cd-footer-col h4 {
          font-size: 12px; font-weight: 700; color: #F5F4F0;
          margin-bottom: 24px; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .cd-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .cd-footer-col a {
          font-size: 13px; color: #9aabb8; text-decoration: none; font-weight: 400;
          transition: color 0.2s;
        }
        .cd-footer-col a:hover { color: #C9A84C; }
        .cd-footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 12px; font-weight: 400;
          flex-wrap: wrap; gap: 16px;
        }
        .cd-footer-social { display: flex; gap: 24px; }
        .cd-footer-social a { color: #9aabb8; transition: color 0.2s; text-decoration: none; }
        .cd-footer-social a:hover { color: #C9A84C; }

        /* Responsive */
        @media (max-width: 1024px) {
          .cd-grid { grid-template-columns: repeat(2, 1fr); }
          .cd-stats-bar { padding: 20px 32px; gap: 32px; overflow-x: auto; }
          .cd-modal-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .cd-header { padding: 0 24px; }
          .cd-header-links { display: none; }
          .cd-hero { padding: 60px 24px 80px; }
          .cd-hero-title { font-size: 36px; }
          .cd-search-wrap { flex-direction: column; border: none; background: transparent; }
          .cd-search-inner { background: rgba(255,255,255,0.08); border: 1px solid rgba(201,168,76,0.3); }
          .cd-search-btn { width: 100%; border: 1px solid rgba(201,168,76,0.3); border-top: none; }
          .cd-main { padding: 40px 24px; }
          .cd-main-header { flex-direction: column; gap: 20px; align-items: flex-start; }
          .cd-grid { grid-template-columns: 1fr; }
          .cd-modal { max-height: 100vh; }
          .cd-footer { padding: 60px 24px 40px; }
          .cd-footer-top { gap: 40px; }
          .cd-footer-links { gap: 40px; }
        }
      `}</style>

      <div className="cd-root">
        <header className="cd-header">
          <div className="cd-logo">
            <div className="cd-logo-icon">🎓</div>
            CollegeCompass
          </div>
          <div className="cd-header-links">
            {['Discover', 'Rankings', 'Majors', 'Scholarships', 'Tools'].map(l => (
              <span key={l} className="cd-header-link">{l}</span>
            ))}
          </div>
          <button className="cd-header-btn">Sign Up Free</button>
        </header>

        <div className="cd-hero">
          <div className="cd-hero-bg"></div>
          <div className="cd-hero-lines"></div>
          <div className="cd-hero-content">
            <div className="cd-hero-eyebrow">College Discovery Platform</div>
            <h1 className="cd-hero-title">{title?.split(' ').slice(0,3).join(' ')}<br/><em>{title?.split(' ').slice(3).join(' ') || 'College'}</em></h1>
            <p className="cd-hero-subtitle">{subtitle}</p>
            <div className="cd-search-wrap">
              <div className="cd-search-inner">
                <Search size={18} className="cd-search-icon" />
                <input
                  className="cd-search-input"
                  placeholder="Search by name, location, or major..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="cd-search-btn">Search</button>
            </div>
          </div>
        </div>

        <div className="cd-stats-bar">
          {[['4,000+','Colleges Listed'], ['50M+','Scholarship Dollars'], ['2.1M','Students Helped'], ['98%','Match Accuracy']].map(([n,l]) => (
            <div key={l} className="cd-stat-item">
              <span className="cd-stat-num">{n}</span>
              <span className="cd-stat-label">{l}</span>
            </div>
          ))}
        </div>

        <div className="cd-main">
          <div className="cd-main-header">
            <div>
              <h2 className="cd-main-title">Top Universities <span className="cd-main-count">— {filteredColleges?.length} results</span></h2>
            </div>
            <div className="cd-filter-row">
              <button className="cd-filter-btn">By Rank</button>
              <button className="cd-filter-btn">Acceptance Rate</button>
              <button className="cd-filter-btn">Tuition</button>
            </div>
          </div>

          <div className="cd-grid">
            {filteredColleges?.map((college, ci) => (
              <div key={college.id} className="cd-card" onClick={() => setSelectedCollege(college)}>
                <div className="cd-card-img">
                  <div className="cd-card-img-pattern"></div>
                  <div className="cd-card-rank">#{typeof college.ranking === 'object' ? college.ranking.national || college.ranking.global : college.ranking} Ranked</div>
                  <button className="cd-save-btn" onClick={e => toggleSave(college.id, e)}>
                    <Heart size={15} fill={savedColleges.has(college.id) ? '#EF4444' : 'none'} color={savedColleges.has(college.id) ? '#EF4444' : '#FFF'} />
                  </button>
                </div>
                <div className="cd-card-body">
                  <h3 className="cd-card-name">{college.name}</h3>
                  <div className="cd-card-loc">
                    <MapPin size={13} />
                    {college.location}
                  </div>
                  <div className="cd-card-stats">
                    <div className="cd-card-stat">
                      <div className="cd-stat-lbl"><Award size={10} />Acceptance</div>
                      <div className="cd-stat-val">{college.acceptanceRate}</div>
                    </div>
                    <div className="cd-card-stat">
                      <div className="cd-stat-lbl"><DollarSign size={10} />Tuition</div>
                      <div className="cd-stat-val">{
                        typeof college.tuition === 'object' 
                          ? college.tuition.outOfState || college.tuition.inState 
                          : (typeof college.tuition === 'string' ? college.tuition.split('/')[0] : college.tuition)
                      }</div>
                    </div>
                  </div>
                  <div className="cd-tags">
                    {college.tags?.slice(0,3).map((tag, ti) => (
                      <span key={ti} className="cd-tag" style={{color: tagColors[ti % tagColors.length], border: `1px solid ${tagColors[ti % tagColors.length]}44`}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCollege && (
          <div className="cd-overlay" onClick={() => setSelectedCollege(null)}>
            <div className="cd-modal" onClick={e => e.stopPropagation()}>
              <div className="cd-modal-hero">
                <div className="cd-modal-hero-pattern"></div>
                <button className="cd-modal-close" onClick={() => setSelectedCollege(null)}><X size={20} /></button>
                <div className="cd-modal-hero-content">
                  <div className="cd-modal-rank">#{typeof selectedCollege.ranking === 'object' ? selectedCollege.ranking.national || selectedCollege.ranking.global : selectedCollege.ranking} National University</div>
                  <h2 className="cd-modal-name">{selectedCollege.name}</h2>
                  <div className="cd-modal-loc"><MapPin size={14} />{selectedCollege.location}</div>
                </div>
              </div>
              <div className="cd-modal-body">
                <div className="cd-modal-grid">
                  <div>
                    <h3 className="cd-modal-desc-title">About</h3>
                    <p className="cd-modal-desc">{selectedCollege.description}</p>
                  </div>
                  <div className="cd-modal-stats-card">
                    <div className="cd-modal-stats-title">Quick Stats</div>
                    {[['Acceptance Rate', selectedCollege.acceptanceRate], ['Annual Tuition', selectedCollege.tuition]].map(([l,v]) => (
                      <div key={l as string} className="cd-modal-stat-row">
                        <div className="cd-modal-stat-label">{l as string}</div>
                        <div className="cd-modal-stat-value">{
                          typeof v === 'object' 
                            ? (v.outOfState || v.inState || JSON.stringify(v)) 
                            : v
                        }</div>
                      </div>
                    ))}
                    <div className="cd-modal-stat-row">
                      <div className="cd-modal-stat-label">Top Programs</div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:6}}>
                        {selectedCollege.tags?.map((t,i) => (
                          <span key={i} style={{fontSize:11,fontWeight:600,background:'#F5F4F0',padding:'3px 8px',color:'#444'}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cd-modal-actions">
                  <button className="cd-modal-apply" onClick={() => { alert('Application started!'); setSelectedCollege(null); }}>
                    Apply Now <ChevronRight size={14} />
                  </button>
                  <button className="cd-modal-save" onClick={e => toggleSave(selectedCollege.id, e)}>
                    <Heart size={14} fill={savedColleges.has(selectedCollege.id) ? '#EF4444' : 'none'} color={savedColleges.has(selectedCollege.id) ? '#EF4444' : '#0D1B2A'} />
                    {savedColleges.has(selectedCollege.id) ? 'Saved' : 'Save College'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="cd-footer">
          <div className="cd-footer-top">
            <div>
              <div className="cd-footer-brand">
                <div className="cd-footer-brand-icon">🎓</div>
                {title?.split(' ').slice(0, 2).join(' ') || 'CollegeCompass'}
              </div>
              <p className="cd-footer-desc">Empowering students to find their perfect academic match through data-driven discovery.</p>
            </div>
            <div className="cd-footer-links">
              <div className="cd-footer-col">
                <h4>Platform</h4>
                <ul>
                  <li><a href="#">University Search</a></li>
                  <li><a href="#">Rankings & Data</a></li>
                  <li><a href="#">Scholarship Finder</a></li>
                  <li><a href="#">Admissions Calculator</a></li>
                </ul>
              </div>
              <div className="cd-footer-col">
                <h4>Resources</h4>
                <ul>
                  <li><a href="#">Student Blog</a></li>
                  <li><a href="#">Webinars</a></li>
                  <li><a href="#">Financial Aid Guide</a></li>
                  <li><a href="#">Counselor Portal</a></li>
                </ul>
              </div>
              <div className="cd-footer-col">
                <h4>Company</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Support</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="cd-footer-bottom">
            <div>&copy; {new Date().getFullYear()} {title?.split(' ')[0] || 'CollegeCompass'}. All rights reserved.</div>
            <div className="cd-footer-social">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
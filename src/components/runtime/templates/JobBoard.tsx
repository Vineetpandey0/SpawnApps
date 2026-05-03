"use client";

import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Search, ChevronDown, CheckCircle2, Bookmark, BookmarkCheck, X } from 'lucide-react';

interface Job {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  salary: string | { amount?: string; range?: string; value?: string };
  postedAt: string;
  tags?: string[];
  level: string;
}

interface JobData {
  title?: string;
  platformName?: string;
  heading?: string;
  jobs?: Job[];
  listings?: Job[];
  positions?: Job[];
}

const sampleData: JobData = {
  title: "Find Your Next Career Move",
  jobs: [
    { id: "j1", role: "Senior Frontend Engineer", company: "Vercel", location: "Remote", type: "Full-time", salary: "$160k–$200k", postedAt: "2h ago", tags: ["React", "Next.js", "TypeScript"], level: "Senior" },
    { id: "j2", role: "Product Designer", company: "Notion", location: "San Francisco, CA", type: "Full-time", salary: "$130k–$165k", postedAt: "5h ago", tags: ["Figma", "Product Design", "User Research"], level: "Mid" },
    { id: "j3", role: "Backend Engineer, Infra", company: "Stripe", location: "Remote", type: "Full-time", salary: "$180k–$230k", postedAt: "1d ago", tags: ["Go", "Kubernetes", "PostgreSQL"], level: "Senior" },
    { id: "j4", role: "AI/ML Engineer", company: "Anthropic", location: "San Francisco, CA", type: "Full-time", salary: "$200k–$280k", postedAt: "1d ago", tags: ["Python", "PyTorch", "LLMs"], level: "Senior" },
    { id: "j5", role: "Growth Marketer", company: "Linear", location: "Remote", type: "Full-time", salary: "$95k–$125k", postedAt: "2d ago", tags: ["SEO", "Content", "Analytics"], level: "Mid" },
    { id: "j6", role: "iOS Engineer", company: "Figma", location: "New York, NY", type: "Full-time", salary: "$140k–$180k", postedAt: "3d ago", tags: ["Swift", "SwiftUI", "Objective-C"], level: "Senior" },
  ]
};

const levelColors: Record<string, string> = { Senior: '#4F46E5', Mid: '#0891B2', Junior: '#059669' };

export default function JobBoard({ data }: { data?: JobData }) {
  const safeData = data || sampleData;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  const title:any = safeData.title || safeData.platformName || safeData.heading || sampleData.title;
  const jobs = safeData.jobs || safeData.listings || safeData.positions || sampleData.jobs || [];

  const filteredJobs = jobs.filter(j =>
    (j.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTypes.size === 0 || selectedTypes.has(j.type))
  );

  const toggleType = (t: string) => { const n = new Set(selectedTypes); n.has(t) ? n.delete(t) : n.add(t); setSelectedTypes(n); };
  const toggleSave = (id: string, e: React.MouseEvent) => { e.stopPropagation(); const n = new Set(savedJobs); n.has(id) ? n.delete(id) : n.add(id); setSavedJobs(n); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,700;0,900;1,300;1,700&display=swap');

        .jb-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .jb-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #F8F8FC; color: #0F0E17; min-height: 100vh; }

        /* Nav */
        .jb-nav {
          background: #FFF; border-bottom: 1px solid #EBEBF0;
          padding: 0 48px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          position: sticky; top: 0; z-index: 50;
        }
        .jb-logo { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: #0F0E17; display: flex; align-items: center; gap: 8px; }
        .jb-logo-dot { width: 8px; height: 8px; background: #4F46E5; border-radius: 50%; }
        .jb-nav-links { display: flex; gap: 28px; }
        .jb-nav-link { font-size: 13px; font-weight: 600; color: #6B7280; cursor: pointer; transition: color 0.2s; }
        .jb-nav-link:hover { color: #0F0E17; }
        .jb-nav-right { display: flex; gap: 12px; }
        .jb-nav-btn {
          padding: 9px 20px; font-size: 13px; font-weight: 700;
          border-radius: 8px; cursor: pointer; transition: all 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .jb-nav-btn.outline { background: transparent; border: 1px solid #E0E0E8; color: #555; }
        .jb-nav-btn.outline:hover { border-color: #4F46E5; color: #4F46E5; }
        .jb-nav-btn.filled { background: #4F46E5; border: 1px solid #4F46E5; color: #FFF; }
        .jb-nav-btn.filled:hover { background: #4338CA; }

        /* Hero */
        .jb-hero {
          background: #0F0E17;
          padding: 80px 48px; text-align: center;
          position: relative; overflow: hidden;
        }
        .jb-hero-orb1 { position: absolute; top: -80px; left: 10%; width: 400px; height: 400px; background: radial-gradient(circle,rgba(79,70,229,0.3) 0%,transparent 70%); pointer-events: none; }
        .jb-hero-orb2 { position: absolute; bottom: -100px; right: 10%; width: 400px; height: 400px; background: radial-gradient(circle,rgba(139,92,246,0.2) 0%,transparent 70%); pointer-events: none; }
        .jb-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(79,70,229,0.15); border: 1px solid rgba(79,70,229,0.3);
          border-radius: 100px; padding: 6px 16px; margin-bottom: 28px;
        }
        .jb-hero-badge-dot { width: 6px; height: 6px; background: #A5B4FC; border-radius: 50%; animation: pulse-jb 2s infinite; }
        @keyframes pulse-jb { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }
        .jb-hero-badge-text { font-size: 12px; font-weight: 600; color: #A5B4FC; letter-spacing: 0.05em; }
        .jb-hero-title {
          font-family: 'Fraunces', serif;
          font-size: 64px; font-weight: 900; line-height: 1.05;
          color: #FFF; margin-bottom: 20px; letter-spacing: -0.02em;
        }
        .jb-hero-title em { font-style: italic; color: #818CF8; }
        .jb-hero-desc { font-size: 17px; color: #6B7280; max-width: 560px; margin: 0 auto 48px; line-height: 1.65; font-weight: 300; }
        
        .jb-search-wrap {
          max-width: 680px; margin: 0 auto;
          display: flex; gap: 12px; align-items: stretch;
        }
        .jb-search-input-wrap {
          flex: 1; position: relative; background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;
          display: flex; align-items: center;
          transition: border-color 0.2s;
        }
        .jb-search-input-wrap:focus-within { border-color: rgba(99,102,241,0.6); background: rgba(255,255,255,0.1); }
        .jb-search-input {
          flex: 1; padding: 16px 16px 16px 48px;
          background: transparent; border: none; outline: none;
          font-size: 15px; color: #FFF; font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .jb-search-input::placeholder { color: #4B5563; }
        .jb-search-icon { position: absolute; left: 16px; color: #6B7280; }
        .jb-search-btn {
          padding: 16px 32px; background: #4F46E5;
          border: none; border-radius: 12px;
          font-size: 14px; font-weight: 700; color: #FFF; cursor: pointer;
          transition: background 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; white-space: nowrap;
        }
        .jb-search-btn:hover { background: #4338CA; }

        /* Stats */
        .jb-stats { background: #4F46E5; padding: 24px 48px; display: flex; gap: 0; justify-content: center; }
        .jb-stat { padding: 0 48px; text-align: center; border-right: 1px solid rgba(255,255,255,0.2); }
        .jb-stat:last-child { border-right: none; }
        .jb-stat-num { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: #FFF; }
        .jb-stat-label { font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 500; margin-top: 2px; letter-spacing: 0.05em; }

        /* Layout */
        .jb-layout { max-width: 1280px; margin: 0 auto; padding: 48px; display: flex; gap: 32px; }
        
        /* Sidebar */
        .jb-sidebar { width: 240px; flex-shrink: 0; }
        .jb-filter-card { background: #FFF; border: 1px solid #EBEBF0; border-radius: 16px; padding: 24px; margin-bottom: 16px; }
        .jb-filter-title { font-size: 12px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #9CA3AF; margin-bottom: 20px; }
        .jb-filter-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; cursor: pointer; }
        .jb-checkbox {
          width: 18px; height: 18px; border: 2px solid #E5E7EB; border-radius: 5px;
          background: #FFF; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .jb-checkbox.checked { background: #4F46E5; border-color: #4F46E5; }
        .jb-filter-label { font-size: 14px; color: #374151; font-weight: 500; }
        
        .jb-saved-card { background: linear-gradient(135deg,#4F46E5,#7C3AED); border-radius: 16px; padding: 24px; color: #FFF; }
        .jb-saved-title { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
        .jb-saved-desc { font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 16px; line-height: 1.5; }
        .jb-saved-btn { width: 100%; padding: 10px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: #FFF; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; border-radius: 8px; }
        .jb-saved-btn:hover { background: rgba(255,255,255,0.3); }

        /* Job list */
        .jb-list { flex: 1; }
        .jb-list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .jb-list-count { font-size: 14px; color: #6B7280; }
        .jb-sort-btn { font-size: 13px; font-weight: 600; color: #374151; background: #FFF; border: 1px solid #E5E7EB; padding: 8px 14px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-family: 'Plus Jakarta Sans', sans-serif; }

        .jb-job-list { display: flex; flex-direction: column; gap: 12px; }
        .jb-job-card {
          background: #FFF; border: 1px solid #EBEBF0;
          border-radius: 16px; padding: 24px; cursor: pointer;
          transition: all 0.2s; position: relative;
        }
        .jb-job-card:hover { border-color: #C7D2FE; box-shadow: 0 4px 20px rgba(79,70,229,0.08); }
        .jb-job-card.active { border-color: #4F46E5; box-shadow: 0 4px 20px rgba(79,70,229,0.12); }
        
        .jb-job-top { display: flex; gap: 16px; margin-bottom: 16px; }
        .jb-company-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: #EEF2FF; color: #4F46E5;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 18px; flex-shrink: 0;
        }
        .jb-job-title-wrap { flex: 1; }
        .jb-job-role { font-size: 16px; font-weight: 700; color: #0F0E17; margin-bottom: 4px; }
        .jb-job-company { font-size: 14px; color: #6B7280; }
        .jb-job-save { color: #C7D2FE; cursor: pointer; background: none; border: none; padding: 4px; transition: color 0.2s; }
        .jb-job-save:hover { color: #4F46E5; }
        .jb-job-save.saved { color: #4F46E5; }

        .jb-job-meta { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: #6B7280; margin-bottom: 16px; }
        .jb-job-meta-item { display: flex; align-items: center; gap: 6px; }
        .jb-level-badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; }
        
        .jb-job-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .jb-job-tag { padding: 5px 12px; background: #F3F4F6; color: #374151; font-size: 12px; font-weight: 600; border-radius: 8px; }
        
        .jb-job-bottom { display: flex; justify-content: space-between; align-items: center; }
        .jb-view-link { font-size: 13px; font-weight: 700; color: #4F46E5; }
        .jb-applied-badge { font-size: 12px; font-weight: 700; color: #059669; display: flex; align-items: center; gap: 6px; }

        /* Panel */
        .jb-panel-overlay { position: fixed; inset: 0; z-index: 100; display: flex; justify-content: flex-end; }
        .jb-panel-backdrop { position: absolute; inset: 0; background: rgba(15,14,23,0.3); }
        .jb-panel {
          position: relative; width: 520px; background: #FFF;
          height: 100%; overflow-y: auto; border-left: 1px solid #EBEBF0;
          box-shadow: -20px 0 60px rgba(15,14,23,0.1);
        }
        .jb-panel-close { position: absolute; top: 20px; right: 20px; background: #F3F4F6; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #6B7280; transition: all 0.2s; }
        .jb-panel-close:hover { background: #E5E7EB; color: #111; }
        .jb-panel-top { padding: 40px 40px 32px; border-bottom: 1px solid #F3F4F6; }
        .jb-panel-company-icon { width: 56px; height: 56px; border-radius: 14px; background: #EEF2FF; color: #4F46E5; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 22px; margin-bottom: 20px; }
        .jb-panel-role { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; margin-bottom: 8px; }
        .jb-panel-company { font-size: 16px; color: #6B7280; margin-bottom: 20px; }
        .jb-panel-badges { display: flex; gap: 10px; flex-wrap: wrap; }
        .jb-panel-badge { padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .jb-panel-badge.blue { background: #EEF2FF; color: #4F46E5; }
        .jb-panel-badge.green { background: #ECFDF5; color: #059669; }
        .jb-panel-body { padding: 32px 40px; }
        .jb-panel-section-title { font-size: 14px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #9CA3AF; margin-bottom: 16px; }
        .jb-panel-desc { font-size: 15px; color: #374151; line-height: 1.7; margin-bottom: 28px; font-weight: 300; }
        .jb-panel-req-list { list-style: none; margin-bottom: 32px; }
        .jb-panel-req-list li { padding: 8px 0; border-bottom: 1px solid #F3F4F6; font-size: 14px; color: #374151; display: flex; align-items: flex-start; gap: 10px; }
        .jb-panel-req-list li::before { content: '→'; color: #4F46E5; font-weight: 700; flex-shrink: 0; }
        .jb-panel-footer { padding: 24px 40px; border-top: 1px solid #F3F4F6; position: sticky; bottom: 0; background: linear-gradient(to top,#FFF 80%,transparent); }
        .jb-apply-btn {
          width: 100%; padding: 16px;
          background: #4F46E5; color: #FFF; border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .jb-apply-btn:hover:not(:disabled) { background: #4338CA; }
        .jb-apply-btn:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; }
        .jb-apply-btn:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; }
        .jb-apply-btn.success { background: #ECFDF5; color: #059669; }

        /* Footer */
        .jb-footer {
          background: #0F0E17; color: rgba(255,255,255,0.7);
          padding: 80px 48px 40px; margin-top: 80px;
        }
        .jb-footer-top {
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 64px;
          margin-bottom: 60px; max-width: 1280px; margin-left: auto; margin-right: auto;
        }
        .jb-footer-brand {
          font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: #FFF;
          margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
        }
        .jb-footer-brand-dot { width: 8px; height: 8px; background: #4F46E5; border-radius: 50%; }
        .jb-footer-desc {
          font-size: 14px; font-weight: 400; line-height: 1.6; max-width: 320px;
        }
        .jb-footer-links { display: flex; gap: 80px; flex-wrap: wrap; }
        .jb-footer-col h4 {
          font-size: 13px; font-weight: 700; color: #FFF; margin-bottom: 24px;
        }
        .jb-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .jb-footer-col a {
          font-size: 14px; color: rgba(255,255,255,0.7); text-decoration: none; font-weight: 500;
          transition: color 0.2s;
        }
        .jb-footer-col a:hover { color: #FFF; }
        .jb-footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 500;
          max-width: 1280px; margin: 0 auto; flex-wrap: wrap; gap: 16px;
        }
        .jb-footer-social { display: flex; gap: 24px; }
        .jb-footer-social a { color: rgba(255,255,255,0.7); transition: color 0.2s; text-decoration: none; }
        .jb-footer-social a:hover { color: #FFF; }

        /* Responsive */
        @media (max-width: 1024px) {
          .jb-layout { flex-direction: column; padding: 32px 24px; }
          .jb-sidebar { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .jb-filter-card { margin-bottom: 0; }
          .jb-saved-card { grid-column: span 2; }
          .jb-panel { width: 100%; }
        }

        @media (max-width: 768px) {
          .jb-nav { padding: 0 24px; }
          .jb-nav-links { display: none; }
          .jb-hero { padding: 60px 24px; }
          .jb-hero-title { font-size: 40px; }
          .jb-search-wrap { flex-direction: column; }
          .jb-search-btn { width: 100%; }
          .jb-stats { flex-wrap: wrap; padding: 24px; }
          .jb-stat { border-right: none; padding: 12px; min-width: 50%; }
          .jb-sidebar { grid-template-columns: 1fr; }
          .jb-saved-card { grid-column: auto; }
          .jb-panel-top, .jb-panel-body, .jb-panel-footer { padding: 24px; }
          .jb-footer { padding: 60px 24px 40px; }
          .jb-footer-top { gap: 40px; }
          .jb-footer-links { gap: 40px; }
        }
      `}</style>

      <div className="jb-root">
        <nav className="jb-nav">
          <div className="jb-logo">
            <div className="jb-logo-dot"></div>
            WorkSpace
          </div>
          <div className="jb-nav-links">
            {['Find Jobs', 'Companies', 'Salary Guide', 'Blog'].map(l => (
              <span key={l} className="jb-nav-link">{l}</span>
            ))}
          </div>
          <div className="jb-nav-right">
            <button className="jb-nav-btn outline">Post a Job</button>
            <button className="jb-nav-btn filled">Sign Up</button>
          </div>
        </nav>

        <div className="jb-hero">
          <div className="jb-hero-orb1"></div>
          <div className="jb-hero-orb2"></div>
          <div className="jb-hero-badge">
            <div className="jb-hero-badge-dot"></div>
            <span className="jb-hero-badge-text">2,400+ new jobs this week</span>
          </div>
          <h1 className="jb-hero-title">{title.includes('Career') ? <>Find Your<br/><em>Dream</em> Career</> : title}</h1>
          <p className="jb-hero-desc">Connect with top companies hiring right now. Remote, hybrid, or in-office roles across every industry.</p>
          <div className="jb-search-wrap">
            <div className="jb-search-input-wrap">
              <Search size={18} className="jb-search-icon" />
              <input className="jb-search-input" placeholder="Search by role, company, or skill..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button className="jb-search-btn">Search Jobs</button>
          </div>
        </div>

        <div className="jb-stats">
          {[['14,200+','Open Roles'],['8,500+','Companies'],['95%','Match Rate'],['48h','Avg Response']].map(([n,l]) => (
            <div key={l} className="jb-stat">
              <div className="jb-stat-num">{n}</div>
              <div className="jb-stat-label">{l}</div>
            </div>
          ))}
        </div>

        <div className="jb-layout">
          <aside className="jb-sidebar">
            <div className="jb-filter-card">
              <div className="jb-filter-title">Job Type</div>
              {['Full-time','Part-time','Contract','Freelance'].map(t => (
                <div key={t} className="jb-filter-item" onClick={() => toggleType(t)}>
                  <div className={`jb-checkbox ${selectedTypes.has(t) ? 'checked' : ''}`}>
                    {selectedTypes.has(t) && <span style={{color:'#FFF',fontSize:11,fontWeight:800}}>✓</span>}
                  </div>
                  <span className="jb-filter-label">{t}</span>
                </div>
              ))}
            </div>
            <div className="jb-filter-card">
              <div className="jb-filter-title">Work Mode</div>
              {['Remote','Hybrid','On-site'].map(t => (
                <div key={t} className="jb-filter-item">
                  <div className="jb-checkbox"></div>
                  <span className="jb-filter-label">{t}</span>
                </div>
              ))}
            </div>
            <div className="jb-saved-card">
              <div className="jb-saved-title">💼 Saved Jobs</div>
              <div className="jb-saved-desc">{savedJobs.size} job{savedJobs.size !== 1 ? 's' : ''} saved. Create an account to sync across devices.</div>
              <button className="jb-saved-btn">View Saved</button>
            </div>
          </aside>

          <div className="jb-list">
            <div className="jb-list-header">
              <span className="jb-list-count"><strong>{filteredJobs.length}</strong> jobs found</span>
              <button className="jb-sort-btn">Most Relevant <ChevronDown size={14} /></button>
            </div>
            <div className="jb-job-list">
              {filteredJobs.map(job => (
                <div key={job.id} className={`jb-job-card ${activeJob?.id === job.id ? 'active' : ''}`} onClick={() => setActiveJob(job)}>
                  <div className="jb-job-top">
                    <div className="jb-company-icon">{job.company?.charAt(0)}</div>
                    <div className="jb-job-title-wrap">
                      <div className="jb-job-role">{job.role}</div>
                      <div className="jb-job-company">{job.company}</div>
                    </div>
                    <button className={`jb-job-save ${savedJobs.has(job.id) ? 'saved' : ''}`} onClick={e => toggleSave(job.id, e)}>
                      {savedJobs.has(job.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                    </button>
                  </div>
                  <div className="jb-job-meta">
                    <span className="jb-job-meta-item"><MapPin size={13} />{job.location}</span>
                    <span className="jb-job-meta-item"><DollarSign size={13} />{typeof job.salary === 'object' ? ((job.salary as any).range || (job.salary as any).amount || (job.salary as any).value || JSON.stringify(job.salary)) : job.salary}</span>
                    <span className="jb-job-meta-item"><Clock size={13} />{job.postedAt}</span>
                    {job.level && <span className="jb-level-badge" style={{background:`${levelColors[job.level] || '#6B7280'}15`,color:levelColors[job.level] || '#6B7280'}}>{job.level}</span>}
                  </div>
                  <div className="jb-job-tags">
                    {job.tags?.slice(0,3).map((t,i) => <span key={i} className="jb-job-tag">{t}</span>)}
                  </div>
                  <div className="jb-job-bottom">
                    {appliedJobs.has(job.id) ? (
                      <span className="jb-applied-badge"><CheckCircle2 size={14} /> Applied</span>
                    ) : (
                      <span className="jb-view-link">View Details →</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {activeJob && (
          <div className="jb-panel-overlay">
            <div className="jb-panel-backdrop" onClick={() => setActiveJob(null)}></div>
            <div className="jb-panel">
              <button className="jb-panel-close" onClick={() => setActiveJob(null)}><X size={16} /></button>
              <div className="jb-panel-top">
                <div className="jb-panel-company-icon">{activeJob.company?.charAt(0)}</div>
                <h2 className="jb-panel-role">{activeJob.role}</h2>
                <div className="jb-panel-company">{activeJob.company} · {activeJob.location}</div>
                <div className="jb-panel-badges">
                  <span className="jb-panel-badge blue"><Briefcase size={14} />{activeJob.type}</span>
                  <span className="jb-panel-badge green"><DollarSign size={14} />{typeof activeJob.salary === 'object' ? ((activeJob.salary as any).range || (activeJob.salary as any).amount || (activeJob.salary as any).value || JSON.stringify(activeJob.salary)) : activeJob.salary}</span>
                </div>
              </div>
              <div className="jb-panel-body">
                <div className="jb-panel-section-title">About the Role</div>
                <p className="jb-panel-desc">We're looking for a talented {activeJob.role} to join {activeJob.company}'s growing team. You'll work on challenging problems, collaborate with world-class engineers, and ship products used by millions of people worldwide.</p>
                <div className="jb-panel-section-title">Requirements</div>
                <ul className="jb-panel-req-list">
                  {['3+ years of relevant experience', 'Strong problem-solving and communication skills', 'Experience with ' + (activeJob.tags?.[0] || 'modern tech stacks'), 'Collaborative mindset and attention to detail'].map((r,i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div className="jb-panel-footer">
                <button
                  className={`jb-apply-btn ${appliedJobs.has(activeJob.id) ? 'success' : ''}`}
                  disabled={appliedJobs.has(activeJob.id)}
                  onClick={() => { const n = new Set(appliedJobs); n.add(activeJob.id); setAppliedJobs(n); }}
                >
                  {appliedJobs.has(activeJob.id) ? '✓ Application Submitted' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="jb-footer">
          <div className="jb-footer-top">
            <div>
              <div className="jb-footer-brand">
                <div className="jb-footer-brand-dot"></div>
                {title.split(' ').slice(0, 2).join(' ') || 'WorkSpace'}
              </div>
              <p className="jb-footer-desc">Connecting top talent with the world's most innovative companies. Your next career move starts here.</p>
            </div>
            <div className="jb-footer-links">
              <div className="jb-footer-col">
                <h4>Candidates</h4>
                <ul>
                  <li><a href="#">Find Jobs</a></li>
                  <li><a href="#">Career Advice</a></li>
                  <li><a href="#">Salary Guide</a></li>
                  <li><a href="#">Resume Builder</a></li>
                </ul>
              </div>
              <div className="jb-footer-col">
                <h4>Employers</h4>
                <ul>
                  <li><a href="#">Post a Job</a></li>
                  <li><a href="#">Pricing</a></li>
                  <li><a href="#">Search Resumes</a></li>
                  <li><a href="#">Employer Brand</a></li>
                </ul>
              </div>
              <div className="jb-footer-col">
                <h4>WorkSpace</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="jb-footer-bottom">
            <div>&copy; {new Date().getFullYear()} {title.split(' ')[0] || 'WorkSpace'}. All rights reserved.</div>
            <div className="jb-footer-social">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Dribbble</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
'use client'

import React, { useState } from 'react';
import { BookOpen, Clock, ChevronRight, Share2, BookmarkPlus, ArrowLeft, Search, BookmarkCheck } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  date: string;
  readTimeMinutes?: number;
  publishDate?: string | Date;
}

interface BlogData {
  publicationName?: string;
  platformName?: string;
  featuredArticle?: Article;
  featuredPosts?: Article[];
  articles?: Article[];
}

const sampleData: BlogData = {
  publicationName: "The Daily Developer",
  featuredArticle: {
    id: "feat-1",
    title: "The Silent Revolution in Systems Programming",
    excerpt: "How Rust and Go are quietly reshaping the infrastructure powering the modern internet — and why you should care.",
    author: "Marina Okonkwo",
    category: "Systems",
    readTime: "8 min",
    date: "May 3, 2026"
  },
  articles: [
    { id: "a1", title: "Why WebAssembly Will Eat the Cloud", excerpt: "WASM's near-native performance and language-agnostic design are positioning it as the next universal compute platform.", author: "Dev Patel", category: "Cloud", readTime: "6 min", date: "May 2, 2026" },
    { id: "a2", title: "The Great Database Rethink of 2026", excerpt: "As workloads shift toward real-time analytics, a new generation of hybrid OLTP/OLAP systems is emerging.", author: "Sara Lindqvist", category: "Databases", readTime: "10 min", date: "May 1, 2026" },
    { id: "a3", title: "Edge Computing: The Promises vs. Reality", excerpt: "Latency improvements are real, but the operational complexity of edge deployments often catches teams off guard.", author: "James Thorn", category: "Infrastructure", readTime: "7 min", date: "Apr 30, 2026" },
    { id: "a4", title: "AI-Assisted Code Review: A Field Report", excerpt: "After six months of using LLM-powered review tools across three teams, here's what we actually learned.", author: "Keiko Tanaka", category: "AI/ML", readTime: "9 min", date: "Apr 29, 2026" },
    { id: "a5", title: "The State of TypeScript in 2026", excerpt: "Version 6's new type inference engine and the community debates it has sparked about the future of typed JS.", author: "Luca Ferrari", category: "JavaScript", readTime: "5 min", date: "Apr 28, 2026" },
    { id: "a6", title: "Monorepos: When the Cure Becomes the Disease", excerpt: "Tooling has improved enormously, but large monorepos still create organizational challenges that tools can't fix.", author: "Amira Hassan", category: "DevOps", readTime: "8 min", date: "Apr 27, 2026" }
  ]
};

export default function BlogPlatform({ data }: { data?: BlogData }) {
  const safeData = data || sampleData;
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());

  const pubName = safeData.publicationName || safeData.platformName || "The Daily Developer";
  
  // Robust mapping for older hallucinated JSON formats
  const mapArticle = (a: any): Article => {
    if (!a) return a;
    return {
      ...a,
      readTime: a.readTime || (a.readTimeMinutes ? `${a.readTimeMinutes} min` : "5 min"),
      date: a.date || (a.publishDate ? new Date(a.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Today"),
    };
  };

  const featuredArticle = mapArticle(safeData.featuredArticle || (safeData.featuredPosts && safeData.featuredPosts[0]) || sampleData.featuredArticle);
  const articlesList = safeData.articles || (safeData.featuredPosts && safeData.featuredPosts.slice(1)) || sampleData.articles || [];
  const articles = articlesList.map(mapArticle);

  const publicationName = pubName;

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(savedArticles);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedArticles(next);
  };

  const categoryColors = {
    Systems: '#c2410c', Cloud: '#0369a1', Databases: '#7c3aed', Infrastructure: '#047857',
    'AI/ML': '#b45309', JavaScript: '#0f766e', DevOps: '#be185d', default: '#374151'
  };

  const getCatColor = (cat: string) => (categoryColors as any)[cat] || categoryColors.default;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .blog-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .blog-root { font-family: 'Source Serif 4', Georgia, serif; background: #FEFCF8; color: #1a1a1a; min-height: 100vh; }
        
        .blog-header {
          border-bottom: 3px double #1a1a1a;
          padding: 0;
          position: sticky; top: 0; z-index: 100;
          background: #FEFCF8;
        }
        .blog-header-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 48px;
          border-bottom: 1px solid #e5e0d8;
        }
        .blog-header-nav {
          display: flex; align-items: center; gap: 32px;
          padding: 10px 48px;
        }
        .blog-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #555; text-decoration: none; cursor: pointer;
          transition: color 0.2s;
        }
        .blog-nav-link:hover { color: #1a1a1a; }
        .blog-pub-name {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 900;
          letter-spacing: -0.02em;
          color: #1a1a1a;
        }
        .blog-date {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: #888; font-weight: 500;
          letter-spacing: 0.05em;
        }
        .blog-header-actions { display: flex; gap: 16px; align-items: center; }
        .blog-icon-btn {
          background: none; border: none; cursor: pointer;
          color: #555; transition: color 0.2s; padding: 4px;
        }
        .blog-icon-btn:hover { color: #1a1a1a; }
        .blog-subscribe-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: #1a1a1a; color: #FEFCF8;
          border: none; padding: 8px 20px; cursor: pointer;
          transition: background 0.2s;
        }
        .blog-subscribe-btn:hover { background: #333; }

        .blog-main { max-width: 1200px; margin: 0 auto; padding: 60px 48px; }

        /* Featured Article */
        .blog-featured { 
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center;
          padding-bottom: 64px;
          border-bottom: 1px solid #e5e0d8;
          margin-bottom: 64px;
          cursor: pointer;
        }
        .blog-featured:hover .blog-featured-title { color: #c2410c; }
        .blog-featured-image {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #f5f0e8 0%, #e8ddd0 50%, #d4c4b0 100%);
          position: relative; overflow: hidden;
        }
        .blog-featured-image::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            -45deg, transparent, transparent 20px,
            rgba(0,0,0,0.02) 20px, rgba(0,0,0,0.02) 21px
          );
        }
        .blog-featured-label {
          position: absolute; top: 20px; left: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          background: #1a1a1a; color: #FEFCF8;
          padding: 6px 14px;
        }
        .blog-featured-image-number {
          position: absolute; bottom: 20px; right: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 80px; font-weight: 900; line-height: 1;
          color: rgba(0,0,0,0.06); pointer-events: none;
        }
        .blog-cat-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 4px 10px;
          margin-bottom: 16px;
          border: 1px solid;
        }
        .blog-featured-title {
          font-family: 'Playfair Display', serif;
          font-size: 44px; font-weight: 700; line-height: 1.1;
          letter-spacing: -0.02em; margin-bottom: 20px;
          transition: color 0.2s;
        }
        .blog-featured-excerpt {
          font-family: 'Source Serif 4', serif;
          font-size: 18px; line-height: 1.7; color: #555;
          margin-bottom: 28px; font-weight: 300;
        }
        .blog-author-row {
          display: flex; align-items: center; gap: 12px;
        }
        .blog-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: #e8ddd0; display: flex; align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700; font-size: 16px; color: #888;
          flex-shrink: 0;
        }
        .blog-author-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700; color: #1a1a1a;
        }
        .blog-author-meta {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: #888;
          display: flex; gap: 8px; align-items: center; margin-top: 2px;
        }
        .blog-dot { width: 3px; height: 3px; background: #bbb; border-radius: 50%; }

        /* Grid */
        .blog-grid-header {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 40px;
        }
        .blog-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 32px; font-weight: 700;
          letter-spacing: -0.02em;
        }
        .blog-view-all {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #888; text-decoration: none; cursor: pointer;
          display: flex; align-items: center; gap: 4px;
          transition: color 0.2s;
        }
        .blog-view-all:hover { color: #1a1a1a; }

        .blog-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 48px 40px;
        }
        .blog-card { cursor: pointer; display: flex; flex-direction: column; }
        .blog-card:hover .blog-card-title { color: #c2410c; }
        .blog-card-image {
          aspect-ratio: 4/3; background: #f0ebe0;
          margin-bottom: 20px; position: relative; overflow: hidden;
        }
        .blog-card-image-inner {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            90deg, transparent, transparent 40px,
            rgba(0,0,0,0.015) 40px, rgba(0,0,0,0.015) 41px
          );
        }
        .blog-card-num {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: 64px; font-weight: 900;
          color: rgba(0,0,0,0.05);
        }
        .blog-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; line-height: 1.25;
          letter-spacing: -0.01em; margin-bottom: 12px;
          transition: color 0.2s;
        }
        .blog-card-excerpt {
          font-family: 'Source Serif 4', serif;
          font-size: 15px; line-height: 1.65; color: #666;
          margin-bottom: 20px; flex: 1; font-weight: 300;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 16px; border-top: 1px solid #e5e0d8;
          margin-top: auto;
        }
        .blog-card-author {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: #888;
        }
        .blog-card-author strong { color: #1a1a1a; font-weight: 600; }
        .blog-save-btn {
          background: none; border: none; cursor: pointer;
          color: #bbb; transition: color 0.2s; padding: 4px;
        }
        .blog-save-btn:hover { color: #1a1a1a; }
        .blog-save-btn.saved { color: #1a1a1a; }

        /* Reading View */
        .blog-reading { max-width: 720px; margin: 0 auto; padding: 60px 48px; }
        .blog-back-btn {
          display: flex; align-items: center; gap: 8px;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #888; margin-bottom: 48px;
          transition: color 0.2s;
        }
        .blog-back-btn:hover { color: #1a1a1a; }
        .blog-article-cat {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          margin-bottom: 24px; display: block;
        }
        .blog-article-title {
          font-family: 'Playfair Display', serif;
          font-size: 56px; font-weight: 700; line-height: 1.05;
          letter-spacing: -0.03em; margin-bottom: 40px;
        }
        .blog-article-meta {
          display: flex; align-items: center; gap: 32px;
          padding: 24px 0; border-top: 1px solid #e5e0d8;
          border-bottom: 1px solid #e5e0d8; margin-bottom: 48px;
        }
        .blog-meta-divider { width: 1px; height: 40px; background: #e5e0d8; }
        .blog-article-actions { display: flex; gap: 8px; margin-left: auto; }
        .blog-action-btn {
          width: 36px; height: 36px; border: 1px solid #e5e0d8;
          background: none; cursor: pointer; color: #888;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .blog-action-btn:hover { border-color: #1a1a1a; color: #1a1a1a; }
        .blog-action-btn.active { background: #1a1a1a; color: #FEFCF8; border-color: #1a1a1a; }
        .blog-article-hero {
          width: 100%; aspect-ratio: 21/9;
          background: linear-gradient(135deg, #f5f0e8 0%, #e0d5c5 100%);
          margin-bottom: 48px; position: relative;
        }
        .blog-article-hero::after {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            -45deg, transparent, transparent 30px,
            rgba(0,0,0,0.015) 30px, rgba(0,0,0,0.015) 31px
          );
        }
        .blog-article-lede {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 400; font-style: italic;
          line-height: 1.5; color: #666;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #e5e0d8;
        }
        .blog-article-body p {
          font-family: 'Source Serif 4', serif;
          font-size: 19px; line-height: 1.8; color: #2a2a2a;
          margin-bottom: 28px; font-weight: 300;
        }
        .blog-article-body h2 {
          font-family: 'Playfair Display', serif;
          font-size: 30px; font-weight: 700;
          letter-spacing: -0.01em; margin: 48px 0 24px;
        }
        .blog-article-body blockquote {
          border-left: 3px solid #1a1a1a;
          padding-left: 28px; margin: 40px 0;
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-style: italic;
          line-height: 1.5; color: #444;
        }

        /* Pullquote ornament */
        .blog-ornament {
          text-align: center; margin: 40px 0; color: #ccc;
          font-size: 20px; letter-spacing: 0.3em;
        }

        /* Footer */
        .blog-footer {
          border-top: 3px double #1a1a1a;
          padding: 60px 48px;
          margin-top: 60px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: #FEFCF8;
          flex-wrap: wrap;
          gap: 48px;
        }
        .blog-footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 900;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 12px;
        }
        .blog-footer-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #666;
          max-width: 280px; line-height: 1.6;
        }
        .blog-footer-links {
          display: flex; gap: 64px; flex-wrap: wrap;
        }
        .blog-footer-col h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          margin-bottom: 20px; color: #1a1a1a;
        }
        .blog-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .blog-footer-col a {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #555; text-decoration: none;
          transition: color 0.2s;
        }
        .blog-footer-col a:hover { color: #1a1a1a; }
        .blog-footer-bottom {
          padding: 24px 48px;
          border-top: 1px solid #e5e0d8;
          display: flex; justify-content: space-between;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: #888;
          flex-wrap: wrap;
          gap: 16px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
          .blog-featured { gap: 32px; }
        }

        @media (max-width: 768px) {
          .blog-header-top { padding: 12px 24px; flex-direction: column; gap: 16px; text-align: center; }
          .blog-header-nav { display: none; }
          .blog-main { padding: 40px 24px; }
          .blog-featured { grid-template-columns: 1fr; gap: 40px; }
          .blog-featured-title { font-size: 32px; }
          .blog-grid { grid-template-columns: 1fr; gap: 40px; }
          .blog-article-title { font-size: 36px; }
          .blog-reading { padding: 40px 24px; }
          .blog-article-meta { flex-direction: column; align-items: flex-start; gap: 16px; }
          .blog-meta-divider { display: none; }
          .blog-article-actions { margin-left: 0; width: 100%; justify-content: space-between; border-top: 1px solid #e5e0d8; padding-top: 16px; }
          .blog-footer { padding: 40px 24px; }
          .blog-footer-bottom { padding: 24px; }
        }
      `}</style>

      <div className="blog-root">
        {/* Header */}
        <header className="blog-header">
          <div className="blog-header-top">
            <div className="blog-date">
              {activeArticle ? (
                <button className="blog-back-btn" style={{marginBottom:0}} onClick={() => setActiveArticle(null)}>
                  <ArrowLeft size={14} /> Back to {publicationName}
                </button>
              ) : (
                `${new Date().toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}`
              )}
            </div>
            <h1 className="blog-pub-name">{publicationName}</h1>
            <div className="blog-header-actions">
              <button className="blog-icon-btn"><Search size={16} /></button>
              <button className="blog-subscribe-btn">Subscribe</button>
            </div>
          </div>
          {!activeArticle && (
            <nav className="blog-header-nav">
              {['Technology', 'Science', 'Design', 'Business', 'Culture', 'Opinion'].map(n => (
                <span key={n} className="blog-nav-link">{n}</span>
              ))}
            </nav>
          )}
        </header>

        {!activeArticle ? (
          <main className="blog-main">
            {/* Featured */}
            {featuredArticle && (
              <div className="blog-featured" onClick={() => setActiveArticle(featuredArticle)}>
                <div className="blog-featured-image">
                  <div className="blog-featured-label">Featured Story</div>
                  <div className="blog-featured-image-number">01</div>
                </div>
                <div>
                  <span className="blog-cat-tag" style={{color: getCatColor(featuredArticle.category), borderColor: getCatColor(featuredArticle.category)}}>
                    {featuredArticle.category}
                  </span>
                  <h2 className="blog-featured-title">{featuredArticle.title}</h2>
                  <p className="blog-featured-excerpt">{featuredArticle.excerpt}</p>
                  <div className="blog-author-row">
                    <div className="blog-avatar">{featuredArticle.author?.charAt(0)}</div>
                    <div>
                      <div className="blog-author-name">{featuredArticle.author}</div>
                      <div className="blog-author-meta">
                        <span>{featuredArticle.date}</span>
                        <div className="blog-dot"></div>
                        <span style={{display:'flex',alignItems:'center',gap:4}}><Clock size={11} /> {featuredArticle.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="blog-grid-header">
              <h3 className="blog-section-title">Latest Stories</h3>
              <span className="blog-view-all">View all <ChevronRight size={12} /></span>
            </div>
            <div className="blog-grid">
              {articles.map((article: any, i: number) => (
                <article key={article.id || i} className="blog-card" onClick={() => setActiveArticle(article)}>
                  <div className="blog-card-image">
                    <div className="blog-card-image-inner"></div>
                    <div className="blog-card-num">0{i+1}</div>
                    <span className="blog-cat-tag" style={{
                      position:'absolute', bottom:16, left:16,
                      color: getCatColor(article.category),
                      borderColor: getCatColor(article.category),
                      background: '#FEFCF8', fontSize:'9px'
                    }}>{article.category}</span>
                  </div>
                  <h4 className="blog-card-title">{article.title}</h4>
                  <p className="blog-card-excerpt">{article.excerpt}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-author">
                      <strong>{article.author}</strong> · {article.date}
                    </div>
                    <button
                      className={`blog-save-btn ${savedArticles.has(article.id) ? 'saved' : ''}`}
                      onClick={(e) => toggleSave(article.id, e)}
                    >
                      {savedArticles.has(article.id) ? <BookmarkCheck size={17} /> : <BookmarkPlus size={17} />}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        ) : (
          <div className="blog-reading">
            <span className="blog-article-cat" style={{color: getCatColor(activeArticle.category)}}>
              {activeArticle.category}
            </span>
            <h1 className="blog-article-title">{activeArticle.title}</h1>
            <div className="blog-article-meta">
              <div className="blog-author-row">
                <div className="blog-avatar">{activeArticle.author?.charAt(0)}</div>
                <div>
                  <div className="blog-author-name">By {activeArticle.author}</div>
                  <div className="blog-author-meta">
                    <span>{activeArticle.date || 'Today'}</span>
                    <div className="blog-dot"></div>
                    <span style={{display:'flex',alignItems:'center',gap:4}}><Clock size={11} /> {activeArticle.readTime} read</span>
                  </div>
                </div>
              </div>
              <div className="blog-meta-divider"></div>
              <div className="blog-article-actions">
                <button
                  className={`blog-action-btn ${savedArticles.has(activeArticle.id) ? 'active' : ''}`}
                  onClick={(e) => toggleSave(activeArticle.id, e)}
                >
                  {savedArticles.has(activeArticle.id) ? <BookmarkCheck size={15} /> : <BookmarkPlus size={15} />}
                </button>
                <button className="blog-action-btn"><Share2 size={15} /></button>
              </div>
            </div>
            <div className="blog-article-hero"></div>
            <p className="blog-article-lede">{activeArticle.excerpt}</p>
            <div className="blog-article-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <h2>The Changing Landscape</h2>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <blockquote>"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."</blockquote>
              <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            </div>
            <div className="blog-ornament">✦ ✦ ✦</div>
          </div>
        )}

        {/* Footer */}
        <footer className="blog-footer">
          <div>
            <div className="blog-footer-brand">{publicationName}</div>
            <p className="blog-footer-desc">Curating the finest perspectives in technology, science, and culture for the modern developer.</p>
          </div>
          <div className="blog-footer-links">
            <div className="blog-footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#">Technology</a></li>
                <li><a href="#">Science</a></li>
                <li><a href="#">Design</a></li>
                <li><a href="#">Culture</a></li>
              </ul>
            </div>
            <div className="blog-footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Writers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="blog-footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </footer>
        <div className="blog-footer-bottom">
          <div>&copy; {new Date().getFullYear()} {publicationName}. All rights reserved.</div>
          <div style={{display: 'flex', gap: '24px'}}>
            <a href="#" style={{color: '#888', textDecoration: 'none', transition: 'color 0.2s'}} onMouseOver={e => e.currentTarget.style.color = '#1a1a1a'} onMouseOut={e => e.currentTarget.style.color = '#888'}>Twitter</a>
            <a href="#" style={{color: '#888', textDecoration: 'none', transition: 'color 0.2s'}} onMouseOver={e => e.currentTarget.style.color = '#1a1a1a'} onMouseOut={e => e.currentTarget.style.color = '#888'}>LinkedIn</a>
            <a href="#" style={{color: '#888', textDecoration: 'none', transition: 'color 0.2s'}} onMouseOver={e => e.currentTarget.style.color = '#1a1a1a'} onMouseOut={e => e.currentTarget.style.color = '#888'}>GitHub</a>
          </div>
        </div>
      </div>
    </>
  );
}
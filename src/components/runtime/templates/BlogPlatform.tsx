"use client";

import React, { useState } from 'react';
import { BookOpen, Clock, ChevronRight, Share2, BookmarkPlus, ArrowLeft, Search, BookmarkCheck } from 'lucide-react';

export default function BlogPlatform({ data }: { data: any }) {
  const [activeArticle, setActiveArticle] = useState<any | null>(null);
  const [savedArticles, setSavedArticles] = useState<Set<string>>(new Set());

  if (!data) return <div className="p-8">Loading articles...</div>;

  const { publicationName = "The Daily Developer", featuredArticle, articles = [] } = data;

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(savedArticles);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedArticles(next);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-serif">
      {/* Header */}
      <header className="border-b border-stone-200 py-6 px-4 md:px-8 flex justify-between items-center sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-md z-40">
        <div className="w-8">
          {activeArticle && (
            <button onClick={() => setActiveArticle(null)} className="p-2 -ml-2 text-stone-500 hover:text-stone-900 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-center uppercase flex-1">{publicationName}</h1>
        <div className="w-8 flex justify-end gap-4">
          <button className="text-stone-500 hover:text-stone-900"><Search className="w-5 h-5" /></button>
        </div>
      </header>

      {!activeArticle ? (
        <main className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          {/* Featured Article */}
          {featuredArticle && (
            <section className="mb-16 border-b border-stone-200 pb-16 group cursor-pointer" onClick={() => setActiveArticle(featuredArticle)}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-3/5 aspect-video bg-stone-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-stone-800/10 group-hover:bg-transparent transition-colors z-10"></div>
                  {/* Abstract placeholder */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-300 via-stone-200 to-stone-200"></div>
                  <div className="absolute top-4 left-4 z-20 bg-black text-white text-xs font-bold uppercase tracking-widest px-3 py-1">Featured</div>
                </div>
                
                <div className="w-full md:w-2/5 flex flex-col justify-center">
                  <span className="text-orange-600 font-bold text-sm tracking-widest uppercase mb-3 block">{featuredArticle.category}</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 leading-[1.1] group-hover:text-orange-600 transition-colors">{featuredArticle.title}</h2>
                  <p className="text-stone-500 text-lg leading-relaxed mb-6 font-sans">{featuredArticle.excerpt}</p>
                  
                  <div className="flex items-center gap-3 font-sans text-sm">
                    <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-500">{featuredArticle.author?.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-stone-900">{featuredArticle.author}</div>
                      <div className="flex items-center gap-2 text-stone-500">
                        <span>Today</span>
                        <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Latest Articles Grid */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-3xl font-black tracking-tight">Latest Stories</h3>
              <a href="#" className="font-sans font-bold text-sm text-stone-500 hover:text-stone-900 flex items-center">View all <ChevronRight className="w-4 h-4 ml-1" /></a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {articles.map((article: any, i: number) => (
                <article key={article.id || i} className="group cursor-pointer flex flex-col h-full" onClick={() => setActiveArticle(article)}>
                  <div className="w-full aspect-[4/3] bg-stone-100 mb-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-stone-800/5 group-hover:bg-transparent transition-colors z-10"></div>
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_20px,_#d6d3d1_20px,_#d6d3d1_40px)]"></div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-2xl font-bold mb-3 leading-tight group-hover:text-orange-600 transition-colors">{article.title}</h4>
                    <p className="text-stone-600 font-sans leading-relaxed mb-5 line-clamp-3 flex-1">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between font-sans text-sm mt-auto pt-4 border-t border-stone-200">
                      <div className="flex items-center gap-2 text-stone-500">
                        <span className="font-semibold text-stone-800">{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <button 
                        onClick={(e) => toggleSave(article.id, e)}
                        className="text-stone-400 hover:text-stone-900 transition-colors p-1"
                      >
                        {savedArticles.has(article.id) ? <BookmarkCheck className="w-5 h-5 text-stone-900" /> : <BookmarkPlus className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      ) : (
        /* Reading View */
        <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-bold font-sans tracking-widest uppercase mb-4 block">{activeArticle.category || 'Story'}</span>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1]">{activeArticle.title}</h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 font-sans border-y border-stone-200 py-6 text-stone-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-500 text-xl">{activeArticle.author?.charAt(0)}</div>
                <div className="text-left">
                  <div className="font-bold text-stone-900">Written by {activeArticle.author}</div>
                  <div>Published {activeArticle.date || 'Today'}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-200"></div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {activeArticle.readTime} read</div>
                <div className="flex items-center gap-3">
                  <button onClick={(e) => toggleSave(activeArticle.id, e)} className={`p-2 rounded-full border transition-colors ${savedArticles.has(activeArticle.id) ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 hover:border-stone-900 text-stone-700'}`}>
                    {savedArticles.has(activeArticle.id) ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                  </button>
                  <button className="p-2 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 transition-colors"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full aspect-[21/9] bg-stone-200 mb-12 relative">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-300 via-stone-200 to-stone-200"></div>
          </div>

          <div className="prose prose-stone prose-lg md:prose-xl max-w-none font-serif leading-relaxed text-stone-800">
            <p className="text-2xl md:text-3xl leading-relaxed text-stone-500 font-light mb-10">
              {activeArticle.excerpt}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>The Changing Landscape</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <blockquote>
              "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
            </blockquote>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>
        </article>
      )}
    </div>
  );
}

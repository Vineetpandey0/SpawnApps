"use client";

import React, { useState } from 'react';
import { Search, MapPin, GraduationCap, DollarSign, Award, Star, Heart, ExternalLink, ChevronRight, X } from 'lucide-react';

export default function CollegeDiscovery({ data }: { data: any }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedColleges, setSavedColleges] = useState<Set<string>>(new Set());
  const [selectedCollege, setSelectedCollege] = useState<any | null>(null);

  if (!data) return <div className="p-8 text-center animate-pulse">Loading colleges...</div>;

  const { title = "Find Your Dream College", subtitle = "Explore top universities", colleges = [] } = data;

  const filteredColleges = colleges.filter((c: any) => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(savedColleges);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedColleges(next);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Header */}
      <div className="bg-indigo-900 text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{title}</h1>
          <p className="text-lg md:text-2xl text-indigo-200 mb-10 max-w-3xl mx-auto">{subtitle}</p>
          
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 md:py-5 rounded-2xl border-0 ring-4 ring-indigo-500/30 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-indigo-400 text-lg shadow-2xl transition-all"
              placeholder="Search by name, location, or major..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <span className="text-slate-600 font-medium">Showing {filteredColleges.length} colleges</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">Sort by Rank</button>
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">Filters</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college: any) => (
            <div 
              key={college.id} 
              onClick={() => setSelectedCollege(college)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer group flex flex-col"
            >
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                {/* Fallback pattern since we don't have real images from Gemini */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-slate-200 to-slate-200"></div>
                
                <button 
                  onClick={(e) => toggleSave(college.id, e)}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                >
                  <Heart className={`w-5 h-5 ${savedColleges.has(college.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                </button>
                
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-900 text-xs font-bold rounded-lg shadow-sm">
                    #{college.ranking || 'N/A'} Ranked
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{college.name}</h3>
                
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
                  <span className="truncate">{college.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="flex items-center text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                      <Award className="w-3.5 h-3.5 mr-1" /> Acceptance
                    </span>
                    <span className="font-semibold text-slate-700">{college.acceptanceRate || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="flex items-center text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                      <DollarSign className="w-3.5 h-3.5 mr-1" /> Tuition
                    </span>
                    <span className="font-semibold text-slate-700">{college.tuition || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2 flex-wrap">
                  {college.tags?.slice(0, 3).map((tag: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No colleges found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCollege && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedCollege(null)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="h-48 sm:h-64 bg-indigo-900 relative shrink-0">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <button 
                onClick={() => setSelectedCollege(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-indigo-500/80 backdrop-blur-md text-white text-xs font-bold rounded-lg mb-3 shadow-sm">
                  #{selectedCollege.ranking} National University
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{selectedCollege.name}</h2>
                <div className="flex items-center text-indigo-100 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {selectedCollege.location}
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-8 mb-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">About</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedCollege.description || "A premier institution dedicated to excellence in teaching, research, and public service. Known for its rigorous academic programs and vibrant campus life."}
                  </p>
                </div>
                
                <div className="w-full sm:w-64 shrink-0 bg-slate-50 rounded-2xl p-6 border border-slate-100 h-fit">
                  <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-xs">Quick Stats</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Acceptance Rate</span>
                      <span className="font-semibold text-slate-900">{selectedCollege.acceptanceRate}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Annual Tuition</span>
                      <span className="font-semibold text-slate-900">{selectedCollege.tuition}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Top Programs</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCollege.tags?.slice(0, 4).map((t: string, i: number) => (
                          <span key={i} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                <button 
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                  onClick={() => {
                    alert("Application process started!");
                    setSelectedCollege(null);
                  }}
                >
                  Apply Now <ChevronRight className="w-5 h-5 ml-1" />
                </button>
                <button 
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-4 px-6 rounded-xl font-semibold transition-all shadow-sm flex items-center justify-center"
                  onClick={() => {
                    toggleSave(selectedCollege.id, { stopPropagation: () => {} } as any);
                  }}
                >
                  <Heart className={`w-5 h-5 mr-2 ${savedColleges.has(selectedCollege.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  {savedColleges.has(selectedCollege.id) ? 'Saved to List' : 'Save College'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

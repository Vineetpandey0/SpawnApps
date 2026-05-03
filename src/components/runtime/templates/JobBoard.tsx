"use client";

import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, ChevronDown, CheckCircle2, Bookmark, BookmarkCheck } from 'lucide-react';

export default function JobBoard({ data }: { data: any }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeJob, setActiveJob] = useState<any | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  if (!data) return <div className="p-8">Loading jobs...</div>;

  const { title = "Find Your Next Career Move", jobs = [] } = data;

  const filteredJobs = jobs.filter((j: any) => 
    j.role?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-indigo-700 text-white pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-indigo-700 to-indigo-900 opacity-80"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">Discover thousands of remote and local opportunities from top companies.</p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Job title, company, or keywords" 
                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 focus:ring-4 focus:ring-indigo-400/50 focus:outline-none shadow-lg transition-shadow"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-6">
              <Filter className="w-5 h-5" /> Filters
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Job Type</h3>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(t => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Location</h3>
              <div className="space-y-2">
                {['Remote', 'On-site', 'Hybrid'].map(t => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Job List */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-500 font-medium">{filteredJobs.length} jobs found</span>
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
              Most Relevant <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {filteredJobs.map((job: any) => (
            <div 
              key={job.id} 
              onClick={() => setActiveJob(job)}
              className={`bg-white p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer group ${activeJob?.id === job.id ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500' : 'border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0">
                    {job.company?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{job.role}</h3>
                    <span className="text-slate-500 text-sm">{job.company}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const next = new Set(savedJobs);
                    if (next.has(job.id)) next.delete(job.id);
                    else next.add(job.id);
                    setSavedJobs(next);
                  }}
                  className="text-slate-400 hover:text-indigo-500 transition-colors p-1"
                >
                  {savedJobs.has(job.id) ? <BookmarkCheck className="w-6 h-6 text-indigo-500" /> : <Bookmark className="w-6 h-6" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-5">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {job.location}</div>
                <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-slate-400" /> {job.type}</div>
                <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400" /> {job.salary}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {job.postedAt}</div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-wrap gap-2">
                  {job.tags?.slice(0, 3).map((t: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
                
                {appliedJobs.has(job.id) ? (
                  <span className="text-emerald-600 font-semibold text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Applied
                  </span>
                ) : (
                  <span className="text-indigo-600 font-semibold text-sm group-hover:underline underline-offset-4">
                    View Details
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500">
              No jobs match your search.
            </div>
          )}
        </div>
      </main>

      {/* Details Slide-over panel (Mocked as a modal for simplicity) */}
      {activeJob && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setActiveJob(null)}></div>
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="p-6 sm:p-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-3xl mb-6">
                {activeJob.company?.charAt(0)}
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">{activeJob.role}</h2>
              <p className="text-lg text-slate-600 mb-6">{activeJob.company} &bull; {activeJob.location}</p>
              
              <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-slate-200">
                <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> {activeJob.type}
                </span>
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-lg flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> {activeJob.salary}
                </span>
              </div>

              <div className="prose prose-slate max-w-none mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Job Description</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We are looking for a talented {activeJob.role} to join our growing team at {activeJob.company}. 
                  You will be responsible for building high-quality software and collaborating with cross-functional teams.
                  This is a unique opportunity to shape the future of our product in a fast-paced environment.
                </p>
                <h4 className="text-lg font-bold text-slate-900 mb-3">Requirements</h4>
                <ul className="list-disc pl-5 text-slate-600 space-y-2 mb-6">
                  <li>3+ years of relevant experience</li>
                  <li>Strong problem-solving skills</li>
                  <li>Excellent communication abilities</li>
                  <li>Experience with modern tech stacks</li>
                </ul>
              </div>

              <div className="sticky bottom-0 pt-4 pb-8 bg-gradient-to-t from-white via-white to-transparent">
                <button 
                  onClick={() => {
                    const next = new Set(appliedJobs);
                    next.add(activeJob.id);
                    setAppliedJobs(next);
                    alert(`Successfully applied to ${activeJob.company}!`);
                  }}
                  disabled={appliedJobs.has(activeJob.id)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md ${appliedJobs.has(activeJob.id) ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg'}`}
                >
                  {appliedJobs.has(activeJob.id) ? 'Application Submitted' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

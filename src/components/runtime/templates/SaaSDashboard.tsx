"use client";

import React, { useState } from 'react';
import { LayoutDashboard, Users, CreditCard, Activity, Bell, Search, Settings, ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Menu, X } from 'lucide-react';

export default function SaaSDashboard({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!data) return <div className="p-8">Loading dashboard...</div>;

  const { userName = "User", metrics = {}, recentActivity = [], chartData = [] } = data;

  const navItems = ["Overview", "Analytics", "Customers", "Billing", "Settings"];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-slate-50/50 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-inner">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <span className="font-bold text-lg tracking-tight">NexusSaaS</span>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          {navItems.map(item => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === item ? 'bg-white shadow-sm border border-slate-200/60 text-blue-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              {item === "Overview" && <LayoutDashboard className="w-4 h-4" />}
              {item === "Customers" && <Users className="w-4 h-4" />}
              {item === "Billing" && <CreditCard className="w-4 h-4" />}
              {item === "Analytics" && <Activity className="w-4 h-4" />}
              {item === "Settings" && <Settings className="w-4 h-4" />}
              {item}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-200 shrink-0">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-100 transition-colors text-left">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{userName}</p>
              <p className="text-xs text-slate-500 truncate">Pro Plan</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-500">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-blue-600">N.</h1>
          </div>
          <h1 className="text-xl font-semibold hidden lg:block">Dashboard</h1>
          
          <div className="hidden md:flex items-center relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-slate-800 transition-colors">
              New Project
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, {userName}</h2>
              <p className="text-slate-500 text-sm">Here's what's happening with your projects today.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
                <Filter className="w-4 h-4" /> Last 30 Days
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-sm font-medium mb-1 block">Monthly Revenue</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-slate-900">{metrics.mrr || '$12,450'}</span>
                <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
                </span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-sm font-medium mb-1 block">Active Users</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-slate-900">{metrics.activeUsers || '1,240'}</span>
                <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> +5.2%
                </span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-sm font-medium mb-1 block">New Signups</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-slate-900">{metrics.growth || '342'}</span>
                <span className="flex items-center text-sm font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  <ArrowDownRight className="w-3 h-3 mr-1" /> -1.1%
                </span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-slate-500 text-sm font-medium mb-1 block">Churn Rate</span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-slate-900">{metrics.churn || '2.4%'}</span>
                <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowDownRight className="w-3 h-3 mr-1" /> -0.4%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900">Revenue Growth</h3>
                <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              
              <div className="h-64 flex items-end gap-2 sm:gap-4 px-2">
                {/* Simulated Bar Chart */}
                {(chartData.length > 0 ? chartData : [
                  { month: 'Jan', value: 40 }, { month: 'Feb', value: 30 }, { month: 'Mar', value: 50 },
                  { month: 'Apr', value: 45 }, { month: 'May', value: 70 }, { month: 'Jun', value: 65 },
                  { month: 'Jul', value: 85 }, { month: 'Aug', value: 90 }
                ]).map((d: any, i: number) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end group">
                    <div className="w-full bg-blue-100 rounded-t-sm relative group-hover:bg-blue-200 transition-colors" style={{ height: `${Math.max(10, (d.value / 100) * 100)}%` }}>
                      <div className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm shadow-sm transition-all duration-500 ease-out" style={{ height: `${Math.max(10, (d.value / 100) * 80)}%` }}></div>
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded font-medium pointer-events-none transition-opacity whitespace-nowrap z-10">
                        {d.value} units
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium mt-3">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">View all</button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-5 pr-2">
                {recentActivity.map((act: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-500 font-bold text-xs uppercase">
                      {act.user?.substring(0, 2) || 'US'}
                    </div>
                    <div>
                      <p className="text-sm text-slate-900 font-medium leading-tight mb-1">{act.action}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{act.user}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{act.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {recentActivity.length === 0 && (
                  <div className="text-slate-400 text-sm text-center py-10">No recent activity</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
              <span className="font-bold text-lg">NexusSaaS</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-1">
              {navItems.map(item => (
                <button 
                  key={item}
                  onClick={() => { setActiveTab(item); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${activeTab === item ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

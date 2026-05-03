import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar Skeleton */}
      <aside className="w-72 border-r border-slate-200 bg-white p-8 hidden xl:flex flex-col gap-8">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-10 w-10 rounded-xl bg-slate-200" />
          <Skeleton className="h-6 w-32 rounded-md bg-slate-200" />
        </div>
        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <Skeleton className="h-3 w-16 rounded bg-slate-100" />
            <Skeleton className="h-11 w-full rounded-xl bg-slate-100" />
            <Skeleton className="h-11 w-full rounded-xl bg-slate-50 opacity-60" />
            <Skeleton className="h-11 w-full rounded-xl bg-slate-50 opacity-40" />
          </div>
          <div className="space-y-3 pt-4">
            <Skeleton className="h-3 w-16 rounded bg-slate-100" />
            <Skeleton className="h-11 w-full rounded-xl bg-slate-50 opacity-60" />
            <Skeleton className="h-11 w-full rounded-xl bg-slate-50 opacity-40" />
          </div>
        </div>
        <div className="mt-auto">
          <Skeleton className="h-14 w-full rounded-2xl bg-slate-100" />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Skeleton */}
        <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-8 rounded md:hidden bg-slate-200" />
            <Skeleton className="h-8 w-48 rounded-lg bg-slate-100" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-40 rounded-xl hidden md:block bg-slate-50" />
            <Skeleton className="h-10 w-10 rounded-full bg-slate-100" />
            <Skeleton className="h-10 w-28 rounded-xl bg-blue-100" />
          </div>
        </header>

        {/* Content Skeleton */}
        <main className="p-8 lg:p-12 space-y-10 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <Skeleton className="h-12 w-80 rounded-2xl bg-slate-200" />
              <Skeleton className="h-5 w-[450px] rounded-lg bg-slate-100 opacity-60" />
            </div>
            <Skeleton className="h-11 w-32 rounded-xl bg-slate-100" />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-200/60 shadow-sm space-y-4">
                <Skeleton className="h-4 w-24 rounded bg-slate-100" />
                <div className="flex items-end justify-between">
                  <Skeleton className="h-9 w-20 rounded-lg bg-slate-200" />
                  <Skeleton className="h-6 w-12 rounded-md bg-emerald-50" />
                </div>
              </div>
            ))}
          </div>

          {/* Main Layout Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-6 w-40 rounded bg-slate-100" />
                  <Skeleton className="h-8 w-24 rounded-lg bg-slate-50" />
                </div>
                <Skeleton className="h-[340px] w-full rounded-2xl bg-slate-50/50" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm space-y-6">
                <Skeleton className="h-6 w-32 rounded bg-slate-100" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full bg-slate-100 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full rounded bg-slate-50" />
                        <Skeleton className="h-3 w-2/3 rounded bg-slate-50/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Loader Overlay */}
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/50 px-10 py-6 rounded-[32px] flex items-center gap-6 animate-in slide-in-from-bottom-8 duration-700">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
                <Loader2 className="w-10 h-10 animate-spin relative z-10 text-blue-600" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Designing App Structure</h2>
                <p className="text-slate-500 text-xs font-medium">Assembling components and data models...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

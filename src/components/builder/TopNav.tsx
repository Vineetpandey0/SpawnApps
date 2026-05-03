"use client";

import {
  Bell,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Download,
  CloudUpload,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Logo from "../logo";
import { toast } from "sonner";

export default function TopNav() {
  const { toggleSidebar, open } = useSidebar();
  const { user } = useUser();
  const params = useParams();
  const appId = params?.appId as string;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [geminiKey, setGeminiKey] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [showLoadingUrl, setShowLoadingUrl] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState<null | 'deploy' | 'delete'>(null);

  const fetchAppData = async () => {
    if (!appId) {
      setDeployedUrl(null);
      return;
    }
    
    // Reset state for the new app
    setDeployedUrl(null);
    setIsDeploying(false);
    setIsDownloading(false);
    setShowLoadingUrl(false);

    try {
      const res = await fetch(`/api/apps/${appId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDeployedUrl(data.deployedUrl || null);
    } catch (e) {
      setDeployedUrl(null);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, [appId]);

  const handleDeploy = async () => {
    if (!appId) return;
    
    setShowConfirmModal(null);
    setIsDeploying(true);
    setShowLoadingUrl(true);
    const tId = toast.loading("Uploading files to Vercel...");
    
    try {
      const res = await fetch(`/api/apps/${appId}/deploy`, { method: "POST" });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Deployment failed");
      
      toast.loading("Files uploaded! Waiting for Vercel to build your app (40s)...", { id: tId });
      
      // Wait for 40 seconds to allow Vercel build to finish
      await new Promise(resolve => setTimeout(resolve, 40000));
      
      setDeployedUrl(data.url);
      setShowLoadingUrl(false);
      toast.success("Successfully deployed to Vercel!", { id: tId });
    } catch (err: any) {
      console.error(err);
      setShowLoadingUrl(false);
      toast.error(err.message || "Failed to deploy. Please check your Vercel Token.", { id: tId });
    } finally {
      setIsDeploying(false);
    }
  };

  const handleDeleteDeployment = async () => {
    if (!appId) return;

    setShowConfirmModal(null);
    setIsDeleting(true);
    const tId = toast.loading("Removing deployment from Vercel...");

    try {
      const res = await fetch(`/api/apps/${appId}/deploy`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Deletion failed");

      setDeployedUrl(null);
      toast.success("Deployment successfully removed.", { id: tId });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to remove deployment.", { id: tId });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = async () => {
    if (!appId) return;
    
    setIsDownloading(true);
    const tId = toast.loading("Preparing your project ZIP...");
    
    try {
      const res = await fetch(`/api/apps/${appId}/export`);
      if (!res.ok) throw new Error("Failed to export project");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `app-project-${appId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Project downloaded successfully!", { id: tId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to download project. Please try again.", { id: tId });
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    // Read from cookie on mount
    const match = document.cookie.match(/(^| )gemini_api_key=([^;]+)/);
    if (match) setGeminiKey(match[2]);
  }, []);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGeminiKey(val);
    document.cookie = `gemini_api_key=${val}; path=/; max-age=31536000`;
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center px-3 gap-3">
      
      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
      >
        {open ? (
          <PanelLeftClose className="w-5 h-5" />
        ) : (
          <PanelLeftOpen className="w-5 h-5" />
        )}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <Logo />
      </div>

      {/* Workspace */}
      <button className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition ">
        <span className="text-sm font-medium text-gray-800 ">
          {user?.firstName + " 's Workspace"}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
      </button>

      {/* Middle URL Display */}
      <div className="flex-1 flex justify-center">
        {showLoadingUrl ? (
          <div className="flex items-center gap-2.5 px-3 sm:px-4 py-1.5 bg-violet-50 text-violet-700 border border-violet-100 rounded-full text-[10px] sm:text-xs font-semibold animate-pulse shadow-sm shadow-violet-100">
            <Loader2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 animate-spin" />
            <span className="hidden xs:inline">Deploying...</span>
            <span className="hidden sm:inline"> (~40s)</span>
          </div>
        ) : deployedUrl && (
          <a 
            href={deployedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] sm:text-xs font-semibold hover:bg-emerald-100 transition animate-in fade-in zoom-in duration-500 shadow-sm shadow-emerald-100"
          >
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="max-w-[80px] sm:max-w-[200px] truncate">{deployedUrl.replace('https://', '')}</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        )}
      </div>

      {/* Export & Deploy Buttons (Desktop) */}
      <div className="hidden sm:flex items-center gap-3">
        {appId && (
          <>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center cursor-pointer gap-2 px-3 py-1.5 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden xl:inline">Download Project</span>
            </button>

            {/* Deploy Toggle */}
            <div className="flex items-center gap-2.5 px-3 py-1 bg-gray-50 rounded-full border border-gray-200 shadow-sm">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${deployedUrl ? 'text-emerald-600' : 'text-gray-400'}`}>
                {deployedUrl ? 'Live' : 'Deploy'}
              </span>
              <button
                onClick={() => setShowConfirmModal(deployedUrl ? 'delete' : 'deploy')}
                disabled={isDeploying || isDeleting}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${deployedUrl ? 'bg-emerald-500' : 'bg-gray-200'}`}
              >
                <span
                  className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${deployedUrl ? 'translate-x-4' : 'translate-x-0.5'}`}
                />
              </button>
            </div>
          </>
        )}
      </div>


      {/* Avatar + Dropdown */}
      <div className="relative" ref={menuRef}>
        
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-medium hover:ring-2 hover:ring-violet-500/20 transition-all"
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            user?.firstName?.[0] || "U"
          )}
        </button>

        {/* Dropdown */}
        {openMenu && (
          <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <p className="text-sm font-semibold text-gray-900">
                {user?.fullName || "User"}
              </p>
              <p className="text-[11px] text-gray-500 truncate mt-0.5">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>

            {/* Mobile Actions (Visible only on small screens) */}
            <div className="sm:hidden px-2 py-2 border-b border-gray-100">
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
              >
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Download Project
              </button>
              
              <div className="flex items-center justify-between px-3 py-2 mt-1">
                <div className="flex items-center gap-2">
                  <CloudUpload className="w-4 h-4 text-violet-600" />
                  <span className="text-sm text-gray-700 font-medium">Deploy</span>
                </div>
                <button
                  onClick={() => setShowConfirmModal(deployedUrl ? 'delete' : 'deploy')}
                  disabled={isDeploying || isDeleting}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${deployedUrl ? 'bg-emerald-500' : 'bg-gray-200'}`}
                >
                  <span className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${deployedUrl ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>

            {/* API Key Input */}
            <div className="px-4 py-4 border-b border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Gemini API Key
              </label>
              <input 
                type="password" 
                placeholder="Enter your API key..."
                value={geminiKey}
                onChange={handleKeyChange}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Logout */}
            <div className="p-1.5">
              <SignOutButton>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </SignOutButton>
            </div>

          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl border border-gray-100 animate-in zoom-in duration-200">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${showConfirmModal === 'deploy' ? 'bg-violet-50 text-violet-600' : 'bg-rose-50 text-rose-600'}`}>
              {showConfirmModal === 'deploy' ? <CloudUpload className="w-7 h-7" /> : <X className="w-7 h-7" /> }
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {showConfirmModal === 'deploy' ? 'Deploy App to Live?' : 'Remove Live App?'}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {showConfirmModal === 'deploy' 
                ? 'This will bundle your project and host it on Vercel. Anyone with the URL will be able to access it.' 
                : 'This will completely remove your project from Vercel. The public URL will no longer work.'}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={showConfirmModal === 'deploy' ? handleDeploy : handleDeleteDeployment}
                className={`w-full py-3 rounded-xl font-bold text-sm transition ${showConfirmModal === 'deploy' ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
              >
                {showConfirmModal === 'deploy' ? 'Yes, Deploy Now' : 'Yes, Delete Deployment'}
              </button>
              <button
                onClick={() => setShowConfirmModal(null)}
                className="w-full py-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
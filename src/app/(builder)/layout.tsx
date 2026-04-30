import type { Metadata } from "next";
import "../globals.css";
import TopNav from "@/components/builder/TopNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/(shadcn ui)/app-sidebar";
import AuthGuard from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "App Builder – Vineet's Workspace",
  description: "Build apps with just a prompt. No code, no design skills needed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <AuthGuard>
        <SidebarProvider defaultOpen={true}>

          {/* Fixed Top Navbar */}
          <TopNav />

          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content — SidebarInset handles the sidebar gap automatically */}
          <SidebarInset className="pt-14">
            {children}
          </SidebarInset>

        </SidebarProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
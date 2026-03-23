"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, refreshSession } from "@/lib/auth";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setIsAuth(authStatus);
      setIsChecking(false);

      if (!authStatus && pathname !== "/admin/login") {
        router.replace("/admin/login");
      } else if (authStatus) {
        // Refresh session on route change
        refreshSession();
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-3 border-primary/60 border-t-primary rounded-full animate-spin"></div>
          <div className="text-center space-y-1">
            <p className="font-medium text-foreground">Admin Portal</p>
            <p className="text-sm text-muted-foreground">Authenticating...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuth && pathname !== "/admin/login") {
    return null; // Will redirect in useEffect
  }

  // Don't wrap login page with sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "280px",
            "--header-height": "64px",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <main className="flex flex-1 flex-col p-6 bg-muted/10 min-h-screen">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

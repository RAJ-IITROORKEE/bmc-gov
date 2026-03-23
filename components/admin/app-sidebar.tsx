"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Bell,
  Award,
  Images,
  MessageSquare,
  Building2,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Icon mapping
const iconMap = {
  LayoutDashboard,
  Bell,
  Award,
  Images,
  MessageSquare,
  Building2,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            BMC Admin
          </h2>
          <p className="text-xs text-muted-foreground">Management Portal</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_NAV_ITEMS.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="cursor-pointer"
                    >
                      <a href={item.href} className="flex items-center gap-3">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                        {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

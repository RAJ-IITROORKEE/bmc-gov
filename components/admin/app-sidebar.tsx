"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Bell,
  Award,
  Images,
  MessageSquare,
  Building2,
  CalendarDays,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
  CalendarDays,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({});

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const toggleMenu = (href: string) => {
    setExpandedMenus((previous) => ({
      ...previous,
      [href]: !previous[href],
    }));
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
                const hasChildren = Array.isArray(
                  (item as { children?: Array<{ href: string }> }).children,
                );
                const childItems = (item as { children?: Array<{ title: string; href: string }> }).children ?? [];
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`) ||
                  childItems.some((child) => pathname === child.href);
                const isExpanded = Boolean(expandedMenus[item.href]);

                return (
                  <SidebarMenuItem key={item.href}>
                    {hasChildren ? (
                      <SidebarMenuButton
                        isActive={isActive}
                        className="cursor-pointer"
                        onClick={() => toggleMenu(item.href)}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform duration-200",
                            isExpanded ? "rotate-90" : "rotate-0",
                          )}
                        />
                      </SidebarMenuButton>
                    ) : (
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
                    )}

                    {hasChildren && isExpanded && (
                      <SidebarMenuSub>
                        {childItems.map((child) => (
                          <SidebarMenuSubItem key={child.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === child.href}
                            >
                              <a href={child.href}>{child.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
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

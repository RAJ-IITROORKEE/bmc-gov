"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SITE_CONFIG, MAIN_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Header Section - Logos and Title (Not Sticky) */}
      <header className="w-full bg-background border-b dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Left Logo */}
            <div className="col-span-2 flex justify-center">
              <div className="relative w-20 h-20">
                <Image
                  src="/bmc_logo.jpg"
                  alt="BMC Logo"
                  fill
                  sizes="80px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Center - College Name */}
            <div className="col-span-8 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary uppercase tracking-tight">
                {SITE_CONFIG.name}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-semibold mt-1">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            {/* Right Logo */}
            <div className="col-span-2 flex justify-center">
              <div className="relative w-20 h-20">
                <Image
                  src="/wb-state-emblem.jpg"
                  alt="West Bengal State Emblem"
                  fill
                  sizes="80px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar (Sticky) */}
      <nav className="sticky top-0 z-50 bg-primary text-primary-foreground dark:bg-primary/90 dark:text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center space-x-1 w-full">
              {MAIN_NAV_ITEMS.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary/90"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg">Menu</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <MobileNav items={MAIN_NAV_ITEMS} onClose={() => setIsOpen(false)} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}

// Desktop Navigation Item
function NavItem({ item }: { item: typeof MAIN_NAV_ITEMS[0] }) {
  if (item.children) {
    return (
      <div className="relative group">
        <button className="px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
          {item.title}
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {/* Dropdown Menu */}
        <div className="absolute left-0 top-full hidden group-hover:block bg-background text-foreground shadow-lg border rounded-md min-w-[200px] z-50">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              {child.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      {item.title}
    </Link>
  );
}

// Mobile Navigation
function MobileNav({
  items,
  onClose,
}: {
  items: typeof MAIN_NAV_ITEMS;
  onClose: () => void;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.title}>
          {item.children ? (
            <div>
              <button
                onClick={() =>
                  setOpenItem(openItem === item.title ? null : item.title)
                }
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors"
              >
                <span className="font-medium">{item.title}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    openItem === item.title && "rotate-180"
                  )}
                />
              </button>
              
              {openItem === item.title && (
                <div className="pl-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block p-2 text-sm rounded-md hover:bg-accent transition-colors"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              onClick={onClose}
              className="block p-3 rounded-md hover:bg-accent transition-colors font-medium"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

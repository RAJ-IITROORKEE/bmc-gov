"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { onProgressStart, startProgress } from "@/lib/progress-bus";

function isModifiedEvent(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams?.toString() ?? "";

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const fallbackRef = useRef<number | null>(null);
  const isLoadingRef = useRef(false);

  const clearTimers = React.useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (fallbackRef.current) {
      window.clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  }, []);

  const complete = React.useCallback(() => {
    if (!isLoadingRef.current) return;
    clearTimers();
    setProgress(100);

    window.setTimeout(() => {
      isLoadingRef.current = false;
      setVisible(false);
      setProgress(0);
    }, 200);
  }, [clearTimers]);

  const start = React.useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    clearTimers();
    setVisible(true);
    setProgress(10);

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 90;
        }
        return Math.min(prev + 10, 90);
      });
    }, 200);

    fallbackRef.current = window.setTimeout(() => {
      complete();
    }, 10000);
  }, [clearTimers, complete]);

  useEffect(() => {
    const off = onProgressStart(start);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedEvent(event)) return;
      if (event.button !== 0) return;

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      )
        return;

      const nextUrl = new URL(href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const current = `${window.location.pathname}${window.location.search}`;
      const next = `${nextUrl.pathname}${nextUrl.search}`;
      if (current === next) return;

      startProgress();
    };

    const onPopState = () => startProgress();

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      off();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      clearTimers();
      isLoadingRef.current = false;
    };
  }, [clearTimers, start]);

  useEffect(() => {
    if (!isLoadingRef.current) return;

    const timeoutId = window.setTimeout(() => {
      complete();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pathname, searchKey, complete]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[200]">
      <div
        className="h-0.5 bg-primary shadow-[0_0_8px_var(--color-primary)] transition-[width,opacity] duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: visible ? 1 : 0 }}
      >
        <div className="h-full w-20 bg-gradient-to-r from-transparent via-primary-foreground/60 to-transparent animate-[top-loader-shimmer_1.1s_linear_infinite]" />
      </div>
    </div>
  );
}

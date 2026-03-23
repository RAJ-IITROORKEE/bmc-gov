"use client";

import React from "react";
import { Info } from "lucide-react";

const newsItems = [
  {
    id: 1,
    text: "DISCLAIMER NOTICE: This web site does not promote any harmful or illegal activities. All content provided in this web site is meant for an educational purpose only.",
    link: null,
  },
  {
    id: 2,
    text: "THIS IS THE OFFICIAL WEBSITE OF BURDWAN MEDICAL COLLEGE AND HOSPITAL",
    link: "#",
  },
  {
    id: 3,
    text: "MBBS Admission 2024 - Applications Open",
    link: "/academic/admission",
  },
];

export default function NewsMarquee() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-semibold whitespace-nowrap">
            <Info className="h-5 w-5 animate-pulse" />
            <span className="hidden sm:inline">Latest:</span>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div className="marquee-container inline-block whitespace-nowrap">
              {newsItems.map((item) => (
                <span key={item.id} className="inline-flex items-center">
                  {item.link ? (
                    <a
                      href={item.link}
                      className="hover:underline px-8"
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      • {item.text}
                    </a>
                  ) : (
                    <span className="px-8">• {item.text}</span>
                  )}
                </span>
              ))}
              
              {/* Duplicate for seamless loop */}
              {newsItems.map((item) => (
                <span key={`${item.id}-dup`} className="inline-flex items-center">
                  {item.link ? (
                    <a
                      href={item.link}
                      className="hover:underline px-8"
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      • {item.text}
                    </a>
                  ) : (
                    <span className="px-8">• {item.text}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function HeroCarousel() {
  return (
    <section className="w-full relative">
      <div className="relative w-full h-[440px] md:h-[560px] lg:h-[660px] overflow-hidden">
        <Image
          src="/banner_bmc.jpg"
          alt="Burdwan Medical College and Hospital"
          fill
          className="object-cover opacity-85"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/28 to-black/34" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white space-y-5 md:space-y-6">
              <p className="hero-reveal hero-delay-1 inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs md:text-sm font-medium tracking-wide uppercase">
                A Center of Excellence
              </p>
              <h1 className="hero-reveal hero-delay-2 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Burdwan Medical College and Hospital
              </h1>
              <p className="hero-reveal hero-delay-3 text-lg md:text-xl text-white/90 max-w-2xl">
                Excellence in Medical Education and Healthcare Since 1969
              </p>
              <div className="hero-reveal hero-delay-4 flex flex-col sm:flex-row gap-3 pt-1 justify-center">
                <Button asChild size="lg" className="group">
                  <Link href="/departments" className="inline-flex items-center gap-2">
                    Explore Departments
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border border-white/40 bg-white/15 text-white hover:bg-white/25 hover:text-white">
                  <a href="#contact-us" className="inline-flex items-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

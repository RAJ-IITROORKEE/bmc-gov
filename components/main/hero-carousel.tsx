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
          sizes="100vw"
          className="object-cover opacity-100 dark:opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/28 to-black/34 dark:from-black/18 dark:via-black/28 dark:to-black/34" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white space-y-5 md:space-y-6">
              <p className="hero-reveal hero-delay-1 inline-flex rounded-full border border-white/35 bg-white/10 dark:bg-white/10 px-4 py-1 text-xs md:text-sm font-medium tracking-wide uppercase text-white dark:text-white">
                A Center of Excellence
              </p>
              <h1 className="hero-reveal hero-delay-2 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="opacity-90 dark:opacity-90 text-white dark:text-white">
                  Burdwan Medical College
                  <br />
                  and Hospital
                </span>
              </h1>
              <p className="hero-reveal hero-delay-3 text-lg md:text-xl text-white/90 dark:text-white/90 max-w-2xl">
                Excellence in Medical Education and Healthcare Since 1969
              </p>
              <div className="hero-reveal hero-delay-4 flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 px-6 rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(11,83,148,0.35)] hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Link href="/departments" className="inline-flex items-center gap-2 font-semibold tracking-wide">
                    Explore Departments
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="group h-12 px-6 rounded-full border border-white/60 bg-white/20 backdrop-blur-md text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:bg-white/30 hover:text-white hover:-translate-y-0.5 transition-all duration-300"
                >
                  <a href="#contact-us" className="inline-flex items-center gap-2 font-semibold tracking-wide">
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

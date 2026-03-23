"use client";

import React from "react";
import Image from "next/image";

export default function HeroCarousel() {
  return (
    <section className="w-full relative">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src="/banner_bmc.jpg"
          alt="Burdwan Medical College and Hospital"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Burdwan Medical College & Hospital
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Excellence in Medical Education and Healthcare Since 1969
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

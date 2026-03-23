"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const bannerImages = [
  {
    id: 1,
    src: "/banners/banner1.jpg",
    alt: "Burdwan Medical College Campus",
  },
  {
    id: 2,
    src: "/banners/banner2.jpg",
    alt: "Medical Education Excellence",
  },
  {
    id: 3,
    src: "/banners/banner3.jpg",
    alt: "Healthcare Services",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  return (
    <section className="w-full bg-muted/30">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {bannerImages.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-primary/20 to-accent/20">
                {/* Placeholder with gradient - Replace with actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                      {banner.alt}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      Excellence in Medical Education and Healthcare
                    </p>
                  </div>
                </div>
                {/* Uncomment when you have actual images
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={banner.id === 1}
                />
                */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}

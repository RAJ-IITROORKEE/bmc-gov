"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera } from "lucide-react";

interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: string;
}

const galleryData = {
  campus: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
      title: "Main Campus Building",
      category: "Campus",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=600&fit=crop",
      title: "College Entrance",
      category: "Campus",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
      title: "Administrative Block",
      category: "Campus",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=800&h=600&fit=crop",
      title: "Library Building",
      category: "Campus",
    },
  ],
  events: [
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      title: "Foundation Day Celebration",
      category: "Events",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      title: "Medical Conference",
      category: "Events",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
      title: "White Coat Ceremony",
      category: "Events",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      title: "Convocation Ceremony",
      category: "Events",
    },
  ],
  facilities: [
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
      title: "Modern Operation Theatre",
      category: "Facilities",
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&h=600&fit=crop",
      title: "ICU Facility",
      category: "Facilities",
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",
      title: "Research Laboratory",
      category: "Facilities",
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&h=600&fit=crop",
      title: "Diagnostic Center",
      category: "Facilities",
    },
  ],
  activities: [
    {
      id: 13,
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
      title: "Medical Camp",
      category: "Activities",
    },
    {
      id: 14,
      url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
      title: "Health Awareness Program",
      category: "Activities",
    },
    {
      id: 15,
      url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop",
      title: "Student Workshop",
      category: "Activities",
    },
    {
      id: 16,
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
      title: "Blood Donation Camp",
      category: "Activities",
    },
  ],
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/bmc_hero_banner.png"
          alt="Burdwan Medical College"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="text-center text-white z-10 px-4">
          <Camera className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-lg md:text-xl">Capturing Moments at BMC</p>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="campus" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="campus">Campus</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>

            {/* Campus Tab */}
            <TabsContent value="campus">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.campus.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-semibold text-sm">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.events.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-semibold text-sm">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Facilities Tab */}
            <TabsContent value="facilities">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.facilities.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-semibold text-sm">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.activities.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-semibold text-sm">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative">
              <div className="relative h-[600px]">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 bg-background">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedImage.category}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

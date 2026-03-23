"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const administrationData = [
  {
    name: "Prof. (Dr.) Mousumi Bandyopadhyay",
    position: "Principal",
    image: "/placeholders/admin1.jpg",
  },
  {
    name: "Prof. (Dr.) Tapas Ghosh",
    position: "Medical Superintendent cum Vice Principal",
    image: "/placeholders/admin2.jpg",
  },
  {
    name: "Prof. (Dr.) Arunima Chaudhuri",
    position: "Dean of Students' Affairs",
    image: "/placeholders/admin3.jpg",
  },
];

const eventsData = [
  {
    title: "ECT Inauguration",
    link: "#",
  },
  {
    title: "APAN Story @ Burdwan Medical College",
    link: "#",
  },
  {
    title: "Workshop on Communication Skills - Department of Physiology",
    link: "#",
  },
  {
    title: "66th Foundation Day Program",
    link: "#",
  },
];

export default function ContentPanels() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Administration & Events Panel */}
        <Card>
          <Tabs defaultValue="administration" className="w-full">
            <CardHeader className="pb-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="administration">Administration</TabsTrigger>
                <TabsTrigger value="events">Events & Programs</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="administration" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {administrationData.map((person, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                          {/* Placeholder - replace with actual images */}
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            Photo
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {person.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {person.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="events" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {eventsData.map((event, index) => (
                      <a
                        key={index}
                        href={event.link}
                        className="block p-4 rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <p className="text-sm flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{event.title}</span>
                        </p>
                      </a>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Notices & Tenders Panel */}
        <Card>
          <Tabs defaultValue="notices" className="w-full">
            <CardHeader className="pb-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notices">Notices</TabsTrigger>
                <TabsTrigger value="tenders">Tenders</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="notices" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  <NoticesList />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="tenders" className="mt-0">
                <ScrollArea className="h-[400px] pr-4">
                  <TendersList />
                </ScrollArea>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}

function NoticesList() {
  const notices = [
    {
      title: "Sealed quotation for Microbiology Department items",
      date: "March 19, 2026",
      link: "#",
    },
    {
      title: "Sealed quotation for Pathology Department items",
      date: "March 11, 2026",
      link: "#",
    },
    {
      title: "NVHCP Microbiology Department quotation",
      date: "January 30, 2026",
      link: "#",
    },
  ];

  return (
    <div className="space-y-3">
      {notices.map((notice, index) => (
        <a
          key={index}
          href={notice.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg hover:bg-accent/50 transition-colors border"
        >
          <p className="text-sm font-medium">{notice.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{notice.date}</p>
        </a>
      ))}
    </div>
  );
}

function TendersList() {
  const tenders = [
    {
      title: "Supply of Medical Equipment - Tender Notice",
      date: "March 15, 2026",
      link: "#",
    },
    {
      title: "Civil Works Tender - College Building",
      date: "March 10, 2026",
      link: "#",
    },
  ];

  return (
    <div className="space-y-3">
      {tenders.map((tender, index) => (
        <a
          key={index}
          href={tender.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg hover:bg-accent/50 transition-colors border"
        >
          <p className="text-sm font-medium">{tender.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{tender.date}</p>
        </a>
      ))}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FileText, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Annual Sports Meet 2026",
    date: "April 15, 2026",
    type: "Event",
  },
  {
    id: 2,
    title: "Medical Conference on Modern Healthcare",
    date: "April 10, 2026",
    type: "Event",
  },
  {
    id: 3,
    title: "Guest Lecture by Dr. Amit Kumar",
    date: "March 28, 2026",
    type: "Event",
  },
];

export default function AdministrationEvents() {
  return (
    <Card className="h-full border-2 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b bg-primary/5">
        <CardTitle className="text-xl md:text-2xl text-primary flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Administration / Events
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <Link
              href="/events"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:underline font-medium"
            >
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

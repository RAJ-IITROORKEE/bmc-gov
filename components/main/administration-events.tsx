import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { getPublicContentDocuments } from "@/lib/content-documents/service";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function AdministrationEvents() {
  const events = await getPublicContentDocuments("EVENT");

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
          {events.slice(0, 3).map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-lg border p-4 transition-all duration-200 hover:border-primary/50 hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(event.publishedAt)}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}

          {events.length === 0 && (
            <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
              No events available right now.
            </div>
          )}

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

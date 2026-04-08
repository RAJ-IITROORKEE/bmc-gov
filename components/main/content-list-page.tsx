import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTENT_LABELS, parseRouteContentType } from "@/lib/content-documents/constants";
import { getPublicContentDocuments } from "@/lib/content-documents/service";

interface ContentListPageProps {
  type: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function ContentListPage({ type }: ContentListPageProps) {
  const contentType = parseRouteContentType(type);

  if (!contentType) {
    notFound();
  }

  const items = await getPublicContentDocuments(contentType);
  const labels = CONTENT_LABELS[contentType];

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center md:py-20">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">BMC Updates</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{labels.plural}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Browse latest {labels.plural.toLowerCase()} and open the official PDF documents.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 md:py-14">
        {items.length === 0 ? (
          <Card>
            <CardContent className="py-14 text-center text-muted-foreground">
              No {labels.plural.toLowerCase()} available right now.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card
                key={item.id}
                className="h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary">{labels.single}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-3">
                  <Link
                    href={`/${type}/${item.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Open PDF
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Direct link
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

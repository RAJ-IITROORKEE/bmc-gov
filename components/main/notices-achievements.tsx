import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Trophy, Calendar } from "lucide-react";
import { getPublicContentDocuments } from "@/lib/content-documents/service";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function NoticesAchievements() {
  const [notices, achievements] = await Promise.all([
    getPublicContentDocuments("NOTICE"),
    getPublicContentDocuments("ACHIEVEMENT"),
  ]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="notices" className="w-full">
        <TabsList className="grid w-full grid-cols-2 items-center bg-primary/10 dark:bg-primary/25 border border-primary/20 dark:border-primary/40 p-1 rounded-xl h-auto">
          <TabsTrigger
            value="notices"
            className="h-10 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold leading-none rounded-lg text-foreground dark:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            <Bell className="h-4 w-4" />
            Notices
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="h-10 w-full inline-flex items-center justify-center gap-2 text-sm font-semibold leading-none rounded-lg text-foreground dark:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notices" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Latest Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notices.slice(0, 4).map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notices/${notice.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border p-4 transition-all duration-200 hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="text-sm leading-tight font-semibold">{notice.title}</h3>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      Notice
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(notice.publishedAt)}
                  </div>
                </Link>
              ))}
              {notices.length === 0 && (
                <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  No notices available right now.
                </p>
              )}
              <Link
                href="/notices"
                className="block text-center py-2 text-sm text-primary hover:underline font-medium"
              >
                View All Notices
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.slice(0, 3).map((achievement) => (
                <Link
                  key={achievement.id}
                  href={`/achievements/${achievement.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border p-4 transition-all duration-200 hover:border-primary/50 hover:bg-muted/50"
                >
                  <h3 className="mb-1 text-sm font-semibold">{achievement.title}</h3>
                  <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(achievement.publishedAt)}
                  </div>
                </Link>
              ))}
              {achievements.length === 0 && (
                <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  No achievements available right now.
                </p>
              )}
              <Link
                href="/achievements"
                className="block text-center py-2 text-sm text-primary hover:underline font-medium"
              >
                View All Achievements
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

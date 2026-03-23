import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Trophy, Calendar } from "lucide-react";

const notices = [
  {
    id: 1,
    title: "MBBS Admission 2026 - Important Dates",
    date: "March 20, 2026",
    category: "Admission",
  },
  {
    id: 2,
    title: "Final Year Examination Schedule Released",
    date: "March 18, 2026",
    category: "Examination",
  },
  {
    id: 3,
    title: "Medical Camp at Rural Health Center",
    date: "March 15, 2026",
    category: "Event",
  },
  {
    id: 4,
    title: "Faculty Recruitment - Walk-in Interview",
    date: "March 12, 2026",
    category: "Recruitment",
  },
];

const achievements = [
  {
    id: 1,
    title: "NAAC A+ Accreditation Received",
    date: "March 2026",
    description: "College awarded highest grade by NAAC",
  },
  {
    id: 2,
    title: "Best Medical College Award 2025",
    date: "February 2026",
    description: "Recognized by State Health Department",
  },
  {
    id: 3,
    title: "100% Pass Rate in Final Year",
    date: "January 2026",
    description: "Outstanding academic performance",
  },
];

export default function NoticesAchievements() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="notices" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-primary/15 p-1.5 h-auto">
          <TabsTrigger
            value="notices"
            className="gap-2 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Bell className="h-4 w-4" />
            Notices
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="gap-2 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notices">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Latest Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-sm leading-tight">
                      {notice.title}
                    </h3>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {notice.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {notice.date}
                  </div>
                </div>
              ))}
              <Link
                href="/notices"
                className="block text-center py-2 text-sm text-primary hover:underline font-medium"
              >
                View All Notices
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
                >
                  <h3 className="font-semibold text-sm mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {achievement.date}
                  </div>
                </div>
              ))}
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

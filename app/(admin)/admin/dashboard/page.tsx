import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Bell, Building2, CalendarDays, MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [noticeCount, eventCount, achievementCount, departmentCount] = await Promise.all([
    prisma.contentDocument.count({ where: { type: "NOTICE" } }),
    prisma.contentDocument.count({ where: { type: "EVENT" } }),
    prisma.contentDocument.count({ where: { type: "ACHIEVEMENT" } }),
    prisma.department.count({ where: { isActive: true } }),
  ]);

  const stats = [
    {
      title: "Total Notices",
      value: String(noticeCount),
      description: "Published notices",
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Events",
      value: String(eventCount),
      description: "Administration events",
      icon: CalendarDays,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Achievements",
      value: String(achievementCount),
      description: "College achievements",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Departments",
      value: String(departmentCount),
      description: "Active departments",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to BMC Admin Portal. Manage your college content here.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
          <CardDescription>
            Core content modules are now live with database-backed data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Admin Content Management Active
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              You can now manage principal message, notices, events, achievements,
              and departments from the sidebar with live updates.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/notices">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base">Manage Notices</CardTitle>
              <CardDescription>
                Create and publish new notices
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/events">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base">Manage Events</CardTitle>
              <CardDescription>
                Publish event notices and PDFs
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/admin/principal-message">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-base">Edit Principal Message</CardTitle>
              <CardDescription>
                Update principal&apos;s message
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}

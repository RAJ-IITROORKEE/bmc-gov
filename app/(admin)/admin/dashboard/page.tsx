import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Award, Images, MessageSquare, Building2 } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Notices",
      value: "0",
      description: "Published notices",
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Achievements",
      value: "0",
      description: "College achievements",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Gallery Images",
      value: "0",
      description: "Total images",
      icon: Images,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Departments",
      value: "0",
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
            All admin modules are currently in progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Admin Panel Under Development
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              The admin panel is currently being built. Use the sidebar to
              navigate to different sections. All modules are functional with
              static data for now.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-base">Manage Notices</CardTitle>
            <CardDescription>
              Create and publish new notices
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-base">Update Gallery</CardTitle>
            <CardDescription>
              Upload new images to gallery
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-base">Edit Principal Message</CardTitle>
              <CardDescription>
                Update principal&apos;s message
              </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

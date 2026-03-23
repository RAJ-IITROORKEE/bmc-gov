import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">
            Manage college achievements and milestones
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievement Management</CardTitle>
          <CardDescription>
            Currently in progress - Full CRUD functionality coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold text-muted-foreground mb-2">
                🚧 Under Construction
              </p>
              <p className="text-sm text-muted-foreground">
                Achievement management module is being developed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

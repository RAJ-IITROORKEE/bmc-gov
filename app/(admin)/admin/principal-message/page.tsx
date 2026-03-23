import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function PrincipalMessagePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Principal Message</h1>
          <p className="text-muted-foreground">
            Edit and update the principal's message
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Message
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Principal Message Editor</CardTitle>
          <CardDescription>
            Currently in progress - Rich text editor coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold text-muted-foreground mb-2">
                🚧 Under Construction
              </p>
              <p className="text-sm text-muted-foreground">
                Principal message editor is being developed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

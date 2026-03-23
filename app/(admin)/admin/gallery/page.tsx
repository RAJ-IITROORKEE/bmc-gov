import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">
            Manage college photo gallery and albums
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Management</CardTitle>
          <CardDescription>
            Currently in progress - Image upload and management coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <p className="text-lg font-semibold text-muted-foreground mb-2">
                🚧 Under Construction
              </p>
              <p className="text-sm text-muted-foreground">
                Gallery management module is being developed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock4, HeartHandshake } from "lucide-react";

export default function OrganDonationPage() {
  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <HeartHandshake className="h-7 w-7 text-primary" />
              </div>
              <Badge className="mx-auto">Hospital Service</Badge>
              <CardTitle className="text-3xl">Organ Donation</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-10">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Clock4 className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground">
                Organ donation information and resources are coming soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

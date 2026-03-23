import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function WelcomeSection() {
  return (
    <Card className="h-full border-2 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b bg-primary/5 text-center">
        <CardTitle className="text-xl md:text-2xl text-primary flex items-center gap-2">
          <Building2 className="h-6 w-6 " />
          Welcome to Burdwan Medical College
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Burdwan Medical College and Hospital is a premier institution 
            dedicated to excellence in patient care services, medical education, 
            and research. Established with a vision to create competent healthcare 
            professionals, we have been serving the community since 1969.
          </p>
          <p>
            Our college provides a comprehensive learning environment where students
            receive hands-on clinical exposure under the guidance of experienced
            faculty members. We emphasize both academic excellence and ethical
            medical practice.
          </p>
          <p>
            With state-of-the-art facilities and a commitment to innovation in
            medical education, BMC continues to be at the forefront of producing
            skilled doctors who serve society with dedication and compassion.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

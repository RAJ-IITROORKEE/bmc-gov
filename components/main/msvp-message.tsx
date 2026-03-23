import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export default function MSVPMessage() {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src="/placeholder-avatar.jpg" alt="MSVP" />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              TG
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl text-primary">
              Medical Superintendent & Vice Principal
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Prof. (Dr.) Tapas Ghosh
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Quote className="h-8 w-8 text-primary/30" />
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Burdwan Medical College Hospital stands as a beacon of healthcare
            excellence in the region, providing comprehensive medical services
            to thousands of patients every day. Our hospital combines advanced
            medical technology with compassionate care to ensure the best
            outcomes for our patients.
          </p>
          <p>
            We are proud of our dedicated team of doctors, nurses, and
            healthcare staff who work tirelessly to deliver quality healthcare
            services. Our hospital also serves as a vital training ground for
            medical students, providing them with invaluable clinical experience.
          </p>
          <p>
            We remain committed to improving our facilities and services to
            better serve the healthcare needs of our community.
          </p>
          <p className="font-semibold text-foreground pt-2">
            Prof. (Dr.) Tapas Ghosh
            <br />
            <span className="text-sm font-normal text-muted-foreground">
              Medical Superintendent & Vice Principal
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

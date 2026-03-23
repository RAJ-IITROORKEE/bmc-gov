import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export default function PrincipalMessage() {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Principal" />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              MB
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl text-primary">
              Principal&apos;s Message
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Prof. (Dr.) Mousumi Bandyopadhyay
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Quote className="h-8 w-8 text-primary/30" />
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Welcome to Burdwan Medical College & Hospital, an institution with a
            rich legacy of excellence in medical education and healthcare services.
            Since our establishment, we have been committed to nurturing competent
            and compassionate healthcare professionals who serve society with
            dedication.
          </p>
          <p>
            Our college provides a comprehensive learning environment where students
            receive hands-on clinical exposure, guided by experienced faculty members.
            We emphasize both academic excellence and ethical medical practice,
            preparing our students to meet the challenges of modern healthcare.
          </p>
          <p>
            As we continue to grow and evolve, our focus remains steadfast on
            providing quality medical education, advancing research, and delivering
            superior patient care to the community we serve.
          </p>
          <p className="font-semibold text-foreground pt-2">
            Prof. (Dr.) Mousumi Bandyopadhyay
            <br />
            <span className="text-sm font-normal text-muted-foreground">
              Principal, Burdwan Medical College
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

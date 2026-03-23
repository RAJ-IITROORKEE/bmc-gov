"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

const principalMessage = `Welcome to Burdwan Medical College and Hospital, an institution with a rich legacy of excellence in medical education and healthcare services. Since our establishment, we have been committed to nurturing competent and compassionate healthcare professionals who serve society with dedication.

Our college provides a comprehensive learning environment where students receive hands-on clinical exposure, guided by experienced faculty members. We emphasize both academic excellence and ethical medical practice, preparing our students to meet the challenges of modern healthcare.

As we continue to grow and evolve, our focus remains steadfast on providing quality medical education, advancing research, and delivering superior patient care to the community we serve.`;

export default function PrincipalMessage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = contentRef.current;
      if (!element) return;
      setShowReadMore(element.scrollHeight > element.clientHeight + 1);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <Card className="border-2 hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader className="border-b bg-primary/5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Principal" />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              MB
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl md:text-2xl text-primary">
              Principal&apos;s Message
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Prof. (Dr.) Mousumi Bandyopadhyay
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <Quote className="h-8 w-8 text-primary/30" />

        <div
          ref={contentRef}
          className="space-y-4 text-muted-foreground leading-relaxed max-h-[260px] overflow-hidden"
        >
          {principalMessage.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="font-semibold text-foreground pt-1">
            Prof. (Dr.) Mousumi Bandyopadhyay
            <br />
            <span className="text-sm font-normal text-muted-foreground">
              Principal, Burdwan Medical College
            </span>
          </p>
        </div>

        {showReadMore && (
          <Button asChild variant="outline" className="mt-2">
            <Link href="/principal-message">Read More</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

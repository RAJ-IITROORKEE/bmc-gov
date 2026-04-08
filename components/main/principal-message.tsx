import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PrincipalMessageItem } from "@/lib/principal-message/types";
import { Quote } from "lucide-react";

interface PrincipalMessageProps {
  principalMessage: PrincipalMessageItem;
}

function getInitials(name: string): string {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || "PM";
}

export default function PrincipalMessage({ principalMessage }: PrincipalMessageProps) {
  const paragraphs = principalMessage.message
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const previewParagraphs = paragraphs.slice(0, 2);
  const showReadMore = paragraphs.length > 2 || principalMessage.message.length > 400;

  return (
    <Card className="border-2 hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader className="border-b bg-primary/5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={principalMessage.profileImageUrl} alt={principalMessage.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              {getInitials(principalMessage.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl md:text-2xl text-primary">
              Principal&apos;s Message
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {principalMessage.name}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <Quote className="h-8 w-8 text-primary/30" />

        <div className="space-y-4 text-muted-foreground leading-relaxed max-h-[260px] overflow-hidden">
          {previewParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="font-semibold text-foreground pt-1">
            {principalMessage.name}
            <br />
            <span className="text-sm font-normal text-muted-foreground">
              {principalMessage.designation}
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

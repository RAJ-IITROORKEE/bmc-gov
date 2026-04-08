import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPrincipalMessageOrDefault } from "@/lib/principal-message/service";

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

export default async function PrincipalMessagePage() {
  const principalMessage = await getPrincipalMessageOrDefault();
  const paragraphs = principalMessage.message
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/banner_bmc.jpg"
          alt="Principal message banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Principal&apos;s Message</h1>
            <p className="text-lg md:text-xl text-white/90">From the desk of the Principal</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader className="border-b bg-primary/5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-[72px] w-[72px] border-2 border-primary">
                    <AvatarImage
                      src={principalMessage.profileImageUrl}
                      alt={principalMessage.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                      {getInitials(principalMessage.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl text-primary">
                      {principalMessage.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {principalMessage.designation}
                    </p>
                    {principalMessage.officeEmail && (
                      <p className="text-sm text-muted-foreground">{principalMessage.officeEmail}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-5 text-muted-foreground leading-relaxed">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="pt-3 font-semibold text-foreground">
                  {principalMessage.name}
                  <br />
                  <span className="text-sm font-normal text-muted-foreground">
                    {principalMessage.designation}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

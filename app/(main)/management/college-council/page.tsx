import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Scale, Handshake } from "lucide-react";

export default function CollegeCouncilPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[340px] md:h-[420px] overflow-hidden">
        <Image
          src="https://bmcgov.com/uploads/college_council/original/C2.jpg"
          alt="College council banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <div>
            <Badge className="mb-4 bg-white/15 text-white border border-white/30 hover:bg-white/15">
              Academic Governance
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-3">College Council</h1>
            <p className="text-lg md:text-xl text-white/90">
              Academic advisory and coordination body
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="relative min-h-[360px] rounded-xl overflow-hidden border">
                <Image
                  src="https://bmcgov.com/uploads/college_council/original/WhatsApp_Image_2024-05-18_at_20_20_46_(1).jpeg"
                  alt="College council"
                  fill
                  className="object-cover"
                />
              </div>

              <Card className="h-full border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Role of the Council</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    The College Council is the supreme authority in academic matters.
                    It functions to advise the Principal in academic, disciplinary and
                    administrative issues of the institute; assist the Principal in
                    liaison with higher authorities and coordinate the functioning of
                    the various academic departments.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <GraduationCap className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Academic Direction</h3>
                  <p className="text-sm text-muted-foreground">
                    Advises on curriculum, academic planning, and institutional educational priorities.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <Scale className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Disciplinary Oversight</h3>
                  <p className="text-sm text-muted-foreground">
                    Provides guidance on institutional discipline and governance practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <Handshake className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Coordination & Liaison</h3>
                  <p className="text-sm text-muted-foreground">
                    Supports department coordination and communication with higher authorities.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-6 md:p-8">
                <p className="text-foreground leading-relaxed">
                  The Council serves as a central bridge between academic departments,
                  institutional administration, and policy-level decision-making to ensure
                  coherent and high-quality medical education delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

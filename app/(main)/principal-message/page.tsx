import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrincipalMessagePage() {
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
                <CardTitle className="text-2xl text-primary">
                  Prof. (Dr.) Mousumi Bandyopadhyay
                </CardTitle>
                <p className="text-sm text-muted-foreground">Principal, Burdwan Medical College</p>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Welcome to Burdwan Medical College and Hospital, an institution with a rich
                  legacy of excellence in medical education and healthcare services. Since our
                  establishment, we have been committed to nurturing competent and compassionate
                  healthcare professionals who serve society with dedication.
                </p>
                <p>
                  Our college provides a comprehensive learning environment where students receive
                  hands-on clinical exposure, guided by experienced faculty members. We emphasize
                  both academic excellence and ethical medical practice, preparing our students to
                  meet the challenges of modern healthcare.
                </p>
                <p>
                  As we continue to grow and evolve, our focus remains steadfast on providing
                  quality medical education, advancing research, and delivering superior patient
                  care to the community we serve.
                </p>
                <p className="pt-3 font-semibold text-foreground">
                  Prof. (Dr.) Mousumi Bandyopadhyay
                  <br />
                  <span className="text-sm font-normal text-muted-foreground">
                    Principal, Burdwan Medical College
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

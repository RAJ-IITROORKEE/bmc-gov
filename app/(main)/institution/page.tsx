import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, History, Target, Award } from "lucide-react";

export default function InstitutionPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-[300px] bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
        <div className="text-center text-white z-10">
          <Building2 className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Institution</h1>
          <p className="text-lg md:text-xl">A Legacy of Excellence Since 1907</p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <History className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Our History</h2>
            </div>
            
            <Card>
              <CardContent className="p-6 md:p-8 space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  <strong>On 13 July 1907</strong>, the decision was made to build a hospital in Burdwan, 
                  a small town with a vision to serve the healthcare needs of the community.
                </p>
                
                <p>
                  <strong>On 9 November 1910</strong>, the <strong>Frazer Hospital</strong> was inaugurated 
                  with 127 indoor beds, marking the beginning of organized healthcare services in the region.
                </p>
                
                <p>
                  <strong>In 1921</strong>, this hospital was converted into a medical school and named 
                  <strong> Ronaldshay Medical School</strong>, establishing the foundation for medical education 
                  in Burdwan.
                </p>
                
                <p>
                  Later, the proposal of renaming the medical college was put forward, and the chief minister 
                  of West Bengal, the legendary <strong>Dr. Bidhan Chandra Roy</strong>, agreed to the proposal.
                </p>
                
                <p>
                  <strong>On 1st April 1969</strong>, the institution was formally established as 
                  <strong> Burdwan Medical College</strong>, with affiliated teaching hospital 
                  named <strong>Burdwan Medical College Hospital</strong>.
                </p>
                
                <p>
                  Since then, Burdwan Medical College and Hospital has grown to become a premier institution 
                  for medical education and healthcare services in West Bengal, serving thousands of patients 
                  and training generations of medical professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Vision */}
              <Card className="border-2">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-primary">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be a beacon of excellence in medical education, research, and healthcare, 
                    cultivating a community of professionals who are committed to advancing the 
                    field of medicine and improving the health of individuals and communities globally.
                  </p>
                </CardContent>
              </Card>

              {/* Mission */}
              <Card className="border-2">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Education</h3>
                      <p className="text-sm">
                        To provide rigorous, evidence-based medical education preparing students 
                        to become competent, compassionate, and ethical physicians.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Research</h3>
                      <p className="text-sm">
                        To foster a culture of scientific inquiry and innovation, advancing 
                        medical knowledge and improving patient care.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Service</h3>
                      <p className="text-sm">
                        To serve our community by delivering high-quality healthcare and 
                        addressing health disparities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Annexes/Hospitals */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Hospitals & Annexes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare facilities serving the community
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Annex 1 */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
                  alt="Burdwan Hospital"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Annex-1: Burdwan Hospital</h3>
                <p className="text-sm text-muted-foreground">
                  Main hospital facility providing comprehensive medical services
                </p>
              </CardContent>
            </Card>

            {/* Annex 2 */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop"
                  alt="Super Speciality Wing"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Annex-2: Anamoy (Super Speciality Wing)</h3>
                <p className="text-sm text-muted-foreground">
                  State-of-the-art super speciality healthcare facility
                </p>
              </CardContent>
            </Card>

            {/* Annex 3 */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop"
                  alt="Tertiary Cancer Care Centre"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Annex-3: Tertiary Cancer Care Centre</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated cancer treatment and research facility
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

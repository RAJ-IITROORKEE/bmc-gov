import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Calendar } from "lucide-react";

const timeline = [
  {
    year: "1907",
    title: "Victoria Hospital Established",
    description: "The foundation was laid with the establishment of Victoria Hospital",
  },
  {
    year: "1919",
    title: "Burdwan Raj Medical School",
    description: "Started as a medical school under the Burdwan Raj",
  },
  {
    year: "1921",
    title: "Rajarshi Siromoni Naresh Hospital",
    description: "Hospital renamed to honor the royal patron",
  },
  {
    year: "1969",
    title: "Medical College Established",
    description: "Burdwan Medical College officially established, marking a new era in medical education",
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              About Burdwan Medical College
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A rich legacy of excellence in medical education and healthcare spanning over a century
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Welcome to Burdwan Medical College and Hospital, an institution with a proud heritage 
                dating back to the early 20th century. What began as a vision to provide quality 
                healthcare and medical education has evolved into one of West Bengal&apos;s premier 
                medical institutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we continue to uphold our commitment to excellence in patient care, medical 
                education, and research, nurturing the next generation of healthcare professionals 
                who serve society with dedication and compassion.
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-8">Our Journey Through Time</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative mb-8 ${
                    index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                  }`}
                >
                  <div className="flex items-center mb-4 md:justify-end">
                    <div className={`flex items-center gap-4 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}>
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background z-10"></div>
                    </div>
                  </div>
                  
                  <Card className={`ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  } hover:shadow-lg transition-shadow duration-300`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

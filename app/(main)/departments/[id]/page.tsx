import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Award, BookOpen, Stethoscope } from "lucide-react";

// Department data structure
const departmentData: Record<string, any> = {
  anatomy: {
    name: "ANATOMY",
    hod: {
      name: "PROF. (DR.) JONAKI DAS SARKAR",
      designation: "Professor & Head of Department",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    },
    about: "The Department of Anatomy is one of the oldest and most fundamental departments in medical education. It provides comprehensive knowledge of human body structure through systematic dissection, histology, embryology, and neuroanatomy.",
    faculty: [
      {
        name: "Dr. Amit Kumar",
        designation: "Associate Professor",
        specialization: "Neuroanatomy",
      },
      {
        name: "Dr. Priya Singh",
        designation: "Assistant Professor",
        specialization: "Histology",
      },
      {
        name: "Dr. Rahul Sharma",
        designation: "Assistant Professor",
        specialization: "Embryology",
      },
    ],
    facilities: [
      "Modern Dissection Hall with adequate specimens",
      "Histology Laboratory with microscopes",
      "Museum with preserved specimens",
      "Audio-Visual Teaching Aids",
    ],
    courses: ["MBBS", "MD Anatomy"],
  },
  microbiology: {
    name: "MICROBIOLOGY",
    hod: {
      name: "PROF. (DR.) TANUSRI BISWAS",
      designation: "Professor & Head of Department",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    },
    about: "The Department of Microbiology provides comprehensive diagnostic services and teaching in Bacteriology, Virology, Mycology, Parasitology, and Immunology. The department runs several specialized labs including ICMR-DHR VRDL and RTPCR Laboratory.",
    faculty: [
      {
        name: "Dr. Sudipto Roy",
        designation: "Associate Professor",
        specialization: "Clinical Microbiology",
      },
      {
        name: "Dr. Ananya Mukherjee",
        designation: "Assistant Professor",
        specialization: "Virology",
      },
      {
        name: "Dr. Debasis Ghosh",
        designation: "Assistant Professor",
        specialization: "Bacteriology",
      },
    ],
    facilities: [
      "ICMR-DHR Viral Research & Diagnostic Laboratory (VRDL)",
      "RTPCR Laboratory for molecular diagnostics",
      "Regional Viral Load Lab (RVLL)",
      "NVHCP Laboratory",
      "Modern Culture and Sensitivity Lab",
    ],
    courses: ["MBBS", "MD Microbiology"],
  },
  // Add more departments as needed
};

export async function generateStaticParams() {
  return Object.keys(departmentData).map((id) => ({
    id,
  }));
}

export default function DepartmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const dept = departmentData[params.id];

  if (!dept) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-[300px] bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
        <div className="text-center text-white z-10">
          <Stethoscope className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Department of {dept.name}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* HOD Section */}
            <Card className="border-2">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-2xl">Head of Department</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="h-32 w-32 border-4 border-primary">
                    <AvatarImage src={dept.hod.image} alt={dept.hod.name} />
                    <AvatarFallback className="text-2xl">
                      {dept.hod.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {dept.hod.name}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {dept.hod.designation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Department */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  About the Department
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {dept.about}
                </p>
              </CardContent>
            </Card>

            {/* Faculty Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Faculty Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dept.faculty.map((member: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all"
                    >
                      <h4 className="font-semibold text-foreground mb-1">
                        {member.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {member.designation}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {member.specialization}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Facilities & Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {dept.facilities.map((facility: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-muted-foreground">{facility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Courses Offered */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Courses Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {dept.courses.map((course: string, index: number) => (
                    <Badge key={index} className="text-sm px-4 py-2">
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

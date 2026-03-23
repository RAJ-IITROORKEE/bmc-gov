import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Users, Building2 } from "lucide-react";

const administrationMembers = [
  {
    name: "Prof. (Dr.) Mousumi Bandyopadhyay",
    designation: "Principal",
    image: "https://bmcgov.com/uploads/administration/original/IMG_20240601_0027181.jpg",
  },
  {
    name: "Prof. (Dr.) Tapas Ghosh",
    designation: "Medical Superintendent Cum Vice Principal",
    image: "https://bmcgov.com/uploads/administration/original/IMG-20240728-WA00041.jpg",
  },
  {
    name: "Prof. (Dr.) Arunima Chaudhuri",
    designation: "Dean of Students' Affairs",
    image: "https://bmcgov.com/uploads/administration/original/IMG-20240921-WA00201.jpg",
  },
  {
    name: "Dr. Ashim Banerjee",
    designation: "A.O. BMC",
    image: "https://bmcgov.com/uploads/administration/original/download151.png",
  },
  {
    name: "Mr. Debmalya Mukherjee",
    designation: "A.O. BMCH",
    image: "https://bmcgov.com/uploads/administration/original/download152.png",
  },
  {
    name: "Dr. Shakuntala Sarkar",
    designation: "Superintendent of Anamoy",
    image: "https://bmcgov.com/uploads/administration/original/download15.png",
  },
  {
    name: "Dr. Saswata Mondal",
    designation: "Additional Medical Superintendent",
    image: "https://bmcgov.com/uploads/administration/original/download14.png",
  },
  {
    name: "Mr. Somnath Chatterjee",
    designation: "Deputy Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/download13.png",
  },
  {
    name: "Mr. Susmit Bhattacharya",
    designation: "Assistant Superintendent (NM) Grade I",
    image: "https://bmcgov.com/uploads/administration/original/download12.png",
  },
  {
    name: "Mr. Rajat Sarkar",
    designation: "Assistant Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/download11.png",
  },
  {
    name: "Mrs. Mistu Nandy",
    designation: "Assistant Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/IMG_0170.jpeg",
  },
  {
    name: "Mr. Gopal Shaw",
    designation: "Assistant Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/download9.png",
  },
  {
    name: "Mr. Wasim Alam",
    designation: "Assistant Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/download8.png",
  },
  {
    name: "Mr. Subrata Ghosh",
    designation: "Assistant Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/download7.png",
  },
  {
    name: "Mr. Partha Mallick",
    designation: "Assistant Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/download6.png",
  },
  {
    name: "Mr. Argha Das",
    designation: "Assistant Superintendent (NM)",
    image: "https://bmcgov.com/uploads/administration/original/20240519_131133.jpg",
  },
];

export default function AdministrationPage() {
  const leadership = administrationMembers.slice(0, 3);
  const officers = administrationMembers.slice(3);

  return (
    <div className="min-h-screen">
      <section className="relative h-[340px] md:h-[420px] overflow-hidden">
        <Image
          src="https://bmcgov.com/uploads/fixed_banner/original/C2.jpg"
          alt="Administration banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center text-white">
          <div>
            <Badge className="mb-4 bg-white/15 text-white border border-white/30 hover:bg-white/15">
              Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-3">Administration</h1>
            <p className="text-lg md:text-xl text-white/90">
              Leadership and administrative officers of Burdwan Medical College
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Governance Overview
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  The administration of Burdwan Medical College and Hospital ensures
                  academic excellence, hospital coordination, and policy execution
                  across all institutional units.
                </CardDescription>
              </CardHeader>
            </Card>

            <div>
              <div className="flex items-center gap-2 mb-5">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Leadership</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leadership.map((member) => (
                  <Card
                    key={member.name}
                    className="overflow-hidden border-primary/10 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-72">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg leading-tight">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{member.designation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-5">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Administrative Directory</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {officers.map((member) => (
                  <Card
                    key={member.name}
                    className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-60">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-base leading-tight">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{member.designation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

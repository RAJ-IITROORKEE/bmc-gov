import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const departments = [
  {
    id: "anatomy",
    name: "ANATOMY",
    hod: "PROF. (DR.) JONAKI DAS SARKAR",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop",
  },
  {
    id: "physiology",
    name: "PHYSIOLOGY",
    hod: "PROF. (DR.) ARUNIMA CHAUDHURI",
    image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&h=400&fit=crop",
  },
  {
    id: "biochemistry",
    name: "BIOCHEMISTRY",
    hod: "PROF. (DR.) KEYA PAL",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop",
  },
  {
    id: "pharmacology",
    name: "PHARMACOLOGY",
    hod: "PROF. (DR.) ABHIJIT DAS",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=700&h=480&fit=crop",
  },
  {
    id: "microbiology",
    name: "MICROBIOLOGY",
    hod: "PROF. (DR.) TANUSRI BISWAS",
    image: "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=600&h=400&fit=crop",
  },
  {
    id: "pathology",
    name: "PATHOLOGY",
    hod: "PROF. (DR.) RUPAM KARMAKAR",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&h=480&fit=crop",
  },
  {
    id: "community-medicine",
    name: "COMMUNITY MEDICINE",
    hod: "PROF. (DR.) PRANITA TARAPHDAR",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=480&fit=crop",
  },
  {
    id: "general-medicine",
    name: "GENERAL MEDICINE",
    hod: "PROF. (DR.) SAUMIK DATTA",
    image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?w=700&h=480&fit=crop",
  },
  {
    id: "paediatrics",
    name: "PAEDIATRICS",
    hod: "DR. TARAK NATH GHOSH",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=700&h=480&fit=crop",
  },
  {
    id: "respiratory-medicine",
    name: "RESPIRATORY MEDICINE",
    hod: "PROF. (DR.) SANTANU GHOSH",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=700&h=480&fit=crop",
  },
  {
    id: "psychiatry",
    name: "PSYCHIATRY",
    hod: "DR. AMITAVA DAN",
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=700&h=480&fit=crop",
  },
  {
    id: "dermatology",
    name: "DERMATOLOGY",
    hod: "PROF. (DR.) KAUSHIK SHOME",
    image: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=700&h=480&fit=crop",
  },
  {
    id: "radio-diagnosis",
    name: "RADIO-DIAGNOSIS",
    hod: "DR. MRINAL KANTI GHOSH",
    image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=700&h=480&fit=crop",
  },
  {
    id: "radiation-oncology",
    name: "RADIATION ONCOLOGY",
    hod: "DR. SUPARNA GHOSH",
    image: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?w=700&h=480&fit=crop",
  },
  {
    id: "general-surgery",
    name: "GENERAL SURGERY",
    hod: "PROF. (DR.) N C KARMAKAR",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=700&h=480&fit=crop",
  },
  {
    id: "orthopaedic-surgery",
    name: "ORTHOPAEDIC SURGERY",
    hod: "PROF. (DR.) DEBDUTTA CHATTERJEE",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700&h=480&fit=crop",
  },
  {
    id: "ophthalmology",
    name: "OPHTHALMOLOGY",
    hod: "PROF. (DR.) SOMNATH MUKHOPADHYAY",
    image: "https://images.unsplash.com/photo-1581594786350-4f89f4ecf6ef?w=700&h=480&fit=crop",
  },
  {
    id: "ent",
    name: "ENT",
    hod: "PROF. (DR.) SOMNATH SAHA",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=700&h=480&fit=crop",
  },
  {
    id: "anaesthesiology",
    name: "ANAESTHESIOLOGY",
    hod: "PROF. (DR.) SUMANTA GHOSH MAULIK",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&h=480&fit=crop",
  },
  {
    id: "cardiology",
    name: "CARDIOLOGY",
    hod: "DR. DIPANKAR GHOSH DASTIDAR",
    image: "https://images.unsplash.com/photo-1559757175-08f6a6f6f07f?w=700&h=480&fit=crop",
  },
  {
    id: "neurology",
    name: "NEUROLOGY",
    hod: "PROF. (DR.) PRASENJIT SENGUPTA",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&h=480&fit=crop",
  },
  {
    id: "nephrology",
    name: "NEPHROLOGY",
    hod: "DR. ADYAPADA PANI",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&h=480&fit=crop",
  },
  {
    id: "urology",
    name: "UROLOGY",
    hod: "DR. SUSANTA DAS",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=700&h=480&fit=crop",
  },
  {
    id: "physical-medicine",
    name: "PHYSICAL MEDICINE",
    hod: "PROF. (DR.) KSEHTRAMADHAB DAS",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=480&fit=crop",
  },
  {
    id: "dentistry",
    name: "DENTISTRY",
    hod: "DR. SUBHANKAR GHOSH",
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=700&h=480&fit=crop",
  },
  {
    id: "forensic-medicine",
    name: "FORENSIC MEDICINE",
    hod: "PROF. (DR.) PARTHA SARATHI HEMBRAM",
    image: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=700&h=480&fit=crop",
  },
  {
    id: "gynaecology-obstetrics",
    name: "GYNAECOLOGY & OBSTETRICS",
    hod: "PROF. (DR.) JHANTU KUMAR SAHA",
    image: "https://images.unsplash.com/photo-1550831106-099e80e8a6a5?w=700&h=480&fit=crop",
  },
];

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/banner_bmc.jpg"
          alt="Departments banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Departments</h1>
          <p className="text-lg md:text-xl">Comprehensive Medical Services Across Specializations</p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {departments.map((dept) => (
              <Link key={dept.id} href={`/departments/${dept.id}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dept.image}
                      alt={dept.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
                    <div className="absolute top-3 right-3 rounded-full bg-white/20 border border-white/40 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
                      Department
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold tracking-wide">{dept.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Head of Department</p>
                    <p className="font-semibold text-foreground mb-4">{dept.hod}</p>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

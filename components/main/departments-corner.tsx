"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Stethoscope, 
  Heart, 
  Brain, 
  Baby, 
  Eye, 
  Bone,
  Microscope,
  Activity
} from "lucide-react";

const departments = [
  {
    id: "general-medicine",
    name: "General Medicine",
    icon: Stethoscope,
    description: "Comprehensive medical care and treatment",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    description: "Heart and cardiovascular care",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    description: "Neurological disorders and brain health",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    description: "Child health and development",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: Eye,
    description: "Eye care and vision treatment",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    description: "Bone, joint and muscle care",
  },
  {
    id: "pathology",
    name: "Pathology",
    icon: Microscope,
    description: "Laboratory and diagnostic services",
  },
  {
    id: "surgery",
    name: "General Surgery",
    icon: Activity,
    description: "Surgical procedures and operations",
  },
];

export default function DepartmentsCorner() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Departments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive medical services across specialized departments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Link
                key={dept.id}
                href={`/departments/${dept.id}`}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-xl group-hover:text-primary transition-colors">
                      {dept.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                      {dept.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View All Departments
          </Link>
        </div>
      </div>
    </section>
  );
}

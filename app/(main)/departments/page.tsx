import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicDepartments } from "@/lib/departments/service";

export default async function DepartmentsPage() {
  const departments = await getPublicDepartments();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden border-b bg-gradient-to-br from-primary/15 via-background to-accent/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,oklch(0.9_0.04_240)_0,transparent_35%),radial-gradient(circle_at_90%_20%,oklch(0.82_0.07_250)_0,transparent_35%)]" />
        <div className="container relative mx-auto px-4 py-20 text-center md:py-24">
          <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">BMC Faculty Network</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Departments
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
            Discover every department with up-to-date head of department and faculty structure.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        {departments.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-44 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
              <Stethoscope className="h-7 w-7 text-primary" />
              <p className="font-medium text-foreground">No departments available yet</p>
              <p className="text-sm">Admin can publish departments from the management portal.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department: (typeof departments)[number]) => (
              <Link key={department.id} href={`/departments/${department.slug}`}>
                <Card className="group h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={department.coverImageUrl || "/banner_bmc.jpg"}
                      alt={department.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h2 className="line-clamp-2 text-lg font-semibold text-white">
                        {department.name}
                      </h2>
                    </div>
                  </div>

                  <CardContent className="space-y-4 pt-4">
                    <div>
                      <p className="text-xs tracking-wide text-muted-foreground uppercase">
                        Head of Department
                      </p>
                      <p className="line-clamp-2 font-medium text-foreground">
                        {department.hodName || "To be updated"}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      View Department
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

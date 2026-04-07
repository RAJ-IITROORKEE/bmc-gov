import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicDepartments } from "@/lib/departments/service";

export default async function DepartmentsCorner() {
  const departments = await getPublicDepartments();
  const featured = departments.slice(0, 8);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/25 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.86_0.06_238)_0,transparent_40%),radial-gradient(circle_at_bottom_left,oklch(0.9_0.05_250)_0,transparent_42%)]" />

      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Departments</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Explore clinical and academic departments with structured faculty hierarchy.
            </p>
          </div>
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-xs transition hover:border-primary/40 hover:text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <Card>
            <CardContent className="flex h-40 items-center justify-center text-muted-foreground">
              Department information will appear here once added from Admin.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((department: (typeof featured)[number]) => (
              <Link key={department.id} href={`/departments/${department.slug}`} className="group">
                <Card className="h-full border-border/60 bg-card/90 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-xl">
                  <CardContent className="space-y-4 p-5">
                    <div className="inline-flex rounded-md bg-primary/10 p-2 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="line-clamp-2 text-base font-semibold text-foreground">
                        {department.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">Head of Department</p>
                      <p className="line-clamp-2 text-sm font-medium text-foreground/90">
                        {department.hodName || "To be updated"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

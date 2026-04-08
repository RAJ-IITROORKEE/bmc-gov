import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicDepartments } from "@/lib/departments/service";

export default async function DepartmentsCorner() {
  const departments = await getPublicDepartments();
  const featured = departments.slice(0, 8);

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/12 via-primary/6 to-background dark:from-primary/22 dark:via-primary/10 dark:to-background" />
      <div className="pointer-events-none absolute -top-28 right-[-9rem] h-72 w-72 rounded-full bg-primary/25 blur-3xl dark:bg-primary/35" />
      <div className="pointer-events-none absolute -bottom-28 left-[-7rem] h-72 w-72 rounded-full bg-primary/20 blur-3xl dark:bg-primary/28" />

      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.16em] text-primary/85 uppercase">
              Academic Structure
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Departments</h2>
            <p className="max-w-2xl text-muted-foreground">
              Explore clinical and academic departments with structured faculty hierarchy.
            </p>
          </div>
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-background/85 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur transition hover:border-primary/50 hover:text-primary"
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
                  <Card className="h-full border-primary/18 bg-card/95 shadow-sm backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-lg">
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="inline-flex rounded-md border border-primary/20 bg-primary/10 p-2 text-primary">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <span className="rounded-md bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
                          Dept
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="line-clamp-2 text-base font-semibold text-foreground">
                          {department.name}
                        </h3>
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          Head of Department
                        </p>
                        <p className="line-clamp-2 text-sm font-medium text-foreground/90">
                          {department.hodName || "To be updated"}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                        Open profile
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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

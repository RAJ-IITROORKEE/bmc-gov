import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Link2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicDepartmentBySlug } from "@/lib/departments/service";

interface DepartmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function DepartmentDetailPage({ params }: DepartmentPageProps) {
  const { id } = await params;
  const department = await getPublicDepartmentBySlug(id);

  if (!department) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden border-b">
        <div className="absolute inset-0">
          <Image
            src={department.coverImageUrl || "/banner_bmc.jpg"}
            alt={department.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/50" />
        </div>

        <div className="container relative mx-auto px-4 py-18 text-white md:py-24">
          <Link
            href="/departments"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-sm transition hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Departments
          </Link>

          <h1 className="max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
            Department of {department.name}
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/90 md:text-base">
            {department.overview ||
              "Faculty profiles are maintained by the department administration and updated regularly."}
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-10 md:py-14">
        {(department.sourceUrl || department.academicDetailsPdfUrl) && (
          <Card>
            <CardContent className="flex flex-wrap items-center gap-3 pt-5">
              {department.sourceUrl && (
                <Link
                  href={department.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Link2 className="h-4 w-4" />
                  Source Page
                </Link>
              )}
              {department.academicDetailsPdfUrl && (
                <Link
                  href={department.academicDetailsPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" />
                  Departmental Academic Details
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {department.groupedFaculty.length === 0 ? (
          <Card>
            <CardContent className="py-14 text-center text-muted-foreground">
              Faculty details are being updated for this department.
            </CardContent>
          </Card>
        ) : (
          department.groupedFaculty.map((group) => (
            <Card key={group.roleKey}>
              <CardHeader className="border-b bg-muted/25">
                <CardTitle className="flex items-center justify-between gap-3">
                  <span className="text-lg">{group.roleLabel}</span>
                  <Badge variant="secondary">{group.members.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {group.members.map((member) => (
                    <div
                      key={member.id}
                      className="rounded-xl border bg-card p-4 text-center shadow-sm transition hover:border-primary/30 hover:shadow-md"
                    >
                      <Avatar className="mx-auto h-22 w-22 border-2 border-primary/20">
                        <AvatarImage src={member.imageUrl || undefined} alt={member.name} />
                        <AvatarFallback className="text-base font-semibold">
                          {member.name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((token) => token[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="mt-3 font-semibold text-foreground">{member.name}</p>
                      {member.designation && (
                        <p className="mt-1 text-xs text-muted-foreground">{member.designation}</p>
                      )}
                      {member.specialization && (
                        <Badge variant="outline" className="mt-2 text-[11px]">
                          {member.specialization}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}

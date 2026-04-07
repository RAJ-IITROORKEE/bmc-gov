import { NextResponse } from "next/server";
import { deleteDepartment, getAdminDepartmentBySlug, upsertDepartment } from "@/lib/departments/service";

export const dynamic = "force-dynamic";

interface DepartmentUpdatePayload {
  name?: string;
  slug?: string;
  shortName?: string;
  overview?: string;
  hodName?: string;
  coverImageUrl?: string;
  sourceUrl?: string;
  academicDetailsPdfUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const department = await getAdminDepartmentBySlug(slug);

    if (!department) {
      return NextResponse.json({ message: "Department not found" }, { status: 404 });
    }

    return NextResponse.json({ department });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch department" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const existing = await getAdminDepartmentBySlug(slug);

    if (!existing) {
      return NextResponse.json({ message: "Department not found" }, { status: 404 });
    }

    const body = (await request.json()) as DepartmentUpdatePayload;
    const nextName = body.name?.trim() || existing.name;

    const department = await upsertDepartment({
      id: existing.id,
      name: nextName,
      slug: body.slug ?? existing.slug,
      shortName: body.shortName ?? existing.shortName ?? undefined,
      overview: body.overview ?? existing.overview ?? undefined,
      hodName: body.hodName ?? existing.hodName ?? undefined,
      coverImageUrl: body.coverImageUrl ?? existing.coverImageUrl ?? undefined,
      sourceUrl: body.sourceUrl ?? existing.sourceUrl ?? undefined,
      academicDetailsPdfUrl:
        body.academicDetailsPdfUrl ?? existing.academicDetailsPdfUrl ?? undefined,
      displayOrder: body.displayOrder ?? existing.displayOrder,
      isActive: body.isActive ?? existing.isActive,
    });

    return NextResponse.json({ department });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Department slug already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Failed to update department" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const existing = await getAdminDepartmentBySlug(slug);

    if (!existing) {
      return NextResponse.json({ message: "Department not found" }, { status: 404 });
    }

    await deleteDepartment(existing.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete department" },
      { status: 500 },
    );
  }
}

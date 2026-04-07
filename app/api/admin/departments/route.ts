import { NextResponse } from "next/server";
import { getAdminDepartments, upsertDepartment } from "@/lib/departments/service";

export const dynamic = "force-dynamic";

interface DepartmentPayload {
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

export async function GET() {
  try {
    const departments = await getAdminDepartments();
    return NextResponse.json({ departments });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch departments" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DepartmentPayload;
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        { message: "Department name is required" },
        { status: 400 },
      );
    }

    const department = await upsertDepartment({
      name,
      slug: body.slug,
      shortName: body.shortName,
      overview: body.overview,
      hodName: body.hodName,
      coverImageUrl: body.coverImageUrl,
      sourceUrl: body.sourceUrl,
      academicDetailsPdfUrl: body.academicDetailsPdfUrl,
      displayOrder: body.displayOrder,
      isActive: body.isActive,
    });

    return NextResponse.json({ department }, { status: 201 });
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
      { message: "Failed to create department" },
      { status: 500 },
    );
  }
}

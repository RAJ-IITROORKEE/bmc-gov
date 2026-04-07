import { NextResponse } from "next/server";
import { getPublicDepartmentBySlug } from "@/lib/departments/service";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const department = await getPublicDepartmentBySlug(slug);

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

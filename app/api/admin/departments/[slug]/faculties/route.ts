import { NextResponse } from "next/server";
import { getAdminDepartmentBySlug, upsertFaculty } from "@/lib/departments/service";
import { normalizeRoleKey } from "@/lib/departments/helpers";

export const dynamic = "force-dynamic";

interface FacultyPayload {
  name?: string;
  roleKey?: string;
  roleLabel?: string;
  designation?: string;
  specialization?: string;
  imageUrl?: string;
  profileUrl?: string;
  bio?: string;
  sortOrder?: number;
  isActive?: boolean;
}

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const department = await getAdminDepartmentBySlug(slug);

    if (!department) {
      return NextResponse.json({ message: "Department not found" }, { status: 404 });
    }

    const body = (await request.json()) as FacultyPayload;
    const name = body.name?.trim();
    const roleLabel = body.roleLabel?.trim();

    if (!name || !roleLabel) {
      return NextResponse.json(
        { message: "Faculty name and role label are required" },
        { status: 400 },
      );
    }

    const faculty = await upsertFaculty({
      departmentId: department.id,
      name,
      roleLabel,
      roleKey: body.roleKey?.trim() || normalizeRoleKey(roleLabel),
      designation: body.designation,
      specialization: body.specialization,
      imageUrl: body.imageUrl,
      profileUrl: body.profileUrl,
      bio: body.bio,
      sortOrder: body.sortOrder,
      isActive: body.isActive,
    });

    return NextResponse.json({ faculty }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create faculty" },
      { status: 500 },
    );
  }
}

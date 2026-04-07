import { NextResponse } from "next/server";
import { deleteFaculty, getAdminDepartmentBySlug, upsertFaculty } from "@/lib/departments/service";
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
  params: Promise<{ slug: string; facultyId: string }>;
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { slug, facultyId } = await params;
    const department = await getAdminDepartmentBySlug(slug);

    if (!department) {
      return NextResponse.json({ message: "Department not found" }, { status: 404 });
    }

    const existing = department.faculties.find((item) => item.id === facultyId);
    if (!existing) {
      return NextResponse.json({ message: "Faculty not found" }, { status: 404 });
    }

    const body = (await request.json()) as FacultyPayload;
    const nextName = body.name?.trim() || existing.name;
    const nextRoleLabel = body.roleLabel?.trim() || existing.roleLabel;

    const faculty = await upsertFaculty({
      id: existing.id,
      departmentId: department.id,
      name: nextName,
      roleLabel: nextRoleLabel,
      roleKey:
        body.roleKey?.trim() || normalizeRoleKey(nextRoleLabel || existing.roleKey),
      designation: body.designation ?? existing.designation ?? undefined,
      specialization: body.specialization ?? existing.specialization ?? undefined,
      imageUrl: body.imageUrl ?? existing.imageUrl ?? undefined,
      profileUrl: body.profileUrl ?? existing.profileUrl ?? undefined,
      bio: body.bio ?? existing.bio ?? undefined,
      sortOrder: body.sortOrder ?? existing.sortOrder,
      isActive: body.isActive ?? existing.isActive,
    });

    return NextResponse.json({ faculty });
  } catch {
    return NextResponse.json(
      { message: "Failed to update faculty" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { slug, facultyId } = await params;
    const department = await getAdminDepartmentBySlug(slug);

    if (!department) {
      return NextResponse.json({ message: "Department not found" }, { status: 404 });
    }

    const existing = department.faculties.find((item) => item.id === facultyId);
    if (!existing) {
      return NextResponse.json({ message: "Faculty not found" }, { status: 404 });
    }

    await deleteFaculty(existing.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete faculty" },
      { status: 500 },
    );
  }
}

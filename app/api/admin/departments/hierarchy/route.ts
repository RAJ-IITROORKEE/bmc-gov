import { NextResponse } from "next/server";
import { getRoleHierarchy, updateRoleHierarchyOrder } from "@/lib/departments/service";

export const dynamic = "force-dynamic";

interface RoleOrderPayload {
  roles?: Array<{
    id: string;
    displayOrder: number;
    isActive?: boolean;
    label?: string;
  }>;
}

export async function GET() {
  try {
    const roles = await getRoleHierarchy();
    return NextResponse.json({ roles });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch role hierarchy" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as RoleOrderPayload;

    if (!Array.isArray(body.roles) || body.roles.length === 0) {
      return NextResponse.json(
        { message: "roles array is required" },
        { status: 400 },
      );
    }

    const roles = await updateRoleHierarchyOrder(body.roles);
    return NextResponse.json({ roles });
  } catch {
    return NextResponse.json(
      { message: "Failed to update role hierarchy" },
      { status: 500 },
    );
  }
}

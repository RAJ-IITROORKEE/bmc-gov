import { NextResponse } from "next/server";
import { getPublicDepartments } from "@/lib/departments/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const departments = await getPublicDepartments();
    return NextResponse.json({ departments });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch departments" },
      { status: 500 },
    );
  }
}

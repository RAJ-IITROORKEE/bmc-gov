import { NextResponse } from "next/server";
import { getPrincipalMessageOrDefault } from "@/lib/principal-message/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const principalMessage = await getPrincipalMessageOrDefault();
    return NextResponse.json({ principalMessage });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch principal message" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { validatePrincipalMessagePayload } from "@/lib/principal-message/schema";
import { getPrincipalMessageOrDefault, upsertPrincipalMessage } from "@/lib/principal-message/service";

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

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = validatePrincipalMessagePayload(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.errors[0], errors: parsed.errors },
        { status: 400 },
      );
    }

    const principalMessage = await upsertPrincipalMessage(parsed.data);

    return NextResponse.json({ principalMessage });
  } catch {
    return NextResponse.json(
      { message: "Failed to update principal message" },
      { status: 500 },
    );
  }
}

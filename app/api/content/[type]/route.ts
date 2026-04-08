import { NextResponse } from "next/server";
import { parseRouteContentType } from "@/lib/content-documents/constants";
import { getPublicContentDocuments } from "@/lib/content-documents/service";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ type: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { type } = await params;
    const contentType = parseRouteContentType(type);

    if (!contentType) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const items = await getPublicContentDocuments(contentType);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch content items" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { parseRouteContentType } from "@/lib/content-documents/constants";
import { getContentDocumentById } from "@/lib/content-documents/service";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ type: string; id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { type, id } = await params;
    const contentType = parseRouteContentType(type);

    if (!contentType) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const item = await getContentDocumentById(id);

    if (!item || item.type !== contentType) {
      return NextResponse.json({ message: "Content item not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch content item" },
      { status: 500 },
    );
  }
}

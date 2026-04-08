import { NextResponse } from "next/server";
import { parseRouteContentType } from "@/lib/content-documents/constants";
import { validateContentDocumentPayload } from "@/lib/content-documents/schema";
import { createContentDocument, getAdminContentDocuments } from "@/lib/content-documents/service";

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

    const items = await getAdminContentDocuments(contentType);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch content items" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { type } = await params;
    const contentType = parseRouteContentType(type);

    if (!contentType) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const payload = (await request.json()) as unknown;
    const parsed = validateContentDocumentPayload(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.errors[0], errors: parsed.errors },
        { status: 400 },
      );
    }

    const item = await createContentDocument(contentType, parsed.data);
    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to create content item" },
      { status: 500 },
    );
  }
}

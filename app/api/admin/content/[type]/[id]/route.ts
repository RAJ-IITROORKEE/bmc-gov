import { NextResponse } from "next/server";
import { parseRouteContentType } from "@/lib/content-documents/constants";
import { validateContentDocumentPayload } from "@/lib/content-documents/schema";
import {
  deleteContentDocument,
  getContentDocumentById,
  updateContentDocument,
} from "@/lib/content-documents/service";

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

    const item = await getContentDocumentById(id, true);

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

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { type, id } = await params;
    const contentType = parseRouteContentType(type);

    if (!contentType) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const existing = await getContentDocumentById(id, true);
    if (!existing || existing.type !== contentType) {
      return NextResponse.json({ message: "Content item not found" }, { status: 404 });
    }

    const payload = (await request.json()) as unknown;
    const parsed = validateContentDocumentPayload(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.errors[0], errors: parsed.errors },
        { status: 400 },
      );
    }

    const item = await updateContentDocument(id, parsed.data);
    return NextResponse.json({ item });
  } catch {
    return NextResponse.json(
      { message: "Failed to update content item" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { type, id } = await params;
    const contentType = parseRouteContentType(type);

    if (!contentType) {
      return NextResponse.json({ message: "Invalid content type" }, { status: 400 });
    }

    const existing = await getContentDocumentById(id, true);
    if (!existing || existing.type !== contentType) {
      return NextResponse.json({ message: "Content item not found" }, { status: 404 });
    }

    await deleteContentDocument(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete content item" },
      { status: 500 },
    );
  }
}

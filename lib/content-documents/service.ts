import { prisma } from "@/lib/prisma";
import { toContentDocumentItem } from "@/lib/content-documents/helpers";
import type { ContentDocumentInput, ContentDocumentItem } from "@/lib/content-documents/types";
import type { ContentType } from "@prisma/client";

function cleanOptional(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function resolvePublishedAt(value?: string): Date {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }

  return parsed;
}

export async function getAdminContentDocuments(type: ContentType): Promise<ContentDocumentItem[]> {
  const rows = await prisma.contentDocument.findMany({
    where: { type },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return rows.map(toContentDocumentItem);
}

export async function getPublicContentDocuments(type: ContentType): Promise<ContentDocumentItem[]> {
  const rows = await prisma.contentDocument.findMany({
    where: { type, isActive: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return rows.map(toContentDocumentItem);
}

export async function getContentDocumentById(
  id: string,
  includeInactive = false,
): Promise<ContentDocumentItem | null> {
  const row = await prisma.contentDocument.findUnique({ where: { id } });

  if (!row) {
    return null;
  }

  if (!includeInactive && !row.isActive) {
    return null;
  }

  return toContentDocumentItem(row);
}

export async function createContentDocument(
  type: ContentType,
  input: ContentDocumentInput,
): Promise<ContentDocumentItem> {
  const row = await prisma.contentDocument.create({
    data: {
      type,
      title: input.title.trim(),
      description: input.description.trim(),
      pdfUrl: input.pdfUrl.trim(),
      pdfPublicId: cleanOptional(input.pdfPublicId) ?? null,
      isActive: input.isActive ?? true,
      publishedAt: resolvePublishedAt(input.publishedAt),
    },
  });

  return toContentDocumentItem(row);
}

export async function updateContentDocument(
  id: string,
  input: ContentDocumentInput,
): Promise<ContentDocumentItem> {
  const row = await prisma.contentDocument.update({
    where: { id },
    data: {
      title: input.title.trim(),
      description: input.description.trim(),
      pdfUrl: input.pdfUrl.trim(),
      pdfPublicId: cleanOptional(input.pdfPublicId) ?? null,
      isActive: input.isActive ?? true,
      publishedAt: resolvePublishedAt(input.publishedAt),
    },
  });

  return toContentDocumentItem(row);
}

export async function deleteContentDocument(id: string) {
  return prisma.contentDocument.delete({ where: { id } });
}

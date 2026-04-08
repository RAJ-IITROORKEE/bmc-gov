import type { ContentDocumentItem } from "@/lib/content-documents/types";
import type { ContentType } from "@prisma/client";

type ContentDocumentRow = {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  pdfUrl: string;
  pdfPublicId: string | null;
  isActive: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export function toContentDocumentItem(item: ContentDocumentRow): ContentDocumentItem {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    pdfUrl: item.pdfUrl,
    pdfPublicId: item.pdfPublicId,
    isActive: item.isActive,
    publishedAt: item.publishedAt.toISOString(),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

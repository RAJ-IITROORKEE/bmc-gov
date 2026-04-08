import type { ContentType } from "@prisma/client";

export interface ContentDocumentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  pdfUrl: string;
  pdfPublicId: string | null;
  isActive: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentDocumentInput {
  title: string;
  description: string;
  pdfUrl: string;
  pdfPublicId?: string;
  isActive?: boolean;
  publishedAt?: string;
}

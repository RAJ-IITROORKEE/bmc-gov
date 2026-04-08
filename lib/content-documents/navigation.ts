import { notFound, redirect } from "next/navigation";
import { getContentDocumentById } from "@/lib/content-documents/service";
import type { ContentType } from "@prisma/client";

export async function redirectToContentDocumentPdf(
  id: string,
  expectedType: ContentType,
): Promise<never> {
  const item = await getContentDocumentById(id);

  if (!item || item.type !== expectedType) {
    notFound();
  }

  redirect(item.pdfUrl);
}

import { redirectToContentDocumentPdf } from "@/lib/content-documents/navigation";

interface NoticePdfPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoticePdfPage({ params }: NoticePdfPageProps) {
  const { id } = await params;
  await redirectToContentDocumentPdf(id, "NOTICE");
}

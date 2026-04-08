import { redirectToContentDocumentPdf } from "@/lib/content-documents/navigation";

interface EventPdfPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPdfPage({ params }: EventPdfPageProps) {
  const { id } = await params;
  await redirectToContentDocumentPdf(id, "EVENT");
}

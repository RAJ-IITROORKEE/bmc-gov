import { redirectToContentDocumentPdf } from "@/lib/content-documents/navigation";

interface AchievementPdfPageProps {
  params: Promise<{ id: string }>;
}

export default async function AchievementPdfPage({ params }: AchievementPdfPageProps) {
  const { id } = await params;
  await redirectToContentDocumentPdf(id, "ACHIEVEMENT");
}

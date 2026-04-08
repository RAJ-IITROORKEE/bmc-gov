import ContentDocumentsManager from "@/components/admin/content-documents-manager";

export default function NoticesPage() {
  return (
    <ContentDocumentsManager
      type="notices"
      title="Notices"
      description="Manage all college notices and announcements."
    />
  );
}

import ContentDocumentsManager from "@/components/admin/content-documents-manager";

export default function EventsPage() {
  return (
    <ContentDocumentsManager
      type="events"
      title="Events"
      description="Manage administration events and programs."
    />
  );
}

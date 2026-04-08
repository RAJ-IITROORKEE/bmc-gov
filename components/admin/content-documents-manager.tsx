"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { ContentRouteType } from "@/lib/content-documents/constants";
import type { ContentDocumentItem } from "@/lib/content-documents/types";
import { Calendar, ExternalLink, FileText, Loader2, Pencil, Plus, Trash2, Upload } from "lucide-react";

interface ContentFormState {
  id?: string;
  title: string;
  description: string;
  pdfUrl: string;
  pdfPublicId: string;
  isActive: boolean;
  publishedAt: string;
}

interface ContentDocumentsManagerProps {
  type: ContentRouteType;
  title: string;
  description: string;
}

const EMPTY_FORM: ContentFormState = {
  title: "",
  description: "",
  pdfUrl: "",
  pdfPublicId: "",
  isActive: true,
  publishedAt: "",
};

function toDateTimeLocal(iso: string): string {
  const date = new Date(iso);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function createForm(item: ContentDocumentItem): ContentFormState {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    pdfUrl: item.pdfUrl,
    pdfPublicId: item.pdfPublicId ?? "",
    isActive: item.isActive,
    publishedAt: toDateTimeLocal(item.publishedAt),
  };
}

export default function ContentDocumentsManager({
  type,
  title,
  description,
}: ContentDocumentsManagerProps) {
  const [items, setItems] = useState<ContentDocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ContentFormState>(EMPTY_FORM);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isEditMode = useMemo(() => Boolean(form.id), [form.id]);

  const loadItems = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/content/${type}`, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const data = (await response.json()) as { items: ContentDocumentItem[] };
      setItems(data.items);
    } catch {
      toast.error(`Could not load ${title.toLowerCase()}.`);
    } finally {
      setIsLoading(false);
    }
  }, [title, type]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  async function handleSave() {
    if (!form.title.trim() || !form.description.trim() || !form.pdfUrl.trim()) {
      toast.error("Title, description, and PDF URL are required.");
      return;
    }

    setIsSaving(true);

    try {
      const endpoint = isEditMode
        ? `/api/admin/content/${type}/${form.id}`
        : `/api/admin/content/${type}`;
      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          pdfUrl: form.pdfUrl,
          pdfPublicId: form.pdfPublicId,
          isActive: form.isActive,
          publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : undefined,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Failed to save content item");
      }

      toast.success(isEditMode ? "Item updated." : "Item created.");
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save item.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this item?");

    if (!confirmed) {
      return;
    }

    setIsDeletingId(id);

    try {
      const response = await fetch(`/api/admin/content/${type}/${id}`, {
        method: "DELETE",
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete item");
      }

      toast.success("Item deleted.");
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete item.");
    } finally {
      setIsDeletingId(null);
    }
  }

  async function handleUploadPdf(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads/pdf", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as {
        fileUrl?: string;
        publicId?: string;
        message?: string;
      };

      if (!response.ok || !data.fileUrl) {
        throw new Error(data.message || "Failed to upload PDF");
      }

      setForm((previous) => ({
        ...previous,
        pdfUrl: data.fileUrl || previous.pdfUrl,
        pdfPublicId: data.publicId || previous.pdfPublicId,
      }));
      toast.success("PDF uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload PDF.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setForm(EMPTY_FORM);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setForm(EMPTY_FORM);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Item" : "Create Item"}</DialogTitle>
              <DialogDescription>
                Title, description, and PDF are required. Clicking on item in frontend opens this
                PDF in a new tab.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="item-title">Title</Label>
                <Input
                  id="item-title"
                  value={form.title}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      title: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="item-description">Description</Label>
                <Textarea
                  id="item-description"
                  className="min-h-32"
                  value={form.description}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      description: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="item-published-at">Published At</Label>
                  <Input
                    id="item-published-at"
                    type="datetime-local"
                    value={form.publishedAt}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        publishedAt: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="item-status">Status</Label>
                  <Select
                    value={form.isActive ? "active" : "inactive"}
                    onValueChange={(value) =>
                      setForm((previous) => ({
                        ...previous,
                        isActive: value === "active",
                      }))
                    }
                  >
                    <SelectTrigger id="item-status" className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="item-pdf-url">PDF URL</Label>
                <Input
                  id="item-pdf-url"
                  value={form.pdfUrl}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      pdfUrl: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 rounded-lg border p-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(event) => void handleUploadPdf(event)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isSaving}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading PDF...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload PDF to Cloudinary
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">Only PDF files are supported.</p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setForm(EMPTY_FORM);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => void handleSave()} disabled={isSaving || isUploading}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title} List</CardTitle>
          <CardDescription>Manage all entries from here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-dashed py-12 text-center text-muted-foreground">
              No items yet. Click <span className="font-medium">Add New</span> to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>PDF</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.title}</div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(item.publishedAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.isActive ? "default" : "outline"}>
                        {item.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        Open
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setForm(createForm(item));
                            setDialogOpen(true);
                          }}
                        >
                          <Pencil className="mr-1 h-3.5 w-3.5" />
                          Edit
                        </Button>

                        <Button asChild variant="outline" size="sm">
                          <Link href={item.pdfUrl} target="_blank" rel="noreferrer">
                            <ExternalLink className="mr-1 h-3.5 w-3.5" />
                            PDF
                          </Link>
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isDeletingId === item.id}
                          onClick={() => void handleDelete(item.id)}
                        >
                          {isDeletingId === item.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="mr-1 h-3.5 w-3.5" />
                              Delete
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

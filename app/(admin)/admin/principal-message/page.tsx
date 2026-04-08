"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Upload } from "lucide-react";

interface PrincipalMessageFormState {
  name: string;
  designation: string;
  officeEmail: string;
  profileImageUrl: string;
  message: string;
}

interface PrincipalMessageResponse {
  principalMessage: {
    name: string;
    designation: string;
    officeEmail: string | null;
    profileImageUrl: string;
    message: string;
  };
}

const EMPTY_FORM: PrincipalMessageFormState = {
  name: "",
  designation: "",
  officeEmail: "",
  profileImageUrl: "",
  message: "",
};

function getInitials(name: string): string {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || "PM";
}

export default function PrincipalMessagePage() {
  const [form, setForm] = useState<PrincipalMessageFormState>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewInitials = useMemo(() => getInitials(form.name), [form.name]);

  async function loadPrincipalMessage() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/principal-message", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to load principal message");
      }

      const data = (await response.json()) as PrincipalMessageResponse;

      setForm({
        name: data.principalMessage.name,
        designation: data.principalMessage.designation,
        officeEmail: data.principalMessage.officeEmail ?? "",
        profileImageUrl: data.principalMessage.profileImageUrl,
        message: data.principalMessage.message,
      });
    } catch {
      toast.error("Could not load principal message.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadPrincipalMessage();
  }, []);

  async function handleSave() {
    if (!form.name.trim() || !form.designation.trim() || !form.message.trim()) {
      toast.error("Name, designation, and message are required.");
      return;
    }

    if (!form.profileImageUrl.trim()) {
      toast.error("Principal profile image is required.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/principal-message", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        principalMessage?: PrincipalMessageResponse["principalMessage"];
        message?: string;
      };

      if (!response.ok || !data.principalMessage) {
        throw new Error(data.message || "Failed to save principal message");
      }

      setForm({
        name: data.principalMessage.name,
        designation: data.principalMessage.designation,
        officeEmail: data.principalMessage.officeEmail ?? "",
        profileImageUrl: data.principalMessage.profileImageUrl,
        message: data.principalMessage.message,
      });

      toast.success("Principal message updated successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save principal message.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads/principal-image", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as {
        imageUrl?: string;
        message?: string;
      };

      if (!response.ok || !data.imageUrl) {
        throw new Error(data.message || "Failed to upload image");
      }

      setForm((previous) => ({
        ...previous,
        profileImageUrl: data.imageUrl || previous.profileImageUrl,
      }));

      toast.success("Profile image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading principal message...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Principal Message</h1>
          <p className="text-muted-foreground">
            Edit and update the principal&apos;s message
          </p>
        </div>
        <Button onClick={() => void handleSave()} disabled={isSaving || isUploading}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Message
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Principal Message Editor</CardTitle>
          <CardDescription>
            Update principal profile details and public message content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="principal-name">Name</Label>
              <Input
                id="principal-name"
                value={form.name}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    name: event.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="principal-designation">Designation</Label>
              <Input
                id="principal-designation"
                value={form.designation}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    designation: event.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="principal-office-email">Office Email (optional)</Label>
              <Input
                id="principal-office-email"
                type="email"
                value={form.officeEmail}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    officeEmail: event.target.value,
                  }))
                }
                placeholder="principal@bmcgov.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="principal-image-url">Profile Image URL</Label>
              <Input
                id="principal-image-url"
                value={form.profileImageUrl}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    profileImageUrl: event.target.value,
                  }))
                }
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center gap-3 rounded-lg border p-3">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={form.profileImageUrl} alt={form.name || "Principal"} />
                <AvatarFallback>{previewInitials}</AvatarFallback>
              </Avatar>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => void handleUploadFile(event)}
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
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload to Cloudinary
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, or WEBP supported.
                </p>
              </div>
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="principal-message">Message</Label>
              <Textarea
                id="principal-message"
                value={form.message}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    message: event.target.value,
                  }))
                }
                className="min-h-56"
                placeholder="Write the principal message..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

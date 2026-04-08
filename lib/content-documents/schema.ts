import type { ContentDocumentInput } from "@/lib/content-documents/types";

type ValidationSuccess = {
  success: true;
  data: ContentDocumentInput;
};

type ValidationFailure = {
  success: false;
  errors: string[];
};

export type ContentDocumentValidationResult = ValidationSuccess | ValidationFailure;

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidHttpUrl(value: string): boolean {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateContentDocumentPayload(
  payload: unknown,
): ContentDocumentValidationResult {
  if (!payload || typeof payload !== "object") {
    return { success: false, errors: ["Invalid payload"] };
  }

  const body = payload as Record<string, unknown>;

  const data: ContentDocumentInput = {
    title: normalizeString(body.title),
    description: normalizeString(body.description),
    pdfUrl: normalizeString(body.pdfUrl),
    pdfPublicId: normalizeString(body.pdfPublicId),
    isActive: typeof body.isActive === "boolean" ? body.isActive : true,
    publishedAt: normalizeString(body.publishedAt),
  };

  const errors: string[] = [];

  if (!data.title) {
    errors.push("Title is required");
  } else if (data.title.length > 180) {
    errors.push("Title must be 180 characters or fewer");
  }

  if (!data.description) {
    errors.push("Description is required");
  } else if (data.description.length > 5000) {
    errors.push("Description must be 5000 characters or fewer");
  }

  if (!data.pdfUrl) {
    errors.push("PDF URL is required");
  } else if (!isValidHttpUrl(data.pdfUrl)) {
    errors.push("PDF URL must be a valid URL");
  }

  if (data.publishedAt) {
    const date = new Date(data.publishedAt);
    if (Number.isNaN(date.getTime())) {
      errors.push("Published date must be valid");
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

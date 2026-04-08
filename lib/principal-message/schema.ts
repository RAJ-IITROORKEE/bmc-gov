import type { PrincipalMessageInput } from "@/lib/principal-message/types";

type ValidationSuccess = {
  success: true;
  data: PrincipalMessageInput;
};

type ValidationFailure = {
  success: false;
  errors: string[];
};

export type PrincipalMessageValidationResult = ValidationSuccess | ValidationFailure;

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidUrl(value: string): boolean {
  if (!value) {
    return false;
  }

  if (value.startsWith("/")) {
    return true;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmail(value: string): boolean {
  if (!value) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validatePrincipalMessagePayload(payload: unknown): PrincipalMessageValidationResult {
  if (!payload || typeof payload !== "object") {
    return { success: false, errors: ["Invalid payload"] };
  }

  const body = payload as Record<string, unknown>;

  const data: PrincipalMessageInput = {
    name: normalizeString(body.name),
    designation: normalizeString(body.designation),
    message: normalizeString(body.message),
    profileImageUrl: normalizeString(body.profileImageUrl),
    officeEmail: normalizeString(body.officeEmail),
  };

  const errors: string[] = [];

  if (!data.name) {
    errors.push("Name is required");
  } else if (data.name.length > 120) {
    errors.push("Name must be 120 characters or fewer");
  }

  if (!data.designation) {
    errors.push("Designation is required");
  } else if (data.designation.length > 160) {
    errors.push("Designation must be 160 characters or fewer");
  }

  if (!data.message) {
    errors.push("Message is required");
  } else if (data.message.length < 50) {
    errors.push("Message must be at least 50 characters");
  } else if (data.message.length > 6000) {
    errors.push("Message must be 6000 characters or fewer");
  }

  if (!data.profileImageUrl) {
    errors.push("Profile image is required");
  } else if (!isValidUrl(data.profileImageUrl)) {
    errors.push("Profile image must be a valid URL or root-relative path");
  }

  if (!isValidEmail(data.officeEmail || "")) {
    errors.push("Office email must be a valid email address");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

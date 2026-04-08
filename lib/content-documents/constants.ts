import type { ContentType } from "@prisma/client";

export type ContentRouteType = "notices" | "events" | "achievements";

export const ROUTE_TO_CONTENT_TYPE: Record<ContentRouteType, ContentType> = {
  notices: "NOTICE",
  events: "EVENT",
  achievements: "ACHIEVEMENT",
};

export const CONTENT_TYPE_TO_ROUTE: Record<ContentType, ContentRouteType> = {
  NOTICE: "notices",
  EVENT: "events",
  ACHIEVEMENT: "achievements",
};

export const CONTENT_LABELS: Record<ContentType, { single: string; plural: string }> = {
  NOTICE: { single: "Notice", plural: "Notices" },
  EVENT: { single: "Event", plural: "Events" },
  ACHIEVEMENT: { single: "Achievement", plural: "Achievements" },
};

export function parseRouteContentType(value: string): ContentType | null {
  if (value === "notices") return "NOTICE";
  if (value === "events") return "EVENT";
  if (value === "achievements") return "ACHIEVEMENT";
  return null;
}

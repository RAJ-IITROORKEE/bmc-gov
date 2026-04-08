import type { PrincipalMessageItem } from "@/lib/principal-message/types";

type PrincipalMessageRow = {
  id: string;
  key: string;
  name: string;
  designation: string;
  message: string;
  profileImageUrl: string;
  officeEmail: string | null;
  updatedAt: Date;
};

export function toPrincipalMessageItem(principal: PrincipalMessageRow): PrincipalMessageItem {
  return {
    id: principal.id,
    key: principal.key,
    name: principal.name,
    designation: principal.designation,
    message: principal.message,
    profileImageUrl: principal.profileImageUrl,
    officeEmail: principal.officeEmail,
    updatedAt: principal.updatedAt.toISOString(),
  };
}

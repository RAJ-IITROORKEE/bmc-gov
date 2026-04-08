import { prisma } from "@/lib/prisma";
import { DEFAULT_PRINCIPAL_MESSAGE, PRINCIPAL_MESSAGE_KEY } from "@/lib/principal-message/constants";
import { toPrincipalMessageItem } from "@/lib/principal-message/helpers";
import type { PrincipalMessageInput } from "@/lib/principal-message/types";

function cleanOptional(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function getPrincipalMessage() {
  const principal = await prisma.principalMessage.findUnique({
    where: { key: PRINCIPAL_MESSAGE_KEY },
  });

  if (!principal) {
    return null;
  }

  return toPrincipalMessageItem(principal);
}

export async function getPrincipalMessageOrDefault() {
  const principal = await prisma.principalMessage.upsert({
    where: { key: PRINCIPAL_MESSAGE_KEY },
    update: {},
    create: {
      key: PRINCIPAL_MESSAGE_KEY,
      name: DEFAULT_PRINCIPAL_MESSAGE.name,
      designation: DEFAULT_PRINCIPAL_MESSAGE.designation,
      message: DEFAULT_PRINCIPAL_MESSAGE.message,
      profileImageUrl: DEFAULT_PRINCIPAL_MESSAGE.profileImageUrl,
      officeEmail: cleanOptional(DEFAULT_PRINCIPAL_MESSAGE.officeEmail) ?? null,
    },
  });

  return toPrincipalMessageItem(principal);
}

export async function upsertPrincipalMessage(input: PrincipalMessageInput) {
  const data = {
    name: input.name.trim(),
    designation: input.designation.trim(),
    message: input.message.trim(),
    profileImageUrl: input.profileImageUrl.trim(),
    officeEmail: cleanOptional(input.officeEmail) ?? null,
  };

  const principal = await prisma.principalMessage.upsert({
    where: { key: PRINCIPAL_MESSAGE_KEY },
    update: data,
    create: {
      key: PRINCIPAL_MESSAGE_KEY,
      ...data,
    },
  });

  return toPrincipalMessageItem(principal);
}

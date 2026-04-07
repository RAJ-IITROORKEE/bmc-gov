import { prisma } from "@/lib/prisma";
import { buildRoleDefaults, normalizeRoleKey, normalizeSlug, toDepartmentDetailItem, toDepartmentListItem, toPublicDepartmentCard, toPublicDepartmentDetails, toRoleHierarchyItem } from "@/lib/departments/helpers";

interface UpsertDepartmentInput {
  id?: string;
  name: string;
  slug?: string;
  shortName?: string;
  overview?: string;
  hodName?: string;
  coverImageUrl?: string;
  sourceUrl?: string;
  academicDetailsPdfUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface UpsertFacultyInput {
  id?: string;
  departmentId: string;
  name: string;
  roleKey: string;
  roleLabel: string;
  designation?: string;
  specialization?: string;
  imageUrl?: string;
  profileUrl?: string;
  bio?: string;
  sortOrder?: number;
  isActive?: boolean;
}

function cleanOptional(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function ensureRoleHierarchySeeded() {
  const existing = await prisma.facultyRoleHierarchy.count();
  if (existing > 0) {
    return;
  }

  const defaults = buildRoleDefaults();
  await prisma.facultyRoleHierarchy.createMany({ data: defaults });
}

export async function getAdminDepartments() {
  const departments = await prisma.department.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    include: {
      faculties: {
        where: { isActive: true },
        select: { roleKey: true, name: true },
      },
    },
  });

  return departments.map((department: (typeof departments)[number]) =>
    toDepartmentListItem(department, department.faculties),
  );
}

export async function getAdminDepartmentBySlug(slug: string) {
  const department = await prisma.department.findUnique({
    where: { slug },
    include: {
      faculties: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      },
    },
  });

  if (!department) {
    return null;
  }

  return toDepartmentDetailItem(department);
}

export async function upsertDepartment(input: UpsertDepartmentInput) {
  const name = input.name.trim();
  const slug = normalizeSlug(input.slug?.trim() || name);

  const data = {
    name,
    slug,
    shortName: cleanOptional(input.shortName) ?? null,
    overview: cleanOptional(input.overview) ?? null,
    hodName: cleanOptional(input.hodName) ?? null,
    coverImageUrl: cleanOptional(input.coverImageUrl) ?? null,
    sourceUrl: cleanOptional(input.sourceUrl) ?? null,
    academicDetailsPdfUrl: cleanOptional(input.academicDetailsPdfUrl) ?? null,
    displayOrder: input.displayOrder ?? 0,
    isActive: input.isActive ?? true,
  };

  if (input.id) {
    return prisma.department.update({
      where: { id: input.id },
      data,
    });
  }

  return prisma.department.create({ data });
}

export async function deleteDepartment(id: string) {
  await prisma.faculty.deleteMany({ where: { departmentId: id } });
  return prisma.department.delete({ where: { id } });
}

export async function upsertFaculty(input: UpsertFacultyInput) {
  const name = input.name.trim();
  const roleLabel = input.roleLabel.trim();
  const roleKey = normalizeRoleKey(input.roleKey || roleLabel);

  const data = {
    departmentId: input.departmentId,
    name,
    roleKey,
    roleLabel,
    designation: cleanOptional(input.designation) ?? null,
    specialization: cleanOptional(input.specialization) ?? null,
    imageUrl: cleanOptional(input.imageUrl) ?? null,
    profileUrl: cleanOptional(input.profileUrl) ?? null,
    bio: cleanOptional(input.bio) ?? null,
    sortOrder: input.sortOrder ?? 0,
    isActive: input.isActive ?? true,
  };

  const roleExists = await prisma.facultyRoleHierarchy.findUnique({
    where: { key: roleKey },
  });

  if (!roleExists) {
    const currentMax = await prisma.facultyRoleHierarchy.findFirst({
      orderBy: { displayOrder: "desc" },
      select: { displayOrder: true },
    });

    await prisma.facultyRoleHierarchy.create({
      data: {
        key: roleKey,
        label: roleLabel,
        displayOrder: (currentMax?.displayOrder ?? -1) + 1,
        isActive: true,
      },
    });
  }

  if (input.id) {
    const updated = await prisma.faculty.update({
      where: { id: input.id },
      data,
    });

    if (roleKey === "hod") {
      await prisma.department.update({
        where: { id: input.departmentId },
        data: { hodName: name },
      });
    }

    return updated;
  }

  const created = await prisma.faculty.create({ data });

  if (roleKey === "hod") {
    await prisma.department.update({
      where: { id: input.departmentId },
      data: { hodName: name },
    });
  }

  return created;
}

export async function deleteFaculty(id: string) {
  const existing = await prisma.faculty.findUnique({ where: { id } });
  if (!existing) {
    return null;
  }

  const removed = await prisma.faculty.delete({ where: { id } });

  if (existing.roleKey === "hod") {
    const nextHod = await prisma.faculty.findFirst({
      where: { departmentId: existing.departmentId, roleKey: "hod", isActive: true },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      select: { name: true },
    });

    await prisma.department.update({
      where: { id: existing.departmentId },
      data: { hodName: nextHod?.name ?? null },
    });
  }

  return removed;
}

export async function getRoleHierarchy() {
  await ensureRoleHierarchySeeded();
  const roles = await prisma.facultyRoleHierarchy.findMany({
    orderBy: [{ displayOrder: "asc" }, { label: "asc" }],
  });

  return roles.map(toRoleHierarchyItem);
}

export async function updateRoleHierarchyOrder(
  items: Array<{ id: string; displayOrder: number; isActive?: boolean; label?: string }>,
) {
  await prisma.$transaction(
    items.map((item) =>
      prisma.facultyRoleHierarchy.update({
        where: { id: item.id },
        data: {
          displayOrder: item.displayOrder,
          isActive: item.isActive,
          label: item.label,
        },
      }),
    ),
  );

  return getRoleHierarchy();
}

export async function getPublicDepartments() {
  const departments = await prisma.department.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    include: {
      faculties: {
        where: { isActive: true },
        select: { roleKey: true, name: true },
      },
    },
  });

  return departments.map(toPublicDepartmentCard);
}

export async function getPublicDepartmentBySlug(slug: string) {
  const [department, hierarchy] = await Promise.all([
    prisma.department.findUnique({
      where: { slug },
      include: {
        faculties: {
          where: { isActive: true },
          orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        },
      },
    }),
    prisma.facultyRoleHierarchy.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  if (!department) {
    return null;
  }

  return toPublicDepartmentDetails(department, hierarchy);
}

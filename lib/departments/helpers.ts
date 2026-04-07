import { DEFAULT_ROLE_HIERARCHY, PROFESSOR_ROLE_KEYS } from "@/lib/departments/constants";
import {
  DepartmentDetailItem,
  DepartmentListItem,
  FacultyItem,
  PublicDepartmentCard,
  PublicDepartmentDetails,
  RoleHierarchyItem,
} from "@/lib/departments/types";

type DepartmentRow = {
  id: string;
  name: string;
  slug: string;
  shortName: string | null;
  overview: string | null;
  hodName: string | null;
  coverImageUrl: string | null;
  sourceUrl: string | null;
  academicDetailsPdfUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type FacultyRow = {
  id: string;
  departmentId: string;
  name: string;
  roleKey: string;
  roleLabel: string;
  designation: string | null;
  specialization: string | null;
  imageUrl: string | null;
  profileUrl: string | null;
  bio: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type FacultyRoleHierarchyRow = {
  id: string;
  key: string;
  label: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
};

export function toDepartmentListItem(
  department: DepartmentRow,
  faculties: Array<Pick<FacultyRow, "roleKey" | "name">>,
): DepartmentListItem {
  const hod = faculties.find((item) => item.roleKey === "hod");
  const professorCount = faculties.filter((item) => PROFESSOR_ROLE_KEYS.has(item.roleKey)).length;

  return {
    id: department.id,
    name: department.name,
    slug: department.slug,
    hodName: hod?.name ?? department.hodName ?? null,
    professorCount,
    facultyCount: faculties.length,
    displayOrder: department.displayOrder,
    isActive: department.isActive,
    updatedAt: department.updatedAt.toISOString(),
  };
}

export function toFacultyItem(faculty: FacultyRow): FacultyItem {
  return {
    id: faculty.id,
    departmentId: faculty.departmentId,
    name: faculty.name,
    roleKey: faculty.roleKey,
    roleLabel: faculty.roleLabel,
    designation: faculty.designation,
    specialization: faculty.specialization,
    imageUrl: faculty.imageUrl,
    profileUrl: faculty.profileUrl,
    bio: faculty.bio,
    sortOrder: faculty.sortOrder,
    isActive: faculty.isActive,
  };
}

export function toRoleHierarchyItem(role: FacultyRoleHierarchyRow): RoleHierarchyItem {
  return {
    id: role.id,
    key: role.key,
    label: role.label,
    description: role.description,
    displayOrder: role.displayOrder,
    isActive: role.isActive,
  };
}

export function toDepartmentDetailItem(
  department: DepartmentRow & { faculties: FacultyRow[] },
): DepartmentDetailItem {
  const hod = department.faculties.find((item) => item.roleKey === "hod");

  return {
    id: department.id,
    name: department.name,
    slug: department.slug,
    shortName: department.shortName,
    overview: department.overview,
    hodName: hod?.name ?? department.hodName ?? null,
    coverImageUrl: department.coverImageUrl,
    sourceUrl: department.sourceUrl,
    academicDetailsPdfUrl: department.academicDetailsPdfUrl,
    displayOrder: department.displayOrder,
    isActive: department.isActive,
    faculties: department.faculties.map(toFacultyItem),
  };
}

export function toPublicDepartmentCard(
  department: DepartmentRow & { faculties: Array<Pick<FacultyRow, "roleKey" | "name">> },
): PublicDepartmentCard {
  const hod = department.faculties.find((item) => item.roleKey === "hod");

  return {
    id: department.id,
    name: department.name,
    slug: department.slug,
    hodName: hod?.name ?? department.hodName ?? null,
    coverImageUrl: department.coverImageUrl,
    overview: department.overview,
  };
}

export function toPublicDepartmentDetails(
  department: DepartmentRow & { faculties: FacultyRow[] },
  hierarchy: FacultyRoleHierarchyRow[],
): PublicDepartmentDetails {
  const roleOrderMap = new Map<string, number>();
  hierarchy.forEach((role) => roleOrderMap.set(role.key, role.displayOrder));
  DEFAULT_ROLE_HIERARCHY.forEach((role, index) => {
    if (!roleOrderMap.has(role.key)) {
      roleOrderMap.set(role.key, index);
    }
  });

  const grouped = new Map<string, { roleLabel: string; members: FacultyRow[] }>();

  for (const faculty of department.faculties) {
    const existing = grouped.get(faculty.roleKey);
    if (existing) {
      existing.members.push(faculty);
      continue;
    }

    grouped.set(faculty.roleKey, {
      roleLabel: faculty.roleLabel,
      members: [faculty],
    });
  }

  const groupedFaculty = Array.from(grouped.entries())
    .sort(([roleA], [roleB]) => {
      const a = roleOrderMap.get(roleA) ?? Number.MAX_SAFE_INTEGER;
      const b = roleOrderMap.get(roleB) ?? Number.MAX_SAFE_INTEGER;
      return a - b;
    })
    .map(([roleKey, value]) => ({
      roleKey,
      roleLabel: value.roleLabel,
      members: value.members
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(toFacultyItem),
    }));

  const hod = department.faculties.find((item) => item.roleKey === "hod");

  return {
    id: department.id,
    name: department.name,
    slug: department.slug,
    overview: department.overview,
    hodName: hod?.name ?? department.hodName ?? null,
    coverImageUrl: department.coverImageUrl,
    sourceUrl: department.sourceUrl,
    academicDetailsPdfUrl: department.academicDetailsPdfUrl,
    groupedFaculty,
  };
}

export function normalizeRoleKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

export function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function buildRoleDefaults() {
  return DEFAULT_ROLE_HIERARCHY.map((role, index) => ({
    key: role.key,
    label: role.label,
    displayOrder: index,
    isActive: true,
  }));
}

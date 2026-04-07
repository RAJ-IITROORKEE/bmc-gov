export interface RoleHierarchyItem {
  id: string;
  key: string;
  label: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface FacultyItem {
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
}

export interface DepartmentListItem {
  id: string;
  name: string;
  slug: string;
  hodName: string | null;
  professorCount: number;
  facultyCount: number;
  displayOrder: number;
  isActive: boolean;
  updatedAt: string;
}

export interface DepartmentDetailItem {
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
  faculties: FacultyItem[];
}

export interface PublicDepartmentCard {
  id: string;
  name: string;
  slug: string;
  hodName: string | null;
  coverImageUrl: string | null;
  overview: string | null;
}

export interface PublicDepartmentDetails {
  id: string;
  name: string;
  slug: string;
  overview: string | null;
  hodName: string | null;
  coverImageUrl: string | null;
  sourceUrl: string | null;
  academicDetailsPdfUrl: string | null;
  groupedFaculty: Array<{
    roleKey: string;
    roleLabel: string;
    members: FacultyItem[];
  }>;
}

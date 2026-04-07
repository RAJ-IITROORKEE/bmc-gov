"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import type { DepartmentDetailItem, FacultyItem, RoleHierarchyItem } from "@/lib/departments/types";
import { ArrowLeft, Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";

interface DepartmentFormState {
  name: string;
  slug: string;
  shortName: string;
  overview: string;
  hodName: string;
  coverImageUrl: string;
  sourceUrl: string;
  academicDetailsPdfUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface FacultyFormState {
  id?: string;
  name: string;
  roleKey: string;
  roleLabel: string;
  designation: string;
  specialization: string;
  imageUrl: string;
  profileUrl: string;
  bio: string;
  sortOrder: number;
  isActive: boolean;
}

const EMPTY_FACULTY_FORM: FacultyFormState = {
  name: "",
  roleKey: "",
  roleLabel: "",
  designation: "",
  specialization: "",
  imageUrl: "",
  profileUrl: "",
  bio: "",
  sortOrder: 0,
  isActive: true,
};

function createDepartmentForm(department: DepartmentDetailItem): DepartmentFormState {
  return {
    name: department.name,
    slug: department.slug,
    shortName: department.shortName ?? "",
    overview: department.overview ?? "",
    hodName: department.hodName ?? "",
    coverImageUrl: department.coverImageUrl ?? "",
    sourceUrl: department.sourceUrl ?? "",
    academicDetailsPdfUrl: department.academicDetailsPdfUrl ?? "",
    displayOrder: department.displayOrder,
    isActive: department.isActive,
  };
}

function createFacultyForm(faculty?: FacultyItem): FacultyFormState {
  if (!faculty) {
    return EMPTY_FACULTY_FORM;
  }

  return {
    id: faculty.id,
    name: faculty.name,
    roleKey: faculty.roleKey,
    roleLabel: faculty.roleLabel,
    designation: faculty.designation ?? "",
    specialization: faculty.specialization ?? "",
    imageUrl: faculty.imageUrl ?? "",
    profileUrl: faculty.profileUrl ?? "",
    bio: faculty.bio ?? "",
    sortOrder: faculty.sortOrder,
    isActive: faculty.isActive,
  };
}

export default function DepartmentEditPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const [department, setDepartment] = useState<DepartmentDetailItem | null>(null);
  const [roles, setRoles] = useState<RoleHierarchyItem[]>([]);
  const [departmentForm, setDepartmentForm] = useState<DepartmentFormState | null>(null);
  const [facultyForm, setFacultyForm] = useState<FacultyFormState>(EMPTY_FACULTY_FORM);
  const [facultyDialogOpen, setFacultyDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingDepartment, setIsSavingDepartment] = useState(false);
  const [isSavingFaculty, setIsSavingFaculty] = useState(false);

  const sortedFaculties = useMemo(() => {
    if (!department) {
      return [];
    }

    const roleOrder = new Map<string, number>();
    roles
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .forEach((role) => {
        roleOrder.set(role.key, role.displayOrder);
      });

    return department.faculties
      .slice()
      .sort((a, b) => {
        const roleA = roleOrder.get(a.roleKey) ?? Number.MAX_SAFE_INTEGER;
        const roleB = roleOrder.get(b.roleKey) ?? Number.MAX_SAFE_INTEGER;
        if (roleA !== roleB) {
          return roleA - roleB;
        }
        if (a.sortOrder !== b.sortOrder) {
          return a.sortOrder - b.sortOrder;
        }
        return a.name.localeCompare(b.name);
      });
  }, [department, roles]);

  const loadDepartment = useCallback(async () => {
    if (!slug) {
      return;
    }

    setIsLoading(true);
    try {
      const [departmentRes, hierarchyRes] = await Promise.all([
        fetch(`/api/admin/departments/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        }),
        fetch("/api/admin/departments/hierarchy", {
          cache: "no-store",
        }),
      ]);

      if (!departmentRes.ok) {
        throw new Error("Department not found.");
      }
      if (!hierarchyRes.ok) {
        throw new Error("Failed to load role hierarchy.");
      }

      const departmentJson = (await departmentRes.json()) as {
        department: DepartmentDetailItem;
      };
      const hierarchyJson = (await hierarchyRes.json()) as {
        roles: RoleHierarchyItem[];
      };

      setDepartment(departmentJson.department);
      setDepartmentForm(createDepartmentForm(departmentJson.department));
      setRoles(hierarchyJson.roles);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load department.");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadDepartment();
  }, [loadDepartment]);

  async function handleSaveDepartment() {
    if (!department || !departmentForm) {
      return;
    }

    setIsSavingDepartment(true);

    try {
      const response = await fetch(`/api/admin/departments/${encodeURIComponent(department.slug)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departmentForm),
      });

      const data = (await response.json()) as {
        message?: string;
        department?: {
          slug?: string;
        };
      };

      if (!response.ok) {
        throw new Error(data.message || "Failed to update department");
      }

      toast.success("Department updated successfully.");
      if (data.department?.slug && data.department.slug !== department.slug) {
        router.replace(`/admin/departments/${data.department.slug}`);
        return;
      }

      await loadDepartment();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save department.");
    } finally {
      setIsSavingDepartment(false);
    }
  }

  async function handleDeleteFaculty(faculty: FacultyItem) {
    if (!department) {
      return;
    }

    const confirmed = window.confirm(`Delete faculty member ${faculty.name}?`);
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/departments/${encodeURIComponent(department.slug)}/faculties/${faculty.id}`,
        {
          method: "DELETE",
        },
      );

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete faculty");
      }

      toast.success("Faculty deleted successfully.");
      await loadDepartment();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete faculty.");
    }
  }

  async function handleSaveFaculty() {
    if (!department) {
      return;
    }

    if (!facultyForm.name.trim() || !facultyForm.roleLabel.trim()) {
      toast.error("Faculty name and role are required.");
      return;
    }

    setIsSavingFaculty(true);

    try {
      const isEdit = Boolean(facultyForm.id);
      const endpoint = isEdit
        ? `/api/admin/departments/${encodeURIComponent(department.slug)}/faculties/${facultyForm.id}`
        : `/api/admin/departments/${encodeURIComponent(department.slug)}/faculties`;

      const response = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facultyForm),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Failed to save faculty");
      }

      setFacultyDialogOpen(false);
      setFacultyForm(EMPTY_FACULTY_FORM);
      toast.success(
        isEdit ? "Faculty updated successfully." : "Faculty created successfully.",
      );
      await loadDepartment();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save faculty.");
    } finally {
      setIsSavingFaculty(false);
    }
  }

  if (isLoading || !departmentForm || !department) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading department...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/departments">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Departments
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{department.name}</h1>
          <p className="text-muted-foreground">
            Manage department profile and faculty records in one place.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Profile</CardTitle>
          <CardDescription>
            These details are used on the public department listing and detail pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="department-name">Department Name</Label>
            <Input
              id="department-name"
              value={departmentForm.name}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, name: event.target.value } : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department-slug">Slug</Label>
            <Input
              id="department-slug"
              value={departmentForm.slug}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, slug: event.target.value } : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department-short-name">Short Name</Label>
            <Input
              id="department-short-name"
              value={departmentForm.shortName}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, shortName: event.target.value } : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department-display-order">Display Order</Label>
            <Input
              id="department-display-order"
              type="number"
              value={departmentForm.displayOrder}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous
                    ? { ...previous, displayOrder: Number(event.target.value || 0) }
                    : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department-hod-name">Fallback HOD Name</Label>
            <Input
              id="department-hod-name"
              value={departmentForm.hodName}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, hodName: event.target.value } : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department-status">Status</Label>
            <Select
              value={departmentForm.isActive ? "active" : "inactive"}
              onValueChange={(value) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, isActive: value === "active" } : previous,
                )
              }
            >
              <SelectTrigger id="department-status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="department-overview">Overview</Label>
            <Textarea
              id="department-overview"
              value={departmentForm.overview}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, overview: event.target.value } : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="department-cover-image">Cover Image URL</Label>
            <Input
              id="department-cover-image"
              value={departmentForm.coverImageUrl}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, coverImageUrl: event.target.value } : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="department-source-url">Source URL</Label>
            <Input
              id="department-source-url"
              value={departmentForm.sourceUrl}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous ? { ...previous, sourceUrl: event.target.value } : previous,
                )
              }
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="department-pdf-url">Academic Details PDF URL</Label>
            <Input
              id="department-pdf-url"
              value={departmentForm.academicDetailsPdfUrl}
              onChange={(event) =>
                setDepartmentForm((previous) =>
                  previous
                    ? { ...previous, academicDetailsPdfUrl: event.target.value }
                    : previous,
                )
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button onClick={() => void handleSaveDepartment()} disabled={isSavingDepartment}>
              {isSavingDepartment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Department
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle>Faculty Members</CardTitle>
              <CardDescription>
                Add, edit, and remove faculty. Public pages follow role hierarchy and sort order.
              </CardDescription>
            </div>

            <Dialog
              open={facultyDialogOpen}
              onOpenChange={(open) => {
                setFacultyDialogOpen(open);
                if (!open) {
                  setFacultyForm(EMPTY_FACULTY_FORM);
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setFacultyForm(EMPTY_FACULTY_FORM);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {facultyForm.id ? "Edit Faculty Member" : "Add Faculty Member"}
                  </DialogTitle>
                  <DialogDescription>
                    Set role and sort order to maintain public hierarchy display.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="faculty-name">Name</Label>
                    <Input
                      id="faculty-name"
                      value={facultyForm.name}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          name: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="faculty-role">Role</Label>
                    <Select
                      value={facultyForm.roleKey || undefined}
                      onValueChange={(value) => {
                        const selectedRole = roles.find((role) => role.key === value);
                        setFacultyForm((previous) => ({
                          ...previous,
                          roleKey: value,
                          roleLabel: selectedRole?.label || previous.roleLabel,
                        }));
                      }}
                    >
                      <SelectTrigger id="faculty-role" className="w-full">
                        <SelectValue placeholder="Choose role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.key}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="faculty-role-label">Role Label</Label>
                    <Input
                      id="faculty-role-label"
                      value={facultyForm.roleLabel}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          roleLabel: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="faculty-designation">Designation</Label>
                    <Input
                      id="faculty-designation"
                      value={facultyForm.designation}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          designation: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="faculty-specialization">Specialization</Label>
                    <Input
                      id="faculty-specialization"
                      value={facultyForm.specialization}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          specialization: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="faculty-sort-order">Sort Order</Label>
                    <Input
                      id="faculty-sort-order"
                      type="number"
                      value={facultyForm.sortOrder}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          sortOrder: Number(event.target.value || 0),
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="faculty-status">Status</Label>
                    <Select
                      value={facultyForm.isActive ? "active" : "inactive"}
                      onValueChange={(value) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          isActive: value === "active",
                        }))
                      }
                    >
                      <SelectTrigger id="faculty-status" className="w-full">
                        <SelectValue placeholder="Choose status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="faculty-image-url">Image URL</Label>
                    <Input
                      id="faculty-image-url"
                      value={facultyForm.imageUrl}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          imageUrl: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="faculty-profile-url">Profile URL</Label>
                    <Input
                      id="faculty-profile-url"
                      value={facultyForm.profileUrl}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          profileUrl: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="faculty-bio">Bio</Label>
                    <Textarea
                      id="faculty-bio"
                      value={facultyForm.bio}
                      onChange={(event) =>
                        setFacultyForm((previous) => ({
                          ...previous,
                          bio: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFacultyDialogOpen(false);
                      setFacultyForm(EMPTY_FACULTY_FORM);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => void handleSaveFaculty()} disabled={isSavingFaculty}>
                    {isSavingFaculty ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Faculty"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Sort Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedFaculties.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell className="font-medium">{faculty.name}</TableCell>
                  <TableCell>{faculty.roleLabel}</TableCell>
                  <TableCell>{faculty.designation || "-"}</TableCell>
                  <TableCell>{faculty.sortOrder}</TableCell>
                  <TableCell>
                    <Badge variant={faculty.isActive ? "default" : "outline"}>
                      {faculty.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFacultyForm(createFacultyForm(faculty));
                          setFacultyDialogOpen(true);
                        }}
                      >
                        <Pencil className="mr-1 h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => void handleDeleteFaculty(faculty)}
                      >
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

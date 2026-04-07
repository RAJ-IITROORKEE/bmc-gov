"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DepartmentListItem } from "@/lib/departments/types";
import { Loader2, Pencil, Plus, Settings2, Trash2 } from "lucide-react";

interface DepartmentFormState {
  name: string;
  slug: string;
  shortName: string;
  displayOrder: number;
}

const EMPTY_DEPARTMENT_FORM: DepartmentFormState = {
  name: "",
  slug: "",
  shortName: "",
  displayOrder: 0,
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingDepartment, setIsSavingDepartment] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [departmentForm, setDepartmentForm] = useState<DepartmentFormState>(
    EMPTY_DEPARTMENT_FORM,
  );

  async function loadData() {
    setIsLoading(true);

    try {
      const departmentsRes = await fetch("/api/admin/departments", { cache: "no-store" });

      if (!departmentsRes.ok) {
        throw new Error("Failed to fetch departments");
      }

      const departmentsJson = (await departmentsRes.json()) as {
        departments: DepartmentListItem[];
      };

      setDepartments(departmentsJson.departments);
    } catch {
      toast.error("Could not load departments data. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function handleCreateDepartment() {
    if (!departmentForm.name.trim()) {
      toast.error("Department name is required.");
      return;
    }

    setIsSavingDepartment(true);

    try {
      const response = await fetch("/api/admin/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departmentForm),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Failed to create department");
      }

      setDepartmentForm(EMPTY_DEPARTMENT_FORM);
      setAddDialogOpen(false);
      toast.success("Department created successfully.");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create department.");
    } finally {
      setIsSavingDepartment(false);
    }
  }

  async function handleDeleteDepartment(slug: string) {
    const confirmed = window.confirm(
      "Delete this department? All faculty records in this department will also be deleted.",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/departments/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message || "Failed to delete department");
      }

      toast.success("Department deleted successfully.");
      await loadData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete department.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">
            Manage departments and faculty records. Role hierarchy is now in a dedicated page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/departments/hierarchy">
              <Settings2 className="mr-2 h-4 w-4" />
              Faculty Role Hierarchy
            </Link>
          </Button>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Create Department</DialogTitle>
                <DialogDescription>
                  Add a new department. You can manage faculty after creating it.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department-name">Department Name</Label>
                  <Input
                    id="department-name"
                    value={departmentForm.name}
                    onChange={(event) =>
                      setDepartmentForm((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Anatomy"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="department-slug">Slug (optional)</Label>
                  <Input
                    id="department-slug"
                    value={departmentForm.slug}
                    onChange={(event) =>
                      setDepartmentForm((previous) => ({
                        ...previous,
                        slug: event.target.value,
                      }))
                    }
                    placeholder="anatomy"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="department-short-name">Short Name (optional)</Label>
                  <Input
                    id="department-short-name"
                    value={departmentForm.shortName}
                    onChange={(event) =>
                      setDepartmentForm((previous) => ({
                        ...previous,
                        shortName: event.target.value,
                      }))
                    }
                    placeholder="Dept. of Anatomy"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="department-display-order">Display Order</Label>
                  <Input
                    id="department-display-order"
                    type="number"
                    value={departmentForm.displayOrder}
                    onChange={(event) =>
                      setDepartmentForm((previous) => ({
                        ...previous,
                        displayOrder: Number(event.target.value || 0),
                      }))
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAddDialogOpen(false);
                    setDepartmentForm(EMPTY_DEPARTMENT_FORM);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateDepartment} disabled={isSavingDepartment}>
                  {isSavingDepartment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Department"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
          <CardDescription>
            HOD name and professor count are auto-calculated from faculty records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading departments...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>HOD</TableHead>
                  <TableHead>Professors</TableHead>
                  <TableHead>Total Faculty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>
                      <div className="font-medium">{department.name}</div>
                      <div className="text-xs text-muted-foreground">/{department.slug}</div>
                    </TableCell>
                    <TableCell>{department.hodName || "Not assigned"}</TableCell>
                    <TableCell>{department.professorCount}</TableCell>
                    <TableCell>{department.facultyCount}</TableCell>
                    <TableCell>
                      <Badge variant={department.isActive ? "default" : "outline"}>
                        {department.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/departments/${department.slug}`}>
                            <Pencil className="mr-1 h-3.5 w-3.5" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => void handleDeleteDepartment(department.slug)}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { RoleHierarchyItem } from "@/lib/departments/types";
import { ArrowLeft, ArrowDownUp, Loader2, Save } from "lucide-react";

function reorderRoles(
  roles: RoleHierarchyItem[],
  draggedId: string,
  targetId: string,
): RoleHierarchyItem[] {
  const fromIndex = roles.findIndex((role) => role.id === draggedId);
  const toIndex = roles.findIndex((role) => role.id === targetId);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return roles;
  }

  const next = roles.slice();
  const [dragged] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, dragged);

  return next.map((role, index) => ({
    ...role,
    displayOrder: index,
  }));
}

export default function DepartmentHierarchyPage() {
  const [roleHierarchy, setRoleHierarchy] = useState<RoleHierarchyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingRoleOrder, setIsSavingRoleOrder] = useState(false);
  const [draggedRoleId, setDraggedRoleId] = useState<string | null>(null);

  const sortedRoleHierarchy = useMemo(
    () => roleHierarchy.slice().sort((a, b) => a.displayOrder - b.displayOrder),
    [roleHierarchy],
  );

  async function loadHierarchy() {
    setIsLoading(true);

    try {
      const hierarchyRes = await fetch("/api/admin/departments/hierarchy", { cache: "no-store" });

      if (!hierarchyRes.ok) {
        throw new Error("Failed to fetch hierarchy");
      }

      const hierarchyJson = (await hierarchyRes.json()) as {
        roles: RoleHierarchyItem[];
      };

      setRoleHierarchy(hierarchyJson.roles);
    } catch {
      toast.error("Could not load role hierarchy. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadHierarchy();
  }, []);

  function handleRoleDrop(targetId: string) {
    if (!draggedRoleId) {
      return;
    }

    setRoleHierarchy((previous) => reorderRoles(previous, draggedRoleId, targetId));
    setDraggedRoleId(null);
  }

  async function handleSaveRoleHierarchy() {
    setIsSavingRoleOrder(true);

    try {
      const response = await fetch("/api/admin/departments/hierarchy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roles: sortedRoleHierarchy.map((role, index) => ({
            id: role.id,
            label: role.label,
            isActive: role.isActive,
            displayOrder: index,
          })),
        }),
      });

      const data = (await response.json()) as {
        roles?: RoleHierarchyItem[];
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message || "Failed to save hierarchy order");
      }

      if (data.roles) {
        setRoleHierarchy(data.roles);
      }

      toast.success("Role hierarchy updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save role hierarchy.",
      );
    } finally {
      setIsSavingRoleOrder(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Button asChild variant="outline" size="sm" className="mb-3">
            <Link href="/admin/departments">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Departments
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Role Hierarchy</h1>
          <p className="text-muted-foreground">
            Arrange the global order in which faculty roles appear on all department pages.
          </p>
        </div>

        <Button onClick={() => void handleSaveRoleHierarchy()} disabled={isSavingRoleOrder}>
          {isSavingRoleOrder ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Order
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownUp className="h-4 w-4 text-primary" />
            Role Order Configuration
          </CardTitle>
          <CardDescription>
            Drag and drop to reorder, edit labels inline, and toggle active/inactive state.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading hierarchy...
            </div>
          ) : (
            <div className="grid gap-2">
              {sortedRoleHierarchy.map((role) => (
                <div
                  key={role.id}
                  draggable
                  onDragStart={() => setDraggedRoleId(role.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => handleRoleDrop(role.id)}
                  className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">#{role.displayOrder + 1}</span>
                    <Input
                      value={role.label}
                      onChange={(event) => {
                        const nextLabel = event.target.value;
                        setRoleHierarchy((previous) =>
                          previous.map((item) =>
                            item.id === role.id ? { ...item, label: nextLabel } : item,
                          ),
                        );
                      }}
                      className="h-8 min-w-56"
                    />
                  </div>

                  <Button
                    variant={role.isActive ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => {
                      setRoleHierarchy((previous) =>
                        previous.map((item) =>
                          item.id === role.id ? { ...item, isActive: !item.isActive } : item,
                        ),
                      );
                    }}
                  >
                    {role.isActive ? "Active" : "Inactive"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

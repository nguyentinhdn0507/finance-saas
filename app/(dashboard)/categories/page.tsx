"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./colums";
import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/feature/categories/api/use-get-categories";
import { useDeleteBulkCategory } from "@/feature/categories/api/use-bulk-delete";
import { useNewCategory } from "@/feature/categories/hooks/user-new-category";

export default function CategoriesPage() {
  const newCategory = useNewCategory();
  const categoriesQuery = useGetCategories();
  const deleteCategory = useDeleteBulkCategory();
  const accounts = categoriesQuery.data || [];
  const isDisabled = categoriesQuery.isLoading || deleteCategory.isPending;
  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-md">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories Page</CardTitle>
          <Button onClick={newCategory.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((item) => item.original.id);
              deleteCategory.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}

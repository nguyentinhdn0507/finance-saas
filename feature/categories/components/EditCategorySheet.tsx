import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import { Loader2 } from "lucide-react";
import useConfirm from "@/hooks/use-confirm";
import CategoryForm from "./CategoryForm";
import { useGetCategory } from "../api/use-get-cateogry";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useOpenCategory } from "../hooks/use-open-category";
const formSchema = insertAccountSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
export default function EditCategorySheet() {
  const { isOpen, onClose, id } = useOpenCategory();
  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Sure",
    "You are about to delete this category",
  );
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const onDelete = async () => {
    const confirmOK = await confirm();
    if (confirmOK) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  const defaultValues = categoryQuery?.data ? { name: categoryQuery?.data?.name } : { name: "" };
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit a existing category </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disable={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

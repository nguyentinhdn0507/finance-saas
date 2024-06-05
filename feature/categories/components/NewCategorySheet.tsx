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
import CategoryForm from "./CategoryForm";
import { useNewCategory } from "../hooks/user-new-category";
import { useCreateCategory } from "../api/use-create-category";
const formSchema = insertAccountSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
export default function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category to organize your transactions</SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disable={mutation.isPending}
          defaultValues={{
            name: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

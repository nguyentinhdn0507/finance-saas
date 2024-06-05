"use client";
import { Button } from "@/components/ui/button";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenAccount } from "@/feature/accounts/hooks/use-open-account";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConfirm from "@/hooks/use-confirm";
import { useOpenCategory } from "@/feature/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/feature/categories/api/use-delete-category";
type Props = {
  id: string;
};
export default function Actions({ id }: Props) {
  const deleteMutation = useDeleteCategory(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Sure",
    "You are about to delete this transaction",
  );
  const { onOpen } = useOpenCategory();
  const handleDelete = async () => {
    const confirmOK = await confirm();
    if (confirmOK) {
      deleteMutation.mutate();
    }
  };
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => {
              onOpen(id);
            }}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

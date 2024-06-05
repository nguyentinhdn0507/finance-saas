"use client";
import { Button } from "@/components/ui/button";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConfirm from "@/hooks/use-confirm";
import { useOpenTransaction } from "@/feature/transactions/hooks/use-open-transaction";
import { useDeleteTransaction } from "@/feature/transactions/api/use-delete-transaction";
type Props = {
  id: string;
};
export default function Actions({ id }: Props) {
  const deleteMutation = useDeleteTransaction(id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Sure",
    "You are about to delete this transaction",
  );
  const { onOpen } = useOpenTransaction();
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

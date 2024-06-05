import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { z } from "zod";
import { insertTransactionsSchema } from "@/db/schema";
import { Loader2 } from "lucide-react";
import useConfirm from "@/hooks/use-confirm";
import TransactionForm from "./TransactionForm";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useGetCategories } from "@/feature/categories/api/use-get-categories";
import { useCreateCategory } from "@/feature/categories/api/use-create-category";
import { useGetAccounts } from "@/feature/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/feature/accounts/api/use-create-account";
import { useOpenTransaction } from "../hooks/use-open-transaction";
const formSchema = insertTransactionsSchema.omit({
  id: true,
});
type FormValues = z.input<typeof formSchema>;
export default function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Sure",
    "You are about to delete this transaction",
  );

  // Query categories
  const categoriesQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
  const categoryOptions = (categoriesQuery?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));
  //Query Accounts
  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const accountOptions = (accountsQuery?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    transactionQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading =
    transactionQuery.isLoading || categoriesQuery.isLoading || accountsQuery.isLoading;

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
  const defaultValues = transactionQuery?.data
    ? {
        accountId: transactionQuery?.data?.accountId,
        categoryId: transactionQuery?.data?.categoryId,
        amount: transactionQuery?.data?.amount.toString(),
        date: transactionQuery?.data?.date ? new Date(transactionQuery?.data?.date) : new Date(),
        payee: transactionQuery?.data?.payee,
        notes: transactionQuery?.data?.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };
  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={onDelete}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

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
import TransactionForm from "./TransactionForm";
import { useNewTransaction } from "../hooks/user-new-transaction";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/feature/categories/api/use-create-category";
import { useGetCategories } from "@/feature/categories/api/use-get-categories";
import { useGetAccounts } from "@/feature/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/feature/accounts/api/use-create-account";
import { Loader2 } from "lucide-react";
const formSchema = insertTransactionsSchema.omit({
  id: true,
});
type FormValues = z.input<typeof formSchema>;
export default function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();
  const createMutation = useCreateTransaction();

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
    createMutation.isPending || categoryMutation.isPending || accountMutation.isPending;
  const isLoading = categoriesQuery.isLoading || accountsQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Create a new transaction to organize your transactions
          </SheetDescription>
        </SheetHeader>
        <p>Todo: Transaction Form</p>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
            onCreateCategory={onCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useNewAccount } from "../hooks/user-new-account";
import AccountForm from "./AccountForm";
import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import { useCreateAccount } from "../api/use-create-account";
const formSchema = insertAccountSchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;
export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();
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
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account to track your transactions</SheetDescription>
        </SheetHeader>
        <AccountForm
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

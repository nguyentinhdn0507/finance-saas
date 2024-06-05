"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/feature/accounts/hooks/user-new-account";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./colums";
import { DataTable } from "@/components/DataTable";
import { useGetAccounts } from "@/feature/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteBulkAccount } from "@/feature/accounts/api/use-bulk-delete";

export default function AccountPage() {
  const newAccount = useNewAccount();
  const accountsQuery = useGetAccounts();
  const deleteAccount = useDeleteBulkAccount();
  const accounts = accountsQuery.data || [];
  const isDisabled = accountsQuery.isLoading || deleteAccount.isPending;
  if (accountsQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Account Page</CardTitle>
          <Button onClick={newAccount.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="email"
            onDelete={(row) => {
              const ids = row.map((item) => item.original.id);
              deleteAccount.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}

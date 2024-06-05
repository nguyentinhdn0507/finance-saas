"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { columns } from "./colums";
import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/feature/transactions/hooks/user-new-transaction";
import { useDeleteBulkTransactions } from "@/feature/transactions/api/use-bulk-delete";
import { useGetTransactions } from "@/feature/transactions/api/use-get-transactions";
import UpLoadButton from "./upload-button";
import ImportCard from "./importcard";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}
const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};
export default function TransactionsPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);
  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log(results);
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };
  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useDeleteBulkTransactions();

  const transactions = transactionsQuery.data || [];

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;
  if (transactionsQuery.isLoading) {
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
  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard data={importResults.data} onCancel={onCancelImport} onSubmit={() => {}} />
      </>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Transaction History</CardTitle>
          <div className="flex items-center gap-2">
            <Button onClick={newTransaction.onOpen} size="sm">
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
            <UpLoadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={(row) => {
              const ids = row.map((item) => item.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}

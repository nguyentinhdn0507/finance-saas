"use client";
import { useMountedState } from "react-use";
import React from "react";
import NewAccountSheet from "@/feature/accounts/components/NewAccountSheet";
import EditAccountSheet from "@/feature/accounts/components/EditAccountSheet";
import NewCategorySheet from "@/feature/categories/components/NewCategorySheet";
import EditCategorySheet from "@/feature/categories/components/EditCategorySheet";
import NewTransactionSheet from "@/feature/transactions/components/NewTransactionSheet";
import EditTransactionSheet from "@/feature/transactions/components/EditTransactionSheet";

export default function SheetProvider() {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
}

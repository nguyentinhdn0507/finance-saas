"use client";
import DataCharts from "@/components/DataCharts";
import DataGrid from "@/components/DataGrid";
import { useUser } from "@clerk/nextjs";
import React from "react";

export default function DashBoardLayout() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
}

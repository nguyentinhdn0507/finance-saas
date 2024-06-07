"use client";
import React from "react";
import { useGetSummary } from "@/feature/summary/api/use-get-summary";
import Chart from "./Chart";
import SpendingPie from "./SpendingPie";
import ChartLoading from "./ChartLoading";
import SpendingPieLoading from "./SpendingPieLoading";

export default function DataCharts() {
  const { data, isLoading } = useGetSummary();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
}

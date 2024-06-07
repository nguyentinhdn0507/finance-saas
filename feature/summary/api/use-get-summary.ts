import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

import { useSearchParams } from "next/navigation";
import { covertAmountFromMiliUnits } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";
  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }
      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: covertAmountFromMiliUnits(data.incomeAmount),
        expensesAmount: covertAmountFromMiliUnits(data.expensesAmount),
        remainingAmount: covertAmountFromMiliUnits(data.remainingAmount),
        categories: data.categories.map((item) => ({
          ...item,
          value: covertAmountFromMiliUnits(item.value),
        })),
        days: data?.days.map((item) => ({
          ...item,
          income: covertAmountFromMiliUnits(item.income),
          expenses: covertAmountFromMiliUnits(item.expenses),
        })),
      };
    },
  });
  return query;
};

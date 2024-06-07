"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useGetAccounts } from "@/feature/accounts/api/use-get-accounts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useGetSummary } from "@/feature/summary/api/use-get-summary";
export default function AccountFilter() {
  const params = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { isLoading: isLoadingSummary } = useGetSummary();
  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };
    if (newValue === "all") {
      query.accountId = "";
    }
    const url = qs.stringifyUrl(
      { url: pathName, query },
      { skipNull: true, skipEmptyString: true },
    );
    router.push(url);
  };
  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger
        className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0
      focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
      >
        <SelectValue placeholder="Select Account" />
        <SelectContent>
          <SelectItem value="all">All accounts</SelectItem>
          {accounts?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
}

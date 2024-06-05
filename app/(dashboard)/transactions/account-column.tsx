import { useOpenAccount } from "@/feature/accounts/hooks/use-open-account";
import React from "react";
type Props = {
  account: string;
  accountId: string;
};
export default function AccountColumn({ account, accountId }: Props) {
  const { onOpen: onOpenAccount } = useOpenAccount();
  const onClick = () => {
    onOpenAccount(accountId);
  };
  return (
    <div className="flex items-center cursor-pointer hover:underline" onClick={onClick}>
      {account}
    </div>
  );
}

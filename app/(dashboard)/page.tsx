"use client";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/feature/accounts/hooks/user-new-account";

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
    <div>
      <Button onClick={onOpen}>Add an button</Button>
    </div>
  );
}

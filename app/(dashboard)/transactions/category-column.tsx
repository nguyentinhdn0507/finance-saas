import { useOpenCategory } from "@/feature/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/feature/transactions/hooks/use-open-transaction";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import React from "react";
type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};
export default function CategoryColumn({ id, category, categoryId }: Props) {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };
  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500",
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
}

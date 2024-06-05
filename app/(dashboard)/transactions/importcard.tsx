import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { string } from "zod";
import UpLoadButton from "./upload-button";
import { Button } from "@/components/ui/button";
import ImportTable from "./importtable";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";
const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnsState {
  [key: string]: string | null;
}
type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};
export default function ImportCard({ data, onCancel, onSubmit }: Props) {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});
  const headers = data[0];
  const body = data.slice(1);
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ">
      <Card className="border-none drop-shadow-md">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Import Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeaderSelectChange={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}

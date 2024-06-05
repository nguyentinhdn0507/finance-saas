import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import TableHeaderSelect from "./tableheaderselect";
type Props = {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeaderSelectChange: (columnIndex: number, value: string | null) => void;
};
export default function ImportTable({
  headers,
  body,
  selectedColumns,
  onTableHeaderSelectChange,
}: Props) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((_item, index) => (
              <TableHeader key={index}>
                <TableHeaderSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeaderSelectChange}
                />
              </TableHeader>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

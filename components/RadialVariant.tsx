import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";
import CategoryTooltip from "./CategoryTooltip";

const COLORS = ["#00627", "#12C6FF", "#FF647F", "#FF935"];
type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function RadialVariant({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadialBarChart
        cx="50%"
        cy="30%"
        barSize={10}
        innerRadius="90%"
        outerRadius="40%"
        data={data?.map((item, index) => ({ ...item, fill: COLORS[index % COLORS.length] }))}
      >
        <RadialBar
          dataKey="value"
          label={{
            position: "insideStart",
            fill: "#ffff",
            fontSize: "12",
          }}
          background
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: any, index: number) => (
                  <li key={`item-${index}`} className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">{entry.value}</span>
                      <span className="text-sm">{formatCurrency(entry.payload.value)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CategoryTooltip />} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

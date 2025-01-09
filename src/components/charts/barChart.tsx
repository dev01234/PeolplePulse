"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { client: "HP", HP: 15 },
  { client: "CBRE", CBRE: 22 },
  { client: "Vialto", Vialto: 10 },
];

const chartConfig = {
  hp: {
    label: "HP",
    color: "hsl(var(--chart-1))",
  },
  cbre: {
    label: "CBRE",
    color: "hsl(var(--chart-2))",
  },
  vialto: {
    label: "Vialto",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Per Client</CardTitle>
        <CardDescription>Overview of project distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={400} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="client" tickLine={false} />
            <YAxis />
            <Legend />
            <ChartTooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="HP"
              name="HP"
              fill="hsl(var(--chart-1))"
              
            />
            <Bar
              dataKey="CBRE"
              name="CBRE"
              fill="hsl(var(--chart-2))"
              
            />
            <Bar
              dataKey="Vialto"
              name="Vialto"
              fill="hsl(var(--chart-3))"
              
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Clear breakdown of projects by client <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the total number of projects per client
        </div>
      </CardFooter>
    </Card>
  );
}

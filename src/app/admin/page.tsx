import React from "react";
import { PieChartComponent } from "@/components/charts/pieChart";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Users,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChartComponent } from "@/components/charts/barChart";

const AdminPage = () => {
  return (
    <div className="m-16 p-4">
      <div className="border-b bg-white dark:bg-[#17171A]">
        <div className="flex h-16 items-center px-4">
          <Activity className="h-6 w-6" />
          <h2 className="text-lg font-semibold ml-2">Analytics Dashboard</h2>
        </div>
      </div>
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          {/* Active Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,250</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                +10% from last month
              </p>
            </CardContent>
          </Card>
          {/* Project Onboarding */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects Onboarded</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                +15% from last quarter
              </p>
            </CardContent>
          </Card>
          {/* New Employees Onboarded */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Employees</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowDownRight className="h-4 w-4 text-red-500" />
                -5% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex gap-x-4 justify-between flex-wrap">
        <PieChartComponent />
        <BarChartComponent />
      </div>
    </div>
  );
};

export default AdminPage;

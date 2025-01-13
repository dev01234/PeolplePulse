"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";


interface TimeEntry {
  date: string;
  inTime: string;
  outTime: string;
}

export default function Home() {
  const params = useParams<{ id: string }>();
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getWeekStart(new Date())
  );

  const getWeekDates = (startDate: Date): TimeEntry[] => {
    const dates: TimeEntry[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push({
        date: date.toISOString().split("T")[0],
        inTime: "",
        outTime: "",
      });
    }
    return dates;
  };

  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(
    getWeekDates(currentWeekStart)
  );

  function getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d;
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeekStart(newDate);
    setTimeEntries(getWeekDates(newDate));
  };

  const calculateHours = (inTime: string, outTime: string): number => {
    if (!inTime || !outTime) return 0;

    const [inHours, inMinutes] = inTime.split(":").map(Number);
    const [outHours, outMinutes] = outTime.split(":").map(Number);

    const totalMinutes =
      outHours * 60 + outMinutes - (inHours * 60 + inMinutes);
    return Math.round((totalMinutes / 60) * 100) / 100;
  };

  const calculateTotalHours = (): number => {
    return timeEntries.reduce((total, entry) => {
      return total + calculateHours(entry.inTime, entry.outTime);
    }, 0);
  };

  const handleTimeChange = (
    index: number,
    field: "inTime" | "outTime",
    value: string
  ) => {
    const newEntries = [...timeEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setTimeEntries(newEntries);
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateRange = (): string => {
    const endDate = new Date(currentWeekStart);
    endDate.setDate(endDate.getDate() + 6);

    const startMonth = currentWeekStart.toLocaleDateString("en-US", {
      month: "short",
    });
    const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });

    const startDay = currentWeekStart.getDate();
    const endDay = endDate.getDate();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${currentWeekStart.getFullYear()}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${currentWeekStart.getFullYear()}`;
  };

  const handleSubmit = () => {
    console.log("Submitted:", timeEntries);
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };
  
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between p-4 bg-[#e6f3ff] dark:bg-[inherit] border-b border-gray-200">
        <div className="flex items-center gap-4">
          
          <h1 className="text-2xl">Timesheet</h1>
        </div>
        <div className="flex items-center gap-2">
        <img
            src="https://github.com/shadcn.png"
            alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
          <span>{params.id ? params.id : "Guest"}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium min-w-[200px] text-center">
            {formatDateRange()}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-white rounded shadow">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#005587] hover:bg-[#005587]">
                <TableHead
                  className="text-white font-normal text-center"
                  colSpan={2}
                >
                  Dates
                </TableHead>
                {timeEntries.map((entry, index) => {
                  return (
                    <>
                      <TableHead
                        key={`date-${index}`}
                        className="text-white font-normal text-center"
                        colSpan={2} // Each date corresponds to an "IN" and "OUT"
                      >
                        {formatDate(entry.date)}
                      </TableHead>
                    </>
                  );
                })}
              </TableRow>
              <TableRow className="bg-[#005587] hover:bg-[#005587]">
                <TableHead className="text-white font-normal">
                  Project Name
                </TableHead>
                <TableHead className="text-white font-normal">
                  Project Code
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  IN
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  OUT
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  IN
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  OUT
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  IN
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  OUT
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  IN
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  OUT
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  IN
                </TableHead>
                <TableHead className="text-white font-normal text-center">
                  OUT
                </TableHead>
                <TableHead
                  className="text-white font-normal text-center bg-yellow-300"
                  colSpan={2}
                >
                  WO(Week OFF)
                </TableHead>
                <TableHead
                  className="text-white font-normal text-center bg-yellow-300"
                  colSpan={2}
                >
                  WO(Week OFF)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent dark:text-black">
                <TableCell className="bg-gray-100">People Pulse</TableCell>
                <TableCell className="bg-gray-100">12345</TableCell>
                {timeEntries.map((entry, index) => {
                  const dayOfWeek = new Date(entry.date).getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
                  return (
                    <>
                      <TableCell
                        key={`${entry.date}-inTime-${index}`}
                        className="p-0"
                      >
                        <Input
                          type="time"
                          value={entry.inTime}
                          onChange={(e) =>
                            handleTimeChange(index, "inTime", e.target.value)
                          }
                          className="w-auto"
                          disabled={isWeekend}
                        />
                      </TableCell>
                      <TableCell
                        key={`${entry.date}-outTime-${index}`}
                        className="p-0"
                      >
                        <Input
                          type="time"
                          value={entry.outTime}
                          onChange={(e) =>
                            handleTimeChange(index, "outTime", e.target.value)
                          }
                          className="w-auto"
                          disabled={isWeekend}
                        />
                      </TableCell>
                    </>
                  );
                })}
              </TableRow>
              <TableRow className="hover:bg-transparent dark:text-black">
                <TableCell className="bg-gray-100" colSpan={2}>
                  Daily Hours
                </TableCell>
                {timeEntries.map((entry, index) => {
                  const hours = calculateHours(entry.inTime, entry.outTime);
                  return (
                    <TableCell
                      key={`${entry.date}-hours-${index}`}
                      className="text-center"
                      colSpan={2}
                    >
                      {hours > 0 ? `${hours} hrs` : "N/A"}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className="hover:bg-transparent dark:text-black">
                <TableCell className="bg-gray-200 font-bold" colSpan={2}>
                  Total Hours
                </TableCell>
                <TableCell colSpan={timeEntries.length}>
                  <span className="font-bold">{calculateTotalHours()} hrs</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end gap-4 mt-4">
        <Button onClick={handleSubmit} className="bg-[#005587] dark:bg-white">
            Submit
          </Button>
          <Button onClick={handleCancel} className="bg-[#005587] dark:bg-white">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

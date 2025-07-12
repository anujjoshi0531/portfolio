"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, CalendarRange } from "lucide-react";

export type TimeRange = "day" | "week";

export const useTime = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const options = [
    { label: "Day", value: "day", icon: CalendarDays },
    { label: "Week", value: "week", icon: CalendarRange },
  ];

  const getTimeRange = (): TimeRange => {
    return (searchParams.get("time_range") as TimeRange) || "day";
  };

  const setTimeRange = (value: TimeRange) => {
    const search = new URLSearchParams(searchParams);

    search.set("time_range", value);
    search.delete("page");

    router.replace(`?${search.toString()}`);
  };

  return {
    options,
    getTimeRange,
    setTimeRange,
  };
};

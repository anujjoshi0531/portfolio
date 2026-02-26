import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/lib";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BlogFilterDateProps {
  value: string;
  disableBefore?: string;
  disableAfter?: string;
  align: "start" | "end" | "center";
  label: string;
  onChange: (value: string) => void;
}

export const BlogFilterDate: React.FC<BlogFilterDateProps> = ({
  value,
  align,
  label,
  disableBefore,
  disableAfter,
  onChange,
}) => {
  const selected = React.useMemo(() => value ? new Date(value) : undefined, [value]);
  const from = React.useMemo(() => disableBefore ? new Date(disableBefore) : new Date("01/01/1900"), [disableBefore]);
  const to = React.useMemo(() => disableAfter ? new Date(disableAfter) : new Date("12/31/2050"), [disableAfter]);

  const disabled = React.useMemo(() => ({
    after: disableAfter ? new Date(disableAfter) : new Date("12/31/2050"),
    before: disableBefore ? new Date(disableBefore) : new Date("01/01/1900"),
  }), [disableAfter, disableBefore]);

  const displayDateStr = React.useMemo(() => value ? new Date(value).toLocaleDateString() : "", [value]);

  const setSelectedDate = (date: Date) => {
    onChange(formatDate(date));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
      <Label className="flex text-muted-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start"
            aria-label={`${label} date${value ? `: ${displayDateStr}` : " not selected"}`}>
            <CalendarIcon />
            {value ? displayDateStr : <span>Select date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent align={align} className="w-64 p-0 md:w-auto">
          <Calendar
            required
            mode="single"
            captionLayout="dropdown"
            selected={selected}
            fromDate={from}
            toDate={to}
            disabled={disabled}
            onSelect={setSelectedDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

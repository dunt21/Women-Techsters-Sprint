import { LuSearch } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HistoryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
}

const TIME_OPTIONS = [
  { value: "all-time", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
];

export const HistoryToolbar = ({
  search,
  onSearchChange,
  timeFilter,
  onTimeFilterChange,
}: HistoryToolbarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search locations, e.g. Accra -> Kumasi"
          className="pl-11 h-11 sm:h-12 bg-card border-border rounded-xl w-full text-sm sm:text-base"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Date Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
        <Select
          value={timeFilter}
          onValueChange={(val) => {
            if (val) onTimeFilterChange(val as string);
          }}
        >
          <SelectTrigger className="w-full sm:w-40 h-11 sm:h-12 bg-card border-border rounded-xl text-sm">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            {TIME_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};


import { useState, useMemo } from "react";
import { LuMapPin } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourierCard } from "@/components/dashboard/CourierCard";

interface CourierQuotesListProps {
  quotes: any[];
  bestPrice: number;
  onSelectCourier?: (courierName: string) => void;
}

const SORT_OPTIONS = [
  { value: "Price (Low to High)", label: "Price (Low to High)" },
  { value: "Fastest Delivery", label: "Fastest Delivery" },
  { value: "Highest Rated", label: "Highest Rated" },
];

/**
 * Normalizes time strings like "~4h 30m", "~45m", "~ 2h" into total minutes.
 */
const parseTimeToMinutes = (timeStr?: string): number => {
  if (!timeStr || typeof timeStr !== "string") return 0;

  // Extract hours if present (e.g. "~4h", "2 h")
  const hoursMatch = timeStr.match(/(\d+)\s*h/i);
  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;

  // Extract minutes if present (e.g. "30m", "45 mins")
  const minutesMatch = timeStr.match(/(\d+)\s*m/i);
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  // Fallback: If neither "h" nor "m" matched, grab any standalone number
  if (!hoursMatch && !minutesMatch) {
    const fallbackMatch = timeStr.match(/\d+(\.\d+)?/);
    return fallbackMatch ? parseFloat(fallbackMatch[0]) : 0;
  }

  return hours * 60 + minutes;
};

export const CourierQuotesList = ({
  quotes,
  bestPrice,
  onSelectCourier,
}: CourierQuotesListProps) => {
  const [sortBy, setSortBy] = useState("Price (Low to High)");

  const sortedQuotes = useMemo(() => {
    return [...quotes].sort((a, b) => {
      if (sortBy === "Price (Low to High)") {
        return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
      }
      if (sortBy === "Fastest Delivery") {
        return (
          parseTimeToMinutes(a.estimatedTime) -
          parseTimeToMinutes(b.estimatedTime)
        );
      }
      if (sortBy === "Highest Rated") {
        return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      }
      return 0;
    });
  }, [quotes, sortBy]);

  return (
    <div className="xl:col-span-7 flex flex-col gap-6">
      {/* Header & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="font-bold text-[16px] sm:text-[17px] text-foreground">
            Available Options
          </h3>
          <p className="text-xs sm:text-[13px] font-medium text-muted-foreground mt-0.5 sm:mt-1">
            We found {quotes.length} courier services for your delivery.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 shrink-0 w-full sm:w-auto">
          <span className="text-[11px] font-bold text-muted-foreground">
            Sort by
          </span>
          <Select
            value={sortBy}
            onValueChange={(val) => {
              if (val) setSortBy(val as string);
            }}
          >
            <SelectTrigger className="w-full sm:w-52 h-10 border-border bg-card rounded-xl text-[13px] font-bold shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quotes Cards or Empty State */}
      <div className="flex flex-col gap-4">
        {sortedQuotes.length > 0 ? (
          sortedQuotes.map((courier, index) => (
            <CourierCard
              key={courier.id || courier._id || `${courier.courier}-${index}`}
              courier={courier}
              bestPrice={bestPrice}
              handler={onSelectCourier}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-border/60 rounded-[1.5rem] bg-secondary/20 w-full mt-2">
            <div className="w-16 h-16 bg-background border border-border/50 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <LuMapPin className="w-7 h-7 text-muted-foreground/60" />
            </div>
            <h3 className="text-[17px] font-bold text-foreground mb-2">
              No quotes yet
            </h3>
            <p className="text-[14px] font-medium text-muted-foreground max-w-70">
              Enter your pickup and drop-off locations above to start comparing
              delivery prices.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

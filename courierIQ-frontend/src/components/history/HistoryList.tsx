import { LuMapPin, LuArrowRight, LuChevronRight } from "react-icons/lu";
import { Pagination } from "@/components/ui/pagination";
import { HistoryListSkeleton } from "@/components/skeletons/HistoryListSkeleton";

interface HistoryListProps {
  items: any[];
  isLoading: boolean;
  selectedHistory: any;
  onSelectHistory: (item: any) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const HistoryList = ({
  items,
  isLoading,
  selectedHistory,
  onSelectHistory,
  currentPage,
  totalPages,
  onPageChange,
}: HistoryListProps) => {
  const handleSelect = (item: any) => {
    onSelectHistory(item);
    // On mobile/tablet, scroll smoothly to details view
    if (window.innerWidth < 1280) {
      document
        .getElementById("history-details-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="xl:col-span-6 flex flex-col gap-0 border border-border bg-card rounded-2xl overflow-hidden shadow-sm">
      <div className="flex flex-col divide-y divide-border/60">
        {isLoading ? (
          <HistoryListSkeleton />
        ) : items.length > 0 ? (
          items.map((item: any) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md gap-3 ${
                selectedHistory?.id === item.id
                  ? "bg-secondary/70 border-l-4 border-l-blue-500 shadow-sm"
                  : "hover:bg-secondary/30 border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center border border-border/50 border-dashed shrink-0">
                  <LuMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-bold text-sm sm:text-[15px] text-foreground flex items-center gap-1.5 truncate">
                    <span className="truncate">{item.origin}</span>
                    <LuArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{item.dest}</span>
                  </h3>
                  <div className="text-xs sm:text-[13px] font-medium text-muted-foreground flex items-center gap-2 mt-0.5 sm:mt-1 truncate">
                    <span>
                      {item.date} • {item.time}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-blue-600 mt-0.5 sm:mt-1">
                    {item.couriersCount} couriers compared
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex flex-col items-end gap-0.5 sm:gap-1 text-right">
                  <span className="text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase">
                    Best price
                  </span>
                  <span className="font-bold text-emerald-600 text-sm sm:text-[15px]">
                    {item.bestPrice}
                  </span>
                </div>
                <LuChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground ml-1" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground font-medium">
            No past searches found. Go compare some deliveries!
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};


import {
  LuStar,
  LuChevronDown,
  LuClock,
  LuTag,
  LuCalendar,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { courierStyles } from "@/utils/courierStyles";

// interface courierType {}

export const CourierCard = ({
  courier,
  bestPrice,
  handler,
  isHistoryView,
}: {
  courier: any;
  bestPrice: number;
  handler?: (courierName: string) => void;
  isHistoryView?: boolean;
}) => {
  const courierStyle =
    courierStyles[courier.courier as keyof typeof courierStyles];

  return (
    <div className="bg-card border border-border/60 rounded-[1.5rem] p-4 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`w-12 h-12 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center text-[20px] sm:text-[22px] font-black shrink-0 shadow-sm ${courierStyle.logoBg}`}
          >
            {courierStyle.logoLetter}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-[16px] sm:text-[17px] text-foreground truncate">
                {courier.courier}
              </h4>
              {courier.price === bestPrice && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                  Best Price
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-muted-foreground mt-0.5">
              <LuStar className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
              <span className="font-bold text-foreground">
                {courier.rating}
              </span>
              <span>•</span>
              <span className="truncate">{courier.speedTier || "Courier"}</span>
            </div>
          </div>
        </div>

        {!isHistoryView && (
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t border-border/40 sm:border-0 w-full sm:w-auto shrink-0">
            <Button
              className="h-10 px-6 rounded-xl font-bold bg-[#3b41c5] hover:bg-[#2d32a3] text-white shadow-sm hover:shadow-md transition-all text-[13px] w-full sm:w-auto"
              onClick={() => handler?.(courier.courier)}
            >
              Select
            </Button>
            <button className="text-[12px] font-bold text-primary flex items-center gap-1 hover:opacity-70 transition-opacity">
              View details <LuChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] sm:text-[12px] font-bold text-muted-foreground flex items-center gap-1 sm:gap-1.5 truncate">
            <LuClock className="w-3.5 h-3.5 shrink-0" /> Est. time
          </span>
          <span className="font-bold text-[13px] sm:text-[15px] text-foreground truncate">
            {courier.estimatedTime}
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground truncate">
            {courier.speedTier}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] sm:text-[12px] font-bold text-muted-foreground flex items-center gap-1 sm:gap-1.5 truncate">
            <LuTag className="w-3.5 h-3.5 shrink-0" /> Price
          </span>
          <span className="font-bold text-[13px] sm:text-[15px] text-emerald-600 truncate">
            GHS {courier.price}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] sm:text-[12px] font-bold text-muted-foreground flex items-center gap-1 sm:gap-1.5 truncate">
            <LuCalendar className="w-3.5 h-3.5 shrink-0" /> Drop-off
          </span>
          <span className="font-bold text-[12px] sm:text-[14px] text-foreground truncate">
            {courier.dropOffDate}
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground truncate">
            {courier.dropOffTime}
          </span>
        </div>
      </div>

      {/* <div className="w-full h-px bg-border/50 mb-4"></div>

      Features Map
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[12px] font-bold text-foreground mr-1">
          Features:
        </span>
        {courier.features.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center">
              <LuCheck className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <span className="text-[12px] font-medium text-foreground">
              {feature}
            </span>
            {idx !== courier.features.length - 1 && (
              <span className="text-muted-foreground mx-1 text-[10px]">•</span>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

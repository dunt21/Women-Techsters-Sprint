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
    <div className="bg-card border border-border/60 rounded-[1.5rem] p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-13 h-13 rounded-xl flex items-center justify-center text-[22px] font-black shrink-0 shadow-sm ${courierStyle.logoBg}`}
          >
            {courierStyle.logoLetter}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-[17px] text-foreground">
                {courier.courier}
              </h4>
              {courier.price === bestPrice && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                  Best Price
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground mt-0.5">
              <LuStar className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-foreground">
                {courier.rating}
              </span>
              <span>•</span>
            </div>
          </div>
        </div>

        {!isHistoryView && (
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Button
              className="h-10 px-6 rounded-xl font-bold bg-[#3b41c5] hover:bg-[#2d32a3] text-white shadow-sm hover:shadow-md transition-all text-[13px]"
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
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-bold text-muted-foreground flex items-center gap-1.5">
            <LuClock className="w-3.5 h-3.5" /> Estimated time
          </span>
          <span className="font-bold text-[15px] text-foreground">
            {courier.estimatedTime}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">
            {courier.speedTier}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-bold text-muted-foreground flex items-center gap-1.5">
            <LuTag className="w-3.5 h-3.5" /> Price
          </span>
          <span className="font-bold text-[15px] text-emerald-600">
            GHS {courier.price}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-bold text-muted-foreground flex items-center gap-1.5">
            <LuCalendar className="w-3.5 h-3.5" /> Drop-off
          </span>
          <span className="font-bold text-[14px] text-foreground">
            {courier.dropOffDate}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">
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

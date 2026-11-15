import { LuInfo } from "react-icons/lu";
import { RouteMap } from "@/components/shared/RouteMap";

interface RouteOverviewCardProps {
  pickupCoords: { latitude: number; longitude: number } | null;
  dropoffCoords: { latitude: number; longitude: number } | null;
  bestPrice?: number;
}

export const RouteOverviewCard = ({
  pickupCoords,
  dropoffCoords,
  bestPrice,
}: RouteOverviewCardProps) => {
  const routeStats = [
    { label: "Estimated distance", value: "250 km" },
    { label: "Estimated time", value: "~ 4h 30m - 5h 15m" },
    {
      label: "Best price",
      value: bestPrice ? `GHS ${bestPrice}` : "GHS 47",
      isHighlight: true,
    },
  ];

  return (
    <div className="bg-card border border-border/60 rounded-[1.5rem] overflow-hidden shadow-sm flex flex-col">
      <div className="w-full h-52 sm:h-60 bg-secondary relative">
        <RouteMap
          pickupCoords={pickupCoords}
          dropoffCoords={dropoffCoords}
        />
        <div className="absolute inset-0 bg-background/10 pointer-events-none"></div>
      </div>

      <div className="p-4 sm:p-6 bg-card flex flex-col">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 border-b border-border/50 pb-4 sm:pb-5 mb-4">
          {routeStats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-0.5 sm:gap-1">
              <span className="text-[11px] sm:text-[12px] font-bold text-muted-foreground truncate">
                {stat.label}
              </span>
              <span
                className={`text-[13px] sm:text-[15px] font-bold truncate ${
                  stat.isHighlight ? "text-emerald-600" : "text-foreground"
                }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-medium text-muted-foreground">
          <LuInfo className="w-3.5 h-3.5 shrink-0" /> Prices and times are
          estimates and may vary.
        </div>
      </div>
    </div>
  );
};


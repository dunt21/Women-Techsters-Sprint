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
}: RouteOverviewCardProps) => {
  return (
    <div className="bg-card border border-border/60 rounded-[1.5rem] overflow-hidden shadow-sm flex flex-col">
      <div className="w-full h-52 sm:h-60 bg-secondary relative">
        <RouteMap pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} />
        <div className="absolute inset-0 bg-background/10 pointer-events-none"></div>
      </div>

      <div className="p-4 sm:p-6 bg-card flex flex-col">
        <div className="flex items-center gap-2 text-[11px] sm:text-[12px] font-medium text-muted-foreground">
          <LuInfo className="w-3.5 h-3.5 shrink-0" /> Prices and times are
          estimates and may vary.
        </div>
      </div>
    </div>
  );
};

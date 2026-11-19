import { LuSearch, LuArrowRight, LuRefreshCcw } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { RouteMap } from "@/components/shared/RouteMap";
import { courierStyles } from "@/utils/courierStyles";
import { HistoryDetailsSkeleton } from "@/components/skeletons/HistoryDetailsSkeleton";

interface HistoryDetailsProps {
  selectedHistory: any;
  isLoading: boolean;
  onCompareAgain: (pickup: string, dropoff: string) => void;
}

export const HistoryDetails = ({
  selectedHistory,
  isLoading,
  onCompareAgain,
}: HistoryDetailsProps) => {
  console.log(selectedHistory);

  return (
    <div
      id="history-details-section"
      className="xl:col-span-6 flex flex-col gap-5 sm:gap-6 bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm scroll-mt-20"
    >
      {isLoading ? (
        <HistoryDetailsSkeleton />
      ) : selectedHistory ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <p className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Details of Delivery
            </p>
            <div className="hidden xl:block"></div>
            <span className="text-[13px] font-medium text-muted-foreground">
              Compared on {selectedHistory.date} at {selectedHistory.time}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            {selectedHistory.origin}{" "}
            <LuArrowRight className="w-5 h-5 text-muted-foreground" />{" "}
            {selectedHistory.dest}
          </h2>

          {/* Location details */}
          <div className="flex items-center justify-between gap-4 mt-2">
            <div className="flex-1">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Pickup Location
              </span>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <p className="text-sm font-medium text-foreground">
                  {selectedHistory.origin}
                </p>
              </div>
            </div>
            <LuArrowRight className="w-5 h-5 text-muted-foreground/50 hidden sm:block" />
            <div className="flex-1 sm:text-right">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Drop-off Location
              </span>
              <div className="flex items-center gap-2 mt-1.5 sm:justify-end">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <p className="text-sm font-medium text-foreground">
                  {selectedHistory.dest}
                </p>
              </div>
            </div>
          </div>

          {/* Map Preview */}
          <div className="w-full h-70 bg-secondary rounded-2xl border border-border mt-2 overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 z-0">
              <RouteMap pickupCoords={selectedHistory.pickup} />
            </div>
            <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply pointer-events-none"></div>
          </div>

          {/* Comparison Results */}
          <div className="flex flex-col mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base sm:text-[17px] text-foreground">
                Comparison Results
              </h3>
              <span className="text-[11px] sm:text-[12px] font-medium text-muted-foreground">
                Prices are estimates
              </span>
            </div>

            <div className="flex flex-col border border-border/80 rounded-xl overflow-hidden divide-y divide-border/60">
              {selectedHistory.couriers.map((courier: any) => {
                const style = courierStyles[
                  courier.courier as keyof typeof courierStyles
                ] || {
                  logoLetter: courier.courier.charAt(0),
                  logoBg: "bg-slate-200 text-slate-800 font-bold",
                };

                return (
                  <div
                    key={courier.id}
                    className="flex items-center gap-2.5 sm:gap-3 py-3 px-3.5 sm:px-5 cursor-pointer transition-colors hover:bg-slate-50 bg-card justify-between"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-black shrink-0 ${style.logoBg}`}
                      >
                        {style.logoLetter}
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-foreground truncate">
                        {courier.courier}
                      </p>
                    </div>

                    <div className="shrink-0 text-right px-2">
                      <p className="font-bold text-sm sm:text-base text-foreground">
                        GH₵{courier.price}
                      </p>
                    </div>

                    <div className="hidden sm:flex flex-col items-start justify-center w-24 shrink-0">
                      <p className="font-bold text-xs sm:text-sm text-foreground leading-tight">
                        {courier.estimatedTime}
                      </p>
                      <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-0.5 leading-tight">
                        Est. delivery
                      </p>
                    </div>

                    <div className="hidden lg:flex items-center justify-start w-20 shrink-0">
                      {courier.speedTier && (
                        <span
                          className={`inline-flex items-center justify-center px-2.5 h-6 text-xs font-bold rounded-md whitespace-nowrap ${
                            courier.speedTier === "Cheapest"
                              ? "bg-emerald-100/80 text-emerald-700"
                              : courier.speedTier === "Standard"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {courier.speedTier}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-75 sm:min-h-100 text-center p-6">
          <LuSearch className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/30 mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg font-bold text-foreground">
            No Delivery Selected
          </p>
          <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm max-w-60">
            Click on any past search from the list on the left to view its
            comparison details here.
          </p>
        </div>
      )}

      {selectedHistory && (
        <Button
          variant="outline"
          className="w-full h-12 sm:h-14 mt-4 rounded-xl font-bold border-border/80 text-foreground bg-background hover:bg-secondary transition-colors text-sm sm:text-[15px]"
          onClick={() =>
            onCompareAgain(selectedHistory.origin, selectedHistory.dest)
          }
        >
          <LuRefreshCcw className="w-4 h-4 mr-2" /> Compare Again
        </Button>
      )}
    </div>
  );
};

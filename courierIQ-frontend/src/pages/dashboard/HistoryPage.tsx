import { useEffect, useState } from "react";
import {
  LuSearch,
  LuChevronRight,
  // LuChevronLeft,
  LuMapPin,
  LuArrowRight,
  LuRefreshCcw,
} from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/api/axios";
import { Pagination } from "@/components/ui/pagination";
import { courierStyles } from "@/utils/courierStyles";
import { formatHistoryData } from "@/utils/formatHistory";
import { HistoryListSkeleton } from "@/components/skeletons/HistoryListSkeleton";
import { HistoryDetailsSkeleton } from "@/components/skeletons/HistoryDetailsSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteMap } from "@/components/shared/RouteMap";

const courierOptions = [
  { value: "all", label: "All Couriers" },
  { value: "dhl", label: "DHL" },
  { value: "fedex", label: "FedEx" },
];

const timeOptions = [
  { value: "all-time", label: "All Time" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
];

export const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [pastComparisons, setpastComparisons] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);

        const userString = localStorage.getItem("user");
        if (userString) {
          const userObj = JSON.parse(userString);
          const userId = userObj.id;
          console.log("My User ID is:", userId);
        }

        const token = localStorage.getItem("tokens");

        const response = await api.get("/api/comparison/history", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        // The backend returns the array inside response.data.data
        const rawHistory = response.data.data;

        // Use the reusable utility function to format the data!
        const formattedHistory = formatHistoryData(rawHistory);

        setpastComparisons(formattedHistory);
        if (formattedHistory.length > 0) {
          const selectedItemId = location.state?.preSelectedId;

          const clickedItem = formattedHistory.find(
            (i) => i.id === selectedItemId,
          );

          setSelectedHistory(clickedItem);

          if (!clickedItem) setSelectedHistory(formattedHistory[0]);
        }

        console.log("Formatted History:", formattedHistory);
        setpastComparisons(formattedHistory);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [location.state?.preSelectedId]);

  const totalPages = Math.ceil(pastComparisons.length / itemsPerPage);
  const currentItems = pastComparisons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const compareAgain = (pickup: string, dropoff: string) => {
    navigate("/compare", {
      state: {
        pickup: pickup,
        dropoff: dropoff,
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto animate-fade-in-up pb-12 h-full">
      {/* Title */}
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          History
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
          View your previous delivery comparisons.
        </p>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 w-full">
        <div className="relative flex-1">
          <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search locations, e.g. Accra -> Kumasi"
            className="pl-11 h-11 sm:h-12 bg-card border-border rounded-xl w-full text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
          <Select defaultValue="All">
            <SelectTrigger className="w-full sm:w-40 h-11 sm:h-12 bg-card border-border rounded-xl text-sm">
              <SelectValue placeholder="Couriers" />
            </SelectTrigger>
            <SelectContent>
              {courierOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="All-time">
            <SelectTrigger className="w-full sm:w-36 h-11 sm:h-12 bg-card border-border rounded-xl text-sm">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-2 items-start">
        {/* Left Column: History List */}
        <div className="xl:col-span-6 flex flex-col gap-0 border border-border bg-card rounded-2xl overflow-hidden shadow-sm">
          <div className="flex flex-col divide-y divide-border/60">
            {isLoading ? (
              <HistoryListSkeleton />
            ) : currentItems.length > 0 ? (
              currentItems.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedHistory(item);
                    // On mobile/tablet, scroll smoothly to details view
                    if (window.innerWidth < 1280) {
                      document
                        .getElementById("history-details-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
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
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Right Column: Detailed View */}
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

              {/* Map Placeholder */}
              <div className="w-full h-70 bg-secondary rounded-2xl border border-border mt-2 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 z-0">
                  <RouteMap />
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
                compareAgain(selectedHistory.origin, selectedHistory.dest)
              }
            >
              <LuRefreshCcw className="w-4 h-4 mr-2" /> Compare Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

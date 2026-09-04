import { useState } from "react";
import {
  LuSearch,
  LuChevronRight,
  LuChevronLeft,
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

const mockHistoryItems = [
  {
    id: 1,
    origin: "Accra",
    dest: "Kumasi",
    date: "Aug 30, 2026",
    time: "10:45 AM",
    couriersCount: 3,
    bestPrice: "GH₵47",
    isActive: true,
  },
  {
    id: 2,
    origin: "Accra",
    dest: "Tema",
    date: "Aug 28, 2026",
    time: "02:20 PM",
    couriersCount: 3,
    bestPrice: "GH₵35",
    isActive: false,
  },
  {
    id: 3,
    origin: "Accra",
    dest: "Cape Coast",
    date: "Aug 27, 2026",
    time: "11:10 AM",
    couriersCount: 2,
    bestPrice: "GH₵60",
    isActive: false,
  },
  {
    id: 4,
    origin: "Kumasi",
    dest: "Accra",
    date: "Aug 25, 2026",
    time: "09:15 AM",
    couriersCount: 3,
    bestPrice: "GH₵45",
    isActive: false,
  },
  {
    id: 5,
    origin: "Accra",
    dest: "Takoradi",
    date: "Aug 22, 2026",
    time: "04:30 PM",
    couriersCount: 3,
    bestPrice: "GH₵58",
    isActive: false,
  },
];

const mockComparisonResults = [
  {
    id: "uber",
    name: "Uber Direct",
    price: "GH₵50",
    eta: "~45 min",
    iconBg: "bg-slate-900 text-white text-xs",
    iconLetter: "Uber",
    tag: "Fastest",
  },
  {
    id: "yango",
    name: "Yango Delivery",
    price: "GH₵47",
    eta: "~50 min",
    iconBg: "bg-yellow-400 text-slate-900 text-xl",
    iconLetter: "Y",
    tag: "Cheapest",
  },
  {
    id: "bolt",
    name: "Bolt Delivery",
    price: "GH₵52",
    eta: "~40 min",
    iconBg: "bg-emerald-500 text-white text-sm",
    iconLetter: "Bolt",
    tag: "Fastest",
  },
];

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

  return (
    <div className="w-full flex flex-col gap-6 max-w-350 mx-auto animate-fade-in-up pb-12 h-full">
      {/* Title */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          History
        </h1>
        <p className="text-muted-foreground mt-1 font-medium">
          View your previous delivery comparisons.
        </p>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="relative flex-1 max-w-xl">
          <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search locations, e.g. Accra -> Kumasi"
            className="pl-11 h-12 bg-card border-border rounded-xl w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="All">
            <SelectTrigger className="w-40 h-12 bg-card border-border rounded-xl">
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
            <SelectTrigger className="w-35 h-12 bg-card border-border rounded-xl">
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
            {mockHistoryItems.map((item) => (
              <div
                key={item.id}
                className={`p-5 flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  item.isActive
                    ? "bg-secondary/40 border-l-4 border-l-blue-500 shadow-sm"
                    : "hover:bg-secondary/30 border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border/50 border-dashed">
                    <LuMapPin className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[15px] text-foreground flex items-center gap-1.5">
                      {item.origin}{" "}
                      <LuArrowRight className="w-4 h-4 text-muted-foreground" />{" "}
                      {item.dest}
                    </h3>
                    <div className="text-[13px] font-medium text-muted-foreground flex items-center gap-2 mt-1">
                      <span>
                        {item.date} • {item.time}
                      </span>
                    </div>
                    <span className="text-[12px] font-semibold text-blue-600 mt-1">
                      {item.couriersCount} couriers compared
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">
                    Best price
                  </span>
                  <span className="font-bold text-emerald-600 text-[15px]">
                    {item.bestPrice}
                  </span>
                </div>

                <LuChevronRight className="w-5 h-5 text-muted-foreground ml-2" />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-card">
            <Button variant="outline" className="h-10 rounded-xl" disabled>
              <LuChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              Page 1 of 4
            </span>
            <Button variant="outline" className="h-10 rounded-xl">
              Next <LuChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="xl:col-span-6 flex flex-col gap-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <p className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Details of Delivery
            </p>
            <div className="hidden xl:block"></div>
            <span className="text-[13px] font-medium text-muted-foreground">
              Compared on Aug 30, 2026 at 10:45 AM
            </span>
          </div>

          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Accra <LuArrowRight className="w-5 h-5 text-muted-foreground" />{" "}
            Kumasi
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
                  Accra, Greater Accra
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
                  Kumasi, Ashanti
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div
            className="w-full h-70 bg-secondary rounded-2xl border border-border mt-2 overflow-hidden relative shadow-inner bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/map_bg.jpg')` }}
          >
            {/* Note: Ideally this uses realistic_map_bg artifact, fallback styling provided */}
            <div className="absolute inset-0 bg-blue-900/5 mix-blend-multiply"></div>
          </div>

          {/* Comparison Results */}
          <div className="flex flex-col mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[17px] text-foreground">
                Comparison Results
              </h3>
              <span className="text-[12px] font-medium text-muted-foreground">
                Prices are estimates
              </span>
            </div>

            <div className="flex flex-col border border-border/80 rounded-xl overflow-hidden divide-y divide-border/60">
              {mockComparisonResults.map((result) => (
                <div
                  key={result.id}
                  className={`flex items-center gap-3 py-3 px-4 sm:px-5 cursor-pointer transition-colors hover:bg-secondary/10 ${
                    result.tag === "Cheapest"
                      ? "bg-emerald-50/40 hover:bg-emerald-50/60"
                      : "bg-card"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 w-40 sm:w-32 shrink-0">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-black ${result.iconBg}`}
                    >
                      {result.iconLetter}
                    </div>
                    <p className="font-bold text-sm  text-foreground leading-[1.15] whitespace-pre-line">
                      {result.name.replace(" ", "\n")}
                    </p>
                  </div>

                  {/* Spacer to push everything else to the right */}
                  {/* <div className="flex-1"></div> */}

                  <div className="w-16 sm:w-20 shrink-0 text-left">
                    <p
                      className={`font-bold text-base sm:text-md ${result.tag === "Cheapest" ? "text-emerald-700" : "text-foreground"}`}
                    >
                      {result.price}
                    </p>
                  </div>

                  <div className="hidden sm:flex flex-col items-start justify-center w-24 shrink-0">
                    <p className="font-bold text-sm text-foreground leading-tight">
                      {result.eta}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5 leading-tight">
                      Est. delivery
                    </p>
                  </div>

                  <div className="hidden lg:flex items-center justify-start w-20 shrink-0">
                    {result.tag && (
                      <span
                        className={`inline-flex items-center justify-center px-2.5 h-6 text-xs font-bold rounded-md whitespace-nowrap ${
                          result.tag === "Cheapest"
                            ? "bg-emerald-100/80 text-emerald-700"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {result.tag}
                      </span>
                    )}
                  </div>

                  <div className="shrink-0 ml-2">
                    <Button
                      variant={
                        result.tag === "Cheapest" ? "default" : "outline"
                      }
                      className={`h-9 px-5 rounded-lg font-bold text-sm w-20 ${
                        result.tag === "Cheapest"
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-card hover:bg-secondary text-foreground"
                      }`}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-14 mt-4 rounded-xl font-bold border-border/80 text-foreground bg-background hover:bg-secondary transition-colors text-[15px]"
          >
            <LuRefreshCcw className="w-4 h-4 mr-2" /> Compare Again
          </Button>
        </div>
      </div>
    </div>
  );
};

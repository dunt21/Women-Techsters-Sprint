// import { useState } from "react";
import {
  LuMapPin,
  LuPlus,
  LuPackage,
  LuTruck,
  LuClock,
  LuTag,
  LuCalendar,
  LuCheck,
  LuStar,
  LuChevronDown,
  // LuBookmark,
  LuChevronRight,
  LuInfo,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Link } from "react-router-dom";

const selectFields = [
  {
    id: "packageType",
    label: "Package type",
    icon: LuPackage,
    defaultValue: "Parcel",
    options: ["Parcel", "Document", "Large Box", "Pallet"],
  },
  {
    id: "preferredCourier",
    label: "Preferred courier",
    icon: LuTruck,
    defaultValue: "No preference",
    options: [
      "No preference",
      "Yango Delivery",
      "Uber Direct",
      "Bolt Delivery",
    ],
  },
];

const courierOptions = [
  {
    id: 1,
    name: "Yango Delivery",
    logoLetter: "Y",
    logoBg: "bg-secondary text-foreground",
    rating: "4.6",
    // deliveries: "1,245 deliveries",
    isBestPrice: true,
    estimatedTime: "~4h 50m",
    speedTier: "Standard",
    price: "GHS 47",
    dropOffDate: "Tomorrow",
    dropOffTime: "Before 6:00 PM",
    features: ["Door-to-door", "Live tracking", "SMS updates"],
  },
  {
    id: 2,
    name: "Uber Direct",
    logoLetter: "Uber",
    logoBg: "bg-foreground text-background font-serif text-[12px]",
    rating: "4.4",
    // deliveries: "2,013 deliveries",
    isBestPrice: false,
    estimatedTime: "~4h 30m",
    speedTier: "Express",
    price: "GHS 50",
    dropOffDate: "Tomorrow",
    dropOffTime: "Before 5:00 PM",
    features: ["Door-to-door", "Live tracking", "Priority support"],
  },
  {
    id: 3,
    name: "Bolt Delivery",
    logoLetter: "bolt",
    logoBg: "bg-primary text-primary-foreground font-black text-[12px]",
    rating: "4.2",
    // deliveries: "985 deliveries",
    isBestPrice: false,
    estimatedTime: "~5h 10m",
    speedTier: "Standard",
    price: "GHS 52",
    dropOffDate: "Tomorrow",
    dropOffTime: "Before 7:00 PM",
    features: ["Door-to-door", "Live tracking"],
  },
];

const routeStats = [
  { label: "Estimated distance", value: "250 km" },
  { label: "Estimated time", value: "~ 4h 30m - 5h 15m" },
  { label: "Best price", value: "GHS 47", isHighlight: true },
];

export const ComparePage = () => {
  return (
    <div className="w-full flex flex-col gap-6 max-w-300 mx-auto animate-fade-in-up pb-12 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Compare Delivery
          </h1>
          <p className="text-muted-foreground mt-1.5 font-medium text-[15px]">
            Enter your delivery details to compare prices, delivery times and
            choose the best option.
          </p>
        </div>
        <Button
          variant="outline"
          className="h-10 px-4 rounded-xl font-bold border-border bg-background hover:bg-secondary text-foreground shadow-sm"
        >
          <LuClock className="w-4 h-4 mr-2" /> Recent Searches{" "}
          <LuChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-4 mb-10">
        {/* Left Column: Forms & Map */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {/* Delivery Details Card */}
          <div className="bg-card border border-border/60 rounded-[1.5rem] p-6 sm:p-7 shadow-sm">
            <h3 className="font-bold text-[16px] text-foreground mb-6">
              Delivery Details
            </h3>

            {/* Locations */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-muted-foreground">
                  Pickup location
                </label>
                <div className="relative flex items-center bg-background border border-border rounded-xl h-12 px-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 ml-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <Input
                    type="text"
                    defaultValue="Accra, Greater Accra"
                    className="flex-1 bg-transparent border-none outline-none px-3 text-[14px] font-bold text-foreground"
                  />
                  <LuMapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
                <button className="text-[12px] font-bold text-primary flex items-center gap-1.5 mt-1 hover:underline w-fit">
                  Use my current location <LuMapPin className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-[13px] font-bold text-muted-foreground">
                  Drop-off location
                </label>
                <div className="relative flex items-center bg-background border border-border rounded-xl h-12 px-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  <div className="w-4 h-4 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 ml-1">
                    <div className="w-2 h-2 rounded-full bg-destructive"></div>
                  </div>
                  <Input
                    type="text"
                    defaultValue="Kumasi, Ashanti Region"
                    className="flex-1 bg-transparent border-none outline-none px-3 text-[14px] font-bold text-foreground"
                  />
                  <LuMapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </div>

              <Button className="text-[13px] font-bold text-primary-foreground flex items-center gap-1.5 hover:underline w-fit mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                  <LuPlus className="w-3.5 h-3.5" />
                </div>
                Add stop
              </Button>
            </div>

            <div className="h-px w-full bg-border/60 my-6"></div>

            {/* Mapped Select Fields (Package Details / Preferences) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {selectFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-muted-foreground">
                    {field.label}
                  </label>
                  <div className="relative flex items-center bg-background border border-border rounded-xl h-12 px-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <field.icon className="w-4 h-4 text-muted-foreground shrink-0 ml-1" />
                    <div className="flex-1 min-w-0">
                      <Select defaultValue={field.defaultValue}>
                        <SelectTrigger className="border-none bg-transparent h-full shadow-none hover:bg-transparent focus:ring-0 px-2 font-bold text-[13px] text-foreground w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false} className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                          {field.options.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full h-12 rounded-xl font-bold bg-[#3b41c5] hover:bg-[#2d32a3] hover:shadow-md text-white shadow-sm active:scale-95 transition-all duration-300 text-[14px]">
              Compare Options <LuChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Map & Stats */}
          <div className="bg-card border border-border/60 rounded-[1.5rem] overflow-hidden shadow-sm flex flex-col">
            <div className="w-full h-55 bg-secondary relative">
              <img
                src="/realistic_map_bg_1788223664365.jpg"
                alt="Route Map"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-background/10"></div>
              {/* Fake UI Overlay on Map */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-background rounded-lg shadow-md border border-border flex flex-col overflow-hidden">
                  <button className="w-9 h-9 flex items-center justify-center hover:bg-secondary border-b border-border transition-colors">
                    <LuPlus className="w-4 h-4 text-foreground" />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors">
                    <div className="w-3 h-1 bg-foreground rounded-full"></div>
                  </button>
                </div>
                <button className="w-9 h-9 bg-background rounded-lg shadow-md border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                  <LuMapPin className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-card flex flex-col">
              <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-5 mb-4">
                {routeStats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-muted-foreground">
                      {stat.label}
                    </span>
                    <span
                      className={`text-[15px] font-bold ${stat.isHighlight ? "text-emerald-600" : "text-foreground"}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
                <LuInfo className="w-3.5 h-3.5" /> Prices and times are
                estimates and may vary.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Courier Options */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <h3 className="font-bold text-[17px] text-foreground">
                Available Options
              </h3>
              <p className="text-[13px] font-medium text-muted-foreground mt-1">
                We found {courierOptions.length} courier services for your
                delivery.
              </p>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0 w-full sm:w-auto">
              <span className="text-[11px] font-bold text-muted-foreground">
                Sort by
              </span>
              <Select defaultValue="Price (Low to High)">
                <SelectTrigger className="w-full sm:w-50 h-10 border-border bg-card rounded-xl text-[13px] font-bold shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                  <SelectItem value="Price (Low to High)">
                    Price (Low to High)
                  </SelectItem>
                  <SelectItem value="Fastest Delivery">
                    Fastest Delivery
                  </SelectItem>
                  <SelectItem value="Highest Rated">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {courierOptions.map((courier) => (
              <div
                key={courier.id}
                className="bg-card border border-border/60 rounded-[1.5rem] p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-13 h-13 rounded-xl flex items-center justify-center text-[22px] font-black shrink-0 shadow-sm ${courier.logoBg}`}
                    >
                      {courier.logoLetter}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[17px] text-foreground">
                          {courier.name}
                        </h4>
                        {courier.isBestPrice && (
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
                        {/* <span>{courier.deliveries}</span> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Button className="h-10 px-6 rounded-xl font-bold bg-[#3b41c5] hover:bg-[#2d32a3] text-white shadow-sm hover:shadow-md transition-all text-[13px]">
                      Select
                    </Button>
                    <button className="text-[12px] font-bold text-primary flex items-center gap-1 hover:opacity-70 transition-opacity">
                      View details <LuChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
                      {courier.price}
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

                <div className="w-full h-px bg-border/50 mb-4"></div>

                {/* Features Map */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[12px] font-bold text-foreground mr-1">
                    Features:
                  </span>
                  {courier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <LuCheck className="w-2.5 h-2.5 text-emerald-600" />
                      </div>
                      <span className="text-[12px] font-medium text-foreground">
                        {feature}
                      </span>
                      {idx !== courier.features.length - 1 && (
                        <span className="text-muted-foreground mx-1 text-[10px]">
                          •
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Save Route Banner */}
          {/* <div className="bg-secondary/40 border border-border/60 rounded-[1.5rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 mt-2 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shrink-0 shadow-sm">
                <LuBookmark className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-[16px] text-foreground">
                  Save this route
                </h3>
                <p className="text-[13px] font-medium text-muted-foreground mt-0.5">
                  Sign in to save this route and get price drop alerts.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="h-11 px-6 rounded-xl font-bold border-border bg-background hover:bg-secondary text-primary shadow-sm shrink-0 w-full sm:w-auto"
            >
              Sign in to save
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

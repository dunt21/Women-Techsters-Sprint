import {
  LuMapPin,
  LuPlus,
  LuClock,
  LuChevronDown,
  LuChevronRight,
  LuInfo,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { CourierCard } from "@/components/dashboard/CourierCard";
import { api } from "@/api/axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SearchBox } from "@mapbox/search-js-react";

const routeStats = [
  { label: "Estimated distance", value: "250 km" },
  { label: "Estimated time", value: "~ 4h 30m - 5h 15m" },
  { label: "Best price", value: "GHS 47", isHighlight: true },
];

export const ComparePage = () => {
  const location = useLocation();

  const [userInput, setUserInput] = useState({
    pickup: location.state?.pickup || "",
    dropOff: location.state?.dropoff || "",
  });
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ pickup: "", dropOff: "" });
  const [bestPrice, setBestPrice] = useState(0);

  const mapboxApi = import.meta.env.VITE_MAPBOX_TOKEN;

  console.log(errors);

  const handleCompare = async () => {
    if (userInput.pickup.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        pickup: "Pickup point cannot be empty!",
      }));

      return;
    }

    if (userInput.dropOff.trim().length <= 2) {
      setErrors((prev) => ({
        ...prev,
        dropOff: "DropOff point cannot be empty!",
      }));

      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("tokens");

      const response = await api.post("/api/comparison/compare", userInput, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      const returnedQuotes = data.data.quotes;

      const minPrice = Math.min(
        ...returnedQuotes.map((quote: { price: number }) => quote.price),
      );
      setBestPrice(minPrice);

      setQuotes(returnedQuotes);

      toast.success(`${data.message} 👏`);
    } catch (error: any) {
      const backendErr = error?.response?.data?.message;

      toast.error(backendErr ? backendErr : "Unable to search prices");
    } finally {
      setLoading(false);
    }
  };

  const getCurLocation = () => {
    // console.log("hi");
    // console.log(mapboxApi);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          // console.log(`lat: ${lat} n long: ${long}`);

          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${mapboxApi}`,
          );

          const userCurLoc = response.data.features[0].place_name;

          setUserInput((input) => ({
            ...input,
            pickup: userCurLoc,
          }));
        },
        (error) => {
          console.error("Browser blocked us:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    } else {
      console.error("Your browser does not support Geolocation!");
    }
  };

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
                  {/* <Input
                    type="text"
                    value={userInput.pickup}
                    error={errors.pickup}
                    placeholder="Please enter a pickup point"
                    onChange={(e) =>
                      setUserInput({ ...userInput, pickup: e.target.value })
                    }
                    className="flex-1 bg-transparent border-none outline-none px-3 text-[14px] font-bold text-foreground"
                  /> */}

                  <div className="flex-1 w-full">
                    <SearchBox
                      accessToken={mapboxApi}
                      options={{
                        language: "en",
                        country: "GH",
                        // types: "poi,address,place,neighborhood",
                      }}
                      value={userInput.pickup}
                      onChange={(search) =>
                        setUserInput({ ...userInput, pickup: search })
                      }
                      placeholder="Please enter a pickup point"
                      onRetrieve={(result) => {
                        console.log(result);
                      }}
                      theme={{
                        variables: {
                          boxShadow: "none",
                          border: "none",
                          fontFamily: "inherit",
                          unit: "14px",
                        },
                        cssText: `
                               input {
                                     background-color: transparent !important;
                                    font-weight: bold !important; 
                                     width: 100% !important;
      }

         input:focus {
        outline: none !important;
           box-shadow: none !important;
      }
         .SearchIcon, svg.SearchIcon {
        display: none !important;
      }
    `,
                      }}
                    />
                  </div>

                  <LuMapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
                <button
                  type="button"
                  className="text-[12px] font-bold text-primary flex items-center gap-1.5 mt-1 hover:underline w-fit"
                  onClick={() => getCurLocation()}
                >
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
                  <div className="flex-1 w-full">
                    <SearchBox
                      accessToken={mapboxApi}
                      options={{
                        language: "en",
                        country: "GH",
                        // types: "poi,address,place,neighborhood",
                      }}
                      value={userInput.dropOff}
                      onChange={(search) =>
                        setUserInput({ ...userInput, dropOff: search })
                      }
                      placeholder="Please enter a pickup point"
                      onRetrieve={(result) => {
                        console.log(result);
                      }}
                      theme={{
                        variables: {
                          boxShadow: "none",
                          border: "none",
                          fontFamily: "inherit",
                          unit: "14px",
                        },
                        cssText: `
                               input {
                                     background-color: transparent !important;
                                    font-weight: bold !important; 
                                     width: 100% !important;
                                     padding-left: 10px !important
      }

         input:focus {
        outline: none !important;
           box-shadow: none !important;
      }
         .SearchIcon, svg.SearchIcon {
        display: none !important;
      }
    `,
                      }}
                    />
                  </div>

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

            <Button
              className="w-full h-12 rounded-xl font-bold bg-[#3b41c5] hover:bg-[#2d32a3] hover:shadow-md text-white shadow-sm active:scale-95 transition-all duration-300 text-[14px]"
              onClick={handleCompare}
              disabled={loading}
            >
              {loading ? (
                "Comparing"
              ) : (
                <>
                  Compare Options <LuChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
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
                We found {quotes.length} courier services for your delivery.
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
                <SelectContent
                  alignItemWithTrigger={false}
                  className="w-(--radix-select-trigger-width) min-w-(--radix-select-trigger-width)"
                >
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
            {quotes.length > 0 ? (
              quotes.map((courier) => (
                <CourierCard
                  key={courier.id}
                  courier={courier}
                  bestPrice={bestPrice}
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
                  Enter your pickup and drop-off locations above to start
                  comparing delivery prices.
                </p>
              </div>
            )}
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

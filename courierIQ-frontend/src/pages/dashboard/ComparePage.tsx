import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "@/api/axios";
import { DeliveryForm } from "@/components/compare/DeliveryForm";
import { RouteOverviewCard } from "@/components/compare/RouteOverviewCard";
import { CourierQuotesList } from "@/components/compare/CourierQuotesList";

export const ComparePage = () => {
  const location = useLocation();

  const [userInput, setUserInput] = useState({
    pickup: location.state?.pickup || "",
    dropOff: location.state?.dropoff || "",
  });
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [bestPrice, setBestPrice] = useState(0);
  const [pickupCoords, setPickupCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const locationIqKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  const handleCompare = async () => {
    if (userInput.pickup.trim() === "") {
      toast.error("Pickup point cannot be empty!");
      return;
    }

    if (userInput.dropOff.trim().length <= 2) {
      toast.error("Drop-off point cannot be empty!");
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          setPickupCoords({ latitude: lat, longitude: long });

          try {
            if (
              locationIqKey &&
              !locationIqKey.includes("your_locationiq_token")
            ) {
              const response = await axios.get(
                `https://us1.locationiq.com/v1/reverse?key=${locationIqKey}&lat=${lat}&lon=${long}&format=json`,
              );

              const userCurLoc = response.data.display_name;

              setUserInput((input) => ({
                ...input,
                pickup: userCurLoc,
              }));
            }
          } catch (err) {
            console.error("Reverse geocoding failed:", err);
          }
        },
        (error) => {
          console.error("Browser blocked us:", error.message);
          toast.error(
            "Could not access your location. Please check browser permissions.",
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    } else {
      toast.error("Your browser does not support Geolocation!");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto animate-fade-in-up pb-12 h-full">
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Compare Delivery
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-[15px] font-medium">
          Enter your delivery details to compare prices, delivery times and
          choose the best option.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-2 sm:mt-4 mb-10">
        {/* Left Column: Forms & Map */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <DeliveryForm
            userInput={userInput}
            setUserInput={setUserInput}
            setPickupCoords={setPickupCoords}
            setDropoffCoords={setDropoffCoords}
            onCompare={handleCompare}
            loading={loading}
            onGetCurLocation={getCurLocation}
          />

          <RouteOverviewCard
            pickupCoords={pickupCoords}
            dropoffCoords={dropoffCoords}
          />
        </div>

        {/* Right Column: Courier Options with Sorting */}
        <CourierQuotesList quotes={quotes} bestPrice={bestPrice} />
      </div>
    </div>
  );
};

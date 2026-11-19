import { LuMapPin, LuChevronRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { LocationInput } from "@/components/shared/LocationInput";
import type { Dispatch, SetStateAction } from "react";

interface DeliveryFormProps {
  userInput: { pickup: string; dropOff: string };
  setUserInput: Dispatch<SetStateAction<{ pickup: string; dropOff: string }>>;
  setPickupCoords: (
    coords: { latitude: number; longitude: number } | null,
  ) => void;
  setDropoffCoords: (
    coords: { latitude: number; longitude: number } | null,
  ) => void;
  onCompare: () => void;
  loading: boolean;
  onGetCurLocation: () => void;
}

export const DeliveryForm = ({
  userInput,
  setUserInput,
  setPickupCoords,
  setDropoffCoords,
  onCompare,
  loading,
  onGetCurLocation,
}: DeliveryFormProps) => {
  return (
    <div className="bg-card border border-border/60 rounded-[1.5rem] p-4 sm:p-6 lg:p-7 shadow-sm">
      <h3 className="font-bold text-[16px] text-foreground mb-6">
        Delivery Details
      </h3>

      {/* Locations */}
      <div className="flex flex-col gap-4">
        {/* Pickup Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-muted-foreground">
            Pickup location
          </label>
          <LocationInput
            dotColor="emerald"
            value={userInput.pickup}
            onChange={(search) =>
              setUserInput((prev) => ({ ...prev, pickup: search }))
            }
            placeholder="Please enter a pickup point"
            onSelectCoords={(coords) => {
              setPickupCoords({
                longitude: coords.longitude,
                latitude: coords.latitude,
              });
            }}
          />
          <button
            type="button"
            className="text-[12px] font-bold text-primary flex items-center gap-1.5 mt-1 hover:underline w-fit cursor-pointer"
            onClick={onGetCurLocation}
          >
            Use my current location <LuMapPin className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Drop-off Input */}
        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-[13px] font-bold text-muted-foreground">
            Drop-off location
          </label>
          <LocationInput
            dotColor="destructive"
            value={userInput.dropOff}
            onChange={(search) =>
              setUserInput((prev) => ({ ...prev, dropOff: search }))
            }
            placeholder="Please enter a drop-off point"
            onSelectCoords={(coords) => {
              setDropoffCoords({
                longitude: coords.longitude,
                latitude: coords.latitude,
              });
            }}
          />
        </div>
      </div>

      <div className="h-px w-full bg-border/60 my-6"></div>

      {/* Compare Button */}
      <Button
        className="w-full h-12 rounded-xl font-bold bg-[#3b41c5] hover:bg-[#2d32a3] hover:shadow-md text-white shadow-sm active:scale-95 transition-all duration-300 text-[14px]"
        onClick={onCompare}
        disabled={loading}
      >
        {loading ? (
          "Comparing..."
        ) : (
          <>
            Compare Options <LuChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>
    </div>
  );
};

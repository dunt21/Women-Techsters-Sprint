import { fetchLocationSuggestions } from "@/api/location";
import { useState, useEffect, useRef } from "react";
import { LuMapPin, LuLoader, LuX } from "react-icons/lu";

interface LocationSuggestion {
  place_id: string;
  display_name: string;
  display_place?: string;
  display_address?: string;
  lat: string;
  lon: string;
}

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelectCoords: (coords: { latitude: number; longitude: number }) => void;
  placeholder?: string;
  countryCode?: string;
  className?: string;
  dotColor?: "emerald" | "destructive";
}

interface LocationInputState {
  suggestions: LocationSuggestion[];
  isOpen: boolean;
  loading: boolean;
}

const initialState: LocationInputState = {
  suggestions: [],
  isOpen: false,
  loading: false,
};

export const LocationInput = ({
  value,
  onChange,
  onSelectCoords,
  placeholder = "Search location...",
  countryCode = "gh",
  className = "",
  dotColor,
}: LocationInputProps) => {
  const [state, setState] = useState(initialState);
  const wrapperRef = useRef<HTMLDivElement>(null);

  //debounce effect for searching for locations
  useEffect(() => {
    let isCurrent = true;

    const timer = setTimeout(async () => {
      try {
        if (value.length < 3 || !value) return;

        setState((prev) => ({ ...prev, loading: true }));

        const data = await fetchLocationSuggestions(value, countryCode);

        if (!isCurrent) return;

        setState((prev) => ({
          ...prev,
          suggestions: data,
          isOpen: data.length > 0,
        }));
      } catch (err) {
        console.error(err);
        setState((prev) => ({ ...prev, suggestions: [] }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    }, 350);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [value, countryCode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setState((prev) => ({ ...prev, isOpen: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedVal: LocationSuggestion) => {
    const placeName =
      selectedVal.display_place || selectedVal.display_name.split(",")[0].trim();
    onChange(placeName);

    onSelectCoords({
      latitude: parseFloat(selectedVal.lat),
      longitude: parseFloat(selectedVal.lon || (selectedVal as unknown as { long: string }).long || "0"),
    });

    setState(initialState);
  };

  const handleClear = () => {
    onChange("");
    setState(initialState);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative flex items-center bg-background border border-border rounded-xl h-12 px-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        {dotColor === "emerald" && (
          <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 ml-0.5 mr-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </div>
        )}
        {dotColor === "destructive" && (
          <div className="w-4 h-4 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 ml-0.5 mr-2">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
          </div>
        )}

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (state.suggestions.length > 0)
              setState((prev) => ({ ...prev, isOpen: true }));
          }}
          placeholder={placeholder}
          className={`flex-1 w-full bg-transparent border-none outline-none text-[14px] font-bold text-foreground placeholder:text-muted-foreground placeholder:font-medium ${className}`}
        />

        {state.loading && (
          <LuLoader className="w-4 h-4 text-primary animate-spin shrink-0 ml-2" />
        )}

        {!state.loading && value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-muted-foreground hover:text-foreground rounded-full transition-colors shrink-0 ml-1 cursor-pointer"
            aria-label="Clear input"
          >
            <LuX className="w-3.5 h-3.5" />
          </button>
        )}

        <LuMapPin className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
      </div>

      {/* STEP 3: SUGGESTIONS DROPDOWN UI */}
      {state.isOpen && state.suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto divide-y divide-border/40 animate-in fade-in-0 zoom-in-95 duration-150">
          {state.suggestions.map((item) => {
            const placeName =
              item.display_place || item.display_name.split(",")[0].trim();
            const parts = item.display_name.split(",").map((p) => p.trim());
            const secondaryText =
              parts.length > 1 ? parts.slice(1, 3).join(", ") : "";

            return (
              <button
                key={item.place_id}
                type="button"
                onClick={() => handleSelect(item)}
                className="w-full text-left p-3.5 hover:bg-secondary/60 flex items-center gap-3 transition-colors group cursor-pointer"
              >
                {/* Pin Icon */}
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <LuMapPin className="w-3.5 h-3.5" />
                </div>

                {/* Text Container */}
                <div className="flex flex-col min-w-0 flex-1">
                  {/* Primary title: e.g. "Kotoka International Airport" or "Eseefoo Close" */}
                  <p className="font-bold text-sm text-foreground truncate">
                    {placeName}
                  </p>

                  {/* Subtitle: concise suburb / city context */}
                  {secondaryText && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {secondaryText}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

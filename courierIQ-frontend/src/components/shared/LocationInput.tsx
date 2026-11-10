import { fetchLocationSuggestions } from "@/api/location";
import { useState, useEffect, useRef } from "react";
import { LuMapPin, LuLoader2, LuX } from "react-icons/lu";

interface LocationSuggestion {
  place_id: string;
  display_name: string;
  display_place?: string;
  display_address?: string;
  lat: string;
  long: string;
}

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelectCoords: (coords: { latitude: number; longitude: number }) => void;
  placeholder?: string;
  countryCode?: string;
  className?: string;
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
}: LocationInputProps) => {
  const [state, setState] = useState(initialState);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  //debounce effect for searching for locations
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (value.length < 3 || !value) return;

        setState((prev) => ({ ...prev, loading: true }));

        const data = await fetchLocationSuggestions(value, countryCode);

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

    return () => clearTimeout(timer);
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
    onChange(selectedVal.display_name);

    onSelectCoords({
      latitude: parseFloat(selectedVal.lat),
      longitude: parseFloat(selectedVal.long),
    });

    setState(initialState);
  };

  const handleClear = () => {
    onChange("");
    setState(initialState);
  };

  return (
    <div ref={wrapperRef} className="relative w-full flex-1">
      <div className="relative flex items-center w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (state.suggestions.length > 0)
              setState((prev) => ({ ...prev, isOpen: true }));
          }}
          placeholder={placeholder}
          className={`w-full bg-transparent border-none outline-none text-[14px] font-bold text-foreground placeholder:text-muted-foreground placeholder:font-medium pr-8 ${className}`}
        />

        {state.loading && (
          <LuLoader2 className="w-4 h-4 text-primary animate-spin absolute right-2 shrink-0 pointer-events-none" />
        )}

        {!state.loading && value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-muted-foreground hover:text-foreground rounded-full transition-colors absolute right-1"
            aria-label="Clear input"
          >
            <LuX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* STEP 3: SUGGESTIONS DROPDOWN UI                                      */}
      {state.isOpen && state.suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border/80 rounded-2xl shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto divide-y divide-border/40 animate-in fade-in-0 zoom-in-95 duration-150">
          {state.suggestions.map((item) => (
            <button
              key={item.place_id}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left p-3.5 hover:bg-secondary/60 flex items-start gap-3 transition-colors group cursor-pointer"
            >
              {/* Pin Icon */}
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <LuMapPin className="w-3.5 h-3.5" />
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                {/* Primary title: e.g. "Kotoka International Airport" */}
                <p className="font-bold text-sm text-foreground truncate">
                  {item.display_place || item.display_name.split(",")[0]}
                </p>

                {/* Subtitle / Full Address */}
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {item.display_name}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

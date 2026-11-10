const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
const LOCATIONIQ_BASE_URL = "https://api.locationiq.com/v1/autocomplete";

export const fetchLocationSuggestions = async (
  query: string,
  countryCode = "gh",
) => {
  const url = `${LOCATIONIQ_BASE_URL}?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query.trim())}&limit=5&countrycodes=${countryCode}&format=json`;

  const response = await fetch(url);

  if (!response.ok) return [];

  return await response.json();
};

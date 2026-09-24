export const formatHistoryData = (rawHistory: any[]) => {
  return rawHistory.map((searchItem: any) => {
    // 1. Format the Date and Time
    const dateObj = new Date(searchItem.createdAt);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 2. Calculate minimum price
    const minPrice = Math.min(
      ...searchItem.CourierQuotes.map((q: any) => parseFloat(q.price))
    );

    // 3. Return a unified object that works for BOTH HistoryPage and DashboardPage
    return {
      // Shared & HistoryPage Fields
      id: searchItem.id,
      origin: searchItem.pickupLocation,
      dest: searchItem.destination,
      date: formattedDate,
      time: formattedTime,
      couriers: searchItem.CourierQuotes,
      couriersCount: searchItem.CourierQuotes.length,
      bestPrice: minPrice !== Infinity ? `GH₵${minPrice}` : "N/A",
      
      // DashboardPage Specific Fields
      carrier: searchItem.CourierQuotes[0]?.courier || "Courier",
      route: `${searchItem.pickupLocation} ➔ ${searchItem.destination}`,
      price: minPrice !== Infinity ? `GH₵${minPrice}` : "N/A",
      status: "Completed",
      statusClass: "text-emerald-500",
      iconLetter: searchItem.CourierQuotes[0]?.courier?.charAt(0) || "C",
      iconClass: "bg-slate-900 text-white",
    };
  });
};

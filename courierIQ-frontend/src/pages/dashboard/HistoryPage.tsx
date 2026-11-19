import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "@/api/axios";
import { formatHistoryData } from "@/utils/formatHistory";
import { HistoryToolbar } from "@/components/history/HistoryToolbar";
import { HistoryList } from "@/components/history/HistoryList";
import { HistoryDetails } from "@/components/history/HistoryDetails";

export const HistoryPage = () => {
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [pastComparisons, setPastComparisons] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 5;
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Fetch History Data
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("tokens");

        const response = await api.get("/api/comparison/history", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const rawHistory = response.data.data;
        const formattedHistory = formatHistoryData(rawHistory);

        setPastComparisons(formattedHistory);

        if (formattedHistory.length > 0) {
          const selectedItemId = location.state?.preSelectedId;
          const clickedItem = formattedHistory.find(
            (i) => i.id === selectedItemId,
          );
          setSelectedHistory(clickedItem || formattedHistory[0]);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [location.state?.preSelectedId]);

  // 2. Filtered Comparisons (Ready for your search & date logic!)
  const filteredComparisons = useMemo(() => {
    // 🎯 YOUR TURN: Write your search and timeFilter logic here!
    return pastComparisons.filter((item) => {
      const query = search.toLocaleLowerCase().trim();
      const destination = item.dest.toLocaleLowerCase().trim();
      const pickup = item.origin.toLocaleLowerCase().trim();

      const itemDate = new Date(item.createdAt);
      const now = new Date();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      const matchSearch =
        !query || destination.includes(query) || pickup.includes(query);
      let matchTime: boolean;

      switch (timeFilter) {
        case "today":
          matchTime = itemDate.toDateString() === now.toDateString();
          break;
        case "this-week":
          matchTime = now.getTime() - itemDate.getTime() <= sevenDaysInMs;
          break;
        case "this-month":
          matchTime =
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear();
          break;

        case "all-time":
        default:
          matchTime = true;
          break;
      }

      return matchSearch && matchTime;
    });
  }, [pastComparisons, search, timeFilter]);

  // 3. Pagination Math
  const totalPages = Math.ceil(filteredComparisons.length / itemsPerPage) || 1;
  const currentItems = filteredComparisons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 4. Action Handlers
  const handleCompareAgain = (pickup: string, dropoff: string) => {
    navigate("/compare", {
      state: {
        pickup: pickup,
        dropoff: dropoff,
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto animate-fade-in-up pb-12 h-full">
      {/* Page Title */}
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          History
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base font-medium">
          View your previous delivery comparisons.
        </p>
      </div>

      {/* Toolbar: Search & Date Filters */}
      <HistoryToolbar
        search={search}
        onSearchChange={setSearch}
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
      />

      {/* Main Grid: List (Left) & Details (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-2 items-start">
        <HistoryList
          items={currentItems}
          isLoading={isLoading}
          selectedHistory={selectedHistory}
          onSelectHistory={setSelectedHistory}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <HistoryDetails
          selectedHistory={selectedHistory}
          isLoading={isLoading}
          onCompareAgain={handleCompareAgain}
        />
      </div>
    </div>
  );
};

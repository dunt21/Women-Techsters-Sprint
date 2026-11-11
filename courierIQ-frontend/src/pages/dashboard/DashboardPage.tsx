import { LuMapPin, LuPackage, LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { api } from "@/api/axios";
import { formatHistoryData } from "@/utils/formatHistory";
import { ComparisonCardSkeleton } from "@/components/skeletons/ComparisonCardSkeleton";
import { RouteMap } from "@/components/shared/RouteMap";

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const summaryCards = [
    {
      id: 1,
      title: "Total Deliveries",
      value: "142",
      icon: <LuPackage className="w-5 h-5 text-purple-600" />,
      badge: "+12% this week",
      bgClass: "bg-[#f3efff] border-purple-100/50",
      badgeClass: "text-purple-700 bg-purple-200/50",
    },
    {
      id: 2,
      title: "Most Used Carrier",
      value: "DHL Express",
      icon: <LuMapPin className="w-5 h-5 text-emerald-600" />,
      badge: "Top choice",
      bgClass: "bg-[#eefcf2] border-green-100/50",
      badgeClass: "text-emerald-700 bg-emerald-200/50",
    },
  ];

  const [recentComparisons, setRecentComparisons] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardHistory = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("tokens");
        const response = await api.get("/api/comparison/history?limit=3", {
          headers: { authorization: `Bearer ${token}` },
        });

        const rawHistory = response.data?.data || [];

        // Use our reusable utility to format the data
        const formatted = Array.isArray(rawHistory)
          ? formatHistoryData(rawHistory)
          : [];

        // We only want the 3 most recent searches for the dashboard!
        const top3 = formatted.slice(0, 3);

        setRecentComparisons(top3);
      } catch (error) {
        console.error("Failed to fetch dashboard history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardHistory();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-10 max-w-7xl mx-auto animate-fade-in-up pb-8">
      {/* Title */}
      <div className="flex flex-col mb-1 sm:mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-slate-500 mt-1 text-sm sm:text-base font-medium">
          Here is an overview of your recent shipping activity.
        </p>
      </div>

      {/* Top Grid: Shipping Overview + Small Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Big Card - Realistic Map & Recent Delivery */}
        <div className="col-span-1 lg:col-span-2 rounded-[2rem] border border-slate-200 relative overflow-hidden flex flex-col justify-end p-4 sm:p-6 min-h-[300px] sm:min-h-[340px] shadow-inner bg-cover bg-center">
          <div className="absolute inset-0 z-0">
            <RouteMap />
          </div>
          {/* Dark Overlay to make text readable if map is bright */}
          <div className="absolute inset-0 bg-black/10 z-0 pointer-events-none"></div>

          {/* Floating Card for Recent Delivery Choice */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/60 shadow-xl w-full sm:max-w-sm">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="bg-emerald-100 text-emerald-600 p-2.5 sm:p-3 rounded-xl shadow-sm shrink-0">
                <LuPackage className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 tracking-tight truncate">
                  Recent Choice
                </h4>
                <p className="text-xs font-semibold text-slate-500 mt-0.5 truncate">
                  In transit • DHL Express
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end mt-2 pt-3 sm:pt-4 border-t border-slate-100">
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">
                  Est. Delivery
                </p>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">Tomorrow, 2:00 PM</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">
                  Cost
                </p>
                <p className="font-bold text-emerald-600 text-xs sm:text-sm">$45.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Small Cards Column (DRY Map) */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6">
          {summaryCards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgClass} rounded-[2rem] p-5 sm:p-6 border flex-1 flex flex-col transition-all duration-300 cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-auto">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-1.5 sm:mb-2">
                    {card.title}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {card.value}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 sm:mt-6">
                <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-sm">
                  {card.icon}
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${card.badgeClass}`}
                >
                  {card.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Recent Comparisons + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Comparisons Table (DRY Map) */}
        <div className="col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-4 sm:mb-6 px-1 sm:px-2">
            <h3 className="text-base sm:text-[1.1rem] font-bold text-slate-900">
              Recent Comparisons
            </h3>
            <Link
              to="/history"
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              See all
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {loading
              ? [0, 1, 2].map((i: number) => <ComparisonCardSkeleton key={i} />)
              : recentComparisons.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      navigate("/history", {
                        state: {
                          preSelectedId: item.id,
                        },
                      })
                    }
                    className="flex items-center justify-between p-3.5 sm:p-4 px-4 sm:px-5 bg-white rounded-2xl border border-slate-100 hover:shadow-sm hover:border-slate-200 transition-all cursor-pointer group gap-3"
                  >
                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${item.iconClass}`}
                      >
                        <LuSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-sm sm:text-[15px] truncate">
                          {item.title}
                        </p>
                        <p className="text-xs sm:text-[13px] font-medium text-slate-500 mt-0.5 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-slate-900 text-sm sm:text-[15px]">
                        {item.price}
                      </p>
                      <p
                        className={`text-xs sm:text-[13px] font-semibold mt-0.5 ${item.statusClass}`}
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* CTA Card with Scooter Image */}
        <div className="col-span-1">
          <div className="bg-[#191b24] rounded-[2rem] p-6 sm:p-8 h-full flex flex-col justify-center text-white relative overflow-hidden shadow-xl border border-white/5">
            {/* Scooter Illustration Background */}
            <div
              className="absolute inset-0 z-0 opacity-40 bg-cover bg-bottom-right scale-125 translate-x-12 translate-y-12 pointer-events-none"
              style={{ backgroundImage: `url('/assets/scooter.jpg')` }}
            ></div>

            {/* Dark gradient overlay so text remains readable */}
            <div className="absolute inset-0 bg-linear-to-t from-[#191b24]/90 via-[#191b24]/60 to-transparent z-0 pointer-events-none"></div>

            <div className="relative z-10 my-auto">
              <h3 className="text-2xl sm:text-[1.7rem] font-bold mb-3 sm:mb-4 leading-tight">
                Start a new
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-emerald-300">
                  Comparison
                </span>
              </h3>
              <p className="text-slate-400 text-sm sm:text-[15px] font-medium mb-6 sm:mb-8 leading-relaxed">
                Enter your package details and destination to find the best
                rates across all carriers instantly.
              </p>

              <Link
                to="/compare"
                className="inline-flex items-center justify-center px-6 sm:px-8 h-11 sm:h-12 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-lg hover:shadow-xl w-full sm:w-fit text-sm sm:text-base"
              >
                Compare Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

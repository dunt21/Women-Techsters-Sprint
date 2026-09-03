import { LuMapPin, LuPackage } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
// import { Button } from "@/components/ui/button";

export const DashboardPage = () => {
  const { user } = useAuth();

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

  const recentComparisons = [
    {
      id: 1,
      carrier: "DHL Express",
      route: "Lagos ➔ London",
      price: "$45.00",
      status: "Cheapest",
      statusClass: "text-emerald-500",
      iconLetter: "D",
      iconClass: "bg-slate-900 text-white",
    },
    {
      id: 2,
      carrier: "FedEx",
      route: "New York ➔ Paris",
      price: "$85.20",
      status: "Fastest",
      statusClass: "text-slate-400",
      iconLetter: "F",
      iconClass: "bg-slate-100 text-slate-900",
    },
    {
      id: 3,
      carrier: "UPS",
      route: "Toronto ➔ Dubai",
      price: "$112.50",
      status: "Standard",
      statusClass: "text-slate-400",
      iconLetter: "U",
      iconClass: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-10 max-w-300 mx-auto animate-fade-in-up">
      {/* Title */}
      <div className="flex flex-col mb-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Here is an overview of your recent shipping activity.
        </p>
      </div>

      {/* Top Grid: Shipping Overview + Small Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Big Card - Realistic Map & Recent Delivery */}
        <div
          className="col-span-1 lg:col-span-2 rounded-[2rem] border border-slate-200 relative overflow-hidden flex flex-col justify-end p-6 min-h-75 shadow-inner bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/map_bg.jpg')` }}
        >
          {/* Dark Overlay to make text readable if map is bright */}
          <div className="absolute inset-0 bg-black/10 z-0"></div>

          {/* Floating Card for Recent Delivery Choice */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-white/60 shadow-xl max-w-sm transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl shadow-sm">
                <LuPackage className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  Recent Choice
                </h4>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  In transit • DHL Express
                </p>
              </div>
            </div>

            <div className="flex justify-between items-end mt-2 pt-4 border-t border-slate-100">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Est. Delivery
                </p>
                <p className="font-bold text-slate-900">Tomorrow, 2:00 PM</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Cost
                </p>
                <p className="font-bold text-emerald-600">$45.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Small Cards Column (DRY Map) */}
        <div className="flex flex-col gap-6">
          {summaryCards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgClass} rounded-[2rem] p-6 border flex-1 flex flex-col hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-auto">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-2">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {card.value}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
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
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-[1.1rem] font-bold text-slate-900">
              Recent Comparisons
            </h3>
            <button className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              See all
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {recentComparisons.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 px-5 bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform ${item.iconClass}`}
                  >
                    {item.iconLetter}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[15px]">
                      {item.carrier}
                    </p>
                    <p className="text-[13px] font-medium text-slate-500 mt-0.5">
                      {item.route}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-[15px]">
                    {item.price}
                  </p>
                  <p
                    className={`text-[13px] font-semibold mt-0.5 ${item.statusClass}`}
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
          <div className="bg-[#191b24] rounded-[2rem] p-8 h-full flex flex-col justify-center text-white relative overflow-hidden shadow-xl border border-white/5">
            {/* Scooter Illustration Background */}
            <div
              className="absolute inset-0 z-0 opacity-40 bg-cover bg-bottom-right  scale-125 translate-x-12 translate-y-12"
              style={{ backgroundImage: `url('/assets/scooter.jpg')` }}
            ></div>

            {/* Dark gradient overlay so text remains readable */}
            <div className="absolute inset-0 bg-linear-to-t from-[#191b24]/90 via-[#191b24]/60 to-transparent z-0"></div>

            <div className="relative z-10 mt-auto mb-auto">
              <h3 className="text-[1.7rem] font-bold mb-4 leading-tight">
                Start a new
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-emerald-300">
                  Comparison
                </span>
              </h3>
              <p className="text-slate-400 text-[15px] font-medium mb-8 leading-relaxed">
                Enter your package details and destination to find the best
                rates across all carriers instantly.
              </p>

              <Link
                to="/compare"
                className="inline-flex items-center justify-center px-8 h-12 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-lg hover:shadow-xl w-fit"
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

import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuArrowRightLeft,
  LuHistory,
  LuSettings,
  LuCircle,
  LuBox,
} from "react-icons/lu";

export const Sidebar = () => {
  const mainLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LuLayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Compare Delivery",
      path: "/compare",
      icon: <LuArrowRightLeft className="w-5 h-5" />,
    },
    {
      name: "History",
      path: "/history",
      icon: <LuHistory className="w-5 h-5" />,
    },
  ];

  const accountLinks = [
    {
      name: "Settings",
      path: "/settings",
      icon: <LuSettings className="w-5 h-5" />,
    },
    {
      name: "Help & Support",
      path: "/support",
      icon: <LuCircle className="w-5 h-5" />,
    },
  ];

  const NavItem = ({ link }: { link: any }) => (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
            isActive
              ? "bg-white/10 text-white shadow-sm"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`
        }
      >
        {link.icon}
        <span>{link.name}</span>
      </NavLink>
    </li>
  );

  return (
    <aside className="w-[280px] h-screen bg-[#11131e] flex flex-col border-r border-white/5 shrink-0 overflow-y-auto hidden lg:flex">
      {/* Brand */}
      <div className="p-8">
        <NavLink to="/" className="flex items-center gap-3 text-white">
          <div className="bg-primary/20 p-2 rounded-xl text-primary">
            <LuBox className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">CourierIQ</span>
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 px-4 pb-8 space-y-8">
        {/* MAIN Section */}
        <div>
          <h3 className="px-4 text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">
            Main
          </h3>
          <ul className="space-y-1">
            {mainLinks.map((link) => (
              <NavItem key={link.name} link={link} />
            ))}
          </ul>
        </div>

        {/* ACCOUNT Section */}
        <div>
          <h3 className="px-4 text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">
            Account
          </h3>
          <ul className="space-y-1">
            {accountLinks.map((link) => (
              <NavItem key={link.name} link={link} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

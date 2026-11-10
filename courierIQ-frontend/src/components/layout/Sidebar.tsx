import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuArrowRightLeft,
  LuHistory,
  LuSettings,
  LuBox,
  LuLogOut,
  LuX,
} from "react-icons/lu";
import { FiHelpCircle } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { Navii } from "@usenavii/react";
import { useEffect } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically close mobile sidebar whenever navigation happens
  useEffect(() => {
    if (isOpen && onClose) {
      onClose();
    }
  }, [location.pathname]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSignOut = () => {
    if (onClose) onClose();
    logout();
    navigate("/login");
  };

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
      icon: <FiHelpCircle className="w-5 h-5" />,
    },
  ];

  const NavItem = ({ link }: { link: any }) => (
    <li>
      <NavLink
        to={link.path}
        onClick={() => onClose?.()}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
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

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 sm:p-8 flex items-center justify-between">
        <NavLink
          to="/"
          onClick={() => onClose?.()}
          className="flex items-center gap-3 text-white"
        >
          <div className="bg-primary/20 p-2 rounded-xl text-primary">
            <LuBox className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold tracking-tight">CourierIQ</span>
        </NavLink>

        {/* Close Button - Mobile Only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close menu"
          >
            <LuX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 px-4 pb-6 space-y-6 overflow-y-auto">
        {/* MAIN Section */}
        <div>
          <h3 className="px-4 text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
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
          <h3 className="px-4 text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
            Account
          </h3>
          <ul className="space-y-1">
            {accountLinks.map((link) => (
              <NavItem key={link.name} link={link} />
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM PROFILE SECTION */}
      <div className="p-4 border-t border-white/5 mt-auto">
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0">
              <Navii seed={user?.name || "default"} size={32} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate">
                {user?.name || "User Name"}
              </span>
              <span className="text-xs text-slate-400 truncate">
                {user?.role || "User"}
              </span>
            </div>
          </div>

          <button
            className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg"
            title="Sign out"
            onClick={handleSignOut}
          >
            <LuLogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="w-60 h-screen bg-[#11131e] flex-col border-r border-white/5 shrink-0 overflow-y-auto hidden lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay & Slide-in Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside className="relative w-72 max-w-[85vw] h-full bg-[#11131e] border-r border-white/10 z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

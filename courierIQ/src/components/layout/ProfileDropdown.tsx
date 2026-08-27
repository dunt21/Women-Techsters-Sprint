import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuUserRound,
  LuSettings,
  LuLogOut,
  LuCircle,
  LuChevronDown,
} from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { Navii } from "@usenavii/react";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dropdownLinks = [
    {
      name: "Profile",
      path: "/profile",
      icon: <LuUserRound className="w-4 h-4" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <LuSettings className="w-4 h-4" />,
    },
    {
      name: "Help Center",
      path: "/support",
      icon: <LuCircle className="w-4 h-4" />,
    },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white border border-border/50 hover:bg-slate-50 transition-colors py-2 px-3 pl-2 rounded-full shadow-sm"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center overflow-hidden shrink-0">
          <Navii seed={user?.name || "default"} size={32} />
        </div>
        <span className="text-sm font-semibold text-foreground hidden sm:block">
          {user?.name}
        </span>
        <LuChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform hidden sm:block ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-border/40 py-2 z-50 animate-fade-in-up">
          {/* User Info Header */}

          <div className="px-5 py-3 border-b border-border/40 mb-2">
            <p className="text-sm font-bold text-foreground"> {user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>

          {/* Links */}
          <div className="px-2 space-y-1">
            {dropdownLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="px-2 mt-2 pt-2 border-t border-border/40">
            <button
              onClick={() => {
                setIsOpen(false);
                handleSignOut();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LuLogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

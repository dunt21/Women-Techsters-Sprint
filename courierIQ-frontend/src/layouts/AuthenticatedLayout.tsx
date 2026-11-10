import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import { useAuth } from "@/context/AuthContext";
import { LuSearch, LuBell, LuMenu } from "react-icons/lu";

export const AuthenticatedLayout = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return <Navigate to={"/login"} />;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar (Desktop persistent + Mobile drawer) */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 sm:h-[72px] bg-white border-b border-border/40 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Open navigation menu"
            >
              <LuMenu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button
              className="text-slate-400 hover:text-slate-600 p-1.5 transition-colors"
              aria-label="Search"
            >
              <LuSearch className="w-5 h-5" />
            </button>
            <button
              className="text-slate-400 hover:text-slate-600 p-1.5 transition-colors relative"
              aria-label="Notifications"
            >
              <LuBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-5 sm:h-6 w-px bg-slate-200"></div>
            <ProfileDropdown />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

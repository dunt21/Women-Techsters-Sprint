import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import { useAuth } from "@/context/AuthContext";
import { LuSearch, LuBell } from "react-icons/lu";

export const AuthenticatedLayout = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to={"/login"} />;

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-[72px] bg-white border-b border-border/40 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1">
            {/* Left side empty for now */}
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <LuSearch className="w-5 h-5" />
            </button>
            <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
              <LuBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <ProfileDropdown />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

export const AuthenticatedLayout = () => {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-[72px] bg-white border-b border-border/40 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1">
            {/* We can put a search bar or page title here later */}
          </div>

          <div className="flex items-center gap-4">
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

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: "Home", path: "/", type: "page" },
    { name: "Features", path: "/#features", type: "hash" },
    { name: "How It Works", path: "/#how-it-works", type: "hash" },
    { name: "About", path: "/about", type: "page" },
    { name: "Contact", path: "/contact", type: "page" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 transition-all shadow-xs">
      <div className="w-full px-4 sm:px-6 md:px-12 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-foreground uppercase"
          >
            Courier IQ
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            if (item.type === "hash") {
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-[15px] font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (item.path === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={({ isActive }) =>
                  `text-[15px] transition-colors relative py-1 ${
                    isActive
                      ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                      : "text-foreground/80 font-medium hover:text-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Auth CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {!user && (
            <>
              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center rounded-full border border-primary bg-transparent px-5 text-[14px] font-medium text-primary shadow-sm hover:bg-primary/5 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Visit Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[16px] font-medium py-2 text-foreground/90 hover:text-primary transition-colors border-b border-border/20 last:border-none"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-border/40">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl border border-border bg-card text-[15px] font-bold text-foreground shadow-xs hover:bg-secondary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl bg-primary text-[15px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-11 items-center justify-center rounded-xl bg-primary text-[15px] font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Visit Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

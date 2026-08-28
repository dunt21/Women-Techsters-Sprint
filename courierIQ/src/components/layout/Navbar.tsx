import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
// import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  const navLinks = [
    { name: "Home", path: "/", type: "page" },
    { name: "Features", path: "/#features", type: "hash" },
    { name: "How It Works", path: "/#how-it-works", type: "hash" },
    { name: "About", path: "/about", type: "page" },
    { name: "Contact", path: "/contact", type: "page" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-2 md:px-12 flex items-center justify-between bg-background/60 backdrop-blur-md border-b border-border/40 transition-all shadow-xs">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-foreground uppercase"
        >
          Courier IQ
        </Link>
      </div>

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
                // If they click "Home" while already on the home page, scroll to the top
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

      <div className="hidden md:flex items-center gap-4">
        {/* If the user is NOT logged in, show the Login/Signup buttons */}

        {!user && (
          <>
            <Link
              to="/login"
              className="inline-flex h-11 items-center justify-center rounded-full border border-primary bg-transparent px-6 text-[15px] font-medium text-primary shadow-sm hover:bg-primary/5 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* If the user IS logged in, show a Visit Dashboard button */}

        {user && (
          <Link
            to="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Visit Dashboard
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle (Visible only on mobile) */}
      <button className="md:hidden flex items-center justify-center p-2 text-foreground">
        <IoMenu size={24} />
      </button>
    </nav>
  );
};

export default Navbar;

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Helper component that listens to URL hash changes and scrolls to the element with matching id
const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
};

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <ScrollToHash />
      <Navbar />

      <main className="flex-1 flex flex-col">{<Outlet />}</main>

      <Footer />
    </div>
  );
};

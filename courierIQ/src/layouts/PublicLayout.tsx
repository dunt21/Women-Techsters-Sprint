// import React from 'react'

import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>{<Outlet />}</main>
    </div>
  );
};

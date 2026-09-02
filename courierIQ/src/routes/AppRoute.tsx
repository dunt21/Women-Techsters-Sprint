import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { LandingPage } from "@/pages/public/LandingPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignUpPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { ContactPage } from "@/pages/public/ContactPage";
import { AboutPage } from "@/pages/public/AboutPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { HistoryPage } from "@/pages/dashboard/HistoryPage";

export const AppRoute = () => {
  const publicList = [
    {
      path: "/",
      el: <LandingPage />,
    },
    {
      path: "/contact",
      el: <ContactPage />,
    },
    {
      path: "/about",
      el: <AboutPage />,
    },
  ];

  const authList = [
    {
      path: "/login",
      el: <LoginPage />,
    },
    {
      path: "/signup",
      el: <SignupPage />,
    },
    {
      path: "/forgot-password",
      el: <ForgotPasswordPage />,
    },
    {
      path: "/reset-password",
      el: <ResetPasswordPage />,
    },
  ];

  const privateList = [
    {
      path: "/dashboard",
      el: <DashboardPage />,
    },
    {
      path: "/compare",
      el: (
        <div className="text-2xl font-bold">Compare Delivery Placeholder</div>
      ),
    },
    {
      path: "/history",
      el: <HistoryPage />,
    },
    {
      path: "/settings",
      el: <SettingsPage />,
    },
    {
      path: "/support",
      el: <div className="text-2xl font-bold">Support Placeholder</div>,
    },
  ];

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {publicList.map((item) => (
          <Route path={item.path} element={item.el} key={item.path} />
        ))}
      </Route>

      <Route element={<AuthLayout />}>
        {authList.map((item) => (
          <Route key={item.path} path={item.path} element={item.el} />
        ))}
      </Route>

      <Route element={<AuthenticatedLayout />}>
        {privateList.map((item) => (
          <Route key={item.path} path={item.path} element={item.el} />
        ))}
      </Route>
    </Routes>
  );
};

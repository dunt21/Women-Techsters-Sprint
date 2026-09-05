import { LuUser, LuShield, LuTruck, LuBell, LuMail } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { type ReactNode } from "react";
import type { IconType } from "react-icons/lib";

interface SettingsSectionProps {
  icon: IconType;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  children: ReactNode;
}

// Reusable Section Wrapper
const SectionCard = ({
  icon: Icon,
  title,
  description,
  children,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
}: SettingsSectionProps) => (
  <div className="bg-card border border-border/60 rounded-[2rem] p-8 flex flex-col gap-8 shadow-sm relative w-full transition-all duration-300">
    <div className="flex items-start gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="flex flex-col pt-1">
        <h2 className="text-[17px] font-bold text-foreground">{title}</h2>
        <p className="text-[13px] font-medium text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
    <div className="w-full">{children}</div>
  </div>
);

export const SettingsPage = () => {
  const { user, logout } = useAuth();

  const profileInputs = [
    {
      id: "firstName",
      label: "First name",
      type: "text",
      defaultValue: user?.name?.split(" ")[0] || "Suad",
      fullWidth: false,
    },
    {
      id: "lastName",
      label: "Last name",
      type: "text",
      defaultValue: user?.name?.split(" ")[1] || "Macaulay",
      fullWidth: false,
    },
    {
      id: "email",
      label: "Email address",
      type: "email",
      defaultValue: user?.email || "suadmacaulay@gmail.com",
      fullWidth: true,
    },
  ];

  const deliveryPreferences = [
    {
      id: "pickup",
      label: "Default pickup location",
      type: "input",
      placeholder: "e.g. Accra, Ghana",
      defaultValue: "Accra, Ghana",
      icon: LuTruck,
    },
    {
      id: "courier",
      label: "Preferred courier",
      type: "select",
      options: [
        { value: "no-pref", label: "No preference" },
        { value: "dhl", label: "DHL Express" },
        { value: "fedex", label: "FedEx" },
      ],
      defaultValue: "no-pref",
    },
    {
      id: "speed",
      label: "Preferred delivery speed",
      type: "select",
      options: [
        { value: "fastest", label: "Fastest available" },
        { value: "cheapest", label: "Cheapest available" },
        { value: "standard", label: "Standard (3-5 days)" },
      ],
      defaultValue: "fastest",
    },
  ];

  const notifications = [
    {
      id: "updates",
      title: "Delivery updates",
      desc: "Receive updates about your deliveries and their status.",
      icon: LuTruck,
      bg: "bg-emerald-400",
      defaultChecked: true,
    },
    {
      id: "prices",
      title: "Price comparison updates",
      desc: "Get notified when prices change for your saved routes.",
      icon: LuBell,
      bg: "bg-blue-400",
      defaultChecked: false,
    },
    {
      id: "emails",
      title: "Email notifications",
      desc: "Receive important account and security notifications.",
      icon: LuMail,
      bg: "bg-purple-400",
      defaultChecked: true,
    },
  ];

  const accountActions = [
    {
      id: "signout",
      title: "Sign out",
      desc: "Sign out of your CourierIQ account on this device.",
      buttonText: "Sign Out",
      onClick: logout,
      btnClass:
        "bg-background border-border hover:bg-secondary text-foreground hover:scale-105 transition-all shadow-sm",
      textClass: "text-muted-foreground",
      titleClass: "text-foreground",
    },
    {
      id: "delete",
      title: "Delete account",
      desc: "Permanently delete your account and all your data.",
      buttonText: "Delete Account",
      onClick: () => {},
      btnClass:
        "border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700",
      textClass: "text-red-500",
      titleClass: "text-destructive", // fallback class just in case
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 max-w-200 mx-auto animate-fade-in-up pb-12">
      {/* Title */}
      <div className="flex flex-col mb-4 px-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1 font-medium text-[15px]">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <SectionCard
        icon={LuUser}
        title="Profile Information"
        description="Update your personal information."
        iconBg="bg-secondary"
        iconColor="text-primary"
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profileInputs
              .filter((f) => !f.fullWidth)
              .map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-foreground">
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    defaultValue={field.defaultValue}
                    className="bg-background border-border text-foreground rounded-xl h-12 shadow-sm font-medium"
                  />
                </div>
              ))}
          </div>

          {profileInputs
            .filter((f) => f.fullWidth)
            .map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-foreground">
                  {field.label}
                </label>
                <Input
                  type={field.type}
                  defaultValue={field.defaultValue}
                  className="bg-background border-border text-foreground rounded-xl h-12 shadow-sm font-medium hover:border-primary/40 focus:border-primary transition-colors"
                />
              </div>
            ))}
        </div>

        <div className="flex justify-end mt-8 border-t border-border/50 pt-8">
          <Button className="py-6 px-10 rounded-xl font-bold bg-[#3b41c5] hover:bg-[#2d32a3] hover:-translate-y-1 hover:shadow-lg text-white shadow-md active:scale-95 transition-all text-[14px]">
            Save Changes
          </Button>
        </div>
      </SectionCard>

      {/* Password Section */}
      <SectionCard
        icon={LuShield}
        title="Password & Security"
        description="Change your password and manage your account security."
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2 w-full">
            <label className="text-[13px] font-bold text-foreground">
              Password
            </label>
            <Input
              type="password"
              defaultValue="••••••••••••"
              className="bg-background border-border text-foreground rounded-xl h-12 shadow-sm font-medium w-full hover:border-primary/40 focus:border-primary transition-colors"
            />
          </div>
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl font-bold bg-background border-border hover:bg-secondary shrink-0 text-[13px] shadow-sm mt-0 sm:mt-7 w-full sm:w-auto hover:scale-105 transition-all"
          >
            <LuShield className="w-4 h-4 mr-2" /> Change Password
          </Button>
        </div>
      </SectionCard>

      {/* Delivery Section */}
      <SectionCard
        icon={LuTruck}
        title="Delivery Preferences"
        description="Set your default preferences for comparing deliveries."
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {deliveryPreferences.map((pref) => (
            <div key={pref.id} className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-foreground">
                {pref.label}
              </label>
              {pref.type === "input" ? (
                <div className="relative">
                  <Input
                    placeholder={pref.placeholder}
                    defaultValue={pref.defaultValue as string}
                    className="pl-9 bg-background border-border text-foreground rounded-xl h-12 shadow-sm font-medium"
                  />
                  {pref.icon && (
                    <pref.icon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              ) : (
                <Select defaultValue={pref.defaultValue as string}>
                  <SelectTrigger className="w-full bg-background border-border text-foreground rounded-xl h-12 shadow-sm font-medium">
                    <SelectValue
                      placeholder={`Select ${pref.label.toLowerCase()}`}
                    />
                  </SelectTrigger>
                  <SelectContent alignItemWithTrigger={false} className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
                    {pref.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Notifications Section */}
      <SectionCard
        icon={LuBell}
        title="Notifications"
        description="Choose what notifications you want to receive."
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
      >
        <div className="flex flex-col w-full">
          {notifications.map((notif, index) => (
            <React.Fragment key={notif.id}>
              <div className="flex items-center justify-between gap-4 py-6 first:pt-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-[10px] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${notif.bg}`}
                  >
                    <notif.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[15px] font-bold text-foreground">
                      {notif.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground font-medium mt-0.5">
                      {notif.desc}
                    </p>
                  </div>
                </div>
                <Switch
                  defaultChecked={notif.defaultChecked}
                  className="data-[state=checked]:bg-[#545CEB]"
                />
              </div>
              {index < notifications.length - 1 && (
                <div className="h-px w-full bg-border/40"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </SectionCard>

      {/* Account Section */}
      <SectionCard
        icon={LuUser}
        title="Account"
        description="Manage your account settings."
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
      >
        <div className="flex flex-col w-full">
          {accountActions.map((action, index) => (
            <React.Fragment key={action.id}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 first:pt-0 last:pb-0 w-full">
                <div className="flex flex-col">
                  <h3 className={`text-[15px] font-bold ${action.titleClass}`}>
                    {action.title}
                  </h3>
                  <p
                    className={`text-[13px] font-medium mt-0.5 ${action.textClass}`}
                  >
                    {action.desc}
                  </p>
                </div>
                <Button
                  onClick={action.onClick}
                  variant="outline"
                  className={`h-10 px-8 rounded-lg font-bold w-full sm:w-auto text-[13px] shadow-sm ${action.btnClass}`}
                >
                  {action.buttonText}
                </Button>
              </div>
              {index < accountActions.length - 1 && (
                <div className="h-px w-full bg-border/40"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

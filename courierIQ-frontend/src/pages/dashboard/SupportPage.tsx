import { useState } from "react";
import {
  LuSearch,
  LuFileText,
  LuMail,
  LuMessageCircle,
  LuCircle,
  LuChevronRight,
  LuExternalLink,
  LuPhone,
  LuClock,
  // LuTriangleAlert,
  LuMapPin,
  LuSettings,
  LuCalculator,
  LuBookmark,
  // LuShieldAlert,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const supportCards = [
  {
    id: 1,
    title: "Browse Help Articles",
    desc: "Find answers to common questions and learn how CourierIQ works.",
    icon: LuFileText,
    iconColor: "text-primary",
    iconBg: "bg-secondary",
    linkText: "View articles",
  },
  {
    id: 2,
    title: "Contact Support",
    desc: "Can't find what you're looking for? Get in touch with our support team.",
    icon: LuMail,
    iconColor: "text-primary",
    iconBg: "bg-secondary",
    linkText: "Send a message",
  },
  {
    id: 3,
    title: "Live Chat",
    desc: "Chat with our support team in real time during business hours.",
    icon: LuMessageCircle,
    iconColor: "text-primary",
    iconBg: "bg-secondary",
    linkText: "Start chat",
  },
  {
    id: 4,
    title: "FAQs",
    desc: "Quick answers to the most frequently asked questions.",
    icon: LuCircle,
    iconColor: "text-primary",
    iconBg: "bg-secondary",
    linkText: "View FAQs",
  },
];

const popularTopics = [
  {
    id: 1,
    title: "How do I compare deliveries?",
    desc: "Learn how to compare prices, delivery times and services across couriers.",
    icon: LuFileText,
  },
  {
    id: 2,
    title: "How do I track my delivery?",
    desc: "Step-by-step guide on tracking your delivery in real time.",
    icon: LuMapPin,
  },
  {
    id: 3,
    title: "How accurate are the prices?",
    desc: "Understand how our prices are calculated and updated.",
    icon: LuCalculator,
  },
  {
    id: 4,
    title: "Saving locations and routes",
    desc: "How to save your favorite locations and delivery routes.",
    icon: LuBookmark,
  },
  {
    id: 5,
    title: "Account and profile settings",
    desc: "Manage your account, password and notification preferences.",
    icon: LuSettings,
  },
];

const contactMethods = [
  {
    id: 1,
    title: "Email Support",
    value: "support@courieriq.com",
    isLink: true,
    href: "mailto:support@courieriq.com",
    icon: LuMail,
  },
  {
    id: 2,
    title: "Phone Support",
    value: "+233 59 123 4567",
    subtext: "Mon - Fri, 8:00 AM - 6:00 PM",
    icon: LuPhone,
  },
  {
    id: 3,
    title: "Response Time",
    value: "Within 2 - 6 hours",
    icon: LuClock,
  },
];

export const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full flex flex-col gap-8 max-w-275 mx-auto animate-fade-in-up pb-12 h-full">
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Help & Support Center
        </h1>
        <p className="text-muted-foreground mt-1.5 font-medium text-[15px]">
          Find answers, get help and contact our support team.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center bg-card border border-border/60 rounded-[1.25rem] px-5 h-14 shadow-sm w-full mx-auto max-w-2xl transition-all focus-within:ring-[3px] focus-within:ring-primary/10 focus-within:border-primary">
        <LuSearch className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search for help articles..."
          className="flex-1 bg-transparent border-none h-10 outline-none px-4 text-[15px] font-medium text-foreground placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="h-6 w-px bg-border/60 mx-2 shrink-0 hidden sm:block"></div>
        <div className="hidden sm:block shrink-0">
          <Select defaultValue="All Topics">
            <SelectTrigger className="border-none bg-transparent h-auto py-0 shadow-none hover:bg-transparent focus:ring-0 px-3 font-bold text-[14px] text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]">
              <SelectItem value="All Topics">All topics</SelectItem>
              <SelectItem value="Deliveries">Deliveries</SelectItem>
              <SelectItem value="Account">Account</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportCards.map((card) => (
          <div
            key={card.id}
            className="bg-card border border-border/60 rounded-[1.5rem] p-6 flex flex-col items-center text-center shadow-sm transition-all duration-300 cursor-pointer group"
          >
            <div
              className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${card.iconBg}`}
            >
              <card.icon className={`w-5.5 h-5.5 ${card.iconColor}`} />
            </div>
            <h3 className="font-bold text-[15px] text-foreground mb-1.5">
              {card.title}
            </h3>
            <p className="text-[13px] text-muted-foreground font-medium mb-6 flex-1 leading-relaxed">
              {card.desc}
            </p>
            <span className="text-[13px] font-bold text-primary flex items-center gap-1.5 group-hover:opacity-80 transition-opacity">
              {card.linkText} <LuChevronRight className="w-4 h-4" />
            </span>
          </div>
        ))}
      </div>

      {/* Main Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2 pb-10">
        {/* Left Column: Popular Topics */}
        <div className="lg:col-span-8 flex flex-col border border-border/60 bg-card rounded-[1.5rem] overflow-hidden shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-border/60">
            <h3 className="font-bold text-[16px] text-foreground">
              Popular Topics
            </h3>
            <button className="text-[13px] font-bold text-primary flex items-center gap-1 hover:opacity-80 transition-opacity">
              View all articles <LuChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col divide-y divide-border/60">
            {popularTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 sm:p-6 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-secondary/30 group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border/50 shrink-0 group-hover:bg-secondary/80 transition-colors">
                    <topic.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-bold text-[14px] text-foreground">
                      {topic.title}
                    </h4>
                    <p className="text-[13px] font-medium text-muted-foreground">
                      {topic.desc}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 ml-4">
                  <LuChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact info & Feedback */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Still need help */}
          <div className="bg-card border border-border/60 rounded-[1.5rem] p-6 sm:p-7 shadow-sm transition-all duration-300">
            <h3 className="font-bold text-[16px] text-foreground mb-1.5">
              Still need help?
            </h3>
            <p className="text-[13px] font-medium text-muted-foreground mb-6 leading-relaxed">
              Our support team typically responds within a few hours.
            </p>

            <div className="flex flex-col gap-5">
              {contactMethods.map((method) => (
                <div key={method.id} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <method.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-foreground">
                      {method.title}
                    </span>
                    {method.isLink ? (
                      <a
                        href={method.href}
                        className="text-[13px] font-semibold text-primary hover:underline mt-0.5"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-[13px] font-semibold text-muted-foreground mt-0.5">
                        {method.value}
                      </span>
                    )}
                    {method.subtext && (
                      <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                        {method.subtext}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Give Feedback */}
          <div className="bg-card border border-border/60 rounded-[1.5rem] p-6 sm:p-7 shadow-sm transition-all duration-300 flex flex-col h-full justify-between">
            <div>
              <h3 className="font-bold text-[16px] text-foreground mb-1.5">
                Give Feedback
              </h3>
              <p className="text-[13px] font-medium text-muted-foreground mb-6 leading-relaxed">
                Help us improve CourierIQ by sharing your feedback.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl font-bold border-border/80 hover:bg-secondary text-foreground text-[13px] hover:scale-[1.02] transition-transform"
            >
              Send Feedback <LuExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

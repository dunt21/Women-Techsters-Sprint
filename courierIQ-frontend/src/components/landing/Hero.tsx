import { Button } from "@/components/ui/button";
import {
  LuMapPin as MapPin,
  LuNavigation as Navigation,
  LuTruck as Truck,
  LuZap as Zap,
  LuStar as Star,
  LuShieldCheck as ShieldCheck,
} from "react-icons/lu";

const Hero = () => {
  return (
    <section
      id="/"
      className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-background pt-24 pb-16"
    >
      {/* Background Radial Glows */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[800px] h-[800px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#e0fbfc] rounded-full blur-[120px] opacity-70 translate-x-1/4"></div>
        <div className="absolute inset-10 bg-[#c2dfe3] rounded-full blur-[100px] opacity-40 translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Side: Copy & CTAs */}
          <div className="flex flex-col max-w-2xl">
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-bold text-foreground leading-[1.05] tracking-tight mb-6">
              Compare Courier Prices.{" "}
              <span className="opacity-80">Deliver Smarter.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-medium mb-10 max-w-[540px] leading-relaxed">
              CourierIQ brings multiple courier options into one simple view, so
              you can compare prices and estimated delivery times without
              switching between apps.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button className="h-14 px-8 rounded-full text-base font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                Compare delivery options
              </Button>
              <Button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-14 px-8 rounded-full text-base font-semibold border-primary/20 text-primary hover:bg-primary/5 transition-all w-full sm:w-auto bg-transparent"
              >
                How it works
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Verified Couriers</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Instant Quotes</span>
              </div>
            </div>
          </div>

          {/* Right Side: Product Visual */}
          <div className="relative mx-auto w-full max-w-[400px] lg:max-w-none lg:h-[700px] flex justify-center items-center">
            {/* Abstract Map/Route SVG Background */}
            <svg
              className="absolute w-[120%] h-[120%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 350 C 100 200, 200 300, 350 50"
                stroke="#253237"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <circle cx="50" cy="350" r="6" fill="#253237" />
              <circle cx="350" cy="50" r="6" fill="#253237" />
              <circle cx="170" cy="245" r="4" fill="#5c6b73" />
              <circle cx="270" cy="155" r="4" fill="#5c6b73" />
            </svg>

            {/* Smartphone Mockup */}
            <div className="relative w-[320px] h-[650px] bg-white rounded-[44px] border-[8px] border-[#1a1a1a] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden z-10 flex flex-col">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-7 w-[140px] bg-[#1a1a1a] mx-auto rounded-b-[20px] z-20 flex justify-center items-center">
                <div className="w-12 h-1.5 bg-[#333] rounded-full"></div>
              </div>

              {/* App UI Header */}
              <div className="bg-[#253237] text-white pt-12 pb-6 px-5 rounded-b-[32px] shadow-sm relative z-10">
                <h3 className="text-lg font-semibold text-center mb-5">
                  Where to?
                </h3>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md mb-2 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex justify-center items-center">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
                      Pickup
                    </p>
                    <p className="text-sm font-medium">123 Market St, SF</p>
                  </div>
                </div>

                <div className="bg-white text-[#253237] p-3 rounded-xl shadow-md flex items-center gap-3 relative">
                  <div className="absolute -top-3 left-6 w-0.5 h-3 bg-white/30 border-l border-dashed border-white/50"></div>
                  <div className="w-6 h-6 rounded-full bg-secondary flex justify-center items-center">
                    <Navigation className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-primary/60 font-medium uppercase tracking-wider">
                      Destination
                    </p>
                    <p className="text-sm font-bold">456 Mission Bay, SF</p>
                  </div>
                </div>
              </div>

              {/* App UI Body - Courier Options */}
              <div className="flex-1 bg-gray-50/50 p-5 overflow-y-auto space-y-4 relative z-0">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  3 Options Found
                </p>

                {/* Option 1: Fastest */}
                <div className="bg-white p-4 rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.03)] border border-border/40 relative">
                  <div className="absolute -top-2.5 right-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Zap className="w-3 h-3" /> Fastest
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1a1a1a]">ExpressLogix</p>
                        <p className="text-xs text-muted-foreground font-medium">
                          Est. 45 mins
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-[#1a1a1a]">$14.50</p>
                    </div>
                  </div>
                  <Button className="w-full h-9 rounded-xl text-xs font-semibold">
                    Select Courier
                  </Button>
                </div>

                {/* Option 2: Best Value */}
                <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(37,50,55,0.08)] border-2 border-primary relative transform scale-[1.02] transition-transform">
                  <div className="absolute -top-2.5 right-4 bg-secondary text-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3" /> Best Value
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1a1a1a]">SwiftShip</p>
                        <p className="text-xs text-muted-foreground font-medium">
                          Est. 1h 15m
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">$9.20</p>
                    </div>
                  </div>
                  <Button className="w-full h-9 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                    Selected
                  </Button>
                </div>

                {/* Option 3: Cheapest */}
                <div className="bg-white p-4 rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.03)] border border-border/40 relative opacity-75">
                  <div className="absolute -top-2.5 right-4 bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    Cheapest
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1a1a1a]">EcoDrop</p>
                        <p className="text-xs text-muted-foreground font-medium">
                          Est. 3h 30m
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-[#1a1a1a]">$5.50</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full h-9 rounded-xl text-xs font-semibold bg-transparent border-gray-300"
                  >
                    Select Courier
                  </Button>
                </div>
              </div>

              <div className="absolute bottom-2 inset-x-0 mx-auto w-32 h-1 bg-[#1a1a1a] rounded-full z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

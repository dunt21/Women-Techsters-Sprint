import { Outlet, Link } from "react-router-dom";
import { LuBox } from "react-icons/lu"; // Just a placeholder icon for CourierIQ

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Side - Brand/Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col items-center justify-center p-12 text-primary-foreground">
        {/* Soft Background Gradient Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c2dfe3] opacity-20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white opacity-10 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
          <Link
            to="/"
            className="flex items-center gap-3 text-4xl font-bold uppercase tracking-tighter mb-8"
          >
            <LuBox className="w-10 h-10" />
            Courier IQ
          </Link>

          <h2 className="text-3xl font-semibold leading-tight mb-4 text-[#e0fbfc]">
            Compare smarter. <br /> Deliver better.
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Join thousands of businesses saving time and money on their daily
            shipments.
          </p>
        </div>
      </div>

      {/* Right Side - The Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-12 relative bg-background">
        {/* Mobile Logo (Only visible on small screens) */}
        <Link
          to="/"
          className="absolute top-8 left-8 lg:hidden flex items-center gap-2 text-xl font-bold uppercase tracking-tight"
        >
          <LuBox className="text-primary w-6 h-6" />
          Courier IQ
        </Link>

        <div className="w-full max-w-[420px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

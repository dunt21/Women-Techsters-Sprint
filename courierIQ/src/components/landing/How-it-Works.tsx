const HowItWorks = () => {
  const steps = [
    {
      title: "Enter Your Delivery",
      description: "Enter your pickup and destination details.",
      active: false,
    },
    {
      title: "Compare Couriers",
      description: "See available courier options and their prices.",
      active: true, // Setting step 2 as active to match the visual vibe of the inspiration
    },
    {
      title: "Check Your Options",
      description: "Compare prices and estimated delivery times.",
      active: false,
    },
    {
      title: "Choose Your Courier",
      description: "Select the option that works best for you.",
      active: false,
    },
    {
      title: "Continue Your Delivery",
      description:
        "Proceed with your selected courier to complete the delivery.",
      active: false,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-background w-full">
      {/* Centered Heading */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-16 relative z-10">
        <div className="text-center flex flex-col items-center">
          <p className="text-sm font-bold text-[#5c6b73] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
            Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            How It <span className="opacity-70">Works</span>
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Phone Mockup Image with Glow */}
          <div className="relative flex justify-center items-center w-full max-w-[550px] lg:max-w-[650px] xl:max-w-[700px] mx-auto lg:mx-0 lg:-ml-8">
            {/* Soft background glows similar to Hero */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0">
              <div className="absolute inset-0 bg-[#e0fbfc] rounded-full blur-[90px] opacity-80"></div>
              <div className="absolute inset-10 bg-[#c2dfe3] rounded-full blur-[80px] opacity-40 translate-x-1/4"></div>
            </div>

            {/* Phone & Scooter 3D Illustration */}
            <img
              src="/courier-mockup.png"
              alt="CourierIQ Delivery Flow"
              className="relative z-10 w-[30%] lg:w-[50%] h-auto object-contain drop-shadow-2xl transition-all hover:scale-105 duration-500 scale-110 lg:scale-110"
            />
          </div>

          {/* Right Side: Process Stepper */}
          <div className="relative pl-4 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-[60px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#e0fbfc] via-[#c2dfe3] to-transparent z-0"></div>

            <div className="space-y-10 relative z-10">
              {steps.map((step, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                return (
                  <div
                    key={`${index} + ${step.title}`}
                    className="flex gap-6 md:gap-8 items-start group"
                  >
                    {/* Step Indicator */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-4">
                        <span className="hidden md:block text-sm font-bold text-[#9db4c0]">
                          Step
                        </span>
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-300 ${
                            step.active
                              ? "bg-primary text-white scale-110 shadow-md ring-4 ring-primary/10"
                              : "bg-white border-2 border-[#e0fbfc] text-primary group-hover:border-[#c2dfe3]"
                          }`}
                        >
                          {stepNumber}
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="pt-3">
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors ${
                          step.active ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[#5c6b73] text-[15px] leading-relaxed max-w-[380px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

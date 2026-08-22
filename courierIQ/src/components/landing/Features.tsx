import {
  LuArrowDownUp,
  LuClock3,
  LuLayoutGrid,
  LuMousePointerClick,
} from "react-icons/lu";

const Features = () => {
  const features = [
    {
      icon: <LuArrowDownUp className="w-6 h-6 text-[#5c6b73]" />,
      title: "Compare Prices",
      description:
        "See courier prices side by side and find an option that fits your budget.",
    },
    {
      icon: <LuClock3 className="w-6 h-6 text-[#5c6b73]" />,
      title: "Compare Options",
      description:
        "See prices and estimated times together to make a better delivery choice.",
    },
    {
      icon: <LuLayoutGrid className="w-6 h-6 text-[#5c6b73]" />,
      title: "Everything In One Place",
      description:
        "Compare your courier options without jumping between different apps.",
    },
    {
      icon: <LuMousePointerClick className="w-6 h-6 text-[#5c6b73]" />,
      title: "Choose Your Courier",
      description:
        "Select the option that works best for you and continue with your preferred courier.",
    },
  ];

  return (
    <section className="py-24 bg-background w-full">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Why Courier<span className="opacity-70">IQ?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={`${index} + ${feature.title}`}
              className="bg-gradient-to-b from-[#e0fbfc]/60 to-white rounded-3xl p-8 border border-[#c2dfe3]/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#e0fbfc] flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-[#5c6b73] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import { Link } from "react-router-dom";
import {
  LuBox,
  LuZap,
  LuShieldCheck,
  LuLinkedin,
  LuArrowRight,
} from "react-icons/lu";

export const AboutPage = () => {
  const features = [
    {
      title: "Compare prices with ease",
      description:
        "See delivery prices from different courier services side by side, making it easier to find an option that fits your budget.",
      icon: <LuShieldCheck className="w-6 h-6 text-primary" />,
      bgColor: "bg-secondary",
    },
    {
      title: "Make informed delivery choices",
      description:
        "Compare prices and estimated delivery times together so you can choose based on what matters most to you.",
      icon: <LuZap className="w-6 h-6 text-primary" />,
      bgColor: "bg-[#e0fbfc]",
    },
    {
      title: "Everything in one place",
      description:
        "Stop switching between different courier apps just to compare options. CourierIQ brings the information together in one simple view.",
      icon: <LuBox className="w-6 h-6 text-white" />,
      bgColor: "bg-primary",
    },
  ];

  return (
    <div className="w-full flex flex-col animate-fade-in-up pb-24">
      {/* 1. Hero Section */}
      <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
        {/* Soft Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#e0fbfc] opacity-30 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-6 border border-primary/10">
          <LuBox className="w-4 h-4" />
          <span>About CourierIQ</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl leading-[1.1] mb-6">
          Making delivery choices <br className="hidden md:block" />
          <span className="text-muted-foreground">simpler.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-[600px] leading-relaxed mb-12">
          CourierIQ brings courier options together in one place, helping
          businesses compare prices and estimated delivery times before choosing
          how to send their packages.
        </p>

        <div className="relative w-full max-w-3xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border/40">
          <img
            src="/images/about-hero.jpg"
            alt="Global Logistics Network"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
        </div>
      </section>

      {/* 2. The Problem We Solve */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: The Problem */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Tired of switching between courier apps?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              CourierIQ was created to make that process simpler. Enter your
              delivery details once, compare the available courier options in
              one place, and choose the option that works best for you.
            </p>
          </div>

          {/* Right: The Solution (Cards) */}
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-border/40 flex gap-5 items-start hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${feature.bgColor}`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Meet the Founder */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-24">
        <div className="bg-primary text-primary-foreground rounded-[2rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
          {/* Decorative background elements inside the card */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Left: Avatar/Photo */}
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full bg-white/10 border-4 border-white/20 p-2 relative z-10 shadow-2xl">
            <img
              src="/images/founder.jpg"
              alt="Suad Macaulay"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Right: Bio */}
          <div className="flex flex-col relative z-10 text-center md:text-left">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 text-white/80 text-sm font-semibold tracking-wider uppercase mb-3">
              <span className="w-8 h-0.5 bg-white/40 rounded-full hidden md:block"></span>
              Meet the Founder
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-[#e0fbfc]">
              Suad Macaulay
            </h2>
            <p className="text-lg text-white/70 font-medium mb-6">
              Founder & Lead Developer
            </p>
            <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-[600px]">
              "I came up with CourierIQ after repeatedly switching between
              different courier apps to find a better price for business
              deliveries. I wanted to create a simpler way to compare available
              options without having to check each service individually.
              CourierIQ is my attempt to turn that everyday frustration into a
              simple, useful tool for businesses."
            </p>

            <div>
              <a
                href="https://www.linkedin.com/in/suad-macaulay-429070278/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg active:scale-95"
              >
                <LuLinkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="w-full max-w-[800px] mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
          Ready to deliver smarter?
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Compare courier prices, find the option that works for you, and make
          your next delivery with confidence.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl active:scale-95"
        >
          Create your free account
          <LuArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
};

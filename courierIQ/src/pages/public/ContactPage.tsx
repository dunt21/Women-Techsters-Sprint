import { LuInstagram, LuFacebook, LuLinkedin, LuTwitter } from "react-icons/lu";
import { AuthInput } from "@/components/auth/AuthInput";

export const ContactPage = () => {
  const socialLinks = [
    {
      icon: <LuInstagram className="w-5 h-5" />,
      href: "https://instagram.com",
    },
    {
      icon: <LuFacebook className="w-5 h-5 fill-current" />,
      href: "https://facebook.com",
    },
    {
      icon: <LuLinkedin className="w-5 h-5 fill-current" />,
      href: "https://www.linkedin.com/in/suad-macaulay-429070278/",
    },
    {
      icon: <LuTwitter className="w-5 h-5 fill-current" />,
      href: "https://twitter.com",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-16 md:py-24 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
        {/* Left Side: Contact Information */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-8">
            Get in touch
          </h1>

          <div className="w-full max-w-[400px] mb-16 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg border border-border/30">
            <img
              src="/images/contact.jpg"
              alt="Customer Support and Delivery"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="flex flex-row flex-wrap items-start justify-center lg:justify-start gap-x-12 gap-y-8 mt-4 text-left">
            {/* Email */}
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Email:
              </p>
              <a
                href="mailto:support@courieriq.com"
                className="text-base text-foreground font-medium hover:text-primary transition-colors"
              >
                suadmacaulay50@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Phone:
              </p>
              <a
                href="tel:+17631683"
                className="text-base text-foreground font-medium hover:text-primary transition-colors"
              >
                +233598399951
              </a>
            </div>

            {/* Address */}
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Address:
              </p>
              <p className="text-base text-foreground font-medium leading-relaxed w-[15rem]">
                Oyibi, Rexola Hotel
                <br />
                Ghana
              </p>
            </div>

            {/* Follow Us */}
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-3">
                Follow us
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors shadow-sm"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="flex flex-col lg:pl-12">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <AuthInput
                label="Your Name"
                type="text"
                placeholder="Your full name"
              />
              <AuthInput
                label="Email address"
                type="email"
                placeholder="Your email address"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-semibold text-foreground">
                Message
              </label>
              <textarea
                placeholder="Write something..."
                rows={6}
                className="w-full bg-secondary/30 border border-border/60 hover:border-border/80 focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10 text-foreground text-[15px] rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-muted-foreground shadow-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold py-4 rounded-xl mt-4 transition-all shadow-md active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

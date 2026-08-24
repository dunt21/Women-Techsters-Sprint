import { Link } from "react-router-dom";
import { LuMail, LuArrowRight } from "react-icons/lu";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", path: "/#features" },
        { name: "How It Works", path: "/#how-it-works" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", path: "/faqs" },
        { name: "Contact", path: "/contact" },
      ],
    },
  ];

  return (
    <footer className="w-full px-6 md:px-12 py-10 bg-background">
      <div className="max-w-7xl mx-auto bg-linear-to-b from-[#e0fbfc]/50 to-[#c2dfe3]/20 border border-[#c2dfe3]/40 rounded-[36px] md:rounded-[48px] p-8 md:p-12 lg:p-16 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <Link
                to="/"
                className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase block mb-3"
              >
                Courier IQ
              </Link>

              {/* Tagline */}
              <p className="text-[#5c6b73] font-medium text-base max-w-sm leading-relaxed">
                Compare smarter. Deliver better.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <div className="w-full max-w-md">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <div className="bg-white border border-[#c2dfe3]/60 rounded-full p-1 pl-5 flex items-center shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <LuMail className="w-5 h-5 text-[#5c6b73] shrink-0 mr-3" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none pr-2 font-medium"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full px-6 py-3 text-xs md:text-sm font-semibold flex items-center gap-2 shrink-0 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Get Started</span>
                    <LuArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Columns: Navigation Links */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4 lg:pt-0">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="flex flex-col space-y-4">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        to={link.path}
                        className="text-sm text-[#5c6b73] hover:text-foreground font-medium transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-8 border-t border-[#c2dfe3]/50 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-[#5c6b73]">
          <p>© 2026 CourierIQ. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <Link to="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

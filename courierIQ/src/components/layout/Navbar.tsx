import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full px-6 py-6 md:px-12 flex items-center justify-between bg-transparent">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-foreground uppercase"
        >
          Courier IQ
        </Link>
      </div>

      {/* Center Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((item) => (
          <Link
            to={item.path}
            className="text-[15px] font-medium text-foreground/80 hover:text-foreground transition-colors"
            key={item.name}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Action Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/login"
          className="inline-flex h-11 items-center justify-center rounded-full border border-primary bg-transparent px-6 text-[15px] font-medium text-primary shadow-sm hover:bg-primary/5 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Toggle (Visible only on mobile) */}
      <button className="md:hidden flex items-center justify-center p-2 text-foreground">
        <IoMenu size={24} />
      </button>
    </nav>
  );
};

export default Navbar;

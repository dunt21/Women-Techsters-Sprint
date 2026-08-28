import { Link, useNavigate } from "react-router-dom";
// import { LuCheck } from "react-icons/lu";
import { AuthInput } from "@/components/auth/AuthInput";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { RememberMeCheckbox } from "@/components/auth/RememberMeCheckbox";
import { useState } from "react";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col w-full animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Create your CourierIQ account
      </h1>
      <p className="text-muted-foreground text-[15px] mb-6">
        Start comparing courier options and make smarter delivery choices.
      </p>

      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <AuthInput label="Name" type="text" placeholder="Enter your name" />

        <AuthInput label="Email" type="email" placeholder="Enter your email" />

        <AuthInput
          label="Password"
          isPassword
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between mt-1">
          <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />
        </div>

        <button
          type="submit"
          onClick={() => navigate("/dashboard")}
          className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold py-3.5 rounded-full mt-2 transition-all shadow-md active:scale-[0.98]"
        >
          Sign up
        </button>
      </form>

      <div className="relative flex items-center justify-center w-full py-4 mt-1">
        <div className="absolute w-full border-t border-border/60"></div>
        <span className="bg-background px-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest relative z-10">
          OR
        </span>
      </div>

      <GoogleButton />

      <p className="text-center text-[15px] text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-foreground font-bold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

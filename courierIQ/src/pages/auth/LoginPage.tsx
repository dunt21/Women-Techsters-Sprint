import { Link, useNavigate } from "react-router-dom";
// import { LuCheck } from "react-icons/lu";
import { AuthInput } from "@/components/auth/AuthInput";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/hooks/useFetch";
import toast from "react-hot-toast";
import { RememberMeCheckbox } from "@/components/auth/RememberMeCheckbox";

export const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, isSuccess, data, simulateLogin } = useFetch();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });

    if (!userInput.email.includes("@")) {
      setErrors({
        ...errors,
        email: "Please enter a valid email",
      });

      return;
    }

    if (userInput.password.length !== 7) {
      setErrors({
        ...errors,
        password: "Password must be 8 characters long",
      });

      return;
    }

    simulateLogin(userInput);
  };

  useEffect(() => {
    if (isSuccess && data) {
      login(data.user, data.tokens, rememberMe);
      navigate("/dashboard");
      toast.success("Login succesful");
    }
  }, [isSuccess, data, login, navigate, rememberMe]);

  return (
    <div className="flex flex-col w-full animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Welcome back
      </h1>
      <p className="text-muted-foreground text-[15px] mb-6">
        Sign in to continue comparing courier options.
      </p>

      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <AuthInput
          label="Email"
          type="email"
          name="email"
          id="email"
          error={errors.email}
          placeholder="Enter your email"
          value={userInput.email}
          autoComplete="email"
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
        />
        <AuthInput
          label="Password"
          name="password"
          id="password"
          error={errors.password}
          isPassword
          placeholder="Enter your password"
          value={userInput.password}
          autoComplete="current-password"
          onChange={(e) =>
            setUserInput({ ...userInput, password: e.target.value })
          }
        />
        <div className="flex items-center justify-between mt-1">
          <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />

          <Link
            to="/forgot-password"
            className="text-[14px] font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold py-3.5 rounded-full mt-2 transition-all shadow-md active:scale-[0.98]"
          disabled={loading}
        >
          {loading ? "Signing in ..." : "Sign in"}
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
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-foreground font-bold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

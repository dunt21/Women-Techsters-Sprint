import { Link, useNavigate } from "react-router-dom";
import { LuCheck } from "react-icons/lu";
import { AuthInput } from "@/components/auth/AuthInput";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFetch } from "@/hooks/hooks";
import toast from "react-hot-toast";

export const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const { loading, isSuccess, data, simulateLogin } = useFetch();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    simulateLogin(userInput);
  };

  useEffect(() => {
    if (isSuccess && data) {
      login(data, data.tokens);
      navigate("/dashboard");
      toast.success("Login succesful");
    }
  }, [isSuccess, data, login, navigate]);

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
          placeholder="Enter your email"
          value={userInput.email}
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
        />
        <AuthInput
          label="Password"
          isPassword
          placeholder="Enter your password"
          value={userInput.password}
          onChange={(e) =>
            setUserInput({ ...userInput, password: e.target.value })
          }
        />
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer appearance-none w-5 h-5 border-2 border-border rounded-lg checked:bg-green-500 checked:border-green-500 transition-colors cursor-pointer"
              />
              <LuCheck className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="text-[14px] text-foreground font-medium select-none">
              Remember me
            </span>
          </label>

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

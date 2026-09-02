import { Link, useNavigate } from "react-router-dom";
// import { LuCheck } from "react-icons/lu";
import { AuthInput } from "@/components/auth/AuthInput";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { RememberMeCheckbox } from "@/components/auth/RememberMeCheckbox";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, isSuccess, data, simulateSignUp } = useFetch();
  const { login } = useAuth();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({ name: "", email: "", password: "" });

    // 1. NAME VALIDATION
    if (userInput.name.trim().length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 2 characters long",
      }));
      return;
    }

    // 2. EMAIL VALIDATION
    if (!userInput.email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email",
      }));
      return;
    }

    // 3. PASSWORD VALIDATION
    if (userInput.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long",
      }));
      return;
    }

    // If everything passes, simulate the signup!
    simulateSignUp(userInput);
  };

  useEffect(() => {
    if (isSuccess && data) {
      login(data, "", rememberMe);
      navigate("/dashboard");
      toast.success("Account Created Successfully 🥂");
    }
  }, [isSuccess, data, navigate, login, rememberMe]);

  return (
    <div className="flex flex-col w-full animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Create your CourierIQ account
      </h1>
      <p className="text-muted-foreground text-[15px] mb-6">
        Start comparing courier options and make smarter delivery choices.
      </p>

      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <AuthInput
          label="Name"
          type="text"
          name="name"
          id="name"
          error={errors.name}
          placeholder="Enter your name"
          value={userInput.name}
          autoComplete="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInput({ ...userInput, name: e.target.value })
          }
        />

        <AuthInput
          label="Email"
          type="email"
          name="email"
          id="email"
          error={errors.email}
          placeholder="Enter your email"
          value={userInput.email}
          autoComplete="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          id="password"
          error={errors.password}
          isPassword
          placeholder="Enter your password"
          value={userInput.password}
          autoComplete="new-password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInput({ ...userInput, password: e.target.value })
          }
        />

        <div className="flex items-center justify-between mt-1">
          <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full mt-2 transition-all shadow-md active:scale-[0.98]"
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
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

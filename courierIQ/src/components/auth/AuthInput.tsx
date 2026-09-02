import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Input } from "@/components/ui/input";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
  error?: string;
}

export const AuthInput = ({
  label,
  isPassword,
  error,
  className,
  ...props
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // If it's a password field and showPassword is true, turn type to "text"
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : props.type || "text";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="relative flex items-center">
        <Input
          {...props}
          type={inputType}
          className={`bg-white border text-foreground text-[15px] rounded-xl px-4 h-14 outline-none transition-all placeholder:text-muted-foreground shadow-sm ${
            error
              ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-4 focus-visible:ring-red-500/10"
              : "border-border/60 hover:border-border/80 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10"
          } ${isPassword ? "pr-12" : ""} ${className || ""}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            {showPassword ? (
              <LuEyeOff className="w-5 h-5" />
            ) : (
              <LuEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* 3. Render the error message below the input if it exists! */}
      {error && (
        <span className="text-xs font-medium text-red-500 mt-0.5 ml-1 animate-fade-in-up">
          {error}
        </span>
      )}
    </div>
  );
};

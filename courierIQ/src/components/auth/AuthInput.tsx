import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean;
}

export const AuthInput = ({ label, isPassword, className, ...props }: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // If it's a password field and showPassword is true, turn type to "text"
  const inputType = isPassword ? (showPassword ? "text" : "password") : props.type || "text";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={inputType}
          className={`w-full bg-white border border-border/60 hover:border-border/80 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 text-foreground text-[15px] rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-muted-foreground shadow-sm ${
            isPassword ? "pr-12" : ""
          } ${className || ""}`}
          {...props}
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
    </div>
  );
};

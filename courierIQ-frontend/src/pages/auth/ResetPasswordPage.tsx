import { Link } from "react-router-dom";
import { AuthInput } from "@/components/auth/AuthInput";

export const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col w-full animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Create new password
      </h1>
      <p className="text-muted-foreground text-[15px] mb-6">
        Please enter your new password below.
      </p>

      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <AuthInput
          label="New Password"
          isPassword
          placeholder="Enter new password"
        />

        <AuthInput
          label="Confirm New Password"
          isPassword
          placeholder="Confirm new password"
        />

        <button
          type="submit"
          className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold py-3.5 rounded-full mt-2 transition-all shadow-md active:scale-[0.98]"
        >
          Update Password
        </button>
      </form>

      <p className="text-center text-[15px] text-muted-foreground mt-8">
        <Link to="/login" className="text-foreground font-bold hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
};

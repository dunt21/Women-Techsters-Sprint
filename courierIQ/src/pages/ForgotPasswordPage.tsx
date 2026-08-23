import { Link } from "react-router-dom";
import { AuthInput } from "../components/auth/AuthInput";

export const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col w-full animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        Reset your password
      </h1>
      <p className="text-muted-foreground text-[15px] mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form className="flex flex-col gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
        <AuthInput 
          label="Email" 
          type="email" 
          placeholder="Enter your email" 
        />
        
        <button 
          type="submit"
          className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold py-3.5 rounded-full mt-2 transition-all shadow-md active:scale-[0.98]"
        >
          Send Reset Link
        </button>
      </form>

      <p className="text-center text-[15px] text-muted-foreground mt-8">
        Remember your password?{" "}
        <Link to="/login" className="text-foreground font-bold hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
};

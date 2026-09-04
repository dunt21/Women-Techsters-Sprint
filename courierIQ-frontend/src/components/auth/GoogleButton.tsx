import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const GoogleButton = (props: GoogleButtonProps) => {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-foreground text-[15px] font-semibold py-3.5 px-4 rounded-full transition-all border border-border shadow-sm active:scale-[0.98]"
      {...props}
    >
      <FcGoogle className="w-5 h-5" />
      Continue with Google
    </button>
  );
};

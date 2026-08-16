import { EyeOff, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const SignUp = () => {
  const [fullName, setFullName] = useState("Suad Macaulay");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [visible, setVisible] = useState({
    showPassword: false,
    showConfirmedPassword: false,
  });

  function logResults() {
    console.log(fullName);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
  }

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[32px] p-8 sm:px-12 sm:py-8 my-14 w-full max-w-[440px]  shadow-xl flex flex-col">
      <div className="mb-9">
        <h1 className="text-[32px] font-bold mb-2 text-[#1A1A1A] tracking-tight">
          Sign Up
        </h1>
        <p className="text-[15px] text-[#666666] font-normal">
          Just a few quick things to get started
        </p>
      </div>

      <form>
        <div className="mb-6 flex flex-col gap-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            type="text"
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="h-14 rounded-xl border-[#E0E0E0]"
          />
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <Label htmlFor="email">Email ID</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email ID"
            className="h-14 rounded-xl border-[#E0E0E0]"
          />
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              type={visible.showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
              className="h-14 rounded-xl border-[#E0E0E0] pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setVisible({
                  ...visible,
                  showPassword: !visible.showPassword,
                })
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            >
              {visible.showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              type={visible.showConfirmedPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter Confirm Password"
              className="h-14 rounded-xl border-[#E0E0E0] pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setVisible({
                  ...visible,
                  showConfirmedPassword: !visible.showConfirmedPassword,
                })
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            >
              {visible.showConfirmedPassword ? (
                <Eye size={20} />
              ) : (
                <EyeOff size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-8 mt-2">
          <Checkbox
            id="terms"
            className="w-5 h-5 border-2 border-purple-600 data-[state=checked]:bg-purple-600 rounded"
          />
          <Label
            htmlFor="terms"
            className="text-sm font-medium text-[#1A1A1A] cursor-pointer"
          >
            I Agree With The Terms And Conditions
          </Label>
        </div>

        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            logResults();
          }}
          className="w-full h-14 rounded-xl bg-[#111111] hover:bg-[#222222] text-white font-semibold text-base shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;

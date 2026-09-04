import { LuCheck } from "react-icons/lu";

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const RememberMeCheckbox = ({
  checked,
  onChange,
}: RememberMeCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer appearance-none w-5 h-5 border-2 border-border rounded-sm checked:bg-green-500 checked:border-green-500 transition-colors cursor-pointer"
        />
        <LuCheck className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
      </div>
      <label
        className="text-sm text-muted-foreground cursor-pointer select-none"
        onClick={() => onChange(!checked)}
      >
        Remember me
      </label>
    </div>
  );
};

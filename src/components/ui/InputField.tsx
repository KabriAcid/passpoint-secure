import { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <input
          ref={ref}
          className={`w-full h-11 px-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-sm ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;

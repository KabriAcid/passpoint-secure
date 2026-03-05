import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export default function PrimaryButton({
  children,
  variant = "primary",
  isLoading,
  className = "",
  disabled,
  ...props
}: PrimaryButtonProps) {
  const base = "w-full h-11 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-surface-hover border border-border",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
}

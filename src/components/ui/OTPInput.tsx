import { useRef, useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export default function OTPInput({ length = 6, value, onChange }: OTPInputProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const focusInput = (index: number) => {
    inputs.current[index]?.focus();
  };

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const arr = digits.slice();
    arr[index] = char;
    const newValue = arr.join("").replace(/\s/g, "");
    onChange(newValue);
    if (char && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((digit, i) => (
        <motion.input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          className="w-11 h-13 text-center text-lg font-mono font-semibold rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/ui/AuthCard";
import InputField from "@/components/ui/InputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { loginStep1 } from "@/services/authService";

function validateUsername(value: string): string {
  if (!value.trim()) return "Username is required";
  if (value.trim().length < 3) return "Username must be at least 3 characters";
  return "";
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const registered = (location.state as any)?.registered;
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (touched) setUsernameError(validateUsername(value));
  };

  const handleUsernameBlur = (value: string) => {
    setTouched(true);
    setUsernameError(validateUsername(value));
  };

  const handleSubmit = () => {
    const err = validateUsername(username);
    setTouched(true);
    setUsernameError(err);
    if (err) return;
    setLoading(true);
    setError("");

    setTimeout(() => {
      const result = loginStep1(username);
      setLoading(false);
      if (result.success && result.user) {
        navigate("/verify-passpoint", { state: { user: result.user } });
      } else {
        setError(result.error || "User not found");
      }
    }, 500);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your username to continue">
      <AuthCard>
        {registered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm">
            Account created successfully! Please sign in.
          </motion.div>
        )}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </motion.div>
        )}
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          onBlur={(e) => handleUsernameBlur(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          error={usernameError}
        />
        <PrimaryButton onClick={handleSubmit} isLoading={loading}>Continue</PrimaryButton>
      </AuthCard>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-foreground hover:text-accent transition-colors">Create one</Link>
      </p>
    </AuthLayout>
  );
}

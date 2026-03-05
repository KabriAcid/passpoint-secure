import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/ui/AuthCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import OTPInput from "@/components/ui/OTPInput";
import { loginStep3 } from "@/services/authService";
import { User } from "@/types/user";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = (location.state as any)?.user as User | undefined;
  const otp = (location.state as any)?.otp as string | undefined;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!user || !otp) return <Navigate to="/login" replace />;

  const handleVerify = () => {
    if (code.length < 6) {
      setError("Please enter the complete OTP");
      return;
    }
    setLoading(true);
    setError("");

    setTimeout(() => {
      const result = loginStep3(user.user_id, code);
      setLoading(false);
      if (result.success) {
        navigate("/dashboard", { state: { user } });
      } else {
        setError(result.error || "Invalid OTP");
        setCode("");
      }
    }, 600);
  };

  return (
    <AuthLayout title="OTP Verification" subtitle={`Enter the code sent to ${user.email}`}>
      <AuthCard>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </motion.div>
        )}

        {/* Show OTP hint in dev mode */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-center">
          <p className="text-xs text-muted-foreground">Demo mode — Your OTP is:</p>
          <p className="text-lg font-mono font-bold text-accent mt-1">{otp}</p>
        </motion.div>

        <OTPInput value={code} onChange={setCode} />

        <p className="text-center text-xs text-muted-foreground">
          {timeLeft > 0 ? (
            <>Code expires in <span className="font-mono text-foreground">{timeLeft}s</span></>
          ) : (
            <span className="text-destructive">OTP expired</span>
          )}
        </p>

        <PrimaryButton onClick={handleVerify} isLoading={loading} disabled={code.length < 6 || timeLeft <= 0}>
          Verify OTP
        </PrimaryButton>
      </AuthCard>
    </AuthLayout>
  );
}

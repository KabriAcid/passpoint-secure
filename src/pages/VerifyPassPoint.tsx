import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/ui/AuthCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ClickImageCanvas from "@/components/passpoint/ClickImageCanvas";
import { PASSPOINT_IMAGES } from "@/components/passpoint/ImageSelector";
import { loginStep2 } from "@/services/authService";
import { User } from "@/types/user";

export default function VerifyPassPoint() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = (location.state as any)?.user as User | undefined;

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const imageSrc = PASSPOINT_IMAGES[user.image_id];

  const handleVerify = () => {
    if (points.length < 4) {
      setError("Please select 4 points");
      return;
    }
    setLoading(true);
    setError("");

    setTimeout(() => {
      const result = loginStep2(user.user_id, points);
      setLoading(false);
      if (result.success) {
        navigate("/verify-otp", { state: { user, otp: result.otp } });
      } else {
        setError(result.error || "Verification failed");
        setPoints([]);
      }
    }, 800);
  };

  return (
    <AuthLayout title="PassPoint Verification" subtitle={`Click your 4 secret points, ${user.username}`}>
      <AuthCard>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </motion.div>
        )}
        <ClickImageCanvas
          imageSrc={imageSrc}
          points={points}
          onPointsChange={setPoints}
        />
        <PrimaryButton onClick={handleVerify} isLoading={loading} disabled={points.length < 4}>
          Verify Points
        </PrimaryButton>
      </AuthCard>
    </AuthLayout>
  );
}

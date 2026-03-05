import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "@/components/layout/AuthLayout";
import AuthCard from "@/components/ui/AuthCard";
import InputField from "@/components/ui/InputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ImageSelector from "@/components/passpoint/ImageSelector";
import ClickImageCanvas from "@/components/passpoint/ClickImageCanvas";
import { PASSPOINT_IMAGES } from "@/components/passpoint/ImageSelector";
import { registerUser } from "@/services/authService";

type Step = "info" | "image" | "points";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("info");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageId, setImageId] = useState("image1");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInfoSubmit = () => {
    if (!username || !email || !phone) {
      setError("All fields are required");
      return;
    }
    setError("");
    setStep("image");
  };

  const handleImageSubmit = () => {
    setStep("points");
  };

  const handleRegister = () => {
    if (points.length < 4) {
      setError("Please select 4 points on the image");
      return;
    }
    setLoading(true);
    setError("");

    setTimeout(() => {
      const result = registerUser({
        username,
        email,
        phone,
        image_id: imageId,
        clickPoints: points.map((p, i) => ({ ...p, order: i + 1 })),
      });

      setLoading(false);
      if (result.success) {
        navigate("/login", { state: { registered: true } });
      } else {
        setError(result.error || "Registration failed");
      }
    }, 800);
  };

  return (
    <AuthLayout title="Create account" subtitle="Set up your PassPoint authentication">
      <AuthCard>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </motion.div>
        )}

        {step === "info" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <InputField label="Username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <InputField label="Email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Phone" type="tel" placeholder="+1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <PrimaryButton onClick={handleInfoSubmit}>Continue</PrimaryButton>
          </motion.div>
        )}

        {step === "image" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <ImageSelector selected={imageId} onSelect={setImageId} />
            <div className="flex gap-2">
              <PrimaryButton variant="secondary" onClick={() => setStep("info")}>Back</PrimaryButton>
              <PrimaryButton onClick={handleImageSubmit}>Continue</PrimaryButton>
            </div>
          </motion.div>
        )}

        {step === "points" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">Click 4 secret points on the image. Remember them!</p>
            <ClickImageCanvas
              imageSrc={PASSPOINT_IMAGES[imageId]}
              points={points}
              onPointsChange={setPoints}
            />
            <div className="flex gap-2">
              <PrimaryButton variant="secondary" onClick={() => { setStep("image"); setPoints([]); }}>Back</PrimaryButton>
              <PrimaryButton onClick={handleRegister} isLoading={loading} disabled={points.length < 4}>
                Register
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AuthCard>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-foreground hover:text-accent transition-colors">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Clock, LogOut, CheckCircle } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { User } from "@/types/user";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = (location.state as any)?.user as User | undefined;

  if (!user) return <Navigate to="/login" replace />;

  const lastLogin = user.last_login
    ? new Date(user.last_login).toLocaleString()
    : "First login";

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-accent" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">PassPoint</span>
        </div>
        <PrimaryButton variant="ghost" className="w-auto px-4" onClick={() => navigate("/")}>
          <LogOut className="w-4 h-4" /> Logout
        </PrimaryButton>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user.username}</h1>
          <p className="text-muted-foreground mt-2">Your account is secure and verified.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-4.5 h-4.5 text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">Security Status</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-sm text-accent font-medium">Fully Verified</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <Clock className="w-4.5 h-4.5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Last Login</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">{lastLogin}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <Shield className="w-4.5 h-4.5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Auth Method</span>
            </div>
            <p className="text-sm text-muted-foreground">PassPoint + OTP</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mt-4"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">Account Details</h2>
          <div className="space-y-3">
            {[
              ["Username", user.username],
              ["Email", user.email],
              ["Phone", user.phone],
              ["Image ID", user.image_id],
              ["Member Since", new Date(user.created_at).toLocaleDateString()],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground font-mono">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

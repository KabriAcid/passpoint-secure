import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Lock, Fingerprint, Mail } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-accent" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">PassPoint</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <PrimaryButton variant="ghost" className="w-auto px-4">Sign In</PrimaryButton>
          </Link>
          <Link to="/register">
            <PrimaryButton className="w-auto px-5">Get Started</PrimaryButton>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
            Graphical Password Authentication
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
            Security beyond
            <br />
            <span className="text-gradient">passwords</span>
          </h1>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed max-w-lg mx-auto">
            PassPoint combines image-based authentication with OTP verification for a secure, intuitive login experience.
          </p>
          <div className="flex items-center justify-center gap-3 mt-10">
            <Link to="/register">
              <PrimaryButton className="w-auto px-8">
                Create Account <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            </Link>
            <Link to="/login">
              <PrimaryButton variant="secondary" className="w-auto px-8">
                Sign In
              </PrimaryButton>
            </Link>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-4 mt-24 max-w-3xl mx-auto"
        >
          {[
            { icon: Fingerprint, title: "PassPoint Auth", desc: "Click secret points on an image as your password" },
            { icon: Mail, title: "OTP Verification", desc: "Secondary verification via email one-time code" },
            { icon: Lock, title: "Hybrid Security", desc: "Multi-layered authentication for maximum protection" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-card p-5 text-center group hover:border-muted-foreground/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/10 transition-colors">
                <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import VerifyPassPoint from "@/pages/VerifyPassPoint";
import VerifyOTP from "@/pages/VerifyOTP";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-passpoint" element={<VerifyPassPoint />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

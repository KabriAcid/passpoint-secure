import { otpStore } from "@/mock/otp";
import { OTPRecord } from "@/types/otp";

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function sendOTP(userId: number): string {
  // Remove existing OTPs for this user
  const filtered = otpStore.filter((o) => o.user_id !== userId);
  otpStore.length = 0;
  otpStore.push(...filtered);

  const code = generateCode();
  const record: OTPRecord = {
    user_id: userId,
    otp_code: code,
    expires_at: Date.now() + 60000,
  };
  otpStore.push(record);

  // Simulate sending
  console.log(`[OTP Service] OTP for user ${userId}: ${code}`);
  return code;
}

export function verifyOTP(userId: number, code: string): boolean {
  const record = otpStore.find(
    (o) => o.user_id === userId && o.otp_code === code
  );
  if (!record) return false;
  if (Date.now() > record.expires_at) return false;
  // Remove used OTP
  const idx = otpStore.indexOf(record);
  if (idx !== -1) otpStore.splice(idx, 1);
  return true;
}

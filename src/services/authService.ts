import { findUserByUsername, addUser, updateLastLogin } from "@/mock/users";
import { addClickPoints, getClickPointsForUser } from "@/mock/clickpoints";
import { validateClickPoints } from "@/utils/tolerance";
import { sendOTP, verifyOTP } from "@/services/otpService";
import { User } from "@/types/user";

export interface RegisterData {
  username: string;
  email: string;
  phone: string;
  image_id: string;
  clickPoints: { x: number; y: number; order: number }[];
}

export function registerUser(data: RegisterData): { success: boolean; user?: User; error?: string } {
  if (findUserByUsername(data.username)) {
    return { success: false, error: "Username already exists" };
  }
  const user = addUser({
    username: data.username,
    email: data.email,
    phone: data.phone,
    image_id: data.image_id,
  });
  addClickPoints(user.user_id, data.clickPoints);
  return { success: true, user };
}

export function loginStep1(username: string): { success: boolean; user?: User; error?: string } {
  const user = findUserByUsername(username);
  if (!user) return { success: false, error: "User not found" };
  return { success: true, user };
}

export function loginStep2(
  userId: number,
  inputPoints: { x: number; y: number }[]
): { success: boolean; otp?: string; error?: string } {
  const stored = getClickPointsForUser(userId);
  if (!validateClickPoints(stored, inputPoints)) {
    return { success: false, error: "Click points do not match" };
  }
  const otp = sendOTP(userId);
  return { success: true, otp };
}

export function loginStep3(userId: number, otpCode: string): { success: boolean; error?: string } {
  if (!verifyOTP(userId, otpCode)) {
    return { success: false, error: "Invalid or expired OTP" };
  }
  updateLastLogin(userId);
  return { success: true };
}

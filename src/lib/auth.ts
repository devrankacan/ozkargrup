import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "ozkar_admin_session";

export function signAdminToken(adminId: string, username: string) {
  return jwt.sign({ adminId, username }, SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { adminId: string; username: string };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };

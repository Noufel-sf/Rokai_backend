// utils/jwt.ts
import type { Response, Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const isProd = process.env.NODE_ENV === "production";
export const ACCESS_COOKIE = "access_token";

export function signAccessToken(payload: { sub: string; role: "student" | "teacher" }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h", issuer: "mern-edu" });
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(ACCESS_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60, // 1h
  });
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(ACCESS_COOKIE, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
  });
}

export function readToken(req: Request) {
  return req.cookies?.[ACCESS_COOKIE] as string | undefined;
}

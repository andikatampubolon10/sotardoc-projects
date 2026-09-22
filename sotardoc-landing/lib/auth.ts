import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SECRET = process.env.ADMIN_JWT_SECRET || "sotardoc_secret_key_2026";
const COOKIE_NAME = "sotardoc_admin_session";

export interface AdminPayload {
  id: number;
  username: string;
  name: string;
}

// Simple base64url encode/decode
function base64url(input: string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function fromBase64url(input: string): string {
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString();
}

// Generate HMAC signature using native crypto
async function sign(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Buffer.from(signature)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Create signed session token
export async function createSessionToken(payload: AdminPayload): Promise<string> {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const body = base64url(JSON.stringify({ ...payload, exp }));
  const data = `${header}.${body}`;
  const signature = await sign(data);
  return `${data}.${signature}`;
}

// Verify signed session token
export async function verifySessionToken(token: string): Promise<AdminPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = await sign(`${header}.${body}`);
    if (expectedSig !== signature) return null;

    const payload = JSON.parse(fromBase64url(body));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return {
      id: payload.id,
      username: payload.username,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

// Password helpers
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Get session from NextRequest or cookies()
export async function getAdminSession(req?: NextRequest): Promise<AdminPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(COOKIE_NAME)?.value;
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    } catch {
      // In non-request context
    }
  }

  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME };

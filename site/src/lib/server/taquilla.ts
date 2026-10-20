import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "taquilla";
const SESSION_HOURS = 12;
export const CASH_LINK_HOURS = 48;
// No 0/O, 1/I/L: the token gets read aloud and typed from WhatsApp.
const TOKEN_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

function pin(): string | null {
  return process.env.CASH_ADMIN_PIN?.trim() || null;
}

export function taquillaConfigured(): boolean {
  return pin() !== null;
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function pinMatches(candidate: string): boolean {
  const expected = pin();
  if (!expected) return false;
  return timingSafeEqual(digest(candidate.trim()), digest(expected));
}

// Changing CASH_ADMIN_PIN in Vercel signs Pedro out everywhere, since the key derives from it.
function sign(payload: string): string {
  return createHmac("sha256", `taquilla:${pin()}`).update(payload).digest("base64url");
}

export function newSessionValue(): { value: string; maxAge: number } {
  const maxAge = SESSION_HOURS * 3600;
  const expires = String(Date.now() + maxAge * 1000);
  return { value: `${expires}.${sign(expires)}`, maxAge };
}

export async function isTaquillaSession(): Promise<boolean> {
  // Read the cookie before checking the PIN so the taquilla page is always rendered per request:
  // otherwise a build without CASH_ADMIN_PIN prerenders "no configurada" and keeps showing it.
  const raw = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!pin() || !raw) return false;
  const [expires, signature] = raw.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function newCashToken(): string {
  return Array.from({ length: 10 }, () => TOKEN_ALPHABET[randomInt(TOKEN_ALPHABET.length)]).join("");
}

export function isCashTokenShape(value: unknown): value is string {
  return typeof value === "string" && /^[23456789A-HJKMNP-Z]{10}$/.test(value);
}

import { cookies } from "next/headers";
import { SESSION_COOKIE, newSessionValue, pinMatches, taquillaConfigured } from "@/lib/server/taquilla";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!taquillaConfigured()) return Response.json({ error: "La taquilla no está configurada." }, { status: 503 });

  const body = (await request.json().catch(() => null)) as { pin?: unknown } | null;
  if (typeof body?.pin !== "string" || !pinMatches(body.pin)) {
    // Slows down guessing; the PIN length is the real protection.
    await new Promise((r) => setTimeout(r, 1200));
    return Response.json({ error: "PIN incorrecto." }, { status: 401 });
  }

  const session = newSessionValue();
  (await cookies()).set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  (await cookies()).delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}

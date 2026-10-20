import type { NextRequest } from "next/server";
import { SHOWS, isShowId } from "@/lib/montreal";
import { cancelCashLink, capacityFor, countByShow, createCashLink } from "@/lib/server/sheet";
import { torontoTime } from "@/lib/server/rows";
import { CASH_LINK_HOURS, isCashTokenShape, isTaquillaSession, newCashToken } from "@/lib/server/taquilla";

export const runtime = "nodejs";

const unauthorized = () => Response.json({ error: "Tu sesión venció. Vuelve a poner el PIN." }, { status: 401 });

export async function GET() {
  if (!(await isTaquillaSession())) return unauthorized();
  try {
    const counts = await countByShow();
    const shows = Object.fromEntries(
      (Object.keys(SHOWS) as (keyof typeof SHOWS)[]).map((id) => {
        const capacity = capacityFor(id);
        return [id, { taken: counts[id] ?? 0, capacity, remaining: capacity ? Math.max(capacity - (counts[id] ?? 0), 0) : null }];
      }),
    );
    return Response.json({ shows });
  } catch (error) {
    console.error(`[montreal] taquilla status failed: ${error instanceof Error ? error.message : error}`);
    return Response.json({ error: "No pude leer el Sheet. Intenta de nuevo." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isTaquillaSession())) return unauthorized();
  const body = (await request.json().catch(() => null)) as { show?: unknown } | null;
  if (!isShowId(body?.show)) return Response.json({ error: "Elige la función." }, { status: 400 });
  const show = body.show;

  const token = newCashToken();
  const now = new Date();
  const expires = new Date(now.getTime() + CASH_LINK_HOURS * 3600 * 1000);
  try {
    const result = await createCashLink(token, show, capacityFor(show), torontoTime(now), expires.toISOString());
    if (!result.ok) {
      const soldOut = result.error === "sold_out";
      return Response.json(
        { error: soldOut ? `La función de las ${SHOWS[show].label} está llena.` : "No pude crear el enlace. Intenta de nuevo." },
        { status: soldOut ? 409 : 502 },
      );
    }
  } catch (error) {
    console.error(`[montreal] taquilla create failed: ${error instanceof Error ? error.message : error}`);
    return Response.json({ error: "No pude crear el enlace. Intenta de nuevo." }, { status: 502 });
  }

  const origin = process.env.SITE_URL?.replace(/\/$/, "") || request.nextUrl.origin;
  return Response.json({ token, show, url: `${origin}/montreal/efectivo/${token}`, expiresAt: expires.toISOString() });
}

export async function DELETE(request: NextRequest) {
  if (!(await isTaquillaSession())) return unauthorized();
  const token = request.nextUrl.searchParams.get("token");
  if (!isCashTokenShape(token)) return Response.json({ error: "Enlace inválido." }, { status: 400 });
  try {
    const result = await cancelCashLink(token);
    if (!result.ok) return Response.json({ error: "Ese enlace ya no se puede anular (ya se usó o venció)." }, { status: 409 });
    return Response.json({ ok: true });
  } catch (error) {
    console.error(`[montreal] taquilla cancel failed: ${error instanceof Error ? error.message : error}`);
    return Response.json({ error: "No pude anular el enlace. Intenta de nuevo." }, { status: 502 });
  }
}
